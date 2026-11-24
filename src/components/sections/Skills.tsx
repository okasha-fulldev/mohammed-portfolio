"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  SiGooglegemini, SiJavascript, SiLaravel, SiN8N, SiPhp, SiPython, SiReact, SiSupabase,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { TbApi } from "react-icons/tb";
import {
  Blocks, Bot, Braces, BrainCircuit, Clapperboard, Code2, FileSpreadsheet, KeyRound, LayoutGrid, MapPinned, Plug,
  Receipt, ShoppingBag, Sparkles, Wrench,
} from "lucide-react";
import { SectionTitle } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";
import { skillGroups, type SkillGroupId, type SkillIcon } from "@/content/shared";

type Icon = ComponentType<{ className?: string }>;

// brand colour for each card's hover glow
const icons: Record<SkillIcon, { Icon: Icon; color: string }> = {
  react: { Icon: SiReact, color: "#61dafb" },
  laravel: { Icon: SiLaravel, color: "#ff2d20" },
  php: { Icon: SiPhp, color: "#8892bf" },
  javascript: { Icon: SiJavascript, color: "#f7df1e" },
  supabase: { Icon: SiSupabase, color: "#3ecf8e" },
  openai: { Icon: RiOpenaiFill, color: "#10a37f" },
  gemini: { Icon: SiGooglegemini, color: "#8e9bff" },
  n8n: { Icon: SiN8N, color: "#ea4b71" },
  api: { Icon: TbApi, color: "#e7a55a" },
  python: { Icon: SiPython, color: "#ffd43b" },
  agents: { Icon: Bot, color: "#7aa8ff" },
  mcp: { Icon: Plug, color: "#c08bff" },
  prompt: { Icon: Sparkles, color: "#f3c98d" },
  blade: { Icon: Braces, color: "#ff6a3d" },
  otp: { Icon: KeyRound, color: "#3ecf8e" },
  daftra: { Icon: Receipt, color: "#4aa3ff" },
  noon: { Icon: ShoppingBag, color: "#feee00" },
  video: { Icon: Clapperboard, color: "#ff5c8a" },
  excel: { Icon: FileSpreadsheet, color: "#21a366" },
  office: { Icon: LayoutGrid, color: "#ea3e23" },
  gis: { Icon: MapPinned, color: "#4aa3ff" },
};

const groupIcons: Record<SkillGroupId, Icon> = { web: Code2, ai: BrainCircuit, integrations: Blocks, tools: Wrench };

export default function Skills() {
  const c = useContent();
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 md:py-32">
      <SectionTitle title={c.skills.title} subtitle={c.skills.subtitle} />
      <div className="space-y-10 sm:space-y-12">
        {skillGroups.map((g) => {
          const GroupIcon = groupIcons[g.id];
          return (
            <div key={g.id}>
              <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold sm:text-lg">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-gold/30 bg-gold/10">
                  <GroupIcon className="h-4 w-4 text-gold" />
                </span>
                {c.skills.groups[g.id]}
                <span className="font-en text-sm font-medium text-muted">({g.items.length})</span>
              </h3>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5">
                {g.items.map((id, i) => {
                  const { Icon, color } = icons[id];
                  return (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: (i % 5) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex h-24 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-line bg-navy/55 px-1.5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--c)_45%,transparent)] sm:h-32 sm:gap-3 sm:rounded-2xl sm:px-3"
                      style={{ "--c": color } as React.CSSProperties}
                    >
                      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,color-mix(in_oklab,var(--c)_22%,transparent),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <Icon className="relative h-6 w-6 text-text/85 transition-colors duration-300 group-hover:text-[var(--c)] sm:h-8 sm:w-8" />
                      <span className="relative text-[12px] font-semibold leading-4 sm:text-sm sm:leading-5">{c.skills.names[id]}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
