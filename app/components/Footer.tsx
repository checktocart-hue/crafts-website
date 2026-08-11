"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Facebook, Instagram, Mail, CheckCircle2 } from "lucide-react";

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
              href="https://www.instagram.com/crafts.kits" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition"
            >
              <Instagram size={16} />
            </a>
            <a 
              href="https://www.facebook.com/crafts.kits" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://www.pinterest.com/craftsandkitscom/" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/>
              </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@craftsnkits" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-9 h-9 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-black hover:border-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
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