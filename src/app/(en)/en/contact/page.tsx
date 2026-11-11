import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { siteUrl } from "@/content/site-url";
import { en } from "@/content/en";

export const metadata: Metadata = { title: en.meta.contactTitle, alternates: { canonical: `${siteUrl}/en/contact`, languages: { ar: `${siteUrl}/contact` } } };

export default function Page() {
  return <ContactPage />;
}
