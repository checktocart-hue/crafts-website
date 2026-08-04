import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Star } from "lucide-react";

export const revalidate = 0;

// Normalizer to ensure category URLs match the database
const normalize = (text: string) => text ? text.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

export default async function ReviewsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedCat = resolvedParams?.cat;

  // Fetch directly from the Firebase "reviews" collection
  const reviewsQuery = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(reviewsQuery);
  const allReviews = snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() as any }));

  // Filter by category if one is selected
  const reviews = selectedCat
    ? allReviews.filter((post) => post?.category && normalize(post.category) === normalize(selectedCat))
    : allReviews;

  const categories = [
    { title: "Book Nooks", slug: "book-nooks" },
    { title: "Dollhouses", slug: "dollhouses" },
    { title: "Metal Models", slug: "metal-models" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Kit Reviews</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Honest, detailed builds and reviews so you know exactly what to expect in the box.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
         <Link href="/reviews" className={`px-4 py-2 rounded-full text-sm font-bold ${!selectedCat ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}>All</Link>
         {categories.map(cat => (
           <Link key={cat.slug} href={`/reviews?cat=${cat.slug}`} className={`px-4 py-2 rounded-full text-sm font-bold ${selectedCat === cat.slug ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
             {cat.title}
           </Link>
         ))}
      </div>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((post) => (
            <Link href={`/reviews/${post.slug}`} key={post.slug} className="group block">
              <div className="relative w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-4 border border-gray-200">
                 {post.image ? (
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No image</div>
                 )}
                 <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {post.category || "Review"}
                 </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 mb-2 transition-colors leading-tight">{post.title}</h2>
              <div suppressHydrationWarning className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star size={14} fill="currentColor" /> 
                <Star size={14} fill="currentColor" /> 
                <Star size={14} fill="currentColor" /> 
                <Star size={14} fill="currentColor" /> 
                <Star size={14} fill="currentColor" />
                <span className="text-xs text-gray-400 ml-1 font-medium">(5.0)</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt || "Read full review..."}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <p>No reviews found. Check your database!</p>
        </div>
      )}
    </div>
  );
}