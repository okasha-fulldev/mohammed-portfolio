/** Sub-path the site is served under (e.g. "/mohammed-portfolio" on GitHub Pages); empty locally and on Vercel. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix an internal absolute path ("/contact", "/images/x.webp") with the base path; leaves "#…" and external URLs alone. */
export const withBase = (path: string) => (path.startsWith("/") && !path.startsWith("//") ? `${basePath}${path}` : path);

/** usePathname() without a trailing slash, so "/en/" and "/en" compare equal. */
export const samePath = (a: string, b: string) => (a.replace(/\/+$/, "") || "/") === (b.replace(/\/+$/, "") || "/");
