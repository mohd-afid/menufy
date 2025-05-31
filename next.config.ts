import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['pexels.com', 'images.unsplash.com', 'www.shutterstock.com', 'example.com'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
  },
};

export default nextConfig;
