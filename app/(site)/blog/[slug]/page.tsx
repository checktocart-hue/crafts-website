import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import TableOfContents from '@/components/TableOfContents';
import BuildersResourceWidget from '@/components/BuildersResourceWidget';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  let post = null;
  const collections = ["blog", "reviews"];

  for (const col of collections) {
    const q = query(collection(db, col), where("slug", "==", params.slug), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      post = snapshot.docs[0].data();
      break;
    }
  }

  if (!post) {
    const docRef = doc(db, "blog", params.slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) post = docSnap.data();
  }

  if (!post) return { title: 'Post Not Found | CraftsAndKits' };

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.content?.substring(0, 155).replace(/(<([^>]+)>)/gi, ""),
  };
}

// Intercepts and parses your custom CKEditor shortcodes into Tailwind React components
const renderContent = (content: string) => {
  // 1. Strip CKEditor's injected <p> tags around shortcodes
  const cleanContent = content.replace(/<p>(\[.*?\]|ADVERTISEMENT)<\/p>/g, '$1');

  // 2. Split string to isolate shortcodes as their own array items
  const parts = cleanContent.split(/(\[WINNER_BOX.*?\]|\[QUICK_PICK.*?\]|\[AMAZON_CARD.*?\]|\[BOUNTY_BUTTON.*?\]|ADVERTISEMENT)/g);

  return parts.map((part, index) => {
    if (!part) return null;

    if (part === 'ADVERTISEMENT') {
      return <div key={index} id="mediavine-target-slot" className="my-8 w-full h-auto min-h-[250px] bg-gray-50 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300">Advertisement Placeholder</div>;
    }

    if (part.startsWith('[WINNER_BOX')) {
      const [, title, text] = part.replace(/^\[WINNER_BOX\s*\|\|\s*/, '').replace(/\]$/, '').split(/\s*\|\|\s*/);
      return (
        <div key={index} className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg shadow-sm">
          <h4 className="text-amber-800 font-bold text-lg mb-2 flex items-center gap-2">
            🏆 {title || 'The Short Answer'}
          </h4>
          <p className="text-amber-900 leading-relaxed m-0">{text}</p>
        </div>
      );
    }

    if (part.startsWith('[QUICK_PICK')) {
      const [, name, desc, link] = part.replace(/^\[QUICK_PICK\s*\|\|\s*/, '').replace(/\]$/, '').split(/\s*\|\|\s*/);
      return (
        <div key={index} className="my-10 border-2 border-blue-600 rounded-xl p-6 bg-white shadow-md relative mt-12">
          <span className="absolute -top-4 left-6 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Top Pick</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-700 mb-4">{desc}</p>
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Check Price on Amazon ↗
          </a>
        </div>
      );
    }

    if (part.startsWith('[AMAZON_CARD')) {
      const [, title, badge, img, link] = part.replace(/^\[AMAZON_CARD\s*\|\|\s*/, '').replace(/\]$/, '').split(/\s*\|\|\s*/);
      return (
        <div key={index} className="my-8 flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="w-full md:w-1/3 flex justify-center items-center relative">
            {badge && badge !== 'none' && (
              <span className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">{badge}</span>
            )}
            <img src={img} alt={title} className="max-h-48 object-contain" />
          </div>
          <div className="w-full md:w-2/3 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
            <a href={link} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto text-center bg-orange-400 hover:bg-orange-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
              View on Amazon ↗
            </a>
          </div>
        </div>
      );
    }

    if (part.startsWith('[BOUNTY_BUTTON')) {
      const [, cta, link] = part.replace(/^\[BOUNTY_BUTTON\s*\|\|\s*/, '').replace(/\]$/, '').split(/\s*\|\|\s*/);
      return (
        <div key={index} className="my-6">
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block w-full md:w-auto text-center bg-orange-400 hover:bg-orange-500 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-sm transition-transform hover:scale-105">
            {cta}
          </a>
        </div>
      );
    }

    // Normal text goes back through ReactMarkdown, completely avoiding Hydration errors
    if (part.trim() === '') return null;
    return (
      <ReactMarkdown
        key={index}
        components={{
          p: ({ node, ...props }) => <div className="mb-6 leading-relaxed text-gray-800" {...props} />
        }}
      >
        {part}
      </ReactMarkdown>
    );
  });
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post = null;
  const collections = ["blog", "reviews"];

  for (const col of collections) {
    const q = query(collection(db, col), where("slug", "==", params.slug), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      post = snapshot.docs[0].data();
      break;
    }
  }

  if (!post) {
    const docRef = doc(db, "blog", params.slug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) post = docSnap.data();
  }

  if (!post) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-12">
      {/* Sticky Left Sidebar */}
      <aside className="w-full lg:w-1/4 flex flex-col gap-8 hidden lg:flex relative">
        <div className="sticky top-24">
          <TableOfContents />
          <div className="mt-8">
            <BuildersResourceWidget />
          </div>
        </div>
      </aside>

      {/* Main Content Body */}
      <article className="w-full lg:w-3/4">
        <header className="mb-10">
          <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-2">{post.category}</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 text-sm border-b border-gray-200 pb-8">
            <span>By <strong>Rashy Michaels</strong></span>
            <span>•</span>
            <span>{post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : 'Recently Updated'}</span>
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">As an Amazon Associate I earn from qualifying purchases.</p>
        </header>

        <div className="prose prose-lg max-w-none">
          {renderContent(post.content || '')}
        </div>

        {/* In-Article Gumroad Pitch */}
        <div className="mt-16 p-8 bg-blue-900 text-white rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Tired of Breaking Laser-Cut Wood and Messing Up Your Wiring?</h3>
          <p className="mb-6 opacity-90">Grab my 6-module beginner's blueprint, <em>Zero to Finished</em>, and learn how to build flawless, fully-lit dioramas the right way.</p>
          <a href="https://craftsman353.gumroad.com/l/miniature-guide" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-blue-900 font-bold py-4 px-8 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            Get the Blueprint for $14.99 ↗
          </a>
        </div>
      </article>

      {/* Mobile-Only Sticky Bottom CTA */}
      {post.affiliateLink && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden z-50 flex justify-center">
          <a href={post.affiliateLink} target="_blank" rel="noopener noreferrer" className="w-full max-w-md text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-colors">
            Check Current Price ↗
          </a>
        </div>
      )}
    </div>
  );
}