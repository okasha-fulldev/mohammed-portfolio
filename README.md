# Mohammed Masoud Okasha — Portfolio

Personal portfolio (Arabic / English, dark / light) built with Next.js 16, React 19, Tailwind CSS 4 and framer-motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (Arabic) or http://localhost:3000/en (English).

## Contact form

Messages are sent by email through [Resend](https://resend.com). Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. On Vercel, add the same variables under Project → Settings → Environment Variables.

## Where things live

- `src/content/ar.ts`, `src/content/en.ts` — all page text
- `src/content/shared.ts` — contact details, social links, skills and projects
- `src/components/` — sections and UI
- `src/app/api/contact/route.ts` — contact form email endpoint

## Publish on GitHub Pages

```bash
npm run deploy:pages
```

Builds a static copy (served at https://okasha-fulldev.github.io/mohammed-portfolio/) and pushes it to the `gh-pages` branch. On GitHub Pages there is no server, so the contact form sends through [FormSubmit](https://formsubmit.co) instead of `/api/contact` — confirm the activation email FormSubmit sends after the first message.
