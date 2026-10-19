import type { NextConfig } from "next";
import path from "path";

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
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // html2pdf.js যখন html2canvas খুঁজবে, তখন তাকে pro ভার্সন দাও
      "html2canvas": path.resolve(__dirname, "node_modules/html2canvas-pro"),
    };
    return config;
  },
  // যদি আপনি Turbopack ব্যবহার করেন (Next.js 15+ এ ডিফল্ট)
  turbopack: {
    resolveAlias: {
      html2canvas: "html2canvas-pro",
    },
  },
};

export default nextConfig;
