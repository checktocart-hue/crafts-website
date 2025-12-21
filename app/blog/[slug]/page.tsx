import { client } from "@/app/lib/sanity";
import { PortableText, PortableTextComponents } from "next-sanity"; 
import { urlFor } from "@/app/lib/sanity";
import Link from "next/link";
import ShareButtons from "@/app/components/ShareButtons"; 
import AuthorBio from "@/app/components/AuthorBio"; 
import TableOfContents from "@/app/components/TableOfContents";
import AdUnit from "@/app/components/AdUnit";
import ReviewSchema from "@/app/components/ReviewSchema";
import ComparisonTable from "@/app/components/ComparisonTable"; // <--- 1. IMPORT COMPONENT
import { Info } from "lucide-react"; 

// Force dynamic rendering so new posts appear instantly
export const revalidate = 0; 

async function getData(slug: string) {
  const query = `
    {
      "currentPost": *[(_type == "post" || _type == "project" || _type == "review") && slug.current == $slug][0] {
          title,
          _createdAt,
          "slug": slug.current,
          "mainImage": mainImage,
          body,
          "rating": rating,
          "amazonLink": amazonLink,
          "excerpt": array::join(string::split((pt::text(body)), "")[0..150], "") + "...",
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

const ptComponents: PortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="my-8 relative w-full h-auto rounded-xl overflow-hidden shadow-sm border border-stone-100">
            <img 
              src={urlFor(value).url()} 
              alt={value.alt || 'Guide Image'} 
              className="w-full h-auto object-cover" 
              loading="lazy" 
            />
          </div>
        );
      },
      // --- 2. ADD THIS NEW BLOCK FOR TABLES ---
      comparisonTable: ({ value }: any) => {
        return <ComparisonTable value={value} />;
      },
      // ----------------------------------------
    },
    block: {
      h2: ({ children }: any) => {
        const id = children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return <h2 id={id} className="text-2xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24">{children}</h2>;
      },
      h3: ({ children }: any) => <h3 className="text-xl font-bold mt-8 mb-3 text-gray-800">{children}</h3>,
      normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
    },
};

export default async function BlogArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const data = await getData(slug);
  const post = data.currentPost;

  if (!post) {
     return <div className="p-20 text-center">Article not found</div>;
  }

  // --- LOGIC: CONTENT SPLITTING & SCHEMA CHECK ---
  const bodyContent = post.body || [];
  const part1 = bodyContent.slice(0, 2); // First 2 paragraphs
  const part2 = bodyContent.slice(2);    // Rest of article
  const isReview = typeof post.rating === 'number';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* REVIEW SCHEMA INJECTION */}
      {isReview && (
        <ReviewSchema
          productName={post.title.replace("Review", "").trim()}
          description={post.excerpt || `Review of ${post.title}`}
          imageUrl={post.mainImage ? urlFor(post.mainImage).url() : undefined}
          authorName="CraftsAndKits Team"
          publishedAt={post._createdAt}
          ratingValue={post.rating}
        />
      )}

      {/* Navigation */}
      <div className="mb-8">
        <Link href="/blog" className="text-sm font-bold text-gray-500 hover:text-green-700">
          ← Back to Blog
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
        {post.title}
      </h1>
      
      {/* Meta Data */}
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

      {/* Affiliate Disclosure */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-8 flex gap-3 text-sm text-gray-600 items-start">
        <Info className="flex-shrink-0 text-green-700 mt-0.5" size={18} />
        <p>
          <span className="font-bold text-gray-900">Transparency Note:</span> This post may contain affiliate links. If you make a purchase through these links, we may earn a small commission at no extra cost to you.
        </p>
      </div>

      <TableOfContents body={post.body} />

      <article className="prose prose-lg prose-green max-w-none mb-10 text-gray-700">
        
        {/* RENDER PART 1 */}
        <PortableText value={part1} components={ptComponents} />

        {/* AD UNIT */}
        <div className="my-8 w-full flex justify-center">
           <AdUnit slot="123456789" format="horizontal" />
        </div>

        {/* RENDER PART 2 */}
        <PortableText value={part2} components={ptComponents} />

      </article>

      <ShareButtons slug={post.slug} title={post.title} />
      <AuthorBio />
    </div>
  );
}