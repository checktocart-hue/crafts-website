import Link from 'next/link';
import { client } from '@/app/lib/sanity';
import Header from '@/app/components/Header';
import { PlayCircle, Clock, Hammer } from 'lucide-react';
import AdUnit from '@/app/components/AdUnit';

// Force dynamic so new articles appear instantly
export const dynamic = 'force-dynamic';

async function getProjects() {
  return await client.fetch(`*[_type == "project"] {
    title,
    "slug": slug.current,
    excerpt,
    "imageUrl": mainImage.asset->url,
    _createdAt
  }`);
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-stone-50">
      <Header />
      
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-gray-100 py-16 text-center">
        <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4">Builder's Guides</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Step-by-step tutorials, painting techniques, and wiring guides for your miniature world.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Ad Slot */}
        <AdUnit slot="8932479234" format="horizontal" />

        {/* 2. THE GRID */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {projects.length > 0 ? (
            projects.map((post: any) => (
              <Link key={post.slug} href={`/projects/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">
                {/* Image Area */}
                <div className="h-56 bg-gray-200 relative overflow-hidden">
                   {post.imageUrl ? (
                     <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Hammer size={40} className="opacity-20"/>
                     </div>
                   )}
                   {/* Play Icon Overlay */}
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition flex items-center justify-center">
                      <PlayCircle className="text-white opacity-80 group-hover:scale-110 transition" size={48} />
                   </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest mb-3">
                    <Clock size={12} /> 10 Min Read
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 group-hover:text-primary transition leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {post.excerpt || "Click to read the full guide..."}
                  </p>
                  <span className="inline-block mt-4 text-sm font-bold text-gray-900 border-b-2 border-primary/20 group-hover:border-primary transition">
                    Read Tutorial
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-gray-400 text-xl">No guides yet. Go to Sanity Dashboard to write one!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}