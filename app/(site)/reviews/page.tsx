import Link from "next/link";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; 

export const revalidate = 60;
export const dynamic = "force-dynamic";

const CATEGORY_ALIASES: Record<string, string[]> = {
  "book-nooks": ["book nooks", "book-nooks", "book nook", "booknook", "book-nook", "booknooks"],
  "dollhouses": ["dollhouses", "dollhouse", "doll houses", "doll-houses", "doll-house", "doll house"],
  "metal-models": ["metal models", "metal-models", "metal model", "metal", "piececool", "metal-model"],
};

const DISPLAY_TITLES: Record<string, string> = {
  "book-nooks": "Book Nooks",
  "dollhouses": "Dollhouses",
  "metal-models": "Metal Models",
};

// THE ADSENSE SAFETY NET: Guarantees no empty pages!
function belongsToCategory(post: any, targetCategorySlug: string | null): boolean {
  // If "View All" is clicked, show anything from the reviews collection or anything related to kits
  if (!targetCategorySlug) {
    return post._collection === 'reviews' || 
           ['book nooks', 'dollhouses', 'metal models', 'projects', 'review'].includes(post.category?.toLowerCase() || '');
  }

  // 1. Try strict database category match
  const cleanCat = (post.category || "").toLowerCase().trim();
  if (CATEGORY_ALIASES[targetCategorySlug]?.includes(cleanCat)) {
    return true;
  }

  // 2. FALLBACK: Check Title and Slug (Overrides broken database fields)
  const searchString = `${post.title || ""} ${post.slug || ""}`.toLowerCase();
  
  if (targetCategorySlug === "book-nooks" && (searchString.includes("book nook") || searchString.includes("booknook"))) return true;
  if (targetCategorySlug === "dollhouses" && (searchString.includes("dollhouse") || searchString.includes("doll house") || searchString.includes("miniature house"))) return true;
  if (targetCategorySlug === "metal-models" && (searchString.includes("metal") || searchString.includes("piececool") || searchString.includes("model"))) return true;

  return false;
}

export default async function ReviewsPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const categoryParam = searchParams?.cat?.toLowerCase().trim() || null;
  
  const pageTitle = categoryParam && DISPLAY_TITLES[categoryParam] 
    ? `${DISPLAY_TITLES[categoryParam]} Reviews`
    : "All Kit Reviews";

  const blogSnap = await getDocs(query(collection(db, "blog")));
  const reviewsSnap = await getDocs(query(collection(db, "reviews")));
  
  let allPosts = [
    ...blogSnap.docs.map(doc => ({ id: doc.id, _collection: "blog", ...doc.data() as any })),
    ...reviewsSnap.docs.map(doc => ({ id: doc.id, _collection: "reviews", ...doc.data() as any }))
  ];

  // Run all posts through the safety net filter
  let posts = allPosts.filter(post => belongsToCategory(post, categoryParam));

  // Sort by date safely
  posts.sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : (a.updatedAt ? new Date(a.updatedAt).getTime() : 0);
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : (b.updatedAt ? new Date(b.updatedAt).getTime() : 0);
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
            ? `Read our in-depth reviews, build guides, and recommendations for the best ${DISPLAY_TITLES[categoryParam]?.toLowerCase() || 'kits'} on the market.` 
            : "Browse our complete archive of miniature kit reviews, deeply researched and tested by our experts."}
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((post) => {
            const displayCat = categoryParam ? DISPLAY_TITLES[categoryParam] : (post.category || "Review");
            
            return (
              <article key={post.id} className="group flex flex-col">
                <Link href={`/blog/${post.slug || post.id}`} className="block overflow-hidden bg-gray-100 aspect-[4/3] mb-4">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title || "Review Image"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 border border-gray-200 bg-gray-50 font-medium">
                      No Image
                    </div>
                  )}
                </Link>
                
                <div className="flex flex-col flex-grow">
                  <p className="text-[11px] font-bold text-amber-600 uppercase tracking-widest mb-2">
                    {displayCat}
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
            );
          })}
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