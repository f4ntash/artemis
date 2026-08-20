import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/artemis",
  assetPrefix: "/artemis/",
  trailingSlash: true,
};

export default nextConfig;
