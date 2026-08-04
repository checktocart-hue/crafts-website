import { getPostBySlug } from "../../lib/api";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  // 1. Fetch the data from our separated API file
  const post = await getPostBySlug(params.slug);

  // 2. If the post doesn't exist in Firebase, show a 404 page
  if (!post) {
    notFound();
  }

  // 3. Render the UI
  return (
    <article className="max-w-3xl mx-auto px-4 py-20">
      {/* Header Section */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm">Published on {post.date}</p>
        <span className="inline-block mt-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          {post.category}
        </span>
      </header>

      {/* Main Content Section */}
      <div className="prose prose-lg max-w-none text-gray-800">
        <ReactMarkdown>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}