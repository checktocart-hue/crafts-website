import Link from "next/link";
import { getAllPosts } from "@/app/lib/api";
export const revalidate = 0;

// Bulletproof normalizer: strips spaces and symbols so "Tools & Supplies" matches "tools-supplies"
const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedCat = resolvedParams?.cat;

  // Fetch from Firebase database (Note the added 'await')
  const allPosts = await getAllPosts();

  // Filter by category if selected using the normalizer (Removed '.meta')
  const posts = selectedCat
    ? allPosts.filter((post) => post?.category && normalize(post.category) === normalize(selectedCat))
    : allPosts;

  const categories = [
    { title: "Tutorials", slug: "tutorials" },
    { title: "Tools & Supplies", slug: "tools-supplies" },
    { title: "Buying Guides", slug: "buying-guides" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">The Miniature Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tips, tricks, and guides for your building journey.
        </p>
      </div>
      
      <div className="flex justify-center gap-4 mb-12">
         <Link href="/blog" className={`px-4 py-2 rounded-full text-sm font-bold ${!selectedCat ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}>All</Link>
         {categories.map(cat => (
           <Link key={cat.slug} href={`/blog?cat=${cat.slug}`} className={`px-4 py-2 rounded-full text-sm font-bold ${selectedCat === cat.slug ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
             {cat.title}
           </Link>
         ))}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group block">
              <div className="relative w-full h-48 bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
                 {post.image ? (
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                 )}
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 mb-2 transition-colors leading-tight">{post.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt || "Read this article..."}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <p>No blog posts found. Check your database!</p>
        </div>
      )}
    </div>
  );
}