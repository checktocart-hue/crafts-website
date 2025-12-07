"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Menu, ShoppingBag, ChevronDown, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setIsMobileMenuOpen(false); 
    }
  };

  return (
    <div className="bg-white sticky top-0 z-50 shadow-md font-sans">
      
      {/* --- ROW 1: LOGO AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center gap-4 relative min-h-[85px]"> 
          
          {/* LEFT: Mobile Menu Trigger */}
          <div className="flex-shrink-0 z-20 md:hidden">
             <button 
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* CENTER: TEXT LOGO (Restored) */}
          <div className={`flex-grow flex justify-center min-w-0 transition-opacity duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'}`}>
            <Link href="/" className="flex flex-col items-center group">
              {/* Main Script Text */}
              <h1 className="font-[family-name:var(--font-dancing)] text-4xl md:text-6xl text-gray-900 leading-none group-hover:text-green-800 transition-colors text-center whitespace-nowrap">
                Crafts & Kits
              </h1>
              {/* Tagline */}
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-green-700 uppercase mt-1 border-t border-green-700 pt-0.5 pb-1">
                The Miniature Guide
              </span>
            </Link>
          </div>

          {/* RIGHT: Actions & Search */}
          <div className="flex items-center gap-3 flex-shrink-0 z-20">
            
            {/* SEARCH BAR OVERLAY (Desktop & Mobile) */}
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white flex items-center transition-all duration-300 ease-in-out shadow-lg rounded-full ${isSearchOpen ? 'w-full max-w-[300px] opacity-100 visible p-1' : 'w-0 opacity-0 invisible overflow-hidden'}`}>
               <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search..." 
                    className="w-full px-4 py-2 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {/* Close Search */}
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100">
                    <X size={18} />
                  </button>
               </form>
            </div>

            {/* Search Icon Button (Visible when search is closed) */}
            <button 
              className={`text-gray-400 hover:text-green-700 transition ${isSearchOpen ? 'hidden' : 'block'}`}
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={22} />
            </button>

            <Link href="/reviews" className="hidden sm:flex bg-green-700 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-green-800 transition shadow-sm items-center gap-2">
              <ShoppingBag size={14} /> 
              <span className="hidden lg:inline">TOP KITS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- ROW 2: NAVIGATION BAR (Solid Green) --- */}
      <div className="hidden md:block bg-green-700 border-t border-green-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-10 lg:gap-12 text-sm font-bold tracking-widest text-white py-2">
            
            <Link href="/" className="hover:text-green-200 transition border-b-2 border-transparent hover:border-green-200">
              HOME
            </Link>
            
            {/* REVIEWS DROPDOWN */}
            <div className="relative group cursor-pointer border-b-2 border-transparent hover:border-green-200">
              <Link href="/reviews" className="group-hover:text-green-200 transition flex items-center gap-1">
                REVIEWS <ChevronDown size={12}/>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-xl rounded-b-xl border-x border-b border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                <div className="py-2 flex flex-col text-left">
                  <div className="px-5 py-2 text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50">Browse Categories</div>
                  <Link href="/reviews?cat=book-nooks" className="px-5 py-3 hover:bg-green-50 hover:text-green-700 text-gray-600 border-b border-gray-50 font-normal tracking-normal text-sm">📚 Book Nooks</Link>
                  <Link href="/reviews?cat=dollhouses" className="px-5 py-3 hover:bg-green-50 hover:text-green-700 text-gray-600 border-b border-gray-50 font-normal tracking-normal text-sm">🏠 Dollhouses</Link>
                  <Link href="/reviews?cat=metal-models" className="px-5 py-3 hover:bg-green-50 hover:text-green-700 text-gray-600 border-b border-gray-50 font-normal tracking-normal text-sm">🤖 Metal Models</Link>
                  <Link href="/reviews" className="px-5 py-3 text-center text-green-700 font-bold hover:bg-green-50 text-xs uppercase tracking-widest">View All Reviews</Link>
                </div>
              </div>
            </div>

            <Link href="/blog" className="hover:text-green-200 transition border-b-2 border-transparent hover:border-green-200">
              BLOG & GUIDES
            </Link>
            <Link href="/about" className="hover:text-green-200 transition border-b-2 border-transparent hover:border-green-200">
              OUR STORY
            </Link>
            <Link href="/contact" className="hover:text-green-200 transition border-b-2 border-transparent hover:border-green-200">
              CONTACT
            </Link>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-28 px-6 md:hidden overflow-y-auto animate-in fade-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col space-y-6 text-lg font-bold text-gray-800 text-center">
            
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearchSubmit} className="flex border border-gray-300 rounded-lg overflow-hidden mx-auto w-full max-w-xs mb-4">
              <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="flex-grow px-4 py-2 outline-none text-base"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-gray-100 px-4 text-gray-600 border-l border-gray-300"><Search size={20}/></button>
            </form>

            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">Home</Link>
            <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">Reviews</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">Blog</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="pb-4">Contact</Link>
          </div>
        </div>
      )}
    </div>
  );
}