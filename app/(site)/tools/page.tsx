import Link from "next/link";
import { client } from "@/app/lib/sanity"; // Import Sanity connection
import { urlFor } from "@/app/lib/sanity";
import { ShoppingCart, ExternalLink, ArrowLeft } from "lucide-react";

export const revalidate = 0; // Disable cache so new tools appear instantly

export const metadata = {
  title: "Builder's Toolkit | CraftsAndKits",
  description: "The essential tools and supplies you need for miniature building.",
};

async function getData() {
  // Fetch all documents of type "tool" from Sanity
  const query = `*[_type == "tool"] | order(_createdAt asc)`;
  const data = await client.fetch(query);
  return data;
}

export default async function ToolsPage() {
  const tools = await getData();

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      
      {/* Header Banner */}
      <div className="bg-white border-b border-stone-200 pt-12 pb-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-green-700 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back Home
          </Link>
          <span className="block text-orange-600 font-bold tracking-widest text-xs uppercase mb-3">
            Curated by Experts
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 font-[family-name:var(--font-dancing)] mb-4">
            The Builder's Shop
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stop buying cheap kits that break. These are the specific tools we use every day to build professional-looking miniatures.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool: any) => (
              <div key={tool._id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300 flex flex-col group">
                
                {/* Image Area */}
                <div className="relative h-48 w-full bg-gray-50 rounded-xl overflow-hidden mb-6 border border-gray-100">
                  {tool.image ? (
                    <img 
                      src={urlFor(tool.image).url()} 
                      alt={tool.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                  
                  {/* Category Badge */}
                  {tool.category && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-500 shadow-sm">
                      {tool.category}
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>

                {/* Button */}
                {tool.amazonLink ? (
                  <a 
                    href={tool.amazonLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-lg shadow-gray-200"
                  >
                    <ShoppingCart size={18} />
                    Check Price on Amazon
                    <ExternalLink size={14} className="opacity-50" />
                  </a>
                ) : (
                  <button disabled className="w-full bg-gray-200 text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed">
                    Out of Stock
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">Loading tools... </p>
            <p className="text-xs text-gray-400">(If empty, go to Sanity Studio and add a new "Tool")</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-center mt-16 text-gray-400 text-xs max-w-2xl mx-auto">
          <p>
            CraftsAndKits is a participant in the Amazon Services LLC Associates Program. 
            As an Amazon Associate, we earn from qualifying purchases. Prices and availability are subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}