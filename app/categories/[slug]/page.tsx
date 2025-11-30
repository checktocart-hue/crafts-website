import Link from 'next/link';
import { client } from '@/app/lib/sanity';
import Header from '@/app/components/Header';
import ProductCard from '@/app/components/ProductCard';
import { ArrowLeft, Tag } from 'lucide-react';

// Force dynamic so new articles appear instantly
export const dynamic = 'force-dynamic';

async function getCategoryData(slug: string) {
  // 1. Get the Category Details
  const category = await client.fetch(`*[_type == "category" && slug.current == "${slug}"][0]`);

  // 2. Get Reviews that belong to this Category
  // This query says: "Find reviews where 'categories' contains this specific category ID"
  const reviews = await client.fetch(`*[_type == "review" && references($id)] {
    title,
    "slug": slug.current,
    rating,
    price,
    description,
    "features": ["Tested", "High Quality"], // Placeholder features
    "link": "/reviews/" + slug.current
  }`, { id: category?._id });

  return { category, reviews };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { category, reviews } = await getCategoryData(slug);

  if (!category) return <div className="text-center py-20">Category Not Found</div>;

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100 py-16 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-primary rounded-full mb-4">
          <Tag size={24} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          {category.title}
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          {category.description || `Explore our best ${category.title} reviews and kits.`}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition">
           <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Results Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <ProductCard 
                key={review.slug}
                title={review.title}
                rating={review.rating}
                price={review.price}
                tag={category.title}
                features={["Verified Review", "In-Stock Check"]}
                link={`/reviews/${review.slug}`}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-400 text-xl">No reviews in this category yet.</p>
              <p className="text-gray-500 mt-2">Go to Sanity and assign a Review to "{category.title}"!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}