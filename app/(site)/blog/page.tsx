import { fetchGraphQL } from "@/app/lib/wp";
import Link from "next/link";

// 1. The GraphQL query to fetch the 10 most recent posts
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
  // 2. Fetch the data
  const data = await fetchGraphQL(GET_LATEST_POSTS);
  
  // 3. Extract the array of posts (default to an empty array if none exist)
  const posts = data?.posts?.nodes || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Latest Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            
            {/* Display the Cover Image if it exists */}
            {post.featuredImage?.node?.sourceUrl ? (
              <img 
                src={post.featuredImage.node.sourceUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                {post.title}
              </h2>
              
              {/* WordPress automatically generates an excerpt from your content! */}
              <div 
                className="text-gray-600 mb-4 line-clamp-3 text-sm" 
                dangerouslySetInnerHTML={{ __html: post.excerpt }} 
              />
              
              <Link 
                href={`/blog/${post.slug}`} 
                className="inline-block text-green-700 font-bold hover:text-green-800 transition-colors"
              >
                Read More →
              </Link>
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