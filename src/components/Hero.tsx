"use client";

import { motion, type Variants } from "framer-motion";
import { Download, Send } from "lucide-react";
import FluidPortrait from "@/components/FluidPortrait";
import { activeSocials, socialIcons } from "@/components/socialIcons";
import { useContent } from "@/components/ContentProvider";
import { contact } from "@/content/shared";

const ease = [0.22, 1, 0.36, 1] as const;
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

export default function Hero() {
  const c = useContent();
  return (
    <section id="home" className="relative overflow-x-clip">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pb-20 pt-28 sm:gap-12 sm:px-8 sm:pt-32 md:grid-cols-[1.1fr_1fr] md:gap-8 md:pt-24">
        {/* text — on the reading side (right in Arabic, left in English) */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 space-y-6 md:order-1">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-navy/60 px-3.5 py-1.5 text-sm text-text backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {c.hero.badge}
          </motion.span>

          <motion.h1 variants={item} className="text-[34px] min-[380px]:text-[40px] font-bold leading-[1.2] text-balance sm:text-6xl lg:text-[68px]">
            {c.hero.greeting}
            <br />
            <span className="from-gold-soft via-gold to-blue-soft bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
              {c.hero.name}
            </span>
          </motion.h1>

          <motion.p variants={item} className="max-w-[46ch] text-lg leading-8 text-muted">
            {c.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={c.contactPath}
              className="group inline-flex h-12 items-center gap-2 rounded-full border border-text/25 bg-navy/40 px-6 font-semibold backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              <Send className="h-4 w-4 transition-transform rtl:-scale-x-100 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
              {c.ui.contactMe}
            </a>
            <a
              href={contact.cvUrl}
              download
              className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full from-gold-soft to-gold px-6 font-semibold text-on-accent shadow-[0_8px_30px_-8px_rgba(231,165,90,0.6)] transition-transform hover:-translate-y-0.5 ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Download className="relative h-4 w-4" />
              <span className="relative">{c.ui.downloadCv}</span>
            </a>
          </motion.div>

          <motion.ul variants={item} className="flex items-center gap-2 pt-2" aria-label={c.ui.accounts}>
            {activeSocials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-line bg-navy/40 text-muted backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/60 hover:text-gold"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        <div className="order-1 flex justify-center md:order-2">
          <FluidPortrait className="float-slow" alt={c.hero.fullName} />
        </div>
      </div>

      <ScrollIndicator label={c.ui.scrollDown} />
    </section>
  );
}

function ScrollIndicator({ label }: { label: string }) {
  return (
    <motion.a
      href="#about"
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 1 }}
      className="absolute bottom-8 end-6 hidden flex-col items-center gap-3 text-muted transition-colors hover:text-text md:flex"
    >
      <span className="relative h-24 w-px overflow-hidden bg-line">
        <motion.span
          className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent to-gold"
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      <span className="flex h-9 w-6 justify-center rounded-full border border-current pt-1.5">
        <motion.span
          className="h-2 w-1 rounded-full bg-gold"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </span>
      <span className="font-en text-[11px] tracking-[0.18em] uppercase" dir="ltr">Scroll Down</span>
    </motion.a>
  );
}
