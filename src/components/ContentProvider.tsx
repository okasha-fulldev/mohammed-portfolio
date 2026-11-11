"use client";

import { createContext, useContext } from "react";
import { ar, type Content, type Locale } from "@/content/ar";
import { en } from "@/content/en";

const dict: Record<Locale, Content> = { ar, en };
const Ctx = createContext<Content>(ar);

export function ContentProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <Ctx.Provider value={dict[locale]}>{children}</Ctx.Provider>;
}

export const useContent = () => useContext(Ctx);
