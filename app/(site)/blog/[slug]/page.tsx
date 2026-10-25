import { collection, getDocs, query, where, limit, doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TableOfContents from "@/components/TableOfContents"; 
import AmazonProductCard from "@/components/AmazonProductCard"; 
import BuildersResourceWidget from "@/components/BuildersResourceWidget";
import QuickPick from "@/components/QuickPick";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 60;
export const dynamic = "force-dynamic";

// 1. FIXED METADATA FUNCTION (Queries by 'slug' field first, then falls back to Doc ID)
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  let post: any = null;

  // Search 'blog' collection where the slug field matches the URL
  let q = query(collection(db, "blog"), where("slug", "==", params.slug), limit(1));
  let snap = await getDocs(q);

  // If not found in 'blog', search 'reviews' collection
  if (snap.empty) {
    q = query(collection(db, "reviews"), where("slug", "==", params.slug), limit(1));
    snap = await getDocs(q);
  }

  if (!snap.empty) {
    post = snap.docs[0].data();
  } else {
    // Fallback for any older posts where the Document ID was the slug
    let docSnap = await getDoc(doc(db, "blog", params.slug));
    if (!docSnap.exists()) {
      docSnap = await getDoc(doc(db, "reviews", params.slug));
    }
    if (docSnap.exists()) {
      post = docSnap.data();
    }
  }

  if (!post) {
    return {
      title: "Post Not Found | Crafts & Kits",
    };
  }

  // Create a clean fallback description from the article text if metaDescription is empty
  const cleanExcerpt = (post.content || "")
    .replace(/<[^>]*>?/gm, " ")
    .replace(/\[.*?\]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);

  return {
    title: post.seoTitle || post.title || "Crafts & Kits",
    description:
      post.metaDescription ||
      cleanExcerpt ||
      "In-depth tutorials and recommendations for book nooks, metal models, and miniature kits.",
    alternates: {
      canonical: `https://www.craftsandkits.com/blog/${params.slug}`,
    },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  let q = query(collection(db, "blog"), where("slug", "==", params.slug), limit(1));
  let snap = await getDocs(q);
  
  if (snap.empty) {
    q = query(collection(db, "reviews"), where("slug", "==", params.slug), limit(1));
    snap = await getDocs(q);
  }

  if (snap.empty) {
    return <div className="max-w-3xl mx-auto py-20 text-center font-bold text-2xl">Post not found</div>;
  }

  const post = snap.docs[0].data() as any;
  const rawContent = post.content || post.body || ""; 
  
  const contentToRender = rawContent
    .replace(
      /(?:<p>\s*)?ADVERTISEMENT(?:\s*<\/p>)?/gi, 
      '\n\n<ad-placeholder></ad-placeholder>\n\n'
    )
    .replace(
      /(?:<p>\s*)?\[QUICK_PICK\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\](?:\s*<\/p>)?/gi,
      (match: any, title: string, reason: string, link: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `\n\n<quick-pick title="${stripHTML(title)}" reason="${stripHTML(reason)}" url="${stripHTML(link)}"></quick-pick>\n\n`;
      }
    )
    .replace(
      /(?:<p>\s*)?\[AMAZON_CARD\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\](?:\s*<\/p>)?/gi,
      (match: any, title: string, badge: string, image: string, link: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `\n\n<amazon-card title="${stripHTML(title)}" badge="${stripHTML(badge)}" image="${stripHTML(image)}" amazonurl="${stripHTML(link)}"></amazon-card>\n\n`;
      }
    )
    .replace(
      /(?:<p>\s*)?\[BOUNTY_BUTTON\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\](?:\s*<\/p>)?/gi,
      (match: any, text: string, link: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `\n\n<bounty-button text="${stripHTML(text)}" link="${stripHTML(link)}"></bounty-button>\n\n`;
      }
    )
    .replace(
      /(?:<p>\s*)?\[WINNER_BOX\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\](?:\s*<\/p>)?/gi,
      (match: any, title: string, content: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `\n\n<winner-box title="${stripHTML(title)}" content="${stripHTML(content)}"></winner-box>\n\n`;
      }
    );

  return (
    <article className="max-w-6xl mx-auto px-4 pt-16 pb-28 font-sans relative">
      <header className="max-w-3xl mx-auto mb-10 text-center">
        <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">
          {post.category || "Review"}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-800 font-medium">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              RM
            </span>
            <span>By Rashy Michaels</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {post.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
          </div>

          <div className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-4 py-3 rounded-lg inline-block shadow-sm">
            <span className="font-bold">Transparency:</span> As an Amazon Associate, we earn from qualifying purchases through links in this guide at no extra cost to you.
          </div>
        </div>

        {post.coverImage && (
          <div className="relative w-full aspect-[16/9] mt-4 overflow-hidden rounded-lg shadow-sm">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              priority 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
        <aside className="lg:col-span-4 sticky top-8 space-y-8">
          <TableOfContents />
          
          <div className="hidden lg:block">
            <BuildersResourceWidget />
          </div>
        </aside>

        <div className="lg:col-span-8 prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-a:text-amber-600 prose-a:font-extrabold prose-a:underline hover:prose-a:text-amber-700 prose-img:rounded-md prose-img:mx-auto">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              p: ({node, children, ...props}: any) => (
                <div className="mb-6 leading-relaxed" {...props}>{children}</div>
              ),
              "ad-placeholder": ({node, ...props}: any) => (
                <div 
                  aria-hidden="true" 
                  className="w-full my-8 min-h-[250px] bg-transparent"
                  id="mediavine-target-slot"
                ></div>
              ),
              "quick-pick": ({node, ...props}: any) => (
                <QuickPick 
                  title={props.title} 
                  reason={props.reason} 
                  url={props.url} 
                />
              ),
              "amazon-card": ({node, ...props}: any) => (
                <AmazonProductCard 
                  title={props.title}
                  badge={props.badge}
                  image={props.image} 
                  amazonUrl={props.amazonurl}
                />
              ),
              "bounty-button": ({node, ...props}: any) => (
                <span className="block my-10">
                  <a 
                    href={props.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold text-xl py-5 px-6 rounded-xl shadow-lg transition-transform hover:scale-105 border-b-4 border-amber-600 hover:border-amber-500 uppercase tracking-widest no-underline"
                  >
                    {props.text}
                  </a>
                  <span className="block text-center text-xs text-gray-500 mt-3 font-semibold uppercase tracking-wider">
                    Cancel anytime. No risk.
                  </span>
                </span>
              ),
              "winner-box": ({node, ...props}: any) => (
                <span className="block my-10 bg-amber-50/50 border border-amber-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                  <span className="absolute -top-4 -right-4 text-amber-100 opacity-50 text-9xl pointer-events-none">
                    🏆
                  </span>
                  
                  <span className="block relative z-10">
                    <span className="flex items-center gap-3 mb-3">
                      <span className="bg-amber-500 text-gray-950 flex items-center justify-center w-8 h-8 rounded-lg font-bold shadow-sm shrink-0">
                        ✓
                      </span>
                      <strong className="block text-xl md:text-2xl font-bold font-serif text-gray-900 m-0">
                        {props.title}
                      </strong>
                    </span>
                    <span className="block text-gray-700 text-base md:text-lg leading-relaxed m-0 font-medium">
                      {props.content}
                    </span>
                  </span>
                </span>
              ),
              img: ({node, ...props}: any) => {
                if (!props.src) return null;
                return (
                  <span className="block relative w-full aspect-video my-8 overflow-hidden rounded-md shadow-sm">
                    <Image
                      src={props.src}
                      alt={props.alt || "Article image"}
                      fill
                      loading="lazy" 
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain"
                    />
                  </span>
                );
              }
            } as any} 
          >
            {contentToRender}
          </ReactMarkdown>

          {/* IN-ARTICLE GUMROAD EBOOK BANNER */}
          <div className="not-prose bg-amber-50 border-l-4 border-amber-500 p-6 my-10 rounded-r-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Struggling with tiny wires and messy glue?
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Don&apos;t ruin your $50 kit. Get <strong>Zero to Finished</strong>, the complete 6-module beginner&apos;s blueprint to building flawless miniature rooms, mastering micro-wiring, and fixing broken wooden parts.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto text-center">
              <Link 
                href="https://craftsman353.gumroad.com/l/miniature-guide" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm no-underline"
              >
                Get The Guide →
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      {post.affiliateLink && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] z-50 md:hidden flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider truncate">
              Featured Kit
            </p>
            <p className="text-sm font-bold text-gray-900 truncate leading-tight">
              {post.title}
            </p>
          </div>
          <a
            href={post.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold px-5 py-3 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 flex-shrink-0"
          >
            Check Price ↗
          </a>
        </div>
      )}

    </article>
  );
}