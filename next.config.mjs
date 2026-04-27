/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'ik.imagekit.io', 'localhost'],
  },
  eslint: {
    // Treat warnings as errors during build
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Ignore TypeScript errors during build (if any)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;