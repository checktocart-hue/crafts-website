import Link from "next/link";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; 

export const revalidate = 60;

const categoryTitles: Record<string, string> = {
  "book-nooks": "Book Nooks",
  "dollhouses": "Dollhouses",
  "metal-models": "Metal Models",
};

export default async function ReviewsPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const categoryParam = searchParams?.cat;
  
  const pageTitle = categoryParam && categoryTitles[categoryParam] 
    ? `${categoryTitles[categoryParam]} Reviews`
    : "All Kit Reviews";

  // DUAL-FETCH: Pull from both possible Firebase collections
  const blogSnap = await getDocs(query(collection(db, "blog")));
  const reviewsSnap = await getDocs(query(collection(db, "reviews")));
  
  // Merge all documents together
  let allPosts = [
    ...blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any })),
    ...reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }))
  ];

  // STRICT CATEGORY FILTERING
  let posts = allPosts.filter(post => {
    const postCat = post.category || "";

    // If a specific tab is clicked (e.g. ?cat=metal-models)
    if (categoryParam) {
      return postCat === categoryTitles[categoryParam];
    }
    
    // If "View All Reviews" is clicked, show ONLY these three specific review categories
    return postCat === "Book Nooks" || postCat === "Dollhouses" || postCat === "Metal Models";
  });

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; 
  });

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16 font-sans">
      
      <div className="border-b-[3px] border-gray-900 pb-6 mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight mb-4">
          {pageTitle}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {categoryParam 
            ? `Read our in-depth reviews, build guides, and recommendations for the best ${categoryTitles[categoryParam].toLowerCase()} on the market.` 
            : "Browse our complete archive of miniature kit reviews, deeply researched and tested by our experts."}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post) => (
            <article key={post.id} className="group flex flex-col">
              <Link href={`/blog/${post.slug || post.id}`} className="block overflow-hidden bg-gray-100 aspect-[4/3] mb-4">
                {post.coverImage ? (
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 border border-gray-200">
                    No Image
                  </div>
                )}
              </Link>
              
              <div className="flex flex-col flex-grow">
                <p className="text-[11px] font-bold text-blue-700 uppercase tracking-widest mb-2">
                  {post.category || "Review"}
                </p>
                <Link href={`/blog/${post.slug || post.id}`}>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-700 transition duration-150 mb-2">
                    {post.title || "Untitled Post"}
                  </h2>
                </Link>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-500">
            We haven't categorized any reviews here yet. Check back soon!
          </p>
        </div>
      )}

    </div>
  );
}