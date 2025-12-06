"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, ShoppingBag, ChevronDown, X } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white sticky top-0 z-50 shadow-md font-sans">
      
      {/* --- ROW 1: LOGO AREA (Compact) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* UPDATED: Increased min-h to [85px] so the absolute logo doesn't get covered by the nav bar */}
        <div className="flex justify-between items-center relative min-h-[85px]"> 
          
          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* CENTERED LOGO - CODED TEXT */}
          <div className="flex-1 flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link href="/" className="flex flex-col items-center group">
              <h1 className="font-[family-name:var(--font-dancing)] text-4xl md:text-6xl text-gray-900 leading-none group-hover:text-green-800 transition-colors">
                Crafts & Kits
              </h1>
              {/* Added pb-1 for extra safety space */}
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] text-green-700 uppercase mt-1 border-t border-green-700 pt-0.5 pb-1">
                The Miniature Guide
              </span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-primary transition">
              <Search size={20} />
            </button>
            <Link href="/reviews" className="hidden sm:flex bg-green-700 text-white px-4 py-1.5 rounded-full text-[10px] font-bold hover:bg-green-800 transition shadow-sm items-center gap-2">
              <ShoppingBag size={12} /> 
              <span className="hidden lg:inline">TOP KITS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- ROW 2: NAVIGATION BAR (Solid Green & Slim) --- */}
      <div className="hidden lg:block bg-green-700 border-t border-green-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-10 text-xs font-bold tracking-widest text-white py-2">
            
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
        <div className="fixed inset-0 bg-white z-40 pt-28 px-6 lg:hidden overflow-y-auto animate-in fade-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col space-y-6 text-lg font-bold text-gray-800 text-center">
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