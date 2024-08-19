/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cn-e-pic.mangatoon.mobi" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "https://firebasestorage.googleapis.com" },
    ],
  },
};

export default nextConfig;
