import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // The old contact form was replaced by the consultation page.
    return [{ source: "/contact", destination: "/consultation", permanent: true }];
  },
};

export default nextConfig;
