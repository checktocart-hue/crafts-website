import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css"; // Ensure this points to your css file

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans antialiased text-gray-800 bg-white`}>
        {children}
      </body>
    </html>
  );
}