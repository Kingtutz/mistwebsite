import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local network load the dev server's scripts (otherwise
  // the page shows but nothing interactive works). Dev-only; no effect on builds.
  allowedDevOrigins: ["172.20.10.*", "10.254.1.*", "192.168.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
