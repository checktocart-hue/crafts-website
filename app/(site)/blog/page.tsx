import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const revalidate = 0;

export default async function BlogIndexPage() {
  const blogDir = path.join(process.cwd(), "content", "blog");
  let posts = [];

  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter((file: string) => file.endsWith('.mdx') || file.endsWith('.md'));
    
    posts = files.map((filename: string) => {
      const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
      const { data } = matter(fileContent);
      return {
        slug: filename.replace(/\.mdx?$/, ""),
        title: data.title || "Untitled",
        category: data.category || "Blog",
        image: data.image || data.imageUrl || data.coverImage || null,
        excerpt: data.excerpt || "Read full post...",
      };
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Blog</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
            <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
               {post.image ? (
                 <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
               )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}