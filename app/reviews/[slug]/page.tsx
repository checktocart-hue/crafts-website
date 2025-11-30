import Link from 'next/link';
import { Check, Star, ShoppingCart, ArrowLeft, ShieldCheck } from 'lucide-react';
import { client } from '@/app/lib/sanity';
import CustomPortableText from '@/app/components/CustomPortableText'; // <--- The New Component
import AdUnit from '@/app/components/AdUnit';
import { Metadata } from 'next';

// 1. HELPER: Fetch data
async function getReview(slug: string) {
  const query = `*[_type == "review" && slug.current == "${slug}"][0] {
    title,
    description,
    rating,
    price,
    affiliateLink,
    body,
    seo {
      metaTitle,
      metaDescription,
      focusKeyword
    }
  }`;
  return await client.fetch(query);
}

// 2. SEO MAGIC
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params; 
  const review = await getReview(slug);

  if (!review) return { title: 'Review Not Found' };

  return {
    title: review.seo?.metaTitle || review.title, 
    description: review.seo?.metaDescription || review.description,
  }
}

// 3. THE PAGE CONTENT
export default async function ReviewArticle({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const review = await getReview(slug);

  if (!review) return <div className="p-12 text-center">Review not found!</div>;

  return (
    <div className="bg-white min-h-screen">
      {/* Top Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdUnit format="horizontal" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Main Content */}
        <main className="lg:col-span-8">
          <Link href="/reviews" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition">
            <ArrowLeft size={16} /> Back to Reviews
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {review.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-500 text-sm mb-8 border-b border-gray-100 pb-8">
            <span className="flex items-center gap-1 text-primary font-bold bg-green-50 px-3 py-1 rounded-full">
              <ShieldCheck size={14}/> Tested Verified
            </span>
            <span>Updated Nov 2025</span>
          </div>

          {/* AFFILIATE HERO BOX */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 mb-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#FF9900] text-black text-xs font-bold px-4 py-1.5 uppercase">
              Top Pick
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-48 h-48 bg-white rounded-xl flex items-center justify-center border border-gray-100 text-gray-300">
                [Image]
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-bold mb-2">{review.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                   <div className="flex text-yellow-400"><Star className="fill-current" size={18}/> {review.rating}.0</div>
                   <span className="text-gray-400">•</span>
                   <span className="text-gray-600 font-bold">{review.price}</span>
                </div>
                
                <a 
                  href={review.affiliateLink || "#"} 
                  target="_blank"
                  className="bg-gray-900 text-white w-full py-4 rounded-xl font-bold text-lg hover:bg-[#FF9900] hover:text-black transition flex items-center justify-center gap-2 shadow-lg mb-3"
                >
                  <ShoppingCart size={20}/> Check Price on Amazon
                </a>
              </div>
            </div>
          </div>

          {/* ARTICLE BODY */}
          <div className="prose prose-lg prose-stone max-w-none">
             {/* Show Description as Intro */}
            <p className="lead text-xl text-gray-600 italic border-l-4 border-primary pl-6 mb-8">
              {review.description}
            </p>
            
            <AdUnit format="square" />

            <div className="mt-8">
              {/* Using the Custom Component here to render Tables */}
              {review.body ? <CustomPortableText value={review.body} /> : <p className="text-gray-400">Content loading...</p>}
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            <div className="mb-8">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Advertisement</span>
              <AdUnit format="square" />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}