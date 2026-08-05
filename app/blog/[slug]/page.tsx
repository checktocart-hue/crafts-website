import { fetchGraphQL } from "@/app/lib/wp";
import Link from "next/link";

// Force Next.js to bypass the cache
export const revalidate = 0;

const GET_POST_BY_SLUG = `
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // 1. Fetch the data
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { id: params.slug });
  const post = data?.post;

  // 2. THE FIX: If WordPress fails to send the post, DO NOT show a 404 page. 
  // Instead, print exactly what went wrong on the screen so we can see it.
  if (!post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-green-700 font-bold hover:text-green-800 mb-8 inline-block">
          ← Back to all articles
        </Link>
        <div className="bg-red-50 border border-red-200 p-8 rounded-xl text-red-900">
          <h1 className="text-2xl font-bold mb-4">Post Data Missing</h1>
          <p className="mb-4">WordPress did not return the data for the slug: <strong>{params.slug}</strong></p>
          <div className="bg-gray-900 text-green-400 p-4 rounded overflow-auto text-xs font-mono">
            <strong>Raw WordPress Response:</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </main>
    );
  }

  // 3. If the post exists, render it perfectly
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-green-700 font-bold hover:text-green-800 mb-8 inline-block transition-colors">
        ← Back to all articles
      </Link>
      
      <article className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        {post.featuredImage?.node?.sourceUrl && (
          <img 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
          />
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        
        <div 
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content || "" }} 
        />
      </article>
    </main>
  );
}