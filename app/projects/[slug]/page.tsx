import { client } from '@/app/lib/sanity';
import CustomPortableText from '@/app/components/CustomPortableText'; // <--- The New Component
import Header from '@/app/components/Header';
import AdUnit from '@/app/components/AdUnit';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Metadata } from 'next';

// 1. Helper to fetch data
async function getProject(slug: string) {
  return await client.fetch(`*[_type == "project" && slug.current == "${slug}"][0] {
    title,
    body,
    "imageUrl": mainImage.asset->url,
    _createdAt,
    seo {
      metaTitle,
      metaDescription,
      focusKeyword
    }
  }`);
}

// 2. SEO MAGIC
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: 'Guide Not Found' };

  return {
    title: project.seo?.metaTitle || project.title, 
    description: project.seo?.metaDescription || "Read our step-by-step DIY guide.",
  }
}

// 3. Page Content
export default async function ProjectArticle({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return <div>Not Found</div>;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-12">
        
        {/* LEFT: Main Article (8 Cols) */}
        <div className="lg:col-span-8">
           <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition">
             <ArrowLeft size={16} /> Back to Guides
           </Link>

           <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900 leading-tight">
             {project.title}
           </h1>

           <div className="flex items-center gap-6 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
             <span className="flex items-center gap-2"><User size={16}/> By CraftsAndKits Team</span>
             <span className="flex items-center gap-2"><Calendar size={16}/> Updated Recently</span>
           </div>

           {project.imageUrl && (
             <img src={project.imageUrl} alt={project.title} className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-sm" />
           )}

           {/* Ad before content */}
           <div className="mb-10">
             <AdUnit format="horizontal" />
           </div>

           <div className="prose prose-lg prose-stone max-w-none">
              {/* Using the Custom Component here to render Tables */}
              <CustomPortableText value={project.body} />
           </div>
        </div>

        {/* RIGHT: Sidebar (4 Cols) */}
        <div className="hidden lg:block lg:col-span-4">
           <div className="sticky top-24 space-y-8">
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                <h3 className="font-serif font-bold text-xl mb-2">Join the Club</h3>
                <p className="text-gray-600 text-sm mb-4">Get weekly miniature tips and kit discounts.</p>
                <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg border border-gray-200 mb-2" />
                <button className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-green-700">Subscribe</button>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Advertisement</span>
                <AdUnit format="square" />
              </div>
           </div>
        </div>

      </article>
    </main>
  );
}