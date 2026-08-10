import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import TableOfContents from "@/components/TableOfContents"; 

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
  const contentToRender = post.content || post.body || ""; 

  return (
    <article className="max-w-6xl mx-auto px-4 py-16 font-sans relative">
      <header className="max-w-3xl mx-auto mb-10 text-center">
        <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-4">
          {post.category || "Review"}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* STRATEGY 1: FTC Affiliate Disclosure */}
        <div className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-4 py-3 rounded-lg inline-block shadow-sm mb-4">
          <span className="font-bold">Transparency:</span> As an Amazon Associate, we earn from qualifying purchases through links in this guide at no extra cost to you.
        </div>

        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full aspect-[16/9] object-cover rounded-lg shadow-sm mt-4"
          />
        )}
      </header>

      {/* Grid Layout for Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-12">
        
        {/* Sticky Table of Contents (Left Column) */}
        <aside className="lg:col-span-4 sticky top-8">
          <TableOfContents />
        </aside>

        {/* STRATEGY 2: Main Article & Optimized Link Styling (Right Column) */}
        <div className="lg:col-span-8 prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-a:text-amber-600 prose-a:font-extrabold prose-a:underline hover:prose-a:text-amber-700 prose-img:rounded-md prose-img:mx-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {contentToRender}
          </ReactMarkdown>
        </div>
      </div>
      
    </article>
  );
}