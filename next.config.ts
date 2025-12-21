import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Use absolute paths for proper asset loading in subdirectories
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
