import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export const revalidate = 0;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Fetch both posts and reviews so we can combine them
  const postsSnap = await getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc")));
  const reviewsSnap = await getDocs(query(collection(db, "reviews"), orderBy("createdAt", "desc")));
  
  const allPosts = postsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, type: "blog" }));
  const allReviews = reviewsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id, type: "reviews" }));
  
  // Combine everything and filter it by the category slug in the URL
  const combined = [...allPosts, ...allReviews]
    .filter((item: any) => item.category && item.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)
    .sort((a: any, b: any) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  // Make the URL slug pretty again (e.g., "book-nooks" -> "Book Nooks")
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{categoryName}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browsing all articles and reviews in {categoryName}.
        </p>
      </div>

      {combined.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combined.map((post: any) => (
            <Link href={`/${post.type}/${post.slug || post.id}`} key={post.id} className="group block">
              <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                )}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm uppercase">
                    {post.type === 'blog' ? 'Blog' : 'Review'}
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 mb-2 transition-colors leading-tight">{post.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt || "Read full article..."}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p>No content found in this category yet.</p>
        </div>
      )}
    </div>
  );
}