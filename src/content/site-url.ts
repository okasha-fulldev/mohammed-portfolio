/** Public address of the site: set NEXT_PUBLIC_SITE_URL for a custom domain; on Vercel it falls back to the production URL. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
