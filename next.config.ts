import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // আপনার maxSize (5MB banner + 2MB logo) অনুযায়ী যথেষ্ট বড় করে দিন
    },
  },
};

export default nextConfig;
