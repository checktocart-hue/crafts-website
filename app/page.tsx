import Header from './components/Header';
import Link from 'next/link';
import { ArrowRight, Star, Home as HomeIcon, BookOpen, Box, PlayCircle } from 'lucide-react'; 
import ProductCard from './components/ProductCard'; 
import AdUnit from './components/AdUnit';
import { client } from '@/app/lib/sanity'; // <--- Import the database connection

// 1. Fetch the 3 most recent reviews
async function getLatestReviews() {
  return await client.fetch(`*[_type == "review"] | order(_createdAt desc)[0..2] {
    title,
    "slug": slug.current,
    rating,
    price,
    description
  }`);
}

export default async function Home() {
  const latestReviews = await getLatestReviews();

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#F2F0E9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left: Copy */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Trending: Book Nooks</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-serif text-gray-900 leading-[1.1] mb-6">
                Build your own <br/>
                <span className="text-primary italic">tiny world.</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-md font-light leading-relaxed">
                The ultimate guide to DIY Book Nooks, Miniature Houses, and 3D Puzzles. Escape reality, one piece at a time.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/reviews" className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition flex items-center gap-2">
                  Find a Kit <ArrowRight size={18}/>
                </Link>
                <Link href="/projects" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition flex items-center gap-2 shadow-sm">
                  <PlayCircle size={18} /> How to Build
                </Link>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative h-[500px] w-full hidden md:block">
              <div className="absolute right-0 top-0 w-4/5 h-full bg-stone-300 rounded-t-[100px] rounded-b-[20px] overflow-hidden shadow-2xl">
                 <div className="w-full h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80')] opacity-90 hover:scale-105 transition duration-700"></div>
              </div>
              
              <div className="absolute bottom-10 left-0 bg-white p-6 rounded-2xl shadow-xl max-w-[220px]">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_,i) => <Star key={i} size={14} className="fill-orange-400 text-orange-400"/>)}
                </div>
                <p className="font-serif font-bold text-gray-900 text-lg">"The detail in these kits is insane."</p>
                <p className="text-xs text-gray-500 mt-2">— Mark, Model Builder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AD SLOT */}
      <section className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <AdUnit format="horizontal" />
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
          <h2 className="text-4xl font-serif text-gray-900">Explore Collections</h2>
          <Link href="/categories" className="text-primary font-bold hover:underline hidden md:block">View All</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/categories/book-nooks" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-sm hover:shadow-lg transition block">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-110 transition duration-700"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-8 left-8 text-white">
                <BookOpen className="mb-3 opacity-80" size={32} />
                <h3 className="text-3xl font-serif">Book Nooks</h3>
                <p className="text-white/80 mt-2">Magical inserts for your shelves</p>
             </div>
          </Link>

          <Link href="/categories/dollhouses" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-sm hover:shadow-lg transition block">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-110 transition duration-700"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-8 left-8 text-white">
                <HomeIcon className="mb-3 opacity-80" size={32} />
                <h3 className="text-3xl font-serif">Mini Houses</h3>
                <p className="text-white/80 mt-2">Greenhouses, Cafes & Studies</p>
             </div>
          </Link>

          <Link href="/categories/metal-models" className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer bg-stone-100 shadow-sm hover:shadow-lg transition block">
             <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1664110691109-655866191b72?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-110 transition duration-700"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
             <div className="absolute bottom-8 left-8 text-white">
                <Box className="mb-3 opacity-80" size={32} />
                <h3 className="text-3xl font-serif">Metal 3D</h3>
                <p className="text-white/80 mt-2">Laser cut steel challenges</p>
             </div>
          </Link>
        </div>
      </section>

      {/* AD SLOT 2 */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <AdUnit format="horizontal" />
      </div>

      {/* 3. LATEST REVIEWS (DYNAMIC DATA) */}
      <section className="bg-[#F8F9FA] py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Tested by Experts</span>
            <h2 className="text-4xl font-serif text-gray-900 mt-3">Top Rated Kits</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {latestReviews.length > 0 ? (
              latestReviews.map((review: any) => (
                <ProductCard 
                  key={review.slug}
                  title={review.title}
                  rating={review.rating}
                  price={review.price}
                  tag="New Review"
                  features={["Verified Build", "In-Depth Guide"]} // Generic features for card preview
                  link={`/reviews/${review.slug}`} // <--- THIS IS THE FIX. Uses real slug.
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400">
                No reviews published yet. Go to Sanity to add some!
              </div>
            )}
          </div>

          {/* BUTTON */}
          <div className="text-center">
            <Link 
              href="/reviews" 
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-900 hover:text-white transition duration-300"
            >
              View All Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}