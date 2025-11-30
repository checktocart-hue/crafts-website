import type { Metadata } from "next";
import { Playfair_Display, Lato, Dancing_Script } from "next/font/google"; 
import Footer from "./components/Footer"; // <--- Import Footer
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
        <Footer /> {/* <--- Footer added here! */}
      </body>
    </html>
  );
}