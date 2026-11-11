import type { NextConfig } from "next";

/** GITHUB_PAGES=true builds a static copy of the site into ./out for GitHub Pages. */
const pages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // prerendering features that static export does not support
  cacheComponents: !pages,
  partialPrefetching: !pages,
  ...(pages && {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    trailingSlash: true, // en/index.html next to en/contact/index.html
    images: { unoptimized: true },
  }),
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
