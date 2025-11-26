import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // สามารถเพิ่มโดเมนอื่นๆ ได้
      },
    ],
  },
};

export default nextConfig;
