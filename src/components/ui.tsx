"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({
  delay = 0,
  y = 28,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Section heading: title with a gold rule beside it, and an optional subtitle. */
export function SectionTitle({
  title,
  subtitle,
  as: Tag = "h2",
}: {
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className="mb-10 space-y-2">
      <div className="flex items-center gap-4">
        <Tag className="text-3xl font-bold sm:text-4xl">{title}</Tag>
        <motion.span
          className="h-[2px] w-16 rounded-full from-gold to-transparent ltr:origin-left ltr:bg-gradient-to-r rtl:origin-right rtl:bg-gradient-to-l"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
        />
      </div>
      {subtitle && <p className="text-muted">{subtitle}</p>}
    </Reveal>
  );
}

/** Shared glass surface used by cards across the page. */
export const glass =
  "rounded-2xl border border-line bg-navy/55 backdrop-blur-md shadow-[0_20px_50px_-30px_var(--shadow)]";
