import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity";

export const revalidate = 30;

// 1. Updated Data Fetching Logic
async function getData(categorySlug?: string) {
  let query;
  let params = {};

  if (categorySlug) {
    // IF we have a category: Filter by that category slug
    query = `
      {
        "categories": *[_type == "category"] {
          title,
          "slug": slug.current
        },
        "reviews": *[_type == "review" && $categorySlug in categories[]->slug.current] | order(_createdAt desc) {
          title,
          overview,
          "slug": slug.current,
          "mainImage": mainImage,
          _createdAt,
          "categories": categories[]->title
        }
      }
    `;
    params = { categorySlug };
  } else {
    // ELSE (No category selected): Fetch everything
    query = `
      {
        "categories": *[_type == "category"] {
          title,
          "slug": slug.current
        },
        "reviews": *[_type == "review"] | order(_createdAt desc) {
          title,
          overview,
          "slug": slug.current,
          "mainImage": mainImage,
          _createdAt,
          "categories": categories[]->title
        }
      }
    `;
  }

  const data = await client.fetch(query, params);
  return data;
}

// 2. Updated Component to handle Async Params
export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>; // <--- Defined as a Promise now
}) {
  // AWAIT the parameters (Crucial fix for Next.js 15/16)
  const resolvedParams = await searchParams;
  const selectedCat = resolvedParams.cat;

  const data = await getData(selectedCat);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* --- PAGE HEADER --- */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {selectedCat ? `${selectedCat.replace('-', ' ')} Reviews` : "All Reviews"}
        </h1>
        <p className="text-gray-600">Explore our latest craft projects and kits.</p>
      </div>

      {/* --- CATEGORY FILTER BUTTONS --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {/* 'All' Button */}
        <Link
          href="/reviews"
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !selectedCat
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </Link>

        {/* Dynamic Category Buttons */}
        {data.categories.map((cat: any) => (
          <Link
            key={cat.slug}
            href={`/reviews?cat=${cat.slug}`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              selectedCat === cat.slug
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {/* --- REVIEWS GRID --- */}
      {data.reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.reviews.map((post: any) => (
            <Link
              href={`/reviews/${post.slug}`}
              key={post.slug}
              className="group block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* IMAGE */}
              {post.mainImage ? (
                <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                  <img
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                    {/* Tiny category tags */}
                    {post.categories && post.categories.map((c: string) => (
                        <span key={c} className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {c}
                        </span>
                    ))}
                </div>
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
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No reviews found for this category.</p>
          <Link href="/reviews" className="text-blue-600 font-bold mt-2 inline-block hover:underline">
            View all reviews
          </Link>
        </div>
      )}
    </div>
  );
}