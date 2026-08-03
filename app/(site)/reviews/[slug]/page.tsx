import { getPostBySlug } from "@/app/lib/markdown";
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons";
import AuthorBio from "@/app/components/AuthorBio";
import { Info, Star, ExternalLink } from "lucide-react";

const mdxComponents = {
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-12 mb-4 text-gray-900 border-b border-gray-100 pb-3 scroll-mt-24" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-bold mt-8 mb-3 text-gray-800" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-5 leading-relaxed text-gray-700 text-base md:text-lg" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2 text-base md:text-lg" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2 text-base md:text-lg" {...props} />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
  
  // 🔗 AFFILIATE & STANDARD LINKS
  a: (props: any) => {
    const text = props.children?.toString() || '';
    const isAffiliate = text.toLowerCase().includes('shop') || props.href?.includes('amazon');

    if (isAffiliate) {
      return (
        <a
          className="inline-flex items-center gap-2 my-3 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base rounded-xl shadow-sm hover:shadow-md transition-all no-underline cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {props.children}
          <ExternalLink size={18} />
        </a>
      );
    }

    return (
      <a
        className="text-green-700 hover:text-green-800 underline font-semibold transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },

 // 🖼️ ENHANCED IN-ARTICLE IMAGES WITH CAPTIONS (Hydration Safe!)
  img: (props: any) => (
    <span className="block my-10">
      <span className="block overflow-hidden rounded-2xl border border-gray-200/80 shadow-md bg-stone-50">
        <img className="w-full h-auto object-cover max-h-[500px] block" loading="lazy" {...props} />
      </span>
      {props.alt && (
        <span className="block mt-3 text-center text-xs md:text-sm text-gray-500 italic">
          {props.alt}
        </span>
      )}
    </span>
  ),

  // 📊 MODERN PREMIUM TABLE DESIGN
  table: (props: any) => (
    <div className="my-10 overflow-hidden border border-gray-200/80 rounded-2xl shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm md:text-base" {...props} />
      </div>
    </div>
  ),
  thead: (props: any) => (
    <thead className="bg-slate-900 text-white border-b border-slate-800" {...props} />
  ),
  th: (props: any) => (
    <th className="px-5 py-4 font-semibold tracking-wider text-xs md:text-sm uppercase text-slate-200 whitespace-nowrap" {...props} />
  ),
  tbody: (props: any) => <tbody className="divide-y divide-gray-100 bg-white" {...props} />,
  tr: (props: any) => (
    <tr className="hover:bg-amber-50/50 transition-colors even:bg-slate-50/60" {...props} />
  ),
  td: (props: any) => (
    <td className="px-5 py-4 text-gray-700 align-middle leading-snug" {...props} />
  ),
  
  // 💡 CALLOUT / BLOCKQUOTE STYLING
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-amber-500 bg-amber-50/60 p-5 rounded-r-xl my-8 text-gray-800 italic" {...props} />
  ),
};

export default async function ReviewArticlePage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = getPostBySlug('reviews', slug);
  
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Review not found</h1>
        <Link href="/reviews" className="text-green-700 hover:underline">Return to Reviews</Link>
      </div>
    );
  }

  const safeContent = post.content
    .replace(/<!--[\s\S]*?-->/g, '') 
    .replace(/<br\s*\/?>/gi, '<br />') 
    .replace(/<hr\s*\/?>/gi, '<hr />') 
    .replace(/\{/g, '&#123;') 
    .replace(/\}/g, '&#125;') 
    .replace(/<(?!br|hr|\/|img|a|strong|em|p|h[1-6]|ul|li|ol|span|div|table|th|tr|td|tbody|thead|blockquote)/gi, '&lt;'); 

  return (
    <div suppressHydrationWarning className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/reviews" className="text-sm font-bold text-gray-500 hover:text-green-700">
          ← Back to Reviews
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-2 text-yellow-500">
        <Star size={20} fill="currentColor" /> 
        <Star size={20} fill="currentColor" /> 
        <Star size={20} fill="currentColor" /> 
        <Star size={20} fill="currentColor" /> 
        <Star size={20} fill="currentColor" />
        <span className="text-sm text-gray-600 ml-2 font-bold bg-yellow-50 px-2.5 py-1 rounded-lg">5.0 Editor's Choice</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
        {post.meta.title}
      </h1>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
        <p suppressHydrationWarning>Published: {new Date(post.meta.date).toLocaleDateString()}</p>
        <span>•</span>
        <p className="font-bold text-gray-700">{post.meta.category || "Review"}</p>
      </div>
      
      {post.meta.image && (
        <div className="relative w-full h-64 md:h-[400px] mb-12 rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
          <img src={post.meta.image} alt={post.meta.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-8 flex gap-3 text-sm text-gray-600 items-start">
        <Info className="flex-shrink-0 text-green-700 mt-0.5" size={18} />
        <p>
          <span className="font-bold text-gray-900">Transparency Note:</span> This review may contain affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you.
        </p>
      </div>

      <article className="prose prose-lg prose-green max-w-none mb-10 text-gray-700">
        <MDXRemote 
          source={safeContent} 
          components={mdxComponents} 
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>

      <ShareButtons slug={post.meta.slug} title={post.meta.title} />
      <AuthorBio />
    </div>
  );
}