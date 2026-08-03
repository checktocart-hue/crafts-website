import { getPostBySlug } from "@/app/lib/markdown";
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons";
import AuthorBio from "@/app/components/AuthorBio";
import { Info } from "lucide-react";

// This allows us to style standard markdown tags with Tailwind
const mdxComponents = {
  h2: (props: any) => <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-8 mb-3 text-gray-800" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
  img: (props: any) => (
    <img className="w-full h-auto object-cover rounded-xl my-6 shadow-sm border border-gray-100" loading="lazy" {...props} />
  ),
};

export default async function BlogArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  
  // Fetch from LOCAL markdown files
  const post = getPostBySlug('blog', slug);
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article not found</h1>
        <Link href="/blog" className="text-green-700 hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog" className="text-sm font-bold text-gray-500 hover:text-green-700">
          ← Back to Blog
        </Link>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
        {post.meta.title}
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
        <p suppressHydrationWarning>Published: {new Date(post.meta.date).toLocaleDateString()}</p>
        <span>•</span>
        <p>By CraftsAndKits Team</p>
      </div>
      
      {post.meta.image && (
        <div className="relative w-full h-64 md:h-[400px] mb-12 rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
          <img src={post.meta.image} alt={post.meta.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* AUTOMATIC AFFILIATE DISCLOSURE */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-8 flex gap-3 text-sm text-gray-600 items-start">
        <Info className="flex-shrink-0 text-green-700 mt-0.5" size={18} />
        <p>
          <span className="font-bold text-gray-900">Transparency Note:</span> This post may contain affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you.
        </p>
      </div>

      {/* THE ACTUAL MARKDOWN CONTENT RENDERED HERE */}
      <article className="prose prose-lg prose-green max-w-none mb-10 text-gray-700">
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>

      <ShareButtons slug={post.meta.slug} title={post.meta.title} />
      <AuthorBio />
      
    </div>
  );
}