import { ExternalLink, ShieldCheck, Wrench, Star, Sparkles } from "lucide-react";

export const metadata = {
  title: "Essential Builder's Toolkit | Crafts and Kits",
  description: "Field-tested, high-precision tools for building miniatures, dollhouses, and 3D metal models.",
};

// TypeScript interface for clean, type-safe data
type GearItem = {
  id: string;
  name: string;
  description: string;
  merchant: string;
  url: string;
  image: string;
  category: string;
  badge?: string;
};

// Your Curated Product List (Easily swap or add items here)
const gearList: GearItem[] = [
  {
    id: "g1",
    name: "Precision Hobby Knife Set & Extra Blades",
    description: "Surgical-grade steel blades for ultra-clean cuts on balsa wood, cardstock, and intricate decals without tearing.",
    merchant: "Amazon",
    url: "YOUR_AFFILIATE_LINK_HERE",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    category: "Cutting & Trimming",
    badge: "Must-Have",
  },
  {
    id: "g2",
    name: "Anti-Static Fine Tweezers (ESD-15)",
    description: "Ultra-fine angled tweezers essential for bending microscopic 3D metal model tabs and positioning tiny wooden miniatures.",
    merchant: "Amazon",
    url: "YOUR_AFFILIATE_LINK_HERE",
    image: "https://images.unsplash.com/photo-1584065796245-8178a946b539?auto=format&fit=crop&w=800&q=80",
    category: "Precision Assembly",
    badge: "Top Pick",
  },
  {
    id: "g3",
    name: "Quick-Dry Clear Craft Glue",
    description: "Fast-tacking adhesive that dries 100% transparent. Won't warp delicate wallpaper or leave glossy residue on wooden kits.",
    merchant: "Amazon",
    url: "YOUR_AFFILIATE_LINK_HERE",
    image: "https://images.unsplash.com/photo-1587582423116-ec07293f0395?auto=format&fit=crop&w=800&q=80",
    category: "Adhesives",
    badge: "Essential",
  },
];

export default function ToolsShopPage() {
  return (
    <div className="bg-stone-50 min-h-screen pb-20">
      {/* 1. HERO HEADER */}
      <section className="bg-white border-b border-stone-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-700 rounded-2xl mb-2 shadow-sm">
            <Wrench size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
            The Essential Builder's Toolkit
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto font-light">
            Cheap included tools cause broken parts and frustration. We've field-tested hundreds of tools to curate the exact gear that makes miniature building smooth and enjoyable.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
              <ShieldCheck size={16} className="text-green-600" /> Tested on 50+ Builds
            </span>
            <span className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full border border-stone-200">
              <Star size={16} className="text-yellow-500" /> Beginner Friendly
            </span>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gearList.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image & Category Tag */}
              <div className="relative h-64 w-full bg-stone-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                      <Sparkles size={12} /> {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-green-700 transition-colors">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed font-normal">
                  {item.description}
                </p>
                
                {/* Curiosity Click CTA Button */}
                <div className="pt-4 border-t border-stone-100 mt-auto">
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3.5 rounded-2xl text-sm font-bold hover:bg-green-700 transition-all shadow-sm hover:shadow-green-900/20"
                  >
                    Check Price on {item.merchant} <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}