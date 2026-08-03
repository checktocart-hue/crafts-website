import Link from "next/link";
import { getAllPosts } from "@/app/lib/markdown";

// Helper to turn "Tools & Supplies" into "tools-and-supplies"
const slugify = (text: string) => 
  text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Get all posts and tag them so the links route to the right folders
  const blogPosts = getAllPosts('blog').map(p => ({ ...p, type: 'blog' }));
  const reviewPosts = getAllPosts('reviews').map(p => ({ ...p, type: 'reviews' }));
  const allPosts = [...blogPosts, ...reviewPosts];

  // Find posts that match the URL slug
  const categoryPosts = allPosts.filter(post => {
    return post.meta.category && slugify(post.meta.category) === slug;
  });

  // Extract the proper Title (e.g. "Tools & Supplies") from the first matching post
  const categoryTitle = categoryPosts.length > 0 ? categoryPosts[0].meta.category : slug.replace(/-/g, ' ');

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <Link href="/categories" className="text-sm font-bold text-gray-500 hover:text-green-700 mb-6 inline-block">
          ← Back to All Categories
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{categoryTitle}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse all guides and reviews for {categoryTitle}.
        </p>
      </div>

      {/* Grid of Articles in this Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryPosts.map((post) => (
          <Link
            href={`/${post.type}/${post.meta.slug}`}
            key={post.meta.slug}
            className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            {/* Local Markdown Image */}
            {post.meta.image ? (
              <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                <img
                  src={post.meta.image}
                  alt={post.meta.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                {post.meta.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(post.meta.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {categoryPosts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-lg">
            No articles found in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}