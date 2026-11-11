import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { en } from "@/content/en";
import { siteUrl } from "@/content/site-url";
import "../globals.css";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/en", languages: { ar: "/" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: en.hero.fullName,
    title: en.meta.title,
    description: en.meta.description,
  },
  twitter: { card: "summary_large_image", title: en.meta.title, description: en.meta.description },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
