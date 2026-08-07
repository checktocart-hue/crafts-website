"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Youtube, Mail, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Logic to save email can be connected here
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-300 mt-20 border-t border-gray-800 font-sans">
      
      {/* SECTION 1: Newsletter Signup Bar */}
      <div className="border-b border-gray-800 bg-gray-900/50 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Get the latest build guides & kit reviews
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Join thousands of miniature builders receiving our weekly digest.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 bg-green-950/60 border border-green-800 px-6 py-3 rounded-lg text-sm font-semibold">
                <CheckCircle2 size={18} />
                <span>You're on the list! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: Footer Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        
        {/* Column 1: Brand & Socials */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <img 
              src="/logo.png" 
              alt="CraftsAndKits" 
              className="h-28 w-auto object-contain bg-white p-2 rounded-lg" 
            />
          </Link>
          
          <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
            Your trusted publication for miniature hobbies. We independently test, review, and rate book nooks, metal models, and miniature kits.
          </p>
          
          <div className="flex gap-3">
            <a 
              href="#" 
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="#" 
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="#" 
              aria-label="YouTube"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition"
            >
              <Youtube size={16} />
            </a>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest text-green-500">Explore</h3>
          <ul className="space-y-3">
            <li><Link href="/reviews?cat=book-nooks" className="hover:text-white transition hover:underline">Book Nooks</Link></li>
            <li><Link href="/reviews?cat=dollhouses" className="hover:text-white transition hover:underline">Dollhouses</Link></li>
            <li><Link href="/reviews?cat=metal-models" className="hover:text-white transition hover:underline">Metal Models</Link></li>
            <li><Link href="/reviews" className="hover:text-white transition hover:underline">Top Rated Kits</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest text-green-500">Company</h3>
          <ul className="space-y-3">
            <li><Link href="/about" className="hover:text-white transition hover:underline">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition hover:underline">Blog & Guides</Link></li>
            <li><Link href="/contact" className="hover:text-white transition hover:underline">Contact Support</Link></li>
            <li><Link href="/submit-review" className="hover:text-white transition hover:underline">Submit a Kit</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal & Policies */}
        <div>
          <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest text-green-500">Legal</h3>
          <ul className="space-y-3">
            <li><Link href="/privacy" className="hover:text-white transition hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition hover:underline">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition hover:underline">Affiliate Disclosure</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* SECTION 3: Amazon Associates & FTC Compliance Statement */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-t border-gray-900">
        <div className="bg-gray-900/80 border border-gray-800 rounded-lg p-4 text-[11px] text-gray-400 leading-relaxed">
          <p className="font-semibold text-gray-300 mb-1">Affiliate Disclosure Notice</p>
          <p>
            CraftsAndKits is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of this product.
          </p>
        </div>
      </div>

      {/* SECTION 4: Copyright & Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} CraftsAndKits. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Made for Makers</span>
          <span>•</span>
          <span>Global Community</span>
        </div>
      </div>
    </footer>
  );
}