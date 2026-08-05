// app/blog/page.tsx (or wherever this file lives)

import { fetchGraphQL } from "@/app/lib/wp";
import Link from "next/link";

const GET_LATEST_POSTS = `
  query GetLatestPosts {
    posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export default async function BlogIndex() {
  const data = await fetchGraphQL(GET_LATEST_POSTS);
  const posts = data?.posts?.nodes || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Latest Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            {/* Safely check for the Cover Image */}
            {post.featuredImage?.node?.sourceUrl ? (
              <img 
                src={post.featuredImage.node.sourceUrl} 
                alt={post.title || "Blog Post"} 
                className="w-full h-48 object-cover" 
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            
            <div className="p-6">
              {/* Added a fallback just in case the title is ever missing */}
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title || "Untitled Post"}
              </h2>
              
              {/* THE FIX: Added || "" to prevent React from crashing on null excerpts */}
              <div 
                className="text-gray-600 mb-4 line-clamp-3 text-sm" 
                dangerouslySetInnerHTML={{ __html: post.excerpt || "" }} 
              />
              
              {/* Only render the Read More link if a slug actually exists */}
              {post.slug && (
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-block text-green-700 font-bold hover:text-green-800 transition-colors"
                >
                  Read More →
                </Link>
              )}
            </div>
            
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          No articles found. Go write some in WordPress!
        </div>
      )}
    </div>
  );
}