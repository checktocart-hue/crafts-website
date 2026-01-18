import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import { urlFor } from "@/app/lib/sanity";
import Link from "next/link";
import { ShoppingCart, ExternalLink, ArrowLeft, Info } from "lucide-react";

// Disable caching to see updates instantly
export const revalidate = 0; 

async function getData(slug: string) {
  const query = `
    {
      "currentPost": *[_type == "review" && slug.current == $slug][0] {
          title,
          _createdAt,
          "slug": slug.current,
          "mainImage": mainImage,
          body,
          amazonLink, 
          "categoryId": categories[0]->_ref 
      },
      "relatedPosts": *[_type == "review" && slug.current != $slug] | order(_createdAt desc)[0...3] {
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
  params: Promise<{ slug: string }> 
}) {
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
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link href="/reviews" className="text-sm font-bold text-gray-500 hover:text-green-700 transition-colors flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Reviews
        </Link>
      </div>

      {/* Title & Date */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
        {post.title}
      </h1>
      <p className="text-gray-500 mb-8 border-b border-gray-100 pb-8">
        Published: {new Date(post._createdAt).toLocaleDateString()}
      </p>
      
      {/* Main Image */}
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-[400px] mb-10 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* --- AUTOMATIC AFFILIATE DISCLOSURE (Added Here) --- */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-8 flex gap-3 text-sm text-gray-600 items-start">
        <Info className="flex-shrink-0 text-green-700 mt-0.5" size={18} />
        <p>
          <span className="font-bold text-gray-900">Transparency Note:</span> This review contains affiliate links. If you buy through them, we may earn a commission. We only review kits we believe in.
        </p>
      </div>

      {/* --- AMAZON BUY BUTTON (Only shows if link exists) --- */}
      {post.amazonLink && (
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Interested in this Kit?</h3>
            <p className="text-sm text-gray-600">Check price and availability directly on Amazon.</p>
          </div>
          <a 
            href={post.amazonLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FF9900] hover:bg-[#ff8c00] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105 shadow-md whitespace-nowrap"
          >
            <ShoppingCart size={20} />
            Check Price
            <ExternalLink size={16} className="opacity-70" />
          </a>
        </div>
      )}

      {/* Review Content */}
      <article className="prose prose-lg prose-green max-w-none mb-16 text-gray-700">
        <PortableText value={post.body} />
      </article>

      {/* Similar Reviews */}
      <hr className="border-gray-200 my-12" />
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">You might also like</h3>
        {data.relatedPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedPosts.map((related: any) => (
              <Link 
                href={`/reviews/${related.slug}`} 
                key={related.slug} 
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all"
              >
                {related.mainImage && (
                  <div className="relative h-40 w-full bg-gray-100">
                    <img
                      src={urlFor(related.mainImage).url()}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-bold text-md mb-2 text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {related.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="text-gray-500 italic">No similar reviews found.</p>}
      </div>
    </div>
  );
}