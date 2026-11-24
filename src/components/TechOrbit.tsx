"use client";

import type { ComponentType, CSSProperties, PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SiGooglegemini, SiJavascript, SiLaravel, SiN8N, SiPhp, SiPython, SiReact, SiSupabase } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import Logo from "@/components/Logo";

type Icon = ComponentType<{ className?: string }>;
type Tech = { name: string; Icon: Icon; color: string };

// inner ring: the AI side; outer ring: the web stack
const inner: Tech[] = [
  { name: "OpenAI", Icon: RiOpenaiFill, color: "#10a37f" },
  { name: "Gemini", Icon: SiGooglegemini, color: "#8e9bff" },
  { name: "n8n", Icon: SiN8N, color: "#ea4b71" },
  { name: "WhatsApp", Icon: FaWhatsapp, color: "#25d366" },
];
const outer: Tech[] = [
  { name: "Laravel", Icon: SiLaravel, color: "#ff2d20" },
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ecf8e" },
  { name: "PHP", Icon: SiPhp, color: "#8892bf" },
  { name: "Python", Icon: SiPython, color: "#ffd43b" },
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e" },
];

/**
 * The hero visual: the gold MM logo inside the morphing "liquid" frame,
 * with two rings of technology icons orbiting it. Icons stay upright while
 * their ring turns, and the whole piece tilts toward the cursor.
 */
export default function TechOrbit({ className = "", label }: { className?: string; label: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative aspect-square w-full max-w-[300px] [container-type:size] [perspective:1200px] sm:max-w-[380px] ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* orbit tracks */}
        <span className="absolute inset-[8%] rounded-full border border-dashed border-text/15" aria-hidden />
        <span className="absolute inset-[18%] rounded-full border border-text/10" aria-hidden />

        {/* the liquid frame with the logo */}
        <div className="absolute inset-[29%]">
          <div className="blob-ring blob absolute inset-[-12%] opacity-50 blur-[40px]" />
          <div className="blob absolute inset-0 grid place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#1b2a4a_0%,#0b1324_60%,#070b16_100%)] shadow-[inset_0_0_50px_rgba(59,123,255,0.3)]">
            <span className="absolute h-1/2 w-1/2 rounded-full bg-gold/25 blur-2xl" aria-hidden />
            <Logo className="relative w-[58%] drop-shadow-[0_0_18px_rgba(231,165,90,0.55)] motion-safe:animate-[logo-glow_4s_ease-in-out_infinite]" />
          </div>
          <div className="blob-ring blob-ring--thin blob absolute inset-[-8px]" />
        </div>

        <Orbit items={inner} radius={32} chip={12} duration={26} seed={3} />
        <Orbit items={outer} radius={42} chip={11} duration={40} seed={11} />
      </motion.div>
    </div>
  );
}

/**
 * Fixed pseudo-random number in [0, 1) from integer math only (mulberry32),
 * so server and browser compute exactly the same value: no hydration mismatch.
 */
function rand(seed: number) {
  let t = (seed * 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** two decimals keep the CSS strings short and identical everywhere */
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * One ring of icons that move independently: each has its own speed, direction,
 * starting point and a slight in-out drift, so the ring never turns as one block.
 * radius and chip are in % of the box width (cqw).
 */
function Orbit({ items, radius, chip, duration, seed }: {
  items: Tech[];
  radius: number;
  chip: number;
  duration: number;
  seed: number;
}) {
  return (
    <div className="absolute inset-0" aria-hidden>
      {items.map((t, i) => {
        const r = (k: number) => rand(seed + i * 7 + k);
        const secs = r2(duration * (0.8 + r(1) * 0.5)); // 0.8×–1.3× the ring's base speed
        const reverse = r(2) > 0.5;
        // start evenly spread around the ring (with a little jitter) so icons begin apart;
        // a negative delay places each one part-way along its path
        const slot = i / items.length + (r(3) - 0.5) * (0.5 / items.length);
        const start = r2(-(reverse ? 1 - slot : slot) * secs);
        const rad = r2(radius + (r(4) - 0.5) * 6); // ±3cqw off the track
        const drift = r2(5 + r(5) * 5);
        const driftStart = r2(-r(6) * drift);
        const spin = `spin ${secs}s linear ${start}s infinite${reverse ? " reverse" : ""}`;
        const counter = `spin ${secs}s linear ${start}s infinite${reverse ? "" : " reverse"}`;
        return (
          <div key={t.name} className="absolute inset-0 motion-reduce:![animation:none]" style={{ animation: spin }}>
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${chip}cqw`,
                height: `${chip}cqw`,
                margin: `-${chip / 2}cqw 0 0 -${chip / 2}cqw`,
                transform: `translateY(-${rad}cqw)`,
              }}
            >
              <div
                className="h-full w-full motion-reduce:![animation:none]"
                style={{ animation: `orbit-drift ${drift}s ease-in-out ${driftStart}s infinite` }}
              >
                <div
                  className="grid h-full w-full place-items-center rounded-full border border-line bg-navy-2/85 shadow-[0_8px_24px_-8px_var(--c)] backdrop-blur-md motion-reduce:![animation:none]"
                  style={{ animation: counter, color: t.color, "--c": `${t.color}99` } as CSSProperties}
                  title={t.name}
                >
                  <t.Icon className="h-[48%] w-[48%]" />
                  <span className="sr-only">{t.name}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
