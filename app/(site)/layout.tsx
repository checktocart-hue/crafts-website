import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";

// Now using the exact paths matching your folder structure
import Header from "../components/Header"; 
import Footer from "../components/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Crafts & Kits | Expert Reviews",
  description: "In-depth tutorials and recommendations for book nooks, metal models, and miniature kits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // We move the font variables and body classes to a standard wrapper div
    <div className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900`}>
      {/* Your custom Header */}
      <Header />
      {children}
      <Footer />
    </div>
  );
}