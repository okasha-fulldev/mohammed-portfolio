"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import ContactCards from "@/components/ContactCards";
import { Reveal } from "@/components/ui";
import { useContent } from "@/components/ContentProvider";
import { socials } from "@/content/shared";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent";
type ServerError = "server" | "notConfigured" | "rate";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const linkedin = socials.find((s) => s.id === "linkedin")?.href;
/** Set at build time for static hosting; when empty the form uses the site's own /api/contact route. */
const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export default function ContactPage() {
  const c = useContent();
  const f = c.contact.form;
  const [values, setValues] = useState({ name: "", email: "", topic: f.topics[0], message: "", website: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<ServerError | null>(null);

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (values.name.trim().length < 2) e.name = f.errors.name;
    if (!emailRe.test(values.email.trim())) e.email = f.errors.email;
    if (values.message.trim().length < 10) e.message = f.errors.message;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setServerError(null);
    if (!validate()) return;
    setStatus("sending");
    try {
      if (formEndpoint) {
        // static hosting (GitHub Pages): no server of our own, so post to the form-to-email service
        if (values.website) {
          setStatus("sent");
          return;
        }
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            topic: values.topic,
            message: values.message.trim(),
            _subject: `رسالة من الموقع: ${values.topic} — ${values.name.trim()}`,
            _replyto: values.email.trim(),
            _template: "table",
            _captcha: "false",
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
        if (res.ok && String(data.success) === "true") {
          setStatus("sent");
          return;
        }
        setServerError(res.status === 429 ? "rate" : "server");
        setStatus("idle");
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale: c.locale }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setServerError(data.error === "notConfigured" || data.error === "rate" ? data.error : "server");
    } catch {
      setServerError("server");
    }
    setStatus("idle");
  };

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (k in errors) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const input =
    "w-full rounded-xl border bg-ink/40 px-4 py-3 text-text placeholder:text-muted/70 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/25";
  const border = (k: Field) => (errors[k] ? "border-red-500/70" : "border-line");

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        <Reveal className="max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-navy/50 px-4 py-1.5 text-sm text-gold backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {c.contact.title}
          </span>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            <span className="from-gold-soft to-gold bg-clip-text text-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
              {c.contact.pageTitle}
            </span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">{c.contact.pageLead}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[3fr_2fr]">
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-line bg-navy/60 p-6 backdrop-blur-md [box-shadow:var(--shadow)] sm:p-8">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                  role="status"
                >
                  <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                  <p className="max-w-md text-lg">{f.success}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues({ name: "", email: "", topic: f.topics[0], message: "", website: "" });
                      setStatus("idle");
                    }}
                    className="mt-2 rounded-full border border-line px-5 py-2 text-sm text-muted transition-colors hover:text-text"
                  >
                    {f.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Labeled id="name" label={f.name} error={errors.name}>
                      <input id="name" name="name" autoComplete="name" maxLength={100} value={values.name}
                        onChange={set("name")} placeholder={f.namePh} aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-err" : undefined} className={`${input} ${border("name")}`} />
                    </Labeled>
                    <Labeled id="email" label={f.email} error={errors.email}>
                      <input id="email" name="email" type="email" autoComplete="email" dir="ltr" maxLength={200}
                        value={values.email} onChange={set("email")} placeholder={f.emailPh} aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-err" : undefined}
                        className={`${input} ${border("email")} rtl:text-right`} />
                    </Labeled>
                  </div>

                  <fieldset>
                    <legend className="mb-2 text-sm font-semibold">{f.topic}</legend>
                    <div className="flex flex-wrap gap-2">
                      {f.topics.map((t) => (
                        <label key={t}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold/40 ${
                            values.topic === t ? "border-gold bg-gold/15 text-gold" : "border-line text-muted hover:text-text"
                          }`}>
                          <input type="radio" name="topic" value={t} checked={values.topic === t} onChange={set("topic")} className="sr-only" />
                          {t}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <Labeled id="message" label={f.message} error={errors.message}>
                    <textarea id="message" name="message" rows={6} maxLength={5000} value={values.message}
                      onChange={set("message")} placeholder={f.messagePh} aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-err" : undefined}
                      className={`${input} ${border("message")} resize-y`} />
                  </Labeled>

                  {/* honeypot: hidden from people, bots fill it */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
                  </div>

                  {serverError && (
                    <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                      {f.errors[serverError]}
                    </p>
                  )}

                  <button type="submit" disabled={status === "sending"}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full from-gold-soft to-gold px-8 font-semibold text-on-accent shadow-[0_8px_30px_-8px_rgba(231,165,90,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 sm:justify-self-start ltr:bg-gradient-to-r rtl:bg-gradient-to-l">
                    {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 rtl:-scale-x-100" />}
                    {status === "sending" ? f.sending : f.send}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="space-y-4">
            <h2 className="text-lg font-bold">{c.contact.otherWays}</h2>
            <ContactCards layout="stack" />
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-navy/55 p-4 backdrop-blur-md transition-colors hover:border-gold/40">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-ink/40">
                  <FaLinkedinIn className="h-5 w-5 text-gold" />
                </span>
                <span className="font-semibold">LinkedIn</span>
              </a>
            )}
            <p className="flex items-center gap-2 px-1 text-sm text-muted">
              <Clock className="h-4 w-4 text-gold" />
              {c.contact.replyNote}
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Labeled({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
