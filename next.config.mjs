/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "firebasestorage.googleapis.com"],
  },
  eslint: {
    // Ignore lint errors during production build on Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during production build on Vercel to ensure smooth deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
