import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { siteUrl } from "@/content/site-url";
import { ar } from "@/content/ar";

export const metadata: Metadata = { title: ar.meta.contactTitle, alternates: { canonical: `${siteUrl}/contact`, languages: { en: `${siteUrl}/en/contact` } } };

export default function Page() {
  return <ContactPage />;
}
