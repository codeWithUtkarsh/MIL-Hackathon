/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
  output: "standalone",
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
