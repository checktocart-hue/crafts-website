"use client";

import Link from 'next/link';
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-20 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
         
         {/* Column 1: Brand & Logo */}
         <div className="space-y-6">
            {/* LOGO FIX: Tighter container, same logo size */}
            <div className="block">
              <img 
                src="/logo.png" 
                alt="CraftsAndKits" 
                // UPDATED: 
                // Changed h-36 -> h-32 (Reduced container height)
                // Changed p-4 -> p-2 (Reduced padding so logo stays big inside the smaller box)
                className="h-32 w-auto object-contain bg-white p-2 rounded-lg" 
              />
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              Your trusted guide for miniature hobbies. We review, build, and rate the best kits so you can create magical worlds with confidence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition"><Facebook size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition"><Youtube size={18} /></a>
            </div>
         </div>

         {/* Column 2: Explore */}
         <div>
            <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest text-green-500">Explore</h3>
            <ul className="space-y-4">
               <li><Link href="/reviews?cat=book-nooks" className="hover:text-white transition hover:underline">Book Nooks</Link></li>
               <li><Link href="/reviews?cat=dollhouses" className="hover:text-white transition hover:underline">Dollhouses</Link></li>
               <li><Link href="/reviews?cat=metal-models" className="hover:text-white transition hover:underline">Metal Models</Link></li>
               <li><Link href="/reviews" className="hover:text-white transition hover:underline">Top Rated Kits</Link></li>
            </ul>
         </div>

         {/* Column 3: Company */}
         <div>
            <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest text-green-500">Company</h3>
            <ul className="space-y-4">
               <li><Link href="/about" className="hover:text-white transition hover:underline">About Us</Link></li>
               <li><Link href="/blog" className="hover:text-white transition hover:underline">Our Blog</Link></li>
               <li><Link href="/contact" className="hover:text-white transition hover:underline">Contact Support</Link></li>
               <li><Link href="/submit-review" className="hover:text-white transition hover:underline">Submit a Kit</Link></li>
            </ul>
         </div>

         {/* Column 4: Legal */}
         <div>
            <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest text-green-500">Legal</h3>
            <ul className="space-y-4">
               <li><Link href="/privacy" className="hover:text-white transition hover:underline">Privacy Policy</Link></li>
               <li><Link href="/terms" className="hover:text-white transition hover:underline">Terms of Service</Link></li>
               <li><Link href="/disclaimer" className="hover:text-white transition hover:underline">Affiliate Disclaimer</Link></li>
               <li><Link href="/cookies" className="hover:text-white transition hover:underline">Cookie Policy</Link></li>
            </ul>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} CraftsAndKits. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
           <span>Made for Makers</span>
           <span>•</span>
           <span>Global Community</span>
        </div>
      </div>
    </footer>
  );
}