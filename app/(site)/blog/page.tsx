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

  // STRICT FILTER: Only keep the Blog categories (Guides, Tutorials, Tools)
  let posts = allPosts.filter(post => {
    const postCat = post.category || "";
    return postCat === "Guides" || postCat === "Tutorials" || postCat === "Tools";
  });

  // FILTER BY TAB
  if (currentTab !== "all") {
    const targetCat = currentTab === "guides" ? "Guides" : 
                      currentTab === "tutorials" ? "Tutorials" : 
                      currentTab === "tools" ? "Tools" : "";
    posts = posts.filter(post => post.category === targetCat);
  }

  // Sort newest first
  posts.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  const tabs = [
    { id: "all", label: "All Articles", url: "/blog" },
    { id: "guides", label: "Buying Guides", url: "/blog?cat=guides" },
    { id: "tutorials", label: "Tutorials", url: "/blog?cat=tutorials" },
    { id: "tools", label: "Tools", url: "/blog?cat=tools" }
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

      {/* CATEGORY TABS */}
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