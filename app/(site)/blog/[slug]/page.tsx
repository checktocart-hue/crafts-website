import { fetchGraphQL } from "@/app/lib/wp";
import Link from "next/link";
import { notFound } from "next/navigation";

// Force Next.js to fetch the freshest version of the post
export const revalidate = 0;

// The GraphQL query to fetch a single post by its exact slug
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
  // 1. Fetch the data from WordPress using the slug from the URL
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { id: params.slug });
  const post = data?.post;

  // 2. If WordPress can't find a post with this slug, automatically show a 404 page
  if (!post) {
    return notFound();
  }

  // 3. Render the full article
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-green-700 font-bold hover:text-green-800 mb-8 inline-block transition-colors">
        ← Back to all articles
      </Link>
      
      <article className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        
        {/* Render the Featured Image if it exists */}
        {post.featuredImage?.node?.sourceUrl && (
          <img 
            src={post.featuredImage.node.sourceUrl} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
          />
        )}
        
        {/* Post Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        
        {/* Post Content (Notice we use post.content here, not post.excerpt!) */}
        <div 
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: post.content || "" }} 
        />
        
      </article>
    </main>
  );
}