import React, { Suspense } from 'react';
import Link from 'next/link';

// If you have an existing function or array of posts/articles, import or fetch it here
// e.g., import { getAllPosts } from '@/lib/posts';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const query = q.trim().toLowerCase();

  // Replace this with your actual posts data fetching logic
  // Example dummy structure:
  const allPosts = [
    {
      title: 'Cutebee vs. Rolife: Which Brand is Better?',
      slug: 'cutebee-vs-rolife-which-brand-is-better',
      description: 'A detailed breakdown of build difficulty, lighting, and materials between Cutebee and Rolife.',
    },
    {
      title: 'Piececool vs. Metal Earth',
      slug: 'piececool-vs-metal-earth',
      description: 'Comparing brass vs steel sheets, complexity, and detail in metal model kits.',
    },
    {
      title: 'The Ultimate Guide to Book Nook Kits',
      slug: 'the-ultimate-guide-to-book-nook-kits',
      description: 'How to choose, build, and display miniature bookshelf dioramas.',
    },
  ];

  const filteredPosts = query
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-2">
        Search Results
      </h1>
      <p className="text-zinc-600 mb-8">
        {query ? (
          <>
            Showing results for: <span className="font-semibold text-zinc-900">"{query}"</span>
          </>
        ) : (
          'Please enter a search term above.'
        )}
      </p>

      {query && filteredPosts.length === 0 ? (
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 text-center text-zinc-600">
          No articles found matching <strong className="text-zinc-900">"{query}"</strong>.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="p-6 bg-white border border-zinc-200 rounded-2xl hover:border-amber-500 transition-colors shadow-sm"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {post.description}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Page(props: SearchPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="p-12 text-center text-zinc-500">Loading search...</div>}>
        <SearchResults {...props} />
      </Suspense>
    </main>
  );
}