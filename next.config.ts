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
      // 1. SPECIFIC REDIRECT (Put this FIRST so it protects your Piececool post immediately)
      {
        source: '/projects/piececool-vs-metal-earth-review',
        destination: '/blog/piececool-vs-metal-earth-review',
        permanent: true, 
      },
      // 2. WILDCARD CATCH-ALL (Catches Cutebee and any other old Sanity URLs)
      {
        source: '/projects/:path*',
        destination: '/blog/:path*',
        permanent: true, 
      },
    ];
  },
};

export default nextConfig;