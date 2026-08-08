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
        // The :slug* acts as a wildcard, catching ANY post after /projects/
        source: '/projects/:slug*',
        
        // And automatically applies that same post name after /blog/
        destination: '/blog/:slug*',
        
        permanent: true, // 301 redirect for SEO
      },
    ];
  },
};

export default nextConfig;