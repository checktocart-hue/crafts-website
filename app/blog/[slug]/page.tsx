import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import { urlFor } from "@/app/lib/sanity";
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons"; 
import AuthorBio from "@/app/components/AuthorBio"; 

// Disable caching to ensure instant updates and no 404s on new content
export const revalidate = 0; 

async function getData(slug: string) {
  const query = `
    {
      // Look for this slug in EITHER "post" OR "project" types
      "currentPost": *[(_type == "post" || _type == "project") && slug.current == $slug][0] {
          title,
          _createdAt,
          "slug": slug.current,
          "mainImage": mainImage,
          body,
          "categoryId": categories[0]->_ref 
      },
      "relatedPosts": *[(_type == "post" || _type == "project") && slug.current != $slug] | order(_createdAt desc)[0...3] {
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

export default async function BlogArticlePage({ 
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
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Article not found</h1>
        <p className="text-gray-500 mb-8">
          The article you are looking for might have been moved or deleted.
        </p>
        <Link 
          href="/blog" 
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      
      {/* --- HEADER WAS REMOVED FROM HERE TO FIX DUPLICATION --- */}

      {/* Breadcrumb */}
      <div className="mb-8">
        <Link href="/blog" className="text-sm font-bold text-gray-500 hover:text-green-700 transition-colors flex items-center gap-2">
          ← Back to Blog
        </Link>
      </div>

      {/* Title Header */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
        <p>Published: {new Date(post._createdAt).toLocaleDateString()}</p>
        <span>•</span>
        <p>By CraftsAndKits Team</p>
      </div>
      
      {/* Main Image */}
      {post.mainImage && (
        <div className="relative w-full h-64 md:h-[400px] mb-12 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content Body */}
      <article className="prose prose-lg prose-green max-w-none mb-10 text-gray-700">
        <PortableText value={post.body} />
      </article>

      {/* --- SHARE BUTTONS SECTION --- */}
      <ShareButtons slug={post.slug} title={post.title} />

      {/* --- AUTHOR BIO --- */}
      <AuthorBio />

      {/* Related Articles */}
      <div className="bg-gray-50 -mx-4 px-4 py-12 md:rounded-3xl mt-12">
        <h3 className="text-2xl font-bold mb-8 text-gray-900">Read Next</h3>
        
        {data.relatedPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.relatedPosts.map((related: any) => (
              <Link 
                href={`/blog/${related.slug}`} 
                key={related.slug} 
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {related.mainImage && (
                  <div className="relative h-48 w-full bg-gray-200">
                    <img
                      src={urlFor(related.mainImage).url()}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(related._createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No other guides found.</p>
        )}
      </div>
    </div>
  );
}