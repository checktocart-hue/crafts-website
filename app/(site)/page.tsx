import NewsletterForm from "../components/NewsletterForm";
import Link from "next/link";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export const revalidate = 60;

export default async function HomePage() {
  // 1. FETCH FROM BOTH COLLECTIONS
  const blogQuery = query(collection(db, "blog"));
  const reviewsQuery = query(collection(db, "reviews"));
  
  const [blogSnap, reviewsSnap] = await Promise.all([
    getDocs(blogQuery),
    getDocs(reviewsQuery)
  ]);
  
  // Helper to safely get the correct date for sorting
  const getTime = (p: any) => new Date(p.updatedAt || p.createdAt || p._createdAt || 0).getTime();

  // Process and sort blog posts
  let blogPosts = blogSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() as any }))
    .filter(post => post.status === "published" || !post.status)
    .sort((a, b) => getTime(b) - getTime(a));

  // Process and sort review posts
  let reviewPosts = reviewsSnap.docs
    .map(doc => ({ id: doc.id, ...doc.data() as any }))
    .filter(post => post.status === "published" || !post.status)
    .sort((a, b) => getTime(b) - getTime(a));

  // 2. MIX FOR HERO AND SIDEBAR
  let mixedPosts = [...blogPosts, ...reviewPosts].sort((a, b) => getTime(b) - getTime(a));

  const heroPost: any = mixedPosts[0];
  const latestPosts: any[] = mixedPosts.slice(1, 6);

  // Track which posts are already featured at the top so we don't duplicate them
  const featuredIds = new Set([heroPost?.id, ...latestPosts.map(p => p.id)].filter(Boolean));

  // 3. STRICTLY BLOG POSTS FOR THE BOTTOM ROW
  const bottomRowPosts: any[] = blogPosts
    .filter(p => !featuredIds.has(p.id))
    .slice(0, 4);

  // 4. FETCH LATEST TOOLS
  const toolsQuery = query(collection(db, "tools")); 
  const toolsSnap = await getDocs(toolsQuery);
  
  let topTools: any[] = toolsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  topTools.sort((a, b) => getTime(b) - getTime(a));
  topTools = topTools.slice(0, 3);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-8 font-sans">
      
      <div className="text-center text-sm text-gray-600 mb-10 pb-4 border-b border-gray-200">
        We independently review everything we recommend. When you buy through our links, we may earn a commission. 
        <a href="#" className="font-semibold text-gray-900 hover:underline ml-1">Learn more &rsaquo;</a>
      </div>

      {/* TOP MAGAZINE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-10">
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-sm">
             <h3 className="font-bold text-lg mb-2">Join the Newsletter</h3>
             <p className="text-sm text-gray-600 mb-4">Get the latest reviews and build guides.</p>
             <input type="email" placeholder="Your email..." className="w-full p-2 mb-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-900"/>
             <button className="w-full bg-gray-900 text-white font-bold py-2.5 rounded text-sm hover:bg-black transition">Subscribe</button>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-[3px] border-gray-900 pb-2 mb-5 tracking-tight">
              The latest
            </h2>
            <div className="flex flex-col gap-6">
              {latestPosts.map((post: any) => (
                <article key={post.id} className="group border-b border-gray-100 pb-5 last:border-0">
                  <Link href={`/blog/${post.slug || post.id}`}>
                    <h3 className="text-[17px] font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition duration-150 mb-1">
                      {post.title || "Untitled"}
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

        {/* CENTER COLUMN: UPGRADED HERO */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          {heroPost ? (
            <article className="group flex flex-col h-full">
              {heroPost.coverImage && (
                <Link href={`/blog/${heroPost.slug || heroPost.id}`} className="block overflow-hidden rounded-sm shadow-sm">
                  <img 
                    src={heroPost.coverImage} 
                    alt={heroPost.title} 
                    className="w-full aspect-[4/4] md:aspect-[4/4.5] object-cover bg-gray-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </Link>
              )}
              <div className="border-b-[5px] border-gray-900 mt-4 mb-4 w-16"></div>
              <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">
                {heroPost.category || "Featured"}
              </p>
              <Link href={`/blog/${heroPost.slug || heroPost.id}`}>
                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-serif font-bold text-gray-900 mb-4 leading-none tracking-tight group-hover:text-gray-700 transition">
                  {heroPost.title || "Untitled Post"}
                </h1>
              </Link>
              
              {/* DISPLAYING THE SNIPPET WITH MORE CONTENT SHOWING */}
              {/* Increased line-clamp from 5 to 10 for desktop to show much more text */}
              <div className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-6 md:line-clamp-[10] overflow-hidden">
                {heroPost.excerpt ? (
                  <p>{heroPost.excerpt}</p>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      // Hide images from the preview snippet so they don't break the layout
                      img: () => null,
                      // Convert big headings to regular bold paragraphs in the preview
                      h1: ({node, ...props}) => <p className="font-bold mb-4" {...props} />,
                      h2: ({node, ...props}) => <p className="font-bold mb-4" {...props} />,
                      h3: ({node, ...props}) => <p className="font-bold mb-4" {...props} />,
                      // Ensure paragraphs have bottom spacing
                      p: ({node, ...props}) => <p className="mb-4" {...props} />
                    }}
                  >
                    {heroPost.content || heroPost.body || ""}
                  </ReactMarkdown>
                )}
              </div>

              <p className="text-gray-500 font-medium text-sm mt-auto pt-2">
                by <span className="text-gray-900 font-bold">Admin</span>
              </p>
            </article>
          ) : (
            <div className="bg-gray-50 h-[600px] flex items-center justify-center text-gray-400 font-medium border border-dashed border-gray-300">
              Publish a post to see it featured here.
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-3 order-3 lg:order-3">
          <h2 className="text-2xl font-serif font-bold text-gray-900 border-b-[1px] border-gray-900 pb-2 mb-3 tracking-tight">
            Latest Tools
          </h2>
          <p className="text-[15px] text-gray-600 mb-8 leading-relaxed">
            Price drops and essential recommendations for your workspace.
          </p>

          <div className="flex flex-col gap-10">
            {topTools.map((tool: any) => (
              <div key={tool.id} className="group flex flex-col">
                <a href={tool.affiliateLink || "#"} target="_blank" rel="noopener noreferrer" className="mb-3 block bg-white shadow-sm hover:shadow-md transition rounded-sm overflow-hidden">
                  <div className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-200">
                    {tool.image ? (
                      <img src={tool.image} alt={tool.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
                  {tool.originalPrice && <span className="text-gray-500 line-through ml-2">{tool.originalPrice}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW SECTION: STRICTLY BLOG POSTS */}
      {bottomRowPosts.length > 0 && (
        <div className="mb-16 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight mb-8">
            Latest from the Blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bottomRowPosts.map((post: any) => (
              <article key={post.id} className="group flex flex-col">
                <Link href={`/blog/${post.slug || post.id}`} className="block overflow-hidden bg-gray-100 aspect-[4/3] mb-3 rounded-sm">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full border border-gray-200"></div>
                  )}
                </Link>
                <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest mb-1">
                  {post.category || "Article"}
                </p>
                <Link href={`/blog/${post.slug || post.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition">
                    {post.title}
                  </h3>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
      
      {/* EXPLORE BY CATEGORY GRID (Reviews) */}
      <div className="mb-10">
        <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Explore by Category
          </h2>
          <Link href="/reviews" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">
            View all &rsaquo;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/reviews?cat=book-nooks" className="group relative h-48 rounded-sm overflow-hidden bg-stone-800 flex items-center justify-center shadow-sm">
            <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800" alt="Book Nooks" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-lg group-hover:scale-105 transition-transform duration-300">Book Nooks</h3>
          </Link>

          <Link href="/reviews?cat=dollhouses" className="group relative h-48 rounded-sm overflow-hidden bg-stone-800 flex items-center justify-center shadow-sm">
            <img src="https://images.unsplash.com/photo-1596460111978-75176bd801a6?auto=format&fit=crop&q=80&w=800" alt="Dollhouses" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-lg group-hover:scale-105 transition-transform duration-300">Dollhouses</h3>
          </Link>

          <Link href="/reviews?cat=metal-models" className="group relative h-48 rounded-sm overflow-hidden bg-stone-800 flex items-center justify-center shadow-sm">
            <img src="https://images.unsplash.com/photo-1584905891334-b22c7ccbf4e6?auto=format&fit=crop&q=80&w=800" alt="Metal Models" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-lg group-hover:scale-105 transition-transform duration-300">Metal Models</h3>
          </Link>

          <Link href="/tools" className="group relative h-48 rounded-sm overflow-hidden bg-stone-800 flex items-center justify-center shadow-sm">
            <img src="https://images.unsplash.com/photo-1537248384218-c01d4a004495?auto=format&fit=crop&q=80&w=800" alt="Building Tools" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300 z-10"></div>
            <h3 className="relative z-20 text-white font-sans font-bold text-xl tracking-widest uppercase drop-shadow-lg group-hover:scale-105 transition-transform duration-300">Building Tools</h3>
          </Link>
        </div>
      </div>

    </div>
  );
}