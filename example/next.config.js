/** @type {import('next').NextConfig} */
const nextConfig = {
  // We need to transpile the local package to ensure updates are picked up correctly
  // and to handle any potential ESM/CJS interop issues during dev
  transpilePackages: ["smooth-input"],
};

module.exports = nextConfig;
