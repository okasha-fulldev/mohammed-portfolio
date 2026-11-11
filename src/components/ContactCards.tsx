"use client";

import { useState } from "react";
import { Check, Copy, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useContent } from "@/components/ContentProvider";
import { contact } from "@/content/shared";

/** Phone, WhatsApp and email — used on the home page and the contact page. */
export default function ContactCards({ layout = "row" }: { layout?: "row" | "stack" }) {
  const c = useContent();
  const items = [
    { key: "wa", icon: FaWhatsapp, label: c.ui.whatsapp, value: contact.phoneIntl, href: contact.whatsappUrl, external: true },
    { key: "phone", icon: Phone, label: c.ui.phone, value: contact.phone, href: `tel:+966${contact.phone.slice(1)}` },
    { key: "mail", icon: Mail, label: c.ui.email, value: contact.email, href: `mailto:${contact.email}`, copy: true },
  ];

  const wrap =
    layout === "row"
      ? "grid overflow-hidden rounded-2xl border border-line bg-navy/55 backdrop-blur-md sm:grid-cols-3"
      : "grid gap-3";
  const cell =
    layout === "row"
      ? "flex flex-col items-center gap-3 border-line px-4 py-8 text-center max-sm:[&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-e"
      : "flex items-center gap-4 rounded-2xl border border-line bg-navy/55 p-4 backdrop-blur-md";

  return (
    <div className={wrap}>
      {items.map((it) => (
        <div key={it.key} className={cell}>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-ink/40">
            <it.icon className="h-5 w-5 text-gold" />
          </span>
          <div className={`flex min-w-0 flex-col gap-1 ${layout === "row" ? "items-center" : "flex-1"}`}>
            <span className="font-semibold">{it.label}</span>
            <a
              href={it.href}
              target={it.external ? "_blank" : undefined}
              rel={it.external ? "noopener noreferrer" : undefined}
              dir="ltr"
              className="break-all text-sm text-muted transition-colors hover:text-text"
            >
              {it.value}
            </a>
          </div>
          {it.copy && <CopyButton text={it.value} labels={[c.ui.copy, c.ui.copied]} />}
        </div>
      ))}
    </div>
  );
}

function CopyButton({ text, labels }: { text: string; labels: [string, string] }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard blocked: the address is still selectable */
        }
      }}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:text-text"
    >
      {done ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? labels[1] : labels[0]}
    </button>
  );
}
