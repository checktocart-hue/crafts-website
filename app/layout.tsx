import type { Metadata } from "next";
import Script from "next/script"; 
import { Inter, Dancing_Script } from "next/font/google"; 
import "./globals.css";
import Header from "./components/Header"; 
import Footer from "./components/Footer"; // <--- Now using the separate Footer component

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
    // suppressHydrationWarning prevents errors from browser extensions
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased text-gray-800 bg-white`}>
        
        {/* GOOGLE ADSENSE SCRIPT */}
        {/* Remember to replace 'ca-pub-XXXXXXXXXXXXXXXX' with your real ID before deployment if you haven't already */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        />

        {/* GLOBAL HEADER */}
        <Header />
        
        {/* MAIN PAGE CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* GLOBAL FOOTER */}
        <Footer />
      </body>
    </html>
  );
}