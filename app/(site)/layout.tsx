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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900" suppressHydrationWarning>
        
        {/* Your custom Header */}
        <Header />
        
        <main>
          {children}
        </main>

        {/* Your custom Footer */}
        <Footer />
        
      </body>
    </html>
  );
}