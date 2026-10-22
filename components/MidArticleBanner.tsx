import Link from 'next/link';

export default function MidArticleBanner() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-10 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            Struggling with tiny wires and messy glue?
          </h4>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Don't ruin your $50 kit. Learn the exact techniques to perfectly hide battery packs, apply micro-decals, and fix broken wooden parts before you start building.
          </p>
          <Link 
            href="https://craftsman353.gumroad.com/l/miniature-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors"
          >
            Get the Zero to Finished Guide
          </Link>
        </div>
      </div>
    </div>
  );
}