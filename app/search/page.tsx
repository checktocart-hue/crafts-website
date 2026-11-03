import React, { Suspense } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; cat?: string }>;
}

interface IndexedPost {
  id: string;
  col: 'blog' | 'reviews';
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  description: string;
  searchBlob: string;
  updatedAt: string;
}

// Strips HTML tags, entities, and custom shortcodes so body text is clean for excerpts & searching
function cleanHtmlAndShortcodes(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[(WINNER_BOX|QUICK_PICK|AMAZON_CARD|BOUNTY_BUTTON|GUMROAD_BOX)[\s\S]*?\]/gi, ' ')
    .replace(/ADVERTISEMENT/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Fetches all published posts from both "blog" and "reviews" collections in Firestore
async function getAllPublishedPosts(): Promise<IndexedPost[]> {
  const posts: IndexedPost[] = [];

  try {
    const [blogSnap, reviewSnap] = await Promise.all([
      getDocs(collection(db, 'blog')),
      getDocs(collection(db, 'reviews')),
    ]);

    const processDoc = (docSnap: any, colName: 'blog' | 'reviews') => {
      const data = docSnap.data();
      // Exclude unpublished drafts
      if (data.status && data.status !== 'published') return;
      if (!data.title || !data.slug) return;

      const plainBody = cleanHtmlAndShortcodes(data.content || '');
      const description =
        data.metaDescription ||
        (plainBody.length > 165 ? plainBody.substring(0, 165) + '...' : plainBody);

      const searchBlob = [
        data.title || '',
        data.seoTitle || '',
        (data.slug || '').replace(/-/g, ' '),
        data.category || '',
        data.metaDescription || '',
        plainBody,
      ]
        .join(' ')
        .toLowerCase();

      posts.push({
        id: docSnap.id,
        col: colName,
        title: data.title,
        slug: data.slug,
        category: data.category || (colName === 'blog' ? 'Guides' : 'Reviews'),
        coverImage: data.coverImage || '',
        description,
        searchBlob,
        updatedAt: data.updatedAt || data.createdAt || '',
      });
    };

    blogSnap.forEach((d) => processDoc(d, 'blog'));
    reviewSnap.forEach((d) => processDoc(d, 'reviews'));

    // Sort newest first by default
    posts.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  } catch (error) {
    console.error('Error fetching search index from Firestore:', error);
  }

  return posts;
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams?.q || '';
  const selectedCat = resolvedParams?.cat || '';
  const query = rawQuery.trim().toLowerCase();

  const allPosts = await getAllPublishedPosts();

  // Multi-word relevance scoring so partial queries still match accurately
  const stopWords = new Set(['vs', 'for', 'the', 'and', 'best', 'how', 'to', 'in', 'of', 'a', 'is']);
  const tokens = query
    .split(/\s+/)
    .filter((t) => t.length > 1 && !stopWords.has(t));

  const activeTokens = tokens.length > 0 ? tokens : query ? query.split(/\s+/) : [];

  const scoredPosts = allPosts
    .map((post) => {
      if (selectedCat && post.category.toLowerCase() !== selectedCat.toLowerCase()) {
        return { post, score: -1 };
      }

      // If no search query typed yet, show all posts (or category-filtered posts)
      if (!query) {
        return { post, score: 1 };
      }

      let score = 0;
      const lowerTitle = post.title.toLowerCase();
      const lowerSlug = post.slug.replace(/-/g, ' ').toLowerCase();
      const lowerCat = post.category.toLowerCase();
      const lowerDesc = post.description.toLowerCase();

      // High-priority exact phrase matches
      if (lowerTitle.includes(query)) score += 60;
      if (lowerSlug.includes(query)) score += 40;
      if (lowerDesc.includes(query)) score += 25;
      if (post.searchBlob.includes(query)) score += 15;

      // Individual keyword token matches
      for (const token of activeTokens) {
        if (lowerTitle.includes(token)) score += 25;
        else if (lowerSlug.includes(token)) score += 15;
        else if (lowerCat.includes(token)) score += 10;
        else if (lowerDesc.includes(token)) score += 8;
        else if (post.searchBlob.includes(token)) score += 4;
      }

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post);

  const popularTopics = [
    'Rolife',
    'Cutebee',
    'Nooktales',
    'Glue',
    'Lights',
    'Tweezers',
    'Dollhouse',
    'Nippers',
    'Airbrush',
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-3">
        Search Guides &amp; Reviews
      </h1>

      {/* On-Page Search Bar Form */}
      <form action="/search" method="GET" className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          name="q"
          defaultValue={rawQuery}
          placeholder="Search brands (Rolife, Cutebee, GodHand), glues, lighting fixes..."
          className="flex-1 border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm md:text-base"
        />
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm md:text-base cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Quick Topic Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mr-1">
          Popular:
        </span>
        {popularTopics.map((topic) => (
          <Link
            key={topic}
            href={`/search?q=${encodeURIComponent(topic)}`}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              query === topic.toLowerCase()
                ? 'bg-zinc-900 text-white border-zinc-900'
                : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-amber-500 hover:text-amber-600'
            }`}
          >
            {topic}
          </Link>
        ))}
      </div>

      {/* Results Header */}
      <p className="text-zinc-600 mb-6 text-sm">
        {query ? (
          <>
            Found <strong>{scoredPosts.length}</strong>{' '}
            {scoredPosts.length === 1 ? 'result' : 'results'} for:{' '}
            <span className="font-semibold text-zinc-900">&ldquo;{rawQuery}&rdquo;</span>
          </>
        ) : (
          <>
            Browse all <strong>{scoredPosts.length}</strong> published guides &amp; reviews:
          </>
        )}
      </p>

      {/* Results List */}
      {scoredPosts.length === 0 ? (
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 text-center text-zinc-600">
          <p className="mb-4">
            No articles found matching{' '}
            <strong className="text-zinc-900">&ldquo;{rawQuery}&rdquo;</strong>.
          </p>
          <p className="text-xs text-zinc-500 mb-4">
            Try searching a broader keyword like &ldquo;Book Nook&rdquo;, &ldquo;Glue&rdquo;, or &ldquo;Rolife&rdquo;, or browse all guides:
          </p>
          <Link
            href="/search"
            className="inline-block bg-zinc-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {scoredPosts.map((post) => (
            <article
              key={`${post.col}-${post.id}`}
              className="p-6 bg-white border border-zinc-200 rounded-2xl hover:border-amber-500 transition-colors shadow-xs"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col sm:flex-row gap-5 group">
                {post.coverImage && (
                  <div className="w-full sm:w-36 h-32 sm:h-24 flex-shrink-0 bg-zinc-100 rounded-xl overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors mb-1.5">
                    {post.title}
                  </h2>
                  <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </div>
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
      <Suspense fallback={<div className="p-12 text-center text-zinc-500">Searching articles...</div>}>
        <SearchResults {...props} />
      </Suspense>
    </main>
  );
}
