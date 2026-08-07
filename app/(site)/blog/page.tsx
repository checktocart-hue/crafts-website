import Link from "next/link";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export const revalidate = 60;

export default async function BlogPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const currentTab = searchParams?.cat || "all";

  // DUAL-FETCH: Pull from both possible Firebase collections
  const blogSnap = await getDocs(query(collection(db, "blog")));
  const reviewsSnap = await getDocs(query(collection(db, "reviews")));
  
  let allPosts = [
    ...blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any })),
    ...reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }))
  ];

  // EXCLUDE REVIEWS: We only want blog posts here (filter out Book Nooks, Dollhouses, Metal Models)
  const reviewCategories = ["Book Nooks", "Dollhouses", "Metal Models"];
  let blogPosts = allPosts.filter(post => {
    const postCat = post.category || "";
    // If it's a review category, keep it off the general blog page
    return !reviewCategories.includes(postCat);
  });

  // Dynamically extract all unique blog categories present in the database
  const uniqueCategories = Array.from(new Set(blogPosts.map(p => p.category).filter(Boolean))) as string[];

  // FILTER BY TAB (slugified matching)
  let posts = blogPosts;
  if (currentTab !== "all") {
    posts = blogPosts.filter(post => {
      const catSlug = (post.category || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return catSlug === currentTab;
    });
  }

  // Sort newest first
  posts.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  // Build dynamic tabs based on database categories
  const tabs = [
    { id: "all", label: "All Articles", url: "/blog" },
    ...uniqueCategories.map(cat => ({
      id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      label: cat,
      url: `/blog?cat=${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`
    }))
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 font-sans">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight mb-4">
          The Builder's Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Expert buying guides, step-by-step tutorials, and tool recommendations for the miniature crafting community.
        </p>
      </div>

      {/* DYNAMIC CATEGORY TABS */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <Link 
            key={tab.id} 
            href={tab.url}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              currentTab === tab.id 
                ? "bg-gray-900 text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* POSTS GRID */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <Link href={`/blog/${post.slug || post.id}`} className="block overflow-hidden bg-gray-100 aspect-[4/3] mb-4">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 border border-gray-200">No Image</div>
                )}
              </Link>
              <div className="flex flex-col flex-grow">
                <p className="text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-2">
                  {post.category || "Article"}
                </p>
                <Link href={`/blog/${post.slug || post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition duration-150 mb-2">
                    {post.title || "Untitled Post"}
                  </h2>
                </Link>
                {post.excerpt && <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.excerpt}</p>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">We don't have any posts in this category right now.</p>
        </div>
      )}
    </div>
  );
}