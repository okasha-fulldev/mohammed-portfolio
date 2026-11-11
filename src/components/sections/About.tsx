"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { Reveal, SectionTitle, glass } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";

const lines: [string, string][] = [
  ["  model:", " openai,"],
  ["  memory:", " supabase,"],
  ["  workflows:", " n8n,"],
  ["  locale:", ' "ar-SA",'],
];

export default function About() {
  const c = useContent();
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <SectionTitle title={c.about.title} />
          <Reveal className="space-y-5 text-lg leading-9 text-text/90">
            {c.about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-2">
            {c.about.facts.map((f) => (
              <span key={f} className="rounded-full border border-line bg-navy/50 px-3 py-1 text-sm text-muted backdrop-blur">
                {f}
              </span>
            ))}
          </Reveal>
          <Reveal delay={0.25} className="mt-8">
            <a
              href="#experience"
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-text/25 bg-navy/40 px-5 font-semibold backdrop-blur transition-colors hover:border-gold hover:text-gold"
            >
              {c.ui.moreAbout}
              <ArrowRight className="h-4 w-4 transition-transform rtl:-scale-x-100 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* code window (code always reads left-to-right) */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-md" dir="ltr">
          <div className={`${glass} overflow-hidden`}>
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-gold/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 font-en text-xs text-muted">agent.ts</span>
            </div>
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7">
              <code>
                <span className="text-blue-soft">const</span>
                <span className="text-text"> agent </span>
                <span className="text-muted">= </span>
                <span className="text-gold">createAgent</span>
                <span className="text-muted">({"{"}</span>
                {"\n"}
                {lines.map(([k, v], i) => (
                  <motion.span
                    key={k}
                    className="block"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  >
                    <span className="text-blue-soft">{k}</span>
                    <span className="text-gold">{v}</span>
                  </motion.span>
                ))}
                <span className="text-muted">{"});"}</span>
                {"\n\n"}
                <span className="text-muted">{"// "}</span>
                <span className="text-emerald-500">{c.about.codeComment}</span>
              </code>
            </pre>
          </div>
          <div className="float-slow absolute -right-4 -top-8 grid h-20 w-20 place-items-center rounded-2xl border border-line bg-navy-2/80 shadow-[0_0_40px_-6px_rgba(59,123,255,0.55)] backdrop-blur-md sm:-right-8">
            <Code2 className="h-9 w-9 text-blue-soft" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
