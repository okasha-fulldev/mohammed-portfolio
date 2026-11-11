"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";
import { projectMeta, projectOrder, type ProjectId } from "@/content/shared";

export default function Projects() {
  const c = useContent();
  const [all, setAll] = useState(false);
  const list = all ? projectOrder : projectOrder.filter((id) => projectMeta[id].featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionTitle title={c.projects.title} subtitle={c.projects.subtitle} />
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="group mb-10 inline-flex h-11 items-center gap-2 rounded-full border border-text/25 bg-navy/40 px-5 text-sm font-semibold backdrop-blur transition-colors hover:border-gold hover:text-gold"
        >
          {all ? c.ui.showFeatured : c.ui.showAll}
          <ArrowRight
            className={`h-4 w-4 transition-transform rtl:-scale-x-100 ${all ? "rotate-90" : "rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1"}`}
          />
        </button>
      </div>

      <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((id, i) => (
            <motion.li
              key={id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard id={id} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}

function ProjectCard({ id }: { id: ProjectId }) {
  const c = useContent();
  const p = c.projects.items[id];
  const { tags, hue } = projectMeta[id];
  const [a, b] = hue;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-navy/55 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_30px_60px_-30px_rgba(59,123,255,0.45)]">
      {/* artwork: a device screen tinted per project (swap for a real screenshot later) */}
      <div className="relative h-44 overflow-hidden" style={{ background: `radial-gradient(circle at 30% 20%, ${a}33, transparent 60%), linear-gradient(160deg, ${b}, #070b16)` }}>
        <div className="absolute inset-x-8 bottom-0 top-7 rounded-t-xl border border-white/10 bg-[#05080f]/80 p-3 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2" dir="ltr">
          <div className="mb-3 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
          </div>
          <div className="grid grid-cols-[1fr_2fr] gap-2">
            <div className="space-y-1.5">
              <div className="h-2 rounded bg-white/10" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
              <div className="h-2 w-4/5 rounded bg-white/10" />
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-md" style={{ background: `linear-gradient(120deg, ${a}, ${a}55)` }} />
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-6 rounded bg-white/10" />
                <div className="h-6 rounded bg-white/10" />
                <div className="h-6 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
        {p.inProgress && (
          <span className="absolute end-3 top-3 rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-on-accent">
            {c.projects.inProgress}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold text-gold">{p.kind}</span>
        <h3 className="text-xl font-bold">{p.name}</h3>
        <p className="flex-1 text-[15px] leading-7 text-muted">{p.description}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-blue/10 px-2.5 py-0.5 font-en text-xs font-medium text-blue-soft">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
