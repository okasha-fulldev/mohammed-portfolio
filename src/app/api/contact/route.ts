import { contact } from "@/content/shared";

/**
 * Contact form → email (via Resend's REST API).
 * Needs RESEND_API_KEY in .env.local (and on Vercel). CONTACT_TO_EMAIL is optional.
 */

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (str(body.website, 200)) return Response.json({ ok: true });

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const topic = str(body.topic, 60);
  const message = str(body.message, 5000);
  if (name.length < 2 || !emailRe.test(email) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (rateLimited(ip)) return Response.json({ error: "rate" }, { status: 429 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return Response.json({ error: "notConfigured" }, { status: 503 });

  const to = process.env.CONTACT_TO_EMAIL || contact.email;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#0d1730">
      <h2 style="margin:0 0 12px">رسالة جديدة من موقعك</h2>
      <p><b>الاسم:</b> ${esc(name)}</p>
      <p><b>البريد:</b> ${esc(email)}</p>
      <p><b>النوع:</b> ${esc(topic || "-")}</p>
      <hr style="border:none;border-top:1px solid #ddd"/>
      <p style="white-space:pre-wrap">${esc(message)}</p>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `رسالة من الموقع: ${topic || "تواصل"} — ${name}`,
        html,
        text: `الاسم: ${name}\nالبريد: ${email}\nالنوع: ${topic}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return Response.json({ error: "server" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact send failed", err);
    return Response.json({ error: "server" }, { status: 502 });
  }
}
