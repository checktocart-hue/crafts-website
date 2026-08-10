import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TableOfContents from "@/components/TableOfContents"; 
import AmazonProductCard from "@/components/AmazonProductCard"; 
import Image from "next/image"; // <-- Imported Next.js Image component

export const revalidate = 60;

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
  
  const contentToRender = rawContent.replace(
    /\[AMAZON_CARD\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\s*\|\|\s*([\s\S]*?)\]/g,
    (match: any, title: string, badge: string, image: string, link: string) => {
      const stripHTML = (str: string) => str.replace(/(<([^>]+)>)/gi, "").trim();
      return `<amazon-card title="${stripHTML(title)}" badge="${stripHTML(badge)}" imageurl="${stripHTML(image)}" amazonurl="${stripHTML(link)}"></amazon-card>`;
    }
  ); 

  return (
    <article className="max-w-6xl mx-auto px-4 py-16 font-sans relative">
      <header className="max-w-3xl mx-auto mb-10 text-center">
        <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">
          {post.category || "Review"}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-4 py-3 rounded-lg inline-block shadow-sm mb-4">
          <span className="font-bold">Transparency:</span> As an Amazon Associate, we earn from qualifying purchases through links in this guide at no extra cost to you.
        </div>

        {/* OPTIMIZED COVER IMAGE */}
        {post.coverImage && (
          <div className="relative w-full aspect-[16/9] mt-4 overflow-hidden rounded-lg shadow-sm">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              priority // Loads immediately for a faster visually complete page
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
        
        <aside className="lg:col-span-4 sticky top-8">
          <TableOfContents />
        </aside>

        <div className="lg:col-span-8 prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-a:text-amber-600 prose-a:font-extrabold prose-a:underline hover:prose-a:text-amber-700 prose-img:rounded-md prose-img:mx-auto">
          
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
            components={{
              "amazon-card": ({node, ...props}: any) => (
                <AmazonProductCard 
                  title={props.title}
                  badge={props.badge}
                  imageUrl={props.imageurl}
                  amazonUrl={props.amazonurl}
                />
              ),
              // OPTIMIZED MARKDOWN IMAGES
              img: ({node, ...props}: any) => {
                if (!props.src) return null;
                return (
                  <span className="block relative w-full aspect-video my-8 overflow-hidden rounded-md shadow-sm">
                    <Image
                      src={props.src}
                      alt={props.alt || "Article image"}
                      fill
                      loading="lazy" // Defers loading until the image is close to scrolling into view
                      sizes="(max-width: 768px) 100vw, 800px"
                      className="object-contain"
                    />
                  </span>
                );
              }
            }}
          >
            {contentToRender}
          </ReactMarkdown>

        </div>
      </div>
      
    </article>
  );
}