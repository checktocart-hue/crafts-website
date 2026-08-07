import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/projects/piececool-vs-metal-earth-review',
        destination: '/blog/piececool-vs-metal-earth-review',
        permanent: true, // 301 redirect for SEO
      },
    ];
  },
};

export default nextConfig;