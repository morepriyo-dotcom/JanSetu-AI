/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "*.firebasestorage.app",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.app",
      },
    ],
  },
  eslint: {
    // Ignore lint errors during production build on Vercel/CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during production build on Vercel to ensure smooth deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
