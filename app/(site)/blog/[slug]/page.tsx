import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from "next/link";

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const docRef = doc(db, "posts", slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
        <Link href="/blog" className="text-green-700 font-bold hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const post = docSnap.data();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <Link href="/blog" className="text-green-700 font-bold text-sm mb-8 inline-block hover:underline">
        &larr; Back to Blog
      </Link>
      
      {post.image && (
        <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-10 shadow-sm border border-stone-200">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="mb-10 border-b border-stone-200 pb-10">
        {post.category && (
          <span className="inline-block bg-stone-100 text-stone-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4">
            {post.category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
        {post.createdAt && (
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        )}
      </div>
      
      <div className="prose prose-lg prose-green max-w-none text-gray-700">
        <MDXRemote source={post.content || ""} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </div>
    </article>
  );
}