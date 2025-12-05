import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header"; 
// ^^^ This is the crucial import for your Navigation

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans text-gray-800 bg-white`}
      >
        {/* WE PLACE THE HEADER HERE SO IT APPEARS ON EVERY PAGE */}
        <Header />
        
        {/* THIS IS WHERE THE PAGE CONTENT LOADS */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* SIMPLE FOOTER */}
        <footer className="bg-stone-50 border-t border-stone-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CraftsAndKits. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}