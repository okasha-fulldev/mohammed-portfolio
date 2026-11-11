/** Facts that are the same in every language. */

export const contact = {
  email: "mohammed.masud460@gmail.com",
  phone: "0564334619",
  phoneIntl: "+966 56 433 4619",
  whatsappUrl: "https://wa.me/966564334619",
  cvUrl: "/cv/Mohammed_Masoud_CV.pdf",
  year: 2026,
};

/** Leave href empty ("") to hide a network until the link is ready. */
export const socials = [
  { id: "whatsapp", label: "WhatsApp", href: contact.whatsappUrl },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-okasha-a31531404" },
  { id: "github", label: "GitHub", href: "https://github.com/okasha-fulldev" },
  { id: "snapchat", label: "Snapchat", href: "https://www.snapchat.com/add/it.okasha" },
  { id: "x", label: "X", href: "" },
  { id: "youtube", label: "YouTube", href: "" },
] as const;

export type SocialId = (typeof socials)[number]["id"];

export type SkillIcon =
  | "react" | "laravel" | "php" | "javascript" | "supabase"
  | "openai" | "gemini" | "n8n" | "api" | "python"
  | "agents" | "mcp" | "prompt" | "blade" | "otp"
  | "daftra" | "noon" | "video" | "excel" | "office";

/** order of the skill cards; names come from each language file */
export const skillOrder: SkillIcon[] = [
  "react", "laravel", "php", "javascript", "supabase",
  "openai", "gemini", "n8n", "api", "python",
  "agents", "mcp", "prompt", "blade", "otp",
  "daftra", "noon", "video", "excel", "office",
];

export type ProjectId = "haramain" | "awnak" | "uloom" | "shahadati" | "zumala" | "matarati";

export const projectMeta: Record<ProjectId, { tags: string[]; featured?: boolean; hue: [string, string] }> = {
  haramain: { tags: ["Laravel", "Supabase"], featured: true, hue: ["#e7a55a", "#3b2a14"] },
  awnak: { tags: ["AI Agent", "OpenAI", "n8n"], featured: true, hue: ["#3b7bff", "#0e1e44"] },
  uloom: { tags: ["Laravel", "React"], featured: true, hue: ["#7aa8ff", "#16224a"] },
  shahadati: { tags: ["Laravel", "Email"], hue: ["#f3c98d", "#2c2113"] },
  zumala: { tags: ["Laravel", "Blade"], hue: ["#8fb3ff", "#141c33"] },
  matarati: { tags: ["React", "Supabase"], hue: ["#e7a55a", "#1b1a2e"] },
};

export const projectOrder: ProjectId[] = ["haramain", "awnak", "uloom", "shahadati", "zumala", "matarati"];
