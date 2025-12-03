"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Sprout, Search, Menu, ShoppingBag, ChevronDown, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false); // <--- New State for Guides

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group z-50">
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

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex gap-8 items-center text-xs font-bold tracking-widest text-gray-500">
            <Link href="/" className="hover:text-primary transition">HOME</Link>
            
            {/* REVIEWS DROPDOWN */}
            <div className="relative group h-20 flex items-center cursor-pointer">
              <Link href="/reviews" className="group-hover:text-primary transition flex items-center gap-1">
                REVIEWS <ChevronDown size={14}/>
              </Link>
              <div className="absolute top-16 left-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="py-2 flex flex-col">
                  <div className="px-5 py-2 text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50">By Product Type</div>
                  <Link href="/categories/book-nooks" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50 flex justify-between items-center text-sm capitalize font-medium tracking-normal">
                    📚 Book Nooks
                  </Link>
                  <Link href="/categories/dollhouses" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50 flex justify-between items-center text-sm capitalize font-medium tracking-normal">
                    🏠 Dollhouses
                  </Link>
                  <Link href="/categories/metal-models" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50 flex justify-between items-center text-sm capitalize font-medium tracking-normal">
                    🤖 Metal Models
                  </Link>
                  <Link href="/reviews" className="px-5 py-3 text-center text-primary font-bold hover:bg-green-50 transition text-xs uppercase">
                    View All Reviews
                  </Link>
                </div>
              </div>
            </div>

            {/* BUILDER'S GUIDES DROPDOWN (NEW) */}
            <div className="relative group h-20 flex items-center cursor-pointer">
              <Link href="/projects" className="group-hover:text-primary transition flex items-center gap-1">
                BUILDER'S GUIDES <ChevronDown size={14}/>
              </Link>
              <div className="absolute top-16 left-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="py-2 flex flex-col">
                  <div className="px-5 py-2 text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50">Learn to Build</div>
                  
                  <Link href="/categories/tutorials" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50 flex justify-between items-center text-sm capitalize font-medium tracking-normal">
                    🛠️ Step-by-Step Tutorials
                  </Link>
                  <Link href="/categories/tools-supplies" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50 flex justify-between items-center text-sm capitalize font-medium tracking-normal">
                    ✂️ Tools & Supplies
                  </Link>
                  <Link href="/categories/buying-guides" className="px-5 py-3 hover:bg-stone-50 hover:text-primary text-gray-600 border-b border-gray-50 flex justify-between items-center text-sm capitalize font-medium tracking-normal">
                    ⭐ Best-of Lists
                  </Link>
                  
                  <Link href="/projects" className="px-5 py-3 text-center text-primary font-bold hover:bg-green-50 transition text-xs uppercase">
                    View All Guides
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/about" className="hover:text-primary transition">ABOUT US</Link>
            <Link href="/contact" className="hover:text-primary transition">CONTACT</Link>
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
            <button 
              className="text-gray-900 lg:hidden z-50 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24 px-6 lg:hidden overflow-y-auto animate-in fade-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col space-y-6 text-lg font-bold text-gray-800">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">
              Home
            </Link>
            
            {/* Mobile Reviews Dropdown */}
            <div className="border-b border-gray-100 pb-4">
              <button 
                onClick={() => setIsReviewsOpen(!isReviewsOpen)} 
                className="flex justify-between items-center w-full mb-4"
              >
                <span>Reviews & Categories</span>
                <ChevronDown size={20} className={`transition-transform ${isReviewsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isReviewsOpen && (
                <div className="flex flex-col space-y-4 pl-4 text-base text-gray-600">
                  <Link href="/categories/book-nooks" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">📚 Book Nooks</Link>
                  <Link href="/categories/dollhouses" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">🏠 Dollhouses</Link>
                  <Link href="/categories/metal-models" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">🤖 Metal Models</Link>
                  <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-bold pt-2">View All →</Link>
                </div>
              )}
            </div>

            {/* Mobile Guides Dropdown (NEW) */}
            <div className="border-b border-gray-100 pb-4">
              <button 
                onClick={() => setIsGuidesOpen(!isGuidesOpen)} 
                className="flex justify-between items-center w-full mb-4"
              >
                <span>Builder's Guides</span>
                <ChevronDown size={20} className={`transition-transform ${isGuidesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isGuidesOpen && (
                <div className="flex flex-col space-y-4 pl-4 text-base text-gray-600">
                  <Link href="/categories/tutorials" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">🛠️ Tutorials</Link>
                  <Link href="/categories/tools-supplies" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">✂️ Tools</Link>
                  <Link href="/categories/buying-guides" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">⭐ Buying Guides</Link>
                  <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-primary font-bold pt-2">View All →</Link>
                </div>
              )}
            </div>

            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-gray-100 pb-4">About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="pb-4">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}