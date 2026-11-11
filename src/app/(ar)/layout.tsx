import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { ar } from "@/content/ar";
import { siteUrl } from "@/content/site-url";
import "../globals.css";

export const metadata: Metadata = {
  title: ar.meta.title,
  description: ar.meta.description,
  metadataBase: new URL(new URL(siteUrl).origin), // Next adds the base path to file images itself
  alternates: { canonical: `${siteUrl}/`, languages: { en: `${siteUrl}/en` } },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: ar.hero.fullName,
    title: ar.meta.title,
    description: ar.meta.description,
  },
  twitter: { card: "summary_large_image", title: ar.meta.title, description: ar.meta.description },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="ar">{children}</RootShell>;
}
