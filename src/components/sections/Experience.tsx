"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Code2, GraduationCap, Users } from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";

const icons = { code: Code2, users: Users, graduation: GraduationCap } as const;

export default function Experience() {
  const c = useContent();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionTitle title={c.experience.title} subtitle={c.experience.subtitle} />

      <ol ref={ref} className="relative max-w-3xl space-y-10">
        {/* rail + progress drawn as you scroll */}
        <span className="absolute bottom-2 start-[23px] top-2 w-px bg-line" aria-hidden />
        <motion.span
          className="absolute start-[23px] top-2 w-px origin-top bg-gradient-to-b from-gold via-gold to-blue"
          style={{ scaleY: grow, bottom: 8 }}
          aria-hidden
        />

        {c.experience.items.map((e, i) => {
          const Icon = icons[e.icon];
          return (
            <motion.li
              key={e.role + e.org}
              className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-navy-2 shadow-[0_0_24px_-4px_rgba(231,165,90,0.45)]">
                <Icon className="h-5 w-5 text-gold" />
              </span>
              <div className="rounded-2xl border border-line bg-navy/55 p-5 backdrop-blur-md transition-colors hover:border-white/20 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <h3 className="text-lg font-bold sm:text-xl">
                    {e.role} <span className="text-gold">— {e.org}</span>
                  </h3>
                  <span className="rounded-full border border-line bg-ink/50 px-3 py-1 text-xs text-muted">{e.period}</span>
                </div>
                <ul className="mt-4 space-y-2 text-[15px] leading-7 text-text/85">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5">
                      <span className="mt-3 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
