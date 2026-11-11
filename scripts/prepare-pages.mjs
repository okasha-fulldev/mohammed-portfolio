// Prepares the source tree for a static GitHub Pages build (run in CI only):
// drops server-only routes and writes sitemap.xml / robots.txt as plain files.
import { rmSync, writeFileSync } from "node:fs";

const site = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");
if (!site) throw new Error("NEXT_PUBLIC_SITE_URL is required");

for (const p of ["src/app/api", "src/app/sitemap.ts", "src/app/robots.ts"]) rmSync(p, { recursive: true, force: true });

const pages = [
  { ar: "/", en: "/en/", priority: "1.0" },
  { ar: "/contact/", en: "/en/contact/", priority: "0.8" },
];
const urls = pages.flatMap((p) =>
  [p.ar, p.en].map(
    (path) => `  <url>
    <loc>${site}${path}</loc>
    <xhtml:link rel="alternate" hreflang="ar" href="${site}${p.ar}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${site}${p.en}"/>
    <changefreq>monthly</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
  ),
);
writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`,
);
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
console.log("Prepared static build for", site);
