import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";

// Set to 0 to disable caching (ensures new posts show up instantly)
export const revalidate = 0; 

async function getData(categorySlug?: string) {
  // 1. Filter Logic
  // If a category is selected, we filter by it.
  const categoryFilter = categorySlug 
    ? `&& references(*[_type == "category" && slug.current == "${categorySlug}"]._id)`
    : "";

  // 2. Main Query (Posts + Projects)
  const query = `
    *[(_type == "post" || _type == "project") ${categoryFilter}] | order(_createdAt desc) {
      _id, 
      title, 
      overview, 
      description, 
      "slug": slug.current, 
      mainImage, 
      _createdAt,
      "categories": categories[]->title
    }
  `;

  // 3. Category Query (Only fetch categories that actually have a slug)
  const categoriesQuery = `*[_type == "category" && defined(slug.current)] { title, "slug": slug.current }`;

  const posts = await client.fetch(query);
  const categories = await client.fetch(categoriesQuery);
  
  return { posts, categories };
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedCat = resolvedParams.cat;
  
  const { posts, categories } = await getData(selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">The Miniature Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tips, tricks, and guides for your building journey.
        </p>
      </div>

      {/* --- FILTER BUTTONS --- */}
      {/* Only show buttons if we have categories with slugs */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              !selectedCat ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Posts
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/blog?cat=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCat === cat.slug ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* --- RESULTS COUNT --- */}
      <div className="mb-6 text-sm text-gray-400 font-bold uppercase tracking-widest">
        Showing {posts.length} Article{posts.length !== 1 ? 's' : ''}
      </div>

      {/* --- BLOG GRID --- */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post._id}
              className="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Image */}
              {post.mainImage ? (
                <div className="w-full h-56 bg-gray-100 relative overflow-hidden">
                   <img 
                      src={urlFor(post.mainImage).url()} 
                      alt={post.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                   />
                </div>
              ) : (
                <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                <div className="flex gap-2 mb-2 flex-wrap">
                   {/* Display Categories */}
                   {post.categories?.map((c: string) => (
                     <span key={c} className="text-[10px] uppercase font-bold tracking-widest text-primary bg-green-50 px-2 py-1 rounded">{c}</span>
                   ))}
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">{new Date(post._createdAt).toLocaleDateString()}</p>
                
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                   {post.overview || post.description || "Click to read more..."}
                </p>
                <div className="mt-4 text-blue-600 font-bold text-sm group-hover:underline">Read Article →</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <h3 className="text-xl font-bold text-gray-700 mb-2">No Posts Found</h3>
          <p className="text-gray-500 text-sm">
            Try selecting a different category or click "All Posts".
          </p>
        </div>
      )}
    </div>
  );
}