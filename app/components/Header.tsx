import Link from 'next/link';
import { Sprout, Search, Menu, ShoppingBag, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Sprout size={24} className="text-primary group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-dancing)] text-3xl text-gray-900 leading-none mt-1">
                CraftsAndKits
              </span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">The Miniature Guide</span>
            </div>
          </Link>

          {/* MAIN NAVIGATION */}
          <div className="hidden md:flex gap-8 items-center text-sm font-bold tracking-widest text-gray-500">
            <Link href="/" className="hover:text-primary transition">HOME</Link>
            
            {/* Categories Dropdown */}
            <div className="relative group h-20 flex items-center cursor-pointer">
              <span className="group-hover:text-primary transition flex items-center gap-1">
                COLLECTIONS <ChevronDown size={14}/>
              </span>
              <div className="absolute top-16 left-0 w-56 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="py-2 flex flex-col">
                  <Link href="/reviews" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50">
                    📚 Book Nooks
                  </Link>
                  <Link href="/reviews" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50">
                    🏠 DIY Dollhouses
                  </Link>
                  <Link href="/reviews" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50">
                    🤖 Metal Models
                  </Link>
                  <Link href="/reviews" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600">
                    ✂️ Tools & Glue
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/projects" className="hover:text-primary transition">GUIDES</Link>
            <Link href="/about" className="hover:text-primary transition">ABOUT</Link>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-primary transition">
              <Search size={20} />
            </button>
            <Link href="/reviews" className="hidden sm:flex bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-green-800 transition shadow-sm items-center gap-2">
              <ShoppingBag size={14} /> 
              TOP KITS
            </Link>
            <button className="text-gray-900 md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}