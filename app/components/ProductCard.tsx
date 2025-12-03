import Link from 'next/link';
import { Star, Check, ShoppingCart } from 'lucide-react';

interface ProductProps {
  title: string;
  rating: number;
  price: string;
  features: string[];
  link: string;
  tag?: string;
  imageUrl?: string; // <--- This allows the card to receive an image
}

export default function ProductCard({ title, rating, price, features, link, tag, imageUrl }: ProductProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative overflow-hidden group">
      
      {/* 1. The Badge (e.g. "Best Overall") */}
      {tag && (
        <div className="absolute top-0 left-0 bg-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-br-lg uppercase tracking-widest z-10">
          {tag}
        </div>
      )}

      {/* 2. Image Area (Dynamic) */}
      <div className="h-48 bg-stone-100 relative flex items-center justify-center group-hover:bg-stone-50 transition overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-contain p-4 transition duration-500 group-hover:scale-105" 
          />
        ) : (
          // Fallback if no image exists
          <div className="text-stone-300 font-serif text-4xl opacity-20">Image</div>
        )}
        
        {/* Overlay Button (Appears on Hover) */}
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
           <Link href={link} className="bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
             Read Review
           </Link>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} />
          ))}
          <span className="text-xs text-gray-400 ml-2 font-bold">Verified</span>
        </div>

        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 leading-tight">
          <Link href={link} className="hover:text-primary transition">{title}</Link>
        </h3>
        
        <ul className="space-y-2 mb-6 text-sm text-gray-500 flex-grow">
          {features && features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check size={16} className="text-green-500 shrink-0 mt-0.5" /> 
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>

        {/* 3. The Price/Action Bar */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">Best Price</span>
            <span className="text-xl font-bold text-gray-900">{price}</span>
          </div>
          <Link href={link} className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-bold text-sm hover:bg-primary transition shadow-md flex items-center justify-center gap-2">
            <ShoppingCart size={16} /> 
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
}