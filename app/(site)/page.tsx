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
          
          {/* YOUR WORKING FIREBASE NEWSLETTER FORM */}
          <NewsletterForm />

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
              
              <div className="text-gray-600 text-lg leading-relaxed mb-6 line-clamp-6 md:line-clamp-[10] overflow-hidden">
                {heroPost.excerpt ? (
                  <p>{heroPost.excerpt}</p>
                ) : (
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]} 
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      img: () => null,
                      h1: ({node, ...props}) => <p className="font-bold mb-4" {...props} />,
                      h2: ({node, ...props}) => <p className="font-bold mb-4" {...props} />,
                      h3: ({node, ...props}) => <p className="font-bold mb-4" {...props} />,
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
      
      {/* UPGRADED SVG ICON TABS (No Broken Images!) */}
      <div className="mb-10">
        <div className="flex items-center justify-between border-b-2 border-gray-900 pb-2 mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
            Explore by Category
          </h2>
          <Link href="/reviews" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">
            View all &rsaquo;
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <Link href="/reviews?cat=book-nooks" className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
              </svg>
            </div>
            <h3 className="font-sans font-bold text-[15px] sm:text-lg text-gray-900 tracking-wide uppercase text-center">Book Nooks</h3>
          </Link>

          <Link href="/reviews?cat=dollhouses" className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3 className="font-sans font-bold text-[15px] sm:text-lg text-gray-900 tracking-wide uppercase text-center">Dollhouses</h3>
          </Link>

          <Link href="/reviews?cat=metal-models" className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3 className="font-sans font-bold text-[15px] sm:text-lg text-gray-900 tracking-wide uppercase text-center">Metal Models</h3>
          </Link>

          <Link href="/tools" className="group flex flex-col items-center justify-center p-8 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <h3 className="font-sans font-bold text-[15px] sm:text-lg text-gray-900 tracking-wide uppercase text-center">Building Tools</h3>
          </Link>

        </div>
      </div>

    </div>
  );
}