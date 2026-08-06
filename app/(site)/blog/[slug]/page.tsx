import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const blogDir = path.join(process.cwd(), "content", "blog");
  const mdxPath = path.join(blogDir, `${slug}.mdx`);
  const mdPath = path.join(blogDir, `${slug}.md`);

  let filePath = "";
  if (fs.existsSync(mdxPath)) filePath = mdxPath;
  else if (fs.existsSync(mdPath)) filePath = mdPath;

  if (!filePath) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link href="/blog" className="text-green-700 font-bold hover:underline">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{data.title}</h1>
      
      {data.image && (
        <img 
          src={data.image} 
          alt={data.title || "Blog image"} 
          className="w-full h-auto rounded-lg mb-8 object-cover max-h-[500px]" 
        />
      )}

      <div className="prose prose-lg prose-green max-w-none text-gray-700">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}