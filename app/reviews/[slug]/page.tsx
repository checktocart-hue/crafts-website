import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import { urlFor } from "@/app/lib/sanity";
import Link from "next/link";

export const revalidate = 30;

async function getData(slug: string) {
  const query = `
    {
      "currentPost": *[_type == "review" && slug.current == $slug][0] {
          title,
          _createdAt,
          "slug": slug.current,
          "mainImage": mainImage,
          body,
          "categoryId": categories[0]->_ref 
      },
      "relatedPosts": *[_type == "review" && slug.current != $slug && references(^.categories[0]->_ref)] | order(_createdAt desc)[0...3] {
          title,
          "slug": slug.current,
          "mainImage": mainImage,
          _createdAt
      }
    }
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function ReviewPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> // <--- Defined as a Promise
}) {
  // 1. AWAIT the params to fix the Server Error
  const { slug } = await params;
  
  const data = await getData(slug);
  const post = data.currentPost;

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Review not found</h1>
        <Link href="/reviews" className="text-blue-600 underline mt-4 block">
          Back to all reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb / Back Link */}
      <div className="mb-6">
        <Link href="/reviews" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
          ← Back to All Reviews
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        {post.title}
      </h1>
      <p className="text-gray-500 mb-6">
        {new Date(post._createdAt).toLocaleDateString()}
      </p>
      
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article className="prose prose-lg prose-blue max-w-none mb-16">
        <PortableText value={post.body} />
      </article>

      {/* SIMILAR REVIEWS */}
      <hr className="border-gray-200 my-12" />
      <div>
        <h3 className="text-2xl font-bold mb-6">You might also like</h3>
        {data.relatedPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedPosts.map((related: any) => (
              <Link 
                href={`/reviews/${related.slug}`} 
                key={related.slug} 
                className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                {related.mainImage && (
                  <div className="relative h-40 w-full bg-gray-100">
                    <img
                      src={urlFor(related.mainImage).url()}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-bold text-md mb-2 line-clamp-2">{related.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="text-gray-500 italic">No similar reviews found.</p>}
      </div>
    </div>
  );
}