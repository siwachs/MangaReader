/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cn-e-pic.mangatoon.mobi" },
    ],
  },
};

export default nextConfig;
