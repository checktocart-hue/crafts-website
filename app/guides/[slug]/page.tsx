// File: app/guides/[slug]/page.tsx

import { client } from "@/app/lib/sanity"; 
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/app/lib/sanity"; 

export const revalidate = 30; 

async function getData(slug: string) {
  const query = `
    {
      "currentPost": *[_type == "post" && slug.current == $slug][0] {
          title, _createdAt, body,
          "slug": slug.current,
          "mainImage": mainImage,
          "categoryId": categories[0]->_ref 
      },
      "relatedPosts": *[_type == "post" && slug.current != $slug && references(^.categories[0]->_ref)] | order(_createdAt desc)[0...3] {
          title, "slug": slug.current, "mainImage": mainImage, _createdAt
      }
    }
  `;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  const post = data.currentPost;

  if (!post) return <div className="p-10 text-center">Guide not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Guide</span>
      <h1 className="text-3xl font-bold mt-2 mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{new Date(post._createdAt).toLocaleDateString()}</p>
      
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden bg-gray-100">
          <Image src={urlFor(post.mainImage).url()} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <article className="prose prose-lg max-w-none mb-16">
        <PortableText value={post.body} />
      </article>

      {/* SIMILAR GUIDES */}
      <hr className="border-gray-200 my-12" />
      <div>
        <h3 className="text-2xl font-bold mb-6">More Guides</h3>
        {data.relatedPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedPosts.map((related: any) => (
              <Link href={`/guides/${related.slug}`} key={related.slug} className="group border rounded-lg overflow-hidden hover:shadow-lg transition-all">
                {related.mainImage && (
                  <div className="relative h-40 w-full bg-gray-100">
                    <Image src={urlFor(related.mainImage).url()} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-bold text-md mb-2 line-clamp-2">{related.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        ) : <p className="text-gray-500 italic">No similar guides found.</p>}
      </div>
    </div>
  );
}