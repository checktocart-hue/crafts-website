import Link from 'next/link';
import { Sprout, Instagram, Facebook, Twitter, ArrowRight, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Newsletter & Brand */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 border-b border-gray-800 pb-12">
          
          {/* Brand Promise */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-white p-2 rounded-full group-hover:scale-110 transition">
                <Sprout size={24} className="text-primary" />
              </div>
              <span className="font-[family-name:var(--font-dancing)] text-3xl text-white">
                CraftsAndKits
              </span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              We help you escape the digital world by building beautiful things with your hands. 
              Tested reviews, honest guides, and a community of makers.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-serif font-bold mb-2 flex items-center gap-2">
              <Mail className="text-primary"/> Join the Inner Circle
            </h3>
            <p className="text-gray-400 mb-6">Get our "Friday Build" email with exclusive kit discounts.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-gray-900 border border-gray-700 text-white px-5 py-3 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
                Subscribe <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Discover</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/reviews" className="hover:text-primary transition">Book Nooks</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition">Dollhouses</Link></li>
              <li><Link href="/reviews" className="hover:text-primary transition">Metal Models</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition">Build Guides</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-primary transition">About the Team</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Suggest a Review</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition">Affiliate Disclaimer</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-primary hover:text-white transition text-gray-400">
                <Instagram size={20}/>
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-primary hover:text-white transition text-gray-400">
                <Twitter size={20}/>
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-primary hover:text-white transition text-gray-400">
                <Facebook size={20}/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {year} CraftsAndKits. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500">♥</span> for Makers.
          </p>
        </div>

      </div>
    </footer>
  );
}