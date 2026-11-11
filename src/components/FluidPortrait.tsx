"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { withBase } from "@/content/base-path";
import type { PointerEvent } from "react";

type Props = {
  src?: string;
  alt?: string;
  /** how far (in % of the image box, from the top) the head is drawn outside the frame */
  headCut?: number;
  className?: string;
};

/**
 * Portrait inside a slowly morphing "liquid" frame with a rotating gold→blue
 * ring. The head breaks out of the top of the frame for depth, and the whole
 * piece tilts toward the cursor.
 */
export default function FluidPortrait({
  src = withBase("/images/me-cutout.webp"),
  alt = "محمد مسعود عكاشة",
  headCut = 38,
  className = "",
}: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const rotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const shineX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  // the photo is larger than the frame so the head rises above its top edge;
  // shoulders spill past the sides but are clipped by the liquid shape
  const imgBox = "absolute bottom-0 h-auto max-w-none select-none";
  const imgStyle = { width: "125%", left: "-19%", aspectRatio: "1024 / 1173" } as const;

  return (
    <div
      className={`relative aspect-[5/6] w-full max-w-[240px] sm:max-w-[280px] [perspective:1200px] ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* soft glow behind */}
        <div className="blob-ring blob absolute inset-[-6%] opacity-50 blur-[46px]" />

        {/* frame fill + body (clipped to the liquid shape) */}
        <div className="blob absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_35%,#1b2a4a_0%,#0b1324_60%,#070b16_100%)] shadow-[inset_0_0_60px_rgba(59,123,255,0.25)]">
          {/* light streak inside the frame */}
          <motion.div
            className="absolute -inset-y-10 w-24 rotate-[18deg] bg-gradient-to-b from-transparent via-gold/25 to-transparent blur-xl"
            style={{ left: shineX }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" aria-hidden className={`${imgBox} portrait-tone`} style={imgStyle} />
        </div>

        {/* thin animated ring on the edge */}
        <div className="blob-ring blob-ring--thin blob absolute inset-[-10px]" />

        {/* head breaking out of the frame */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`${imgBox} pointer-events-none portrait-tone--flat`}
          style={{ ...imgStyle, clipPath: `inset(0 0 ${100 - headCut}% 0)`, transform: "translateZ(40px)" }}
        />

        {/* orbiting spark */}
        <div className="absolute inset-[-14px] animate-[spin_16s_linear_infinite]">
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_18px_6px_rgba(231,165,90,0.55)]" />
        </div>
        <div className="absolute inset-[-14px] animate-[spin_22s_linear_infinite_reverse]">
          <span className="absolute bottom-[12%] right-0 h-1.5 w-1.5 rounded-full bg-blue-soft shadow-[0_0_14px_5px_rgba(59,123,255,0.6)]" />
        </div>
      </motion.div>
    </div>
  );
}
