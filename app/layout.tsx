import type { Metadata } from "next";
import { Playfair_Display, Lato, Dancing_Script } from "next/font/google"; 
import Footer from "./components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'; // <--- Import the tool
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-lato',
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: '--font-dancing',
});

export const metadata: Metadata = {
  title: "CraftsAndKits | Handmade Inspiration",
  description: "Discover the best DIY kits and projects for your creative journey.",
  icons: {
    icon: '/favicon.ico', // Standard favicon path
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lato.variable} ${dancingScript.variable} font-sans bg-white text-gray-900 antialiased`}>
        {children}
        <Footer />
        {/* Google Analytics - Replace G-XYZ with your real ID */}
        <GoogleAnalytics gaId="G-TL2C8ED873" /> 
      </body>
    </html>
  );
}