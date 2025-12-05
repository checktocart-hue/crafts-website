import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; 
import "./globals.css";
import Header from "./components/Header"; 
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"; // Importing icons for the footer

// 1. Standard Text Font (Inter)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// 2. Fancy Hero Font (Dancing Script)
const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing" 
});

export const metadata: Metadata = {
  title: "CraftsAndKits | Miniature Guides & Reviews",
  description: "Your ultimate guide to book nooks, dollhouses, and metal models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased text-gray-800 bg-white`}>
        {/* Navigation Bar - Global */}
        <Header />
        
        {/* Main Page Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* EXPANDED FOOTER */}
        <footer className="bg-black text-gray-300 py-20 mt-20 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
             
             {/* Column 1: Brand & Socials */}
             <div className="space-y-6">
                <h3 className="text-white font-bold font-[family-name:var(--font-dancing)] text-3xl">
                  CraftsAndKits
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Your trusted guide for miniature hobbies. We review, build, and rate the best kits so you can create magical worlds with confidence.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition">
                    <Youtube size={18} />
                  </a>
                </div>
             </div>

             {/* Column 2: Explore */}
             <div>
                <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest text-green-500">Explore</h3>
                <ul className="space-y-4">
                   <li><a href="/reviews?cat=book-nooks" className="hover:text-white transition hover:underline">Book Nooks</a></li>
                   <li><a href="/reviews?cat=dollhouses" className="hover:text-white transition hover:underline">Dollhouses</a></li>
                   <li><a href="/reviews?cat=metal-models" className="hover:text-white transition hover:underline">Metal Models</a></li>
                   <li><a href="/reviews" className="hover:text-white transition hover:underline">Top Rated Kits</a></li>
                </ul>
             </div>

             {/* Column 3: Company */}
             <div>
                <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest text-green-500">Company</h3>
                <ul className="space-y-4">
                   <li><a href="/about" className="hover:text-white transition hover:underline">About Us</a></li>
                   <li><a href="/blog" className="hover:text-white transition hover:underline">Our Blog</a></li>
                   <li><a href="/contact" className="hover:text-white transition hover:underline">Contact Support</a></li>
                   <li><a href="/submit-review" className="hover:text-white transition hover:underline">Submit a Kit</a></li>
                </ul>
             </div>

             {/* Column 4: Legal */}
             <div>
                <h3 className="text-white font-bold mb-6 text-xs uppercase tracking-widest text-green-500">Legal</h3>
                <ul className="space-y-4">
                   <li><a href="/privacy" className="hover:text-white transition hover:underline">Privacy Policy</a></li>
                   <li><a href="/terms" className="hover:text-white transition hover:underline">Terms of Service</a></li>
                   <li><a href="/disclaimer" className="hover:text-white transition hover:underline">Affiliate Disclaimer</a></li>
                   <li><a href="/cookies" className="hover:text-white transition hover:underline">Cookie Policy</a></li>
                </ul>
             </div>
          </div>

          {/* Copyright Section */}
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} CraftsAndKits. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <span>Made for Makers</span>
               <span>•</span>
               <span>Lagos, Nigeria</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}