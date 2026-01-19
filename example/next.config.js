/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  transpilePackages: ["react-smooth-input"],
  output: "export",
  basePath: isProd ? "/react-smooth-input" : "",
  images: {
    unoptimized: true, // Required for static export
  },
};

module.exports = nextConfig;
