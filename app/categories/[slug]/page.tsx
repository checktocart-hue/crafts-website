import Link from 'next/link';
import { client } from '@/app/lib/sanity';
import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import { ArrowLeft, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getCategoryData(slug: string) {
  // 1. Get the Category Details
  const category = await client.fetch(`*[_type == "category" && slug.current == "${slug}"][0]`);

  // 2. Get BOTH Reviews AND Projects (Guides)
  // Updated Query: _type in ["review", "project"]
  const posts = await client.fetch(`*[_type in ["review", "project"] && references($id)] | order(_createdAt desc) {
    title,
    _type,
    "slug": slug.current,
    rating,
    price,
    description,
    excerpt, // Projects use excerpt, Reviews use description
    "link": "/" + (select(_type == "review" => "reviews", _type == "project" => "projects")) + "/" + slug.current
  }`, { id: category?._id });

  return { category, posts };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { category, posts } = await getCategoryData(slug);

  if (!category) return <div className="text-center py-20">Category Not Found</div>;

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      
      <div className="bg-white border-b border-gray-100 py-16 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-primary rounded-full mb-4">
          <Tag size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          {category.description || `Browse our collection of ${category.title}.`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition">
           <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <ProductCard 
                key={post.slug}
                title={post.title}
                rating={post.rating || 5} // Projects default to 5 stars
                price={post.price || "Read Guide"} // Projects show "Read Guide"
                tag={post._type === "review" ? "Review" : "Guide"} // Tag tells them what it is
                features={[]} // No features needed for list view
                link={post.link}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-xl">No content found in this category yet.</p>
              <p className="text-gray-500 mt-2">Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}