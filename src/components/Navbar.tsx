"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useContent } from "@/components/ContentProvider";

type Theme = "dark" | "light";

// the theme lives on <html data-theme>, set before paint by RootShell
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export default function Navbar() {
  const c = useContent();
  const pathname = usePathname();
  const onContactPage = pathname === c.contactPath;
  const [active, setActive] = useState<string>(onContactPage ? "contact" : "home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as Theme);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage blocked: the choice still applies to this visit */
    }
  }

  // highlight the section in view (home page only)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (onContactPage) return () => window.removeEventListener("scroll", onScroll);

    const sections = c.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [c.nav, onContactPage]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const hrefFor = (id: string) => {
    if (id === "contact") return c.contactPath;
    return onContactPage ? `${c.home}#${id}` : `#${id}`;
  };
  const otherLang = onContactPage ? c.other.contact : c.other.home;

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-500 ${
          scrolled ? "border-b border-line bg-ink/70 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
          <a href={onContactPage ? c.home : "#home"} aria-label={c.ui.home} className="shrink-0">
            <Logo className="h-9 w-auto" />
          </a>

          <nav className="hidden lg:block" aria-label={c.ui.mainNav}>
            <ul className="flex items-center gap-9 text-[15px]">
              {c.nav.map((n) => {
                const on = active === n.id;
                return (
                  <li key={n.id}>
                    <a
                      href={hrefFor(n.id)}
                      className={`relative py-2 transition-colors ${on ? "font-semibold text-text" : "text-muted hover:text-text"}`}
                    >
                      {n.label}
                      {on && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-l from-gold to-gold-soft"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={otherLang}
              aria-label={c.other.aria}
              className="grid h-9 min-w-9 place-items-center rounded-full border border-line bg-navy/60 px-3 text-xs font-semibold text-muted backdrop-blur transition-colors hover:border-gold/60 hover:text-text"
            >
              {c.other.label}
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={c.ui.theme}
              aria-pressed={theme === "light"}
              className="relative flex h-9 w-[74px] items-center justify-between rounded-full border border-line bg-navy/60 px-2 backdrop-blur"
              dir="ltr"
            >
              <motion.span
                className="absolute top-1 h-7 w-7 rounded-full bg-gradient-to-br from-gold-soft to-gold shadow-[0_0_14px_rgba(231,165,90,0.5)]"
                animate={{ left: theme === "light" ? 4 : 39 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
              <Sun className={`relative z-10 ms-0.5 h-4 w-4 ${theme === "light" ? "text-on-accent" : "text-muted"}`} />
              <Moon className={`relative z-10 me-0.5 h-4 w-4 ${theme === "dark" ? "text-on-accent" : "text-muted"}`} />
            </button>

            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-navy/60 backdrop-blur lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={c.ui.openMenu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu — outside the header: its transform/blur would trap a fixed overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              <Logo className="h-9 w-auto" />
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full border border-line"
                onClick={() => setOpen(false)}
                aria-label={c.ui.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-6 space-y-2 px-6">
              {c.nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, x: c.dir === "rtl" ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <a
                    href={hrefFor(n.id)}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line py-4 text-2xl font-semibold ${active === n.id ? "text-gold" : "text-text"}`}
                  >
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
