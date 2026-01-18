import { client } from "../sanity/client";
import SanityContent from "../components/SanityContent";
import urlBuilder from "@sanity/image-url";

// Helper to get image URLs for the main cover image
const builder = urlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

// 1. Fetch data directly from Sanity
async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    mainImage,
    body
  }`;
  return client.fetch(query);
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "40px" }}>
        Latest Posts
      </h1>

      {posts.map((post: any, index: number) => (
        <article key={index} style={{ marginBottom: "60px", borderBottom: "1px solid #eee", paddingBottom: "40px" }}>
          {/* A. The Title */}
          <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>{post.title}</h2>

          {/* B. The Main Image (Cover) */}
          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(800).height(400).url()}
              alt={post.title}
              style={{ width: "100%", height: "auto", borderRadius: "10px", marginBottom: "20px" }}
            />
          )}

          {/* C. The Body (Images & Tables handle by your new component) */}
          <SanityContent content={post.body} />
        </article>
      ))}
    </main>
  );
}