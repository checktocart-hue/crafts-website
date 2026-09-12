import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import AmazonProductCard from "@/components/AmazonProductCard"; 
import QuickPick from "@/components/QuickPick";
import Image from "next/image";

// This tells Next.js to render this page on demand, never cache it statically
export const dynamic = "force-dynamic";

export default async function PreviewPage(props: { searchParams: Promise<{ slug?: string, col?: string }> }) {
  const searchParams = await props.searchParams;
  const { slug, col } = searchParams;

  if (!slug || !col) {
    return <div className="text-center p-12 text-red-500 font-bold">Missing slug or collection parameter for preview.</div>;
  }

  // 1. We must query by the exact Document ID to preview drafts reliably.
  // Assuming your Editor saves the document ID exactly as the slug (which is standard).
  const docRef = doc(db, col, slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div className="text-center p-12 text-red-500 font-bold">Draft not found. Make sure you click "Save Draft" before previewing.</div>;
  }

  const post = docSnap.data();
  const rawContent = post.content || post.body || ""; 

  // 2. Run the exact same Regex Parsers as your live BlogPostPage
  const contentToRender = rawContent
    .replace(/ADVERTISEMENT/gi, '<ad-placeholder></ad-placeholder>')
    .replace(
      /\[QUICK_PICK\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\]/g,
      (match: any, title: string, reason: string, link: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `<quick-pick title="${stripHTML(title)}" reason="${stripHTML(reason)}" url="${stripHTML(link)}"></quick-pick>`;
      }
    )
    .replace(
      /\[AMAZON_CARD\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\]/g,
      (match: any, title: string, badge: string, image: string, link: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `<amazon-card title="${stripHTML(title)}" badge="${stripHTML(badge)}" image="${stripHTML(image)}" amazonurl="${stripHTML(link)}"></amazon-card>`;
      }
    )
    .replace(
      /\[BOUNTY_BUTTON\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\]/g,
      (match: any, text: string, link: string) => {
        const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
        return `<bounty-button text="${stripHTML(text)}" link="${stripHTML(link)}"></bounty-button>`;
      }
    );

  return (
    <div className="bg-stripes-gray min-h-screen pb-20 relative">
      {/* Draft Warning Banner */}
      <div className="bg-amber-500 text-gray-900 font-bold text-center py-2 px-4 shadow-md sticky top-0 z-50 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
        <span>⚠️ Live Preview Mode</span>
        <span className="bg-gray-900 text-amber-500 px-2 py-0.5 rounded text-[10px]">
          Status: {post.status || 'Draft'}
        </span>
      </div>

      <article className="max-w-4xl mx-auto px-4 pt-12 font-sans bg-white shadow-xl mt-8 rounded-xl overflow-hidden border border-gray-200">
        <header className="px-8 pt-10 mb-10 text-center border-b border-gray-100 pb-10">
          <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">
            {post.category || "Category"}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {post.title || "Untitled Draft"}
          </h1>
          
          {post.coverImage && (
            <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] mt-8 overflow-hidden rounded-lg shadow-sm border border-gray-200">
              <Image 
                src={post.coverImage} 
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
          )}
        </header>

        <div className="px-8 pb-12 prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-a:text-amber-600 prose-a:font-extrabold prose-a:underline hover:prose-a:text-amber-700">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              "ad-placeholder": () => <div className="w-full my-8 min-h-[250px] bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 font-bold uppercase text-xs tracking-widest">Ad Slot</div>,
              "quick-pick": ({node, ...props}: any) => <QuickPick title={props.title} reason={props.reason} url={props.url} />,
              "amazon-card": ({node, ...props}: any) => <AmazonProductCard title={props.title} badge={props.badge} image={props.image} amazonUrl={props.amazonurl} />,
              "bounty-button": ({node, ...props}: any) => (
                <span className="block my-10">
                  <a href={props.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold text-xl py-5 px-6 rounded-xl shadow-lg border-b-4 border-amber-600 uppercase tracking-widest no-underline">
                    {props.text}
                  </a>
                </span>
              ),
              img: ({node, ...props}: any) => props.src ? (
                <span className="block relative w-full aspect-video my-8 overflow-hidden rounded-md border border-gray-200">
                  <Image src={props.src} alt={props.alt || "Image"} fill className="object-contain" />
                </span>
              ) : null
            } as any} 
          >
            {contentToRender}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}