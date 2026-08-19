import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "CraftsAndKits | Miniature Guides & Reviews",
  description: "Your ultimate guide to book nooks, dollhouses, and metal models.",
  verification: {
    other: {
      "p:domain_verify": "0e878223f7ef0a774f624a557bf8bb9d",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics / Google Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TL2C8ED873"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TL2C8ED873', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5152146437122143"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${dancingScript.variable} font-sans antialiased text-gray-800 bg-white`}
      >
        {children}
      </body>
    </html>
  );
}