/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  transpilePackages: ["smooth-input"],
  output: "export",
  basePath: isProd ? "/smooth-input" : "",
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
