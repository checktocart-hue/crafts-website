import Link from "next/link";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanity";
import { ArrowRight, Star, Mail, MessageSquare } from "lucide-react";

export const revalidate = 60;

async function getData() {
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
    <div className="flex flex-col gap-20 pb-10">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-stone-100 py-24 lg:py-32 px-4 overflow-hidden border-b border-stone-200">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8 z-10">
          <span className="inline-block text-primary font-bold tracking-widest text-xs uppercase bg-white border border-stone-200 shadow-sm px-4 py-1.5 rounded-full mb-4">
            ✨ The Miniature Hobbyist's Guide
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight leading-[1.1] font-[family-name:var(--font-dancing)]">
            Build Your Own <br /> <span className="text-primary">Magical Worlds</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Discover the best Book Nooks, Dollhouses, and 3D Metal Models. 
            We build and review the kits so you don't have to guess.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link 
              href="/reviews" 
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-green-800 transition shadow-lg hover:shadow-green-900/20 flex items-center justify-center gap-2"
            >
              Browse Reviews <ArrowRight size={18} />
            </Link>
            <Link 
              href="/blog" 
              className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-base hover:bg-gray-50 transition flex items-center justify-center shadow-sm"
            >
              Read Guides
            </Link>
          </div>
        </div>
      </section>

      {/* --- EXPLORE COLLECTION --- */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
             <h2 className="text-3xl font-bold text-gray-900">Explore Collection</h2>
             <p className="text-gray-500 mt-2">Find your next weekend project</p>
          </div>
          <Link href="/reviews" className="text-primary font-bold text-sm hover:underline hidden sm:block">View All Categories</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/reviews?cat=book-nooks" className="group relative h-64 rounded-2xl overflow-hidden block shadow-md">
             <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors duration-300" />
             <img 
               src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&q=80" 
               alt="Book Nooks"
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="text-2xl font-bold font-[family-name:var(--font-dancing)]">Book Nooks</h3>
                <p className="text-gray-200 text-xs font-bold tracking-wide mt-1">Magical shelf inserts →</p>
             </div>
          </Link>

          <Link href="/reviews?cat=dollhouses" className="group relative h-64 rounded-2xl overflow-hidden block shadow-md">
             <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors duration-300" />
             <img 
               src="https://images.unsplash.com/photo-1513161455079-7dc1bad15a4e?auto=format&fit=crop&q=80" 
               alt="Dollhouses"
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="text-2xl font-bold font-[family-name:var(--font-dancing)]">Dollhouses</h3>
                <p className="text-gray-200 text-xs font-bold tracking-wide mt-1">Miniature living spaces →</p>
             </div>
          </Link>

          <Link href="/reviews?cat=metal-models" className="group relative h-64 rounded-2xl overflow-hidden block shadow-md">
             <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/50 transition-colors duration-300" />
             <img 
               src="https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&q=80" 
               alt="Metal Models"
               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute bottom-6 left-6 z-20 text-white">
                <h3 className="text-2xl font-bold font-[family-name:var(--font-dancing)]">Metal Models</h3>
                <p className="text-gray-200 text-xs font-bold tracking-wide mt-1">Intricate 3D puzzles →</p>
             </div>
          </Link>
        </div>
      </section>

      {/* --- FRESH ARRIVALS --- */}
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
                <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-5 bg-gray-100 shadow-sm border border-gray-100">
                  {post.mainImage ? (
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {post.category || "Review"}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs text-gray-400 ml-1 font-medium">(5.0)</span>
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

      {/* --- COMMUNITY & CONTACT --- */}
      <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mt-10">
        
        {/* Join Community Box (NEWSLETTER) */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Mail size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-dancing)]">Join the Club</h2>
              <p className="text-green-100 mb-8 leading-relaxed">
                Get free building guides, discount codes for kits, and inspiration delivered to your inbox every Friday.
              </p>
              
              {/* NEWSLETTER FORM */}
              {/* REPLACE 'YOUR_FORMSPREE_ID' WITH YOUR ACTUAL ID */}
              <form 
                action="https://formspree.io/f/YOUR_FORMSPREE_ID" 
                method="POST"
                className="flex flex-col gap-3"
              >
                 <input 
                   type="email" 
                   name="email"  // <--- Crucial for Formspree
                   required
                   placeholder="Your email address" 
                   className="w-full px-5 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
                 />
                 <button className="bg-green-900 text-white font-bold py-3 rounded-xl hover:bg-green-950 transition">
                    Subscribe Free
                 </button>
              </form>
              <p className="text-xs text-green-200 mt-4 text-center">No spam, just crafts. Unsubscribe anytime.</p>
           </div>
        </div>

        {/* Contact / Ask Us Box */}
        <div className="bg-gray-100 rounded-3xl p-8 md:p-12 text-gray-800 border border-gray-200">
           <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <MessageSquare size={24} className="text-primary" />
           </div>
           <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-dancing)]">Have a Question?</h2>
           <p className="text-gray-600 mb-8 leading-relaxed">
             Stuck on a build? Looking for a specific review? Send us a message.
           </p>
           
           {/* QUESTION FORM */}
           {/* REPLACE 'YOUR_FORMSPREE_ID' WITH YOUR ACTUAL ID */}
           <form 
             action="https://formspree.io/f/meoyzpqb" 
             method="POST"
             className="flex flex-col gap-3"
           >
              <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    name="name" // <--- Crucial
                    required
                    placeholder="Name" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white" 
                  />
                  <input 
                    type="email" 
                    name="email" // <--- Crucial
                    required
                    placeholder="Email" 
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white" 
                  />
              </div>
              <textarea 
                name="message" // <--- Crucial
                required
                rows={3} 
                placeholder="How can we help?" 
                className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary bg-white"
              ></textarea>
              <button className="bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition">
                 Send Message
              </button>
           </form>
        </div>

      </section>

    </div>
  );
}