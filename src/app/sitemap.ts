import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { ar: "/", en: "/en", priority: 1 },
    { ar: "/contact", en: "/en/contact", priority: 0.8 },
  ];
  return pages.flatMap((p) =>
    [p.ar, p.en].map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: p.priority,
      alternates: { languages: { ar: `${siteUrl}${p.ar}`, en: `${siteUrl}${p.en}` } },
    })),
  );
}
