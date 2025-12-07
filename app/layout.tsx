import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google"; 
import { GoogleAdSense } from "@next/third-parties/google"; // <--- Use the official component
import "./globals.css";
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased text-gray-800 bg-white`}>
        
        {/* HEADER */}
        <Header />
        
        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* FOOTER */}
        <Footer />
        
        {/* OFFICIAL ADSENSE COMPONENT */}
        {/* This handles placement in <head> automatically for verification */}
        <GoogleAdSense publisherId="pub-5152146437122143" />
      </body>
    </html>
  );
}