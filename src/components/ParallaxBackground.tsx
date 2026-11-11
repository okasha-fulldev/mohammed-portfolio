"use client";

import { useEffect, useRef } from "react";
import { withBase } from "@/content/base-path";

/**
 * The tall night-sky artwork is fixed behind the page and scrubbed from top to
 * bottom as the visitor scrolls, so each section sits over its own "scene":
 * sky → laptop on the mountain → code & cubes → servers → network.
 */
export default function ParallaxBackground({
  src = withBase("/images/bg-sky.webp"),
  ratio = 1.9, // image height / width, updated from the real file on load
}: {
  src?: string;
  ratio?: number;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const r = useRef(ratio);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      r.current = img.naturalHeight / img.naturalWidth;
      update();
    };

    let ticking = false;
    function update() {
      ticking = false;
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const imgH = Math.max(vw * r.current, vh);
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.height = `${imgH}px`;
      el.style.transform = `translate3d(0, ${-p * (imgH - vh)}px, 0)`;
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [src]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        ref={layer}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          height: "190vw",
        }}
      />
      {/* readability: darken edges and the reading column, keep the art glowing in the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,color-mix(in_oklab,var(--ink)_75%,transparent)_100%)]" />
      {/* reading side follows the text direction */}
      <div className="absolute inset-0 from-ink/70 via-ink/20 to-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l" />
      {/* light theme: veil the night art in the page colour */}
      <div className="absolute inset-0 bg-ink transition-opacity duration-500" style={{ opacity: "var(--veil)" }} />
    </div>
  );
}
