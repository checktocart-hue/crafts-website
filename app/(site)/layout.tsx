import type { Metadata } from "next";
import Script from "next/script"; // <--- Using standard Script instead of third-parties
import { Inter, Dancing_Script } from "next/font/google"; 
import "../globals.css";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 

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
        
        {/* GOOGLE ADSENSE SCRIPT */}
        {/* This method is more robust if the third-party package fails to install */}
        <Script
          id="adsbygoogle-init"
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5152146437122143"
        />

        {/* HEADER */}
        <Header />
        
        {/* MAIN CONTENT */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}