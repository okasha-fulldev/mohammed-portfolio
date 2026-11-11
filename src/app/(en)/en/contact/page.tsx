import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { en } from "@/content/en";

export const metadata: Metadata = { title: en.meta.contactTitle, alternates: { canonical: "/en/contact", languages: { ar: "/contact" } } };

export default function Page() {
  return <ContactPage />;
}
