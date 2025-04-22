import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/premium-vector/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8889',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
