import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { ar } from "@/content/ar";

export const metadata: Metadata = { title: ar.meta.contactTitle, alternates: { canonical: "/contact", languages: { en: "/en/contact" } } };

export default function Page() {
  return <ContactPage />;
}
