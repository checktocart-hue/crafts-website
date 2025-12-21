import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";

interface Product {
  name: string;
  image: any;
  badge?: string;
  rating?: number;
  features?: string[];
  link: string;
  buttonText: string;
}

export default function ComparisonTable({ value }: { value: any }) {
  const { title, products } = value;

  if (!products || products.length === 0) return null;

  return (
    <div className="my-10 border border-stone-200 rounded-xl overflow-hidden shadow-sm bg-white not-prose">
      {/* Table Header */}
      {title && (
        <div className="bg-stone-50 p-4 border-b border-stone-200">
          <h3 className="text-xl font-bold text-gray-900 m-0">{title}</h3>
        </div>
      )}

      <div className="hidden md:block">
        {/* DESKTOP VIEW */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 text-sm text-gray-500 uppercase tracking-wider">
              <th className="p-4 font-medium w-[15%]">Image</th>
              <th className="p-4 font-medium w-[25%]">Product</th>
              <th className="p-4 font-medium w-[20%]">Rating</th>
              <th className="p-4 font-medium w-[20%]">Features</th>
              <th className="p-4 font-medium w-[20%]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map((product: Product, idx: number) => (
              <tr key={idx} className="hover:bg-green-50/30 transition-colors">
                <td className="p-4 align-middle">
                  {product.image && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-100 bg-white">
                      <Image 
                        src={urlFor(product.image).url()} 
                        alt={product.name} 
                        fill 
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                </td>
                <td className="p-4 align-middle">
                  {product.badge && (
                    <span className="inline-block px-2 py-0.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 rounded">
                      {product.badge}
                    </span>
                  )}
                  <div className="font-bold text-gray-900">{product.name}</div>
                </td>
                <td className="p-4 align-middle">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < (product.rating || 0) ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{product.rating}/5</span>
                </td>
                <td className="p-4 align-middle">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features && product.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-4 align-middle">
                  <a 
                    href={product.link} 
                    target="_blank" 
                    rel="nofollow noreferrer sponsored"
                    className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-3 rounded-lg shadow-sm transform hover:-translate-y-0.5 transition-all text-sm"
                  >
                    {product.buttonText || "Check Price"}
                  </a>
                  <div className="text-[10px] text-center text-gray-400 mt-1.5">
                    at Amazon
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW (Stacked Cards) */}
      <div className="md:hidden divide-y divide-stone-100">
        {products.map((product: Product, idx: number) => (
          <div key={idx} className="p-4 flex flex-col gap-4">
             <div className="flex items-start gap-4">
                {product.image && (
                    <div className="relative w-20 h-20 rounded-lg border border-stone-100 bg-white flex-shrink-0">
                      <Image src={urlFor(product.image).url()} alt={product.name} fill className="object-contain p-1" />
                    </div>
                )}
                <div>
                   {product.badge && (
                      <span className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 rounded">
                        {product.badge}
                      </span>
                   )}
                   <h4 className="font-bold text-gray-900 leading-tight">{product.name}</h4>
                   <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 font-bold text-sm">★ {product.rating}</span>
                   </div>
                </div>
             </div>
             
             <ul className="text-sm text-gray-600 space-y-1 pl-1 border-l-2 border-stone-100">
                {product.features && product.features.map((feat, i) => (
                  <li key={i} className="pl-2">{feat}</li>
                ))}
             </ul>

             <a 
                href={product.link} 
                target="_blank" 
                rel="nofollow noreferrer sponsored"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm"
              >
                {product.buttonText || "Check Price"}
              </a>
          </div>
        ))}
      </div>
    </div>
  );
}