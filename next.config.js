/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
};

module.exports = nextConfig;
