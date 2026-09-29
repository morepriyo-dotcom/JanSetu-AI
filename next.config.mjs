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
    // Scoped type checking is strictly handled via tsc
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
