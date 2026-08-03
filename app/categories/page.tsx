import Link from 'next/link';
import Header from '@/app/components/Header';
import { ArrowLeft, Layers } from 'lucide-react';
import { getAllPosts } from '@/app/lib/markdown';

export const dynamic = 'force-dynamic';

// Helper to turn "Tools & Supplies" into "tools-and-supplies"
const slugify = (text: string) => 
  text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default async function AllCategoriesPage() {
  const blogPosts = getAllPosts('blog');
  const reviewPosts = getAllPosts('reviews');
  const allPosts = [...blogPosts, ...reviewPosts];

  // Extract unique categories automatically from your MDX files
  const categorySet = new Set<string>();
  allPosts.forEach(post => {
    if (post.meta.category) categorySet.add(post.meta.category);
  });

  const categories = Array.from(categorySet).map(cat => ({
    title: cat,
    slug: slugify(cat),
    description: `Browse all articles and reviews about ${cat}.`
  }));

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-700 mb-8 transition">
           <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12 flex items-center gap-3">
          <Layers className="text-green-700"/> All Collections
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="block bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-green-700 transition group">
              <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-green-700 mb-3">
                {cat.title}
              </h3>
              <p className="text-gray-500">{cat.description}</p>
              <span className="inline-block mt-6 text-sm font-bold text-green-700 underline">View Collection</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}