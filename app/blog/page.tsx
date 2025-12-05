import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";

export const revalidate = 30;

async function getData() {
  // CHANGED: Now looks for both "post" AND "project" types
  const query = `
    *[_type == "post" || _type == "project"] | order(_createdAt desc) {
      title,
      overview,
      description, // Projects use 'description' instead of overview sometimes
      "slug": slug.current,
      "mainImage": mainImage,
      _createdAt
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
              key={post.slug}
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
                <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(post._createdAt).toLocaleDateString()}
                </p>
                {/* Shows description OR overview, depending on which one exists */}
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                   {post.overview || post.description || "Read more about this project..."}
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
          <p className="text-gray-500 text-lg">No articles found.</p>
          <p className="text-sm text-gray-400">Create a "Post" or "Project" in Sanity to see it here.</p>
        </div>
      )}
    </div>
  );
}