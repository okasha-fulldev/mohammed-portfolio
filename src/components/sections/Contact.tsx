"use client";

import { Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import ContactCards from "@/components/ContactCards";
import { Reveal, SectionTitle } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";
import { withBase } from "@/content/base-path";
import { contact } from "@/content/shared";

export default function Contact() {
  const c = useContent();
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 md:py-32">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionTitle title={c.contact.title} />
          <Reveal className="space-y-6">
            <p className="text-lg leading-8 text-muted">{c.contact.lead}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={withBase(c.contactPath)}
                className="inline-flex h-12 items-center gap-2 rounded-full from-gold-soft to-gold px-6 font-semibold text-on-accent shadow-[0_8px_30px_-8px_rgba(231,165,90,0.6)] transition-transform hover:-translate-y-0.5 ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
              >
                <Send className="h-4 w-4 rtl:-scale-x-100" />
                {c.ui.sendMessage}
              </a>
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-text/25 bg-navy/40 px-6 font-semibold backdrop-blur transition-colors hover:border-emerald-500 hover:text-emerald-500"
              >
                <FaWhatsapp className="h-5 w-5" />
                {c.ui.whatsapp}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ContactCards />
        </Reveal>
      </div>
    </section>
  );
}
