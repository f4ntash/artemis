import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/corsteno",
  assetPrefix: "/corsteno/",
  trailingSlash: true,
};

export default nextConfig;
