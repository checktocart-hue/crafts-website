import Image from "next/image";
import { Star, Check, ExternalLink } from "lucide-react";

interface AmazonProductCardProps {
  title: string;
  badge?: string;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  features?: string[];
  amazonUrl: string;
}

export default function AmazonProductCard({
  title,
  badge,
  imageUrl,
  rating = 4.8,
  reviewCount = 150,
  features = [],
  amazonUrl,
}: AmazonProductCardProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Top Header Badge */}
      {badge && (
        <div className="bg-green-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
          {badge}
        </div>
      )}

      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
        {/* Product Image */}
        <div className="relative mx-auto h-48 w-48 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2 border border-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow space-y-3">
          <h3 className="text-xl font-bold text-gray-900 leading-snug">
            {title}
          </h3>

          {/* Ratings Display */}
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  className={i < Math.floor(rating) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {rating} / 5
            </span>
            <span className="text-xs text-gray-400">({reviewCount}+ reviews)</span>
          </div>

          {/* Key Features List */}
          {features.length > 0 && (
            <ul className="space-y-1.5 text-sm text-gray-600 pt-1">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Call-to-Action Button */}
          <div className="pt-3">
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-extrabold text-gray-950 shadow-sm transition-all hover:bg-amber-400 hover:shadow-md sm:w-auto"
            >
              <span>Check Price on Amazon</span>
              <ExternalLink size={16} />
            </a>
            <p className="mt-1.5 text-[11px] text-gray-400 italic">
              As an Amazon Associate, Crafts & Kits earns from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}