import NewsletterForm from "../components/NewsletterForm";
import Link from "next/link";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

// ISR caching so new posts show up within 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // 1. Fetch the latest 6 posts (1 for the hero, 5 for the sidebar)
  const postsQuery = query(collection(db, "blog"), orderBy("createdAt", "desc"), limit(6));
  const postsSnap = await getDocs(postsQuery);
  
  // FORCE TYPE TO ANY[] TO BYPASS STRICT MODE
  const allPosts: any[] = postsSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter((post: any) => post.status === "published");

  // EXPLICITLY CAST AS ANY
  const heroPost: any = allPosts[0];
  const latestPosts: any[] = allPosts.slice(1, 6);

  // 2. Fetch the top affiliate tools
  const toolsQuery = query(collection(db, "tools"), limit(4)); 
  const toolsSnap = await getDocs(toolsQuery);
  
  // FORCE TYPE TO ANY[] 
  const topTools: any[] = toolsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 font-sans">
      
      {/* The High-Trust Affiliate Disclosure */}
      <div className="text-center text-sm text-gray-600 mb-8 pb-4 border-b border-gray-200">
        We independently review everything we recommend. When you buy through our links, we may earn a commission. 
        <a href="#" className="font-semibold text-gray-900 hover:underline ml-1">Learn more &rsaquo;</a>
      </div>

      {/* 3-Column Magazine Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: Subscription & "The Latest" */}
        <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-8">
          
          {/* Interactive Newsletter Component */}
          <NewsletterForm />

          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-[3px] border-gray-900 pb-2 mb-4 tracking-tight">
              The latest
            </h2>
            <div className="flex flex-col gap-6">
              {latestPosts.map((post: any) => (
                <article key={post.id} className="group border-b border-gray-100 pb-4 last:border-0">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition duration-150 mb-1">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-[11px] font-bold text-blue-700 uppercase tracking-widest mt-2">
                    {post.category || "Review"}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: The Hero Feature */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          {heroPost ? (
            <article className="group">
              {heroPost.coverImage && (
                <Link href={`/blog/${heroPost.slug}`}>
                  <img 
                    src={heroPost.coverImage} 
                    alt={heroPost.title} 
                    className="w-full aspect-[4/3] object-cover bg-gray-100 hover:opacity-95 transition duration-200"
                  />
                </Link>
              )}
              <div className="border-b-[5px] border-gray-900 mt-2 mb-4"></div>
              <Link href={`/blog/${heroPost.slug}`}>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-3 leading-tight tracking-tight group-hover:text-gray-700 transition">
                  {heroPost.title}
                </h1>
              </Link>
              <p className="text-gray-500 font-medium text-sm">
                by <span className="text-gray-900">Admin</span>
              </p>
            </article>
          ) : (
            <div className="bg-gray-50 h-96 flex items-center justify-center text-gray-400 font-medium border border-dashed border-gray-300">
              Publish a post to see it featured here.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: The Affiliate Money Column */}
        <div className="lg:col-span-3 order-3 lg:order-3">
          <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-[1px] border-gray-900 pb-2 mb-3 tracking-tight">
            Top Tools
          </h2>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            Price drops and essential recommendations for your workspace.
          </p>

          <div className="flex flex-col gap-10">
            {topTools.length > 0 ? (
              topTools.map((tool: any) => (
                <div key={tool.id} className="group flex flex-col">
                  <a href={tool.affiliateLink || "#"} target="_blank" rel="noopener noreferrer" className="mb-3 block bg-white hover:opacity-90 transition">
                    <div className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 rounded-sm">
                      {tool.image ? (
                        <img src={tool.image} alt={tool.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </div>
                  </a>
                  <a href={tool.affiliateLink || "#"} target="_blank" rel="noopener noreferrer" className="font-bold text-gray-900 text-lg leading-tight hover:underline mb-2 decoration-2 underline-offset-2">
                    {tool.title}
                  </a>
                  <div className="text-[15px]">
                    <span className="text-[#0a7a5f] font-bold">{tool.price}</span>
                    {tool.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">{tool.originalPrice}</span>
                    )}
                    {tool.vendor && (
                      <span className="text-gray-500 ml-1">from {tool.vendor}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic border border-dashed border-gray-300 p-4 text-center">
                Add tools in your dashboard to see them here.
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* EXPLORE BY CATEGORY GRID */}
      <div className="mt-20 mb-10">
        <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Explore by Category
          </h2>
          <Link href="/reviews" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">
            View all &rsaquo;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category 1: Book Nooks */}
          <Link href="/reviews?cat=book-nooks" className="group relative h-48 rounded-sm overflow-hidden bg-stone-200 flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-md group-hover:scale-105 transition-transform duration-300">
              Book Nooks
            </h3>
          </Link>

          {/* Category 2: Dollhouses */}
          <Link href="/reviews?cat=dollhouses" className="group relative h-48 rounded-sm overflow-hidden bg-stone-300 flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-md group-hover:scale-105 transition-transform duration-300">
              Dollhouses
            </h3>
          </Link>

          {/* Category 3: Metal Models */}
          <Link href="/reviews?cat=metal-models" className="group relative h-48 rounded-sm overflow-hidden bg-stone-400 flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-md group-hover:scale-105 transition-transform duration-300">
              Metal Models
            </h3>
          </Link>

          {/* Category 4: Tools */}
          <Link href="/tools" className="group relative h-48 rounded-sm overflow-hidden bg-stone-500 flex items-center justify-center shadow-sm">
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-md group-hover:scale-105 transition-transform duration-300">
              Building Tools
            </h3>
          </Link>

        </div>
      </div>

    </div>
  );
}