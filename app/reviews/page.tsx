import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';
import { client } from '@/app/lib/sanity';
import Header from '@/app/components/Header';
import AdUnit from '@/app/components/AdUnit';

export const dynamic = 'force-dynamic';

async function getReviews() {
  // Added "imageUrl" to the query
  const query = `*[_type == "review"] | order(_createdAt desc) {
    title,
    "slug": slug.current,
    description,
    rating,
    price,
    "imageUrl": mainImage.asset->url 
  }`;
  return await client.fetch(query);
}

export default async function ReviewsPage() {
  const reviews = await getReviews(); 

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="bg-stone-50 border-b border-gray-100 py-16 text-center">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">All Kit Reviews</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Unbiased, hands-on reviews of the best DIY kits on the market.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition">
            <ArrowLeft size={16} /> Back to Home
            </Link>
        </div>

        <AdUnit format="horizontal" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <Link key={review.slug} href={`/reviews/${review.slug}`} className="group block">
                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col">
                  {/* IMAGE AREA - Updated to show Real Image */}
                  <div className="bg-stone-100 h-48 w-full flex items-center justify-center text-gray-400 group-hover:bg-stone-200 transition overflow-hidden">
                    {review.imageUrl ? (
                      <img 
                        src={review.imageUrl} 
                        alt={review.title} 
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500" 
                      />
                    ) : (
                      <span>[No Image]</span>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? "fill-orange-400 text-orange-400" : "text-gray-200"} />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900 bg-stone-100 px-2 py-1 rounded text-xs">{review.price}</span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold mb-2 text-gray-900 group-hover:text-primary transition">{review.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">{review.description}</p>
                    
                    <span className="mt-4 text-primary font-bold text-sm uppercase tracking-widest group-hover:underline">Read Review</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-400">No reviews found.</div>
          )}
        </div>
      </div>
    </main>
  );
}