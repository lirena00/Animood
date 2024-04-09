/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['s4.anilist.co'],
  },
  env: {
    API_KEY: process.env.API_KEY,
  }
};

export default nextConfig;
