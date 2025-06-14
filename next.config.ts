import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['pexels.com', 'images.unsplash.com', 'www.shutterstock.com', 'example.com'],
    unoptimized: true
  },
};

export default nextConfig;
