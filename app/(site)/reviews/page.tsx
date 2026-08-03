import Link from "next/link";
import { getAllPosts } from "@/app/lib/markdown";
import { Star } from "lucide-react";

export const revalidate = 0;

export default async function ReviewsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedCat = resolvedParams?.cat;

  const allReviews = getAllPosts('reviews');

  const reviews = selectedCat
    ? allReviews.filter((post) => {
        const cat = post?.meta?.category || "";
        return cat.toLowerCase().replace(/\s+/g, '-') === selectedCat.toLowerCase();
      })
    : allReviews;

  const categories = [
    { title: "Book Nooks", slug: "book-nooks" },
    { title: "Dollhouses", slug: "dollhouses" },
    { title: "Metal Models", slug: "metal-models" }
  ];

  return (
    <div suppressHydrationWarning className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Kit Reviews</h1>
      </div>
      
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
         <Link href="/reviews" className={`px-4 py-2 rounded-full text-sm font-bold ${!selectedCat ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}>All</Link>
         {categories.map(cat => (
           <Link key={cat.slug} href={`/reviews?cat=${cat.slug}`} className={`px-4 py-2 rounded-full text-sm font-bold ${selectedCat === cat.slug ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
             {cat.title}
           </Link>
         ))}
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((post) => (
            <Link href={`/reviews/${post.meta.slug}`} key={post.meta.slug} className="group block">
              <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200 shadow-sm">
                 {post.meta.image ? (
                   <img src={post.meta.image} alt={post.meta.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                 )}
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-green-700 mb-2 transition-colors leading-tight">{post.meta.title}</h2>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <p>No reviews found in this category.</p>
        </div>
      )}
    </div>
  );
}