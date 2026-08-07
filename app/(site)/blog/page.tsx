import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// NEW: We define the exact shape of your blog post data so TypeScript is happy
type BlogPost = {
  slug: string;
  title: string;
  category: string;
  image: string | null;
  excerpt: string;
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  // 1. Read the URL to see if a category was clicked
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams.cat;

  const blogDir = path.join(process.cwd(), "content", "blog");
  
  // NEW: We explicitly tell TypeScript that this array will hold 'BlogPost' objects
  let posts: BlogPost[] = [];

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

  // 2. Filter the posts if a category parameter exists in the URL
  if (categoryFilter) {
    posts = posts.filter(post => {
      // This turns "Tools & Supplies" into "tools-supplies" to match your URL
      const formattedCategory = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return formattedCategory === categoryFilter;
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          {categoryFilter ? `Blog: ${categoryFilter.replace(/-/g, ' ').toUpperCase()}` : 'All Blog Posts'}
        </h1>
        {categoryFilter && (
          <Link href="/blog" className="text-green-700 hover:underline text-sm font-bold">
            &larr; Clear Filter
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
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
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No posts found in this category.
          </div>
        )}
      </div>
    </div>
  );
}