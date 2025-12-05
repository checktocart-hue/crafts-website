import type { Metadata } from "next";
import { Inter } from "next/font/google"; // <--- Using Google Fonts instead of local files
import "./globals.css";
import Header from "./components/Header"; 

// Initialize the font (no local files required)
const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} antialiased text-gray-800 bg-white`}>
        {/* Navigation Bar */}
        <Header />
        
        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-stone-50 border-t border-stone-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CraftsAndKits. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}