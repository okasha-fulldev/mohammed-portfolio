"use client";

import { Heart } from "lucide-react";
import Logo from "@/components/Logo";
import { activeSocials, socialIcons } from "@/components/socialIcons";
import { useContent } from "@/components/ContentProvider";
import { contact } from "@/content/shared";

export default function Footer() {
  const c = useContent();
  return (
    <footer className="border-t border-line bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-8 sm:px-8 md:flex-row md:justify-between">
        <p className="flex items-center gap-2 text-sm text-muted">
          <Heart className="h-4 w-4 fill-gold text-gold" />
          {c.ui.tagline}
        </p>
        <ul className="flex items-center gap-2">
          {activeSocials.map((s) => {
            const Icon = socialIcons[s.id];
            return (
              <li key={s.id}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span>
            © {contact.year} {c.ui.rights} — {c.hero.name}
          </span>
          <Logo className="h-7 w-auto" />
        </div>
      </div>
    </footer>
  );
}
