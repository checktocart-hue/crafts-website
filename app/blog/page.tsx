import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";

// Set to 0 to disable caching completely during development/testing
// This ensures new posts show up instantly.
export const revalidate = 0; 

async function getData() {
  // SAFETY NET QUERY: Fetches both 'post' and 'project' types
  const query = `
    *[_type == "post" || _type == "project"] | order(_createdAt desc) {
      _id,
      title,
      overview,
      description,
      "slug": slug.current,
      "mainImage": mainImage,
      _createdAt,
      _type
    }
  `;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogIndexPage() {
  const posts = await getData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">The Miniature Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tips, tricks, and guides for your building journey.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post._id}
              className="group block border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
            >
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
              
              <div className="p-6">
                <div className="mb-2">
                   <span className="text-[10px] uppercase font-bold tracking-widest text-primary bg-green-50 px-2 py-1 rounded">
                     {post._type === 'project' ? 'Project' : 'Article'}
                   </span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(post._createdAt).toLocaleDateString()}
                </p>
                {/* Shows overview (Post) or description (Project) */}
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                   {post.overview || post.description || "Click to read more..."}
                </p>
                <div className="mt-4 text-blue-600 font-bold text-sm group-hover:underline">
                  Read Article →
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <h3 className="text-xl font-bold text-gray-700 mb-2">Still Empty?</h3>
          <p className="text-gray-500 text-sm mb-4">
            We disabled the cache, so if you see this, the database is truly empty or the posts are not Published.
          </p>
          <div className="text-xs text-left max-w-md mx-auto bg-white p-4 rounded border">
             <strong>Final Check in Sanity Studio:</strong>
             <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-500">
                <li>Are you sure the button is <strong>Green (Published)</strong>?</li>
                <li>(If it is Yellow/Grey, it is a Draft and won't show).</li>
                <li>Does the item have a Slug?</li>
             </ul>
          </div>
        </div>
      )}
    </div>
  );
}