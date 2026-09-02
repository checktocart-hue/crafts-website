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
      }
    ]
  },
  async redirects() {
    return [
      // 1. SPECIFIC SLUG FIXES 
      // (Must be placed before wildcards to prevent double-redirect chains)
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
      // (Catches Piececool, Cutebee, Basswood, Halloween, etc.)
      {
        source: '/projects/:path*',
        destination: '/blog/:path*',
        permanent: true, 
      },
      
      // 3. WILDCARD: Retire /reviews/ route entirely 
      // (Catches Sunshine Town & Simon's Coffee Shop duplicates)
      {
        source: '/reviews/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;