import Link from "next/link";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanity";
import { ArrowRight, Star } from "lucide-react";

// Revalidate data every 60 seconds
export const revalidate = 60;

async function getData() {
  // Fetch the 3 newest reviews for the homepage
  const query = `
    *[_type == "review"] | order(_createdAt desc)[0...3] {
      title,
      "slug": slug.current,
      "mainImage": mainImage,
      "category": categories[0]->title
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const latestReviews = await getData();

  return (
    <div className="flex flex-col gap-16 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-stone-50 py-20 lg:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-primary font-bold tracking-widest text-xs uppercase bg-green-100 px-3 py-1 rounded-full">
            The Miniature Hobbyist's Guide
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-tight font-[family-name:var(--font-dancing)]">
            Build Your Own <br className="hidden md:block"/> Magical Worlds
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the best Book Nooks, Dollhouses, and 3D Metal Models. 
            We review the kits so you can build with confidence.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link 
              href="/reviews" 
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-green-800 transition shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Browse Reviews <ArrowRight size={16} />
            </Link>
            <Link 
              href="/blog" 
              className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 transition"
            >
              Read Guides
            </Link>
          </div>
        </div>
      </section>

      {/* --- EXPLORE COLLECTION (Fixed Links) --- */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore Collection</h2>
          <Link href="/reviews" className="text-primary font-bold text-sm hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Book Nooks */}
          <Link href="/reviews?cat=book-nooks" className="group relative h-80 rounded-2xl overflow-hidden bg-gray-100">
             {/* Placeholder background color if no image, or replace with static image */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
             <div className="absolute inset-0 bg-blue-900/20 group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="text-2xl font-bold">Book Nooks</h3>
                <p className="text-white/80 text-sm">Magical shelf inserts</p>
             </div>
          </Link>

          {/* Card 2: Dollhouses */}
          <Link href="/reviews?cat=dollhouses" className="group relative h-80 rounded-2xl overflow-hidden bg-gray-100">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
             <div className="absolute inset-0 bg-purple-900/20 group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="text-2xl font-bold">Dollhouses</h3>
                <p className="text-white/80 text-sm">Miniature living spaces</p>
             </div>
          </Link>

          {/* Card 3: Metal Models */}
          <Link href="/reviews?cat=metal-models" className="group relative h-80 rounded-2xl overflow-hidden bg-gray-100">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
             <div className="absolute inset-0 bg-orange-900/20 group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="text-2xl font-bold">Metal Models</h3>
                <p className="text-white/80 text-sm">Intricate 3D puzzles</p>
             </div>
          </Link>
        </div>
      </section>

      {/* --- FRESH ARRIVALS (Dynamic from Sanity) --- */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Fresh Arrivals</h2>
        
        {latestReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestReviews.map((post: any) => (
              <Link 
                href={`/reviews/${post.slug}`} 
                key={post.slug}
                className="group block"
              >
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  {post.mainImage ? (
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                    {post.category || "Review"}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs text-gray-400 ml-1">(5.0)</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-400">Loading latest kits...</p>
          </div>
        )}
      </section>

    </div>
  );
}