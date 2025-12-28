import Image from "next/image";

// 1. HARDCODED DATA (Bypassing Sanity)
const TABLE_DATA = {
  title: "Metal Earth vs. Piececool: The Decision Matrix",
  products: [
    {
      name: "Metal Earth",
      image: "https://m.media-amazon.com/images/I/71F2-c7+gEL._AC_SL1500_.jpg", // Use actual image URLs here
      badge: "Best for Beginners",
      rating: 4.5,
      features: [
        "Affordable ($10-15)",
        "Licensed Themes (Star Wars)",
        "1-2 Hour Builds"
      ],
      link: "https://www.amazon.com/s?k=metal+earth", // Your affiliate link
      buttonText: "Shop Metal Earth",
      affiliateSource: "amazon"
    },
    {
      name: "Piececool",
      image: "https://m.media-amazon.com/images/I/81w+9-c7+gEL._AC_SL1500_.jpg", // Use actual image URLs here
      badge: "Best for Display",
      rating: 5,
      features: [
        "Premium Brass",
        "Large Scale",
        "8+ Hour Builds"
      ],
      link: "https://www.amazon.com/s?k=piececool", // Your affiliate link
      buttonText: "Shop Piececool",
      affiliateSource: "amazon"
    }
  ]
};

export default function ComparisonTable({ value }: { value: any }) {
  // 2. IGNORE SANITY DATA, USE HARDCODED DATA
  // const { title, products } = value; <--- Deleted this line
  const { title, products } = TABLE_DATA; // <--- Added this line

  if (!products || products.length === 0) return null;

  const getButtonStyle = (source: string | undefined) => {
    switch (source) {
      case 'amazon': return "bg-[#FF9900] hover:bg-[#ffad33] text-white";
      case 'shareasale': return "bg-blue-600 hover:bg-blue-700 text-white";
      default: return "bg-green-600 hover:bg-green-700 text-white";
    }
  };

  const getSourceLabel = (source: string | undefined) => {
    switch (source) {
      case 'amazon': return "at Amazon";
      case 'shareasale': return "Official Store";
      default: return "Check Price";
    }
  };

  return (
    <div className="my-10 border border-stone-200 rounded-xl overflow-hidden shadow-sm bg-white not-prose">
      {title && (
        <div className="bg-stone-50 p-4 border-b border-stone-200">
          <h3 className="text-xl font-bold text-gray-900 m-0">{title}</h3>
        </div>
      )}

      {/* DESKTOP VIEW */}
      <div className="hidden md:block">
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
            {products.map((product: any, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 align-middle">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-100 bg-white">
                     {/* NOTE: Using standard img tag to avoid Next/Image config errors for external URLs */}
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="object-contain w-full h-full p-1"
                    />
                  </div>
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
                      <span key={i} className="text-lg">{i < (product.rating || 0) ? "★" : "☆"}</span>
                    ))}
                  </div>
                </td>
                <td className="p-4 align-middle">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features && product.features.map((feat: string, i: number) => (
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
                    className={`block w-full text-center font-bold py-2.5 px-3 rounded-lg shadow-sm transform hover:-translate-y-0.5 transition-all text-sm ${getButtonStyle(product.affiliateSource)}`}
                  >
                    {product.buttonText || "Check Price"}
                  </a>
                  <div className="text-[10px] text-center text-gray-400 mt-1.5">
                    {getSourceLabel(product.affiliateSource)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden divide-y divide-stone-100">
        {products.map((product: any, idx: number) => (
          <div key={idx} className="p-4 flex flex-col gap-4">
             <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-lg border border-stone-100 bg-white flex-shrink-0">
                  <img src={product.image} alt={product.name} className="object-contain w-full h-full p-1" />
                </div>
                <div>
                   {product.badge && (
                      <span className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 rounded">
                        {product.badge}
                      </span>
                   )}
                   <h4 className="font-bold text-gray-900 leading-tight">{product.name}</h4>
                   <div className="flex items-center gap-1 mt-1 text-yellow-400">
                      <span className="font-bold text-sm">★ {product.rating}</span>
                   </div>
                </div>
             </div>
             
             <ul className="text-sm text-gray-600 space-y-1 pl-1 border-l-2 border-stone-100">
                {product.features && product.features.map((feat: string, i: number) => (
                  <li key={i} className="pl-2">{feat}</li>
                ))}
             </ul>

             <a 
                href={product.link} 
                target="_blank" 
                rel="nofollow noreferrer sponsored"
                className={`block w-full text-center font-bold py-3 px-4 rounded-lg shadow-sm ${getButtonStyle(product.affiliateSource)}`}
              >
                {product.buttonText || "Check Price"}
              </a>
          </div>
        ))}
      </div>
    </div>
  );
}