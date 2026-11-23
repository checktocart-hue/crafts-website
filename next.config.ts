import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
    ],
  },
  async redirects() {
    return [
      // 0. KILL DUPLICATE VERCEL SUBDOMAIN: Force all traffic to live www domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'crafts-website.vercel.app',
          },
        ],
        destination: 'https://www.craftsandkits.com/:path*',
        permanent: true,
      },

      // 1. SPECIFIC SLUG FIXES & SEO CANNIBALIZATION MERGES
      {
        source: '/blog/black-friday-miniature-kit-deals-2026',
        destination: 'https://www.craftsandkits.com/blog/black-friday-miniatures-craft-kit-deals',
        permanent: true,
      },
      {
        source: '/blog/best-modern-miniature-dollhouse-kits-for-adults',
        destination: '/blog/best-miniature-dollhouse-kits-adults',
        permanent: true,
      },
      {
        source: '/blog/title-the-ultimate-guide-to-book-nook-kits',
        destination: '/blog/ultimate-guide-to-book-nook-kits',
        permanent: true,
      },
      {
        source: '/projects/title-the-ultimate-guide-to-book-nook-kits',
        destination: '/blog/ultimate-guide-to-book-nook-kits',
        permanent: true,
      },

      // 2. WILDCARD: Retire /projects/ route entirely
      // The asterisk is fine here because you want the main /projects/ page to redirect too
      {
        source: '/projects/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },

      // 3. THE FIX: Redirect individual review articles, but keep the main /reviews page alive!
      // The '+' ensures it only redirects if there is a specific article slug after the slash
      {
        source: '/reviews/:path+',
        destination: '/blog/:path+',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
