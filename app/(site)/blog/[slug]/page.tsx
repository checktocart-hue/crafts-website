import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
    <article className="max-w-3xl mx-auto px-4 py-16 font-sans">
      <header className="mb-10 text-center">
        <p className="text-sm font-bold text-blue-700 uppercase tracking-widest mb-4">
          {post.category || "Review"}
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full aspect-[16/9] object-cover rounded-lg shadow-sm mt-8"
          />
        )}
      </header>

      <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-a:text-blue-700 prose-img:rounded-md prose-img:mx-auto">
        {/* rehypeRaw is the magic key that allows your legacy HTML images to render! */}
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {contentToRender}
        </ReactMarkdown>
      </div>
    </article>
  );
}