import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'picsum.photos',
      },
      {
        hostname: 'img.clerk.com',
      },
      {
        hostname: 'tailwindcss.com',
      },
    ],
  },
};

export default nextConfig;
