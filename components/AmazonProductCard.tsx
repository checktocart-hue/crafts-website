interface AmazonProductCardProps {
  title: string;
  badge?: string;
  amazonUrl: string;
}

export default function AmazonProductCard({ title, badge, amazonUrl }: AmazonProductCardProps) {
  return (
    <span className="block my-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Top Header Badge */}
      {badge && (
        <span className="block bg-green-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
          {badge}
        </span>
      )}

      <span className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 p-6">
        <strong className="block text-xl md:text-2xl font-bold text-gray-900 font-serif leading-tight m-0">
          {title}
        </strong>
        
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center bg-amber-500 hover:bg-amber-400 text-gray-950 font-extrabold px-6 py-3.5 rounded-xl transition-transform hover:scale-105 shadow-sm border-b-4 border-amber-600 hover:border-amber-500 uppercase tracking-widest no-underline mt-2"
        >
          Check Price on Amazon ↗
        </a>
      </span>
    </span>
  );
}