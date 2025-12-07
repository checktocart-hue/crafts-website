import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";
import { Search, Frown } from "lucide-react";

// Disable cache so search is always fresh
export const revalidate = 0; 

async function getSearchResults(term: string) {
  // GROQ Query: 
  // 1. Look in "review", "post", and "project" types.
  // 2. Match the title OR the text body against the search term.
  // 3. The "*" allows partial matches (e.g., "build" finds "builder").
  const query = `
    *[
      (_type in ["review", "post", "project"]) && 
      (
        title match $term + "*" || 
        overview match $term + "*" ||
        description match $term + "*"
      )
    ] | order(_createdAt desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      mainImage,
      _createdAt,
      overview,
      description
    }
  `;
  
  const data = await client.fetch(query, { term });
  return data;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchTerm = q || "";
  const results = searchTerm ? await getSearchResults(searchTerm) : [];

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Search className="text-green-700" size={32} />
            Search Results
          </h1>
          {searchTerm ? (
            <p className="text-gray-600">
              Showing results for: <span className="font-bold text-gray-900">"{searchTerm}"</span>
            </p>
          ) : (
            <p className="text-gray-600">Please enter a search term.</p>
          )}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((item: any) => {
              // Determine the correct path based on type
              const linkPath = item._type === "review" ? `/reviews/${item.slug}` : `/blog/${item.slug}`;
              const badgeText = item._type === "review" ? "Review" : "Guide";
              const badgeColor = item._type === "review" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";

              return (
                <Link 
                  href={linkPath} 
                  key={item._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    {item.mainImage ? (
                      <img 
                        src={urlFor(item.mainImage).url()} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                    )}
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>
                      {badgeText}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">
                      {item.overview || item.description}
                    </p>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-auto">
                      Read More →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          searchTerm && (
            <div className="text-center py-20">
              <div className="inline-flex bg-gray-100 p-6 rounded-full mb-6 text-gray-400">
                <Frown size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find anything matching "{searchTerm}". Try checking your spelling or using a broader keyword like "tools" or "wood".
              </p>
              <Link href="/" className="inline-block mt-8 text-green-700 font-bold hover:underline">
                Return Home
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}