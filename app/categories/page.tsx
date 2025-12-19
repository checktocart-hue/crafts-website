import Link from 'next/link';
import { client } from '@/app/lib/sanity';
import Header from '@/app/components/Header';
import { ArrowLeft, Layers } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getCategories() {
  return await client.fetch(`*[_type == "category"] {
    title,
    "slug": slug.current,
    description
  }`);
}

export default async function AllCategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition">
           <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12 flex items-center gap-3">
          <Layers className="text-primary"/> All Collections
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat: any) => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`} className="block bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-primary transition group">
              <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-primary mb-3">
                {cat.title}
              </h3>
              <p className="text-gray-500">{cat.description || "Browse collection..."}</p>
              <span className="inline-block mt-6 text-sm font-bold text-primary underline">View Kits</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}