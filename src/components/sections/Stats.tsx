"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Award, Boxes, HeartHandshake, Layers } from "lucide-react";
import { Reveal } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";

const icons = [Layers, Boxes, HeartHandshake, Award];

function Counter({ to, prefix }: { to: number; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const ctl = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => ctl.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
    </span>
  );
}

export default function Stats() {
  const c = useContent();
  return (
    <section aria-label={c.ui.statsLabel} className="mx-auto max-w-6xl px-5 sm:px-8">
      <Reveal className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-navy/55 backdrop-blur-md lg:grid-cols-4">
        {c.stats.map((s, i) => {
          const Icon = icons[i];
          return (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 border-line px-4 py-8 text-center max-lg:[&:nth-child(-n+2)]:border-b max-lg:[&:nth-child(odd)]:border-e lg:[&:not(:last-child)]:border-e"
            >
              <Icon className="h-6 w-6 text-gold" />
              <span className="font-en text-3xl font-bold sm:text-4xl" dir="ltr">
                {s.value === null ? s.text : <Counter to={s.value} prefix={s.prefix ?? ""} />}
              </span>
              <span className="max-w-[18ch] text-sm text-muted">{s.label}</span>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
