import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; 
import "./globals.css";
import Header from "./components/Header"; 

// 1. Standard Text Font (Inter)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// 2. Fancy Hero Font (Dancing Script) - Makes the site look magical
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
        {/* Navigation Bar */}
        <Header />
        
        {/* Main Page Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* NEW DARK FOOTER */}
        <footer className="bg-stone-900 text-stone-300 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
             <div>
                <h3 className="text-white font-bold text-lg mb-4 font-[family-name:var(--font-dancing)] text-2xl">CraftsAndKits</h3>
                <p className="max-w-xs text-stone-400">
                  Building magical worlds, one piece at a time. Join our community of miniature enthusiasts.
                </p>
             </div>
             <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                   <li><a href="/reviews" className="hover:text-white transition">Reviews</a></li>
                   <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
                   <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                </ul>
             </div>
             <div>
                <h3 className="text-white font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                   <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                   <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                </ul>
             </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
            <p>© {new Date().getFullYear()} CraftsAndKits. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
```csv