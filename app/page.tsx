import Link from "next/link";
import { client } from "@/app/lib/sanity";
import { urlFor } from "@/app/lib/sanity";
import { 
  ArrowRight, Star, Mail, MessageSquare, BookOpen, 
  Library, Home as HomeIcon, Hammer, 
  GraduationCap, Scissors, Trophy, Wrench 
} from "lucide-react";

export const revalidate = 0; 

async function getData() {
  const query = `
    {
      "latestReviews": *[_type == "review"] | order(_createdAt desc)[0...4] {
        title,
        "slug": slug.current,
        "mainImage": mainImage,
        "category": categories[0]->title
      },
      "latestPosts": *[_type == "post" || _type == "project"] | order(_createdAt desc)[0...4] {
        title,
        "slug": slug.current,
        "mainImage": mainImage,
        _createdAt
      }
    }
  `;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { latestReviews: [], latestPosts: [] };
  }
}

export default async function Home() {
  const data = await getData();
  const latestReviews = data?.latestReviews || [];
  const latestPosts = data?.latestPosts || [];

  const categories = [
    { name: "Book Nooks", link: "/reviews?cat=book-nooks", icon: Library, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Dollhouses", link: "/reviews?cat=dollhouses", icon: HomeIcon, color: "text-rose-600", bg: "bg-rose-50" },
    { name: "Metal Models", link: "/reviews?cat=metal-models", icon: Hammer, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Tutorials", link: "/blog?cat=tutorials", icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Tools", link: "/blog?cat=tools-supplies", icon: Scissors, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Best Of", link: "/blog?cat=buying-guides", icon: Trophy, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="flex flex-col pb-10">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-stone-100 py-16 lg:py-24 px-4 overflow-hidden border-b border-stone-200">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          <span className="inline-block text-green-700 font-bold tracking-widest text-xs uppercase bg-white border border-stone-200 shadow-sm px-4 py-1.5 rounded-full mb-4">
            ✨ The Miniature Hobbyist's Guide
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 tracking-tight leading-[1.1] font-[family-name:var(--font-dancing)]">
            Build Your Own <br /> <span className="text-green-700">Magical Worlds</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Discover the best Book Nooks, Dollhouses, and 3D Metal Models. 
            We build and review the kits so you don't have to guess.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link href="/reviews" className="bg-green-700 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-green-800 transition shadow-lg hover:shadow-green-900/20 flex items-center justify-center gap-2">
              Browse Reviews <ArrowRight size={18} />
            </Link>
            <Link href="/blog" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-base hover:bg-gray-50 transition flex items-center justify-center shadow-sm">
              Read Guides
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO */}
      <section className="bg-white py-12 border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Explore by Category</h2>
            <p className="text-sm text-gray-500 mt-2">Jump straight to what you love.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={cat.link} 
                className="group flex flex-col items-center justify-center p-4 rounded-xl border border-stone-100 bg-white hover:border-green-600 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon size={20} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-gray-700 tracking-wide uppercase group-hover:text-green-700 transition-colors text-center">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: ESSENTIAL TOOLS SHOP --- */}
      <section className="bg-orange-50 border-y border-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-6 order-2 md:order-1">
            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Beginner's Guide
            </span>
            <h2 className="text-4xl font-bold text-gray-900 font-[family-name:var(--font-dancing)]">
              Stop Struggling with Cheap Tools
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Most kits say "Tools Included," but those cheap tweezers and dull knives will ruin your experience. We have curated the exact <strong>under-$20 toolkit</strong> that turns frustration into fun.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-orange-700"><Wrench size={14} /></div>
                Why you need precision tweezers (ESD-15)
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center text-orange-700"><Scissors size={14} /></div>
                The only glue that actually works on wood
              </li>
            </ul>
            <div className="pt-4">
              <Link 
                href="/tools" 
                className="inline-flex bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition shadow-lg hover:shadow-orange-900/20 items-center gap-2"
              >
                Open Builder's Shop <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Corrected Tool Image (New URL) */}
          <div className="order-1 md:order-2 relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
             <img 
               src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80" 
               alt="Craft Tools and Cutting Mat"
               className="w-full h-full object-cover"
             />
          </div>

        </div>
      </section>

      {/* 3. LATEST FROM BLOG */}
      <section className="bg-stone-50 py-12">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="text-green-700" /> From the Blog
              </h2>
              <p className="text-gray-500 mt-2">Tips, tricks, and building guides.</p>
            </div>
            <Link href="/blog" className="text-green-700 font-bold text-sm hover:underline">Read All Articles</Link>
          </div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestPosts.map((post: any) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
                    {post.mainImage ? (
                      <img src={urlFor(post.mainImage).url()} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : <div className="w-full h-full bg-gray-200" />}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-wider">{new Date(post._createdAt).toLocaleDateString()}</div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>
                    <div className="mt-auto text-xs font-bold text-green-700 group-hover:underline">Read Article →</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10"><p className="text-gray-400">No blog posts found yet.</p></div>
          )}
        </div>
      </section>

      {/* 4. FRESH REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 w-full py-12">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Reviews</h2>
          <Link href="/reviews" className="text-green-700 font-bold text-sm hover:underline">See All Reviews</Link>
        </div>
        
        {latestReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestReviews.map((post: any) => (
              <Link href={`/reviews/${post.slug}`} key={post.slug} className="group block">
                <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-sm border border-gray-100">
                  {post.mainImage ? (
                    <img src={urlFor(post.mainImage).url()} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {post.category || "Review"}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" /> <Star size={14} fill="currentColor" />
                  <span className="text-xs text-gray-400 ml-1 font-medium">(5.0)</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200"><p className="text-gray-400">Loading reviews...</p></div>
        )}
      </section>

      {/* 5. COMMUNITY & CONTACT */}
      <section className="max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12">
        <div className="bg-green-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6"><Mail size={24} /></div>
              <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-dancing)]">Join the Club</h2>
              <p className="text-green-100 mb-8 leading-relaxed">Get free building guides, discount codes for kits, and inspiration delivered to your inbox.</p>
              
              <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="flex flex-col gap-3">
                 <input suppressHydrationWarning type="email" name="email" required placeholder="Your email address" className="w-full px-5 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300" />
                 <button suppressHydrationWarning className="bg-green-900 text-white font-bold py-3 rounded-xl hover:bg-green-950 transition border border-green-600">Subscribe Free</button>
              </form>
           </div>
        </div>
        <div className="bg-gray-100 rounded-3xl p-8 md:p-12 text-gray-800 border border-gray-200">
           <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm"><MessageSquare size={24} className="text-green-700" /></div>
           <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-dancing)]">Have a Question?</h2>
           <p className="text-gray-600 mb-8 leading-relaxed">Stuck on a build? Looking for a specific review? Send us a message.</p>
           
           <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                  <input suppressHydrationWarning type="text" name="name" required placeholder="Name" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-700 bg-white" />
                  <input suppressHydrationWarning type="email" name="email" required placeholder="Email" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-700 bg-white" />
              </div>
              <textarea suppressHydrationWarning name="message" required rows={3} placeholder="How can we help?" className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-green-700 bg-white"></textarea>
              <button suppressHydrationWarning className="bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition">Send Message</button>
           </form>
        </div>
      </section>
    </div>
  );
}