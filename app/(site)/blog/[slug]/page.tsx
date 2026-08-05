import { fetchGraphQL } from "@/app/lib/wp";
import { notFound } from "next/navigation";

// 1. The GraphQL query to ask WordPress for a post by its slug
const GET_POST_BY_SLUG = `
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Next.js 16 Requirement: You must await the params Promise!
  const resolvedParams = await params;
  
  // 2. Now we can safely pass the resolved slug to WordPress
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { id: resolvedParams.slug });
  const post = data?.post;

  // 3. If WordPress can't find the post, show Next.js's built-in 404 page
  if (!post) {
    notFound();
  }

  // 4. Render the page using your existing Tailwind styling!
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
      
      {post.featuredImage?.node?.sourceUrl && (
        <img 
          src={post.featuredImage.node.sourceUrl} 
          alt={post.title} 
          className="w-full h-auto rounded-lg mb-8 object-cover max-h-[500px]" 
        />
      )}

      {/* WordPress handles all the rich text and tables perfectly here */}
      <div 
        className="prose prose-lg prose-green max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}