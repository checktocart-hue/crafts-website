import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";

export const revalidate = 30; // Check for new content every 30 seconds

async function getData(slug: string) {
  const query = `
    {
      "category": *[_type == "category" && slug.current == $slug][0] {
        title,
        description
      },
      "posts": *[_type == "review" && references(*[_type == "category" && slug.current == $slug][0]._id)] | order(_createdAt desc) {
        title,
        overview,
        "slug": slug.current,
        "mainImage": mainImage,
        _createdAt
      }
    }
  `;

  const data = await client.fetch(query, { slug });
  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getData(params.slug);

  if (!data.category) {
    return <div className="text-center py-20">Category not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{data.category.title}</h1>
        {data.category.description && (
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.category.description}
          </p>
        )}
      </div>

      {/* Grid of Reviews in this Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.posts.map((post: any) => (
          <Link
            href={`/reviews/${post.slug}`}
            key={post.slug}
            className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image Section - Using Standard <img> tag for reliability */}
            {post.mainImage ? (
              <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                <img
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              // Fallback if no image exists
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Content Section */}
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(post._createdAt).toLocaleDateString()}
              </p>
              {post.overview && (
                <p className="text-gray-600 line-clamp-3">{post.overview}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {data.posts.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No reviews found in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}