"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { CASES, STYLES, type StyleId } from "@/lib/cases";
import { CONTACT } from "@/lib/constants";

type StyleChoice = StyleId | "none";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialStyle = searchParams.get("stil") as StyleChoice | null;

  const [style, setStyle] = useState<StyleChoice | null>(
    initialStyle && (initialStyle === "none" || initialStyle in STYLES) ? initialStyle : null
  );
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const styleLabel = useMemo(() => {
    if (!style) return "Keine Angabe";
    if (style === "none") return "Keins davon — ich erkläre es lieber";
    return STYLES[style].label;
  }, [style]);

  const canSubmit = name.trim() && email.trim() && message.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, styleLabel, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="text-sm font-semibold text-text">
          1. Welcher Stil spricht dich an? <span className="font-normal text-text-muted">(optional)</span>
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CASES.map((c) => {
            const active = style === c.styleId;
            return (
              <button
                type="button"
                key={c.slug}
                onClick={() => setStyle(c.styleId)}
                className={`glow-hover flex items-center gap-3 rounded-xl p-3 text-left ${
                  active ? "glass-accent" : "glass"
                }`}
              >
                <span
                  className="h-9 w-9 shrink-0 rounded-lg"
                  style={{ background: c.palette.accent }}
                  aria-hidden
                />
                <span>
                  <span className="block text-sm font-medium text-text">
                    {STYLES[c.styleId].label}
                  </span>
                  <span className="block text-xs text-text-muted">{c.clientName}</span>
                </span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setStyle("none")}
            className={`glow-hover flex items-center gap-3 rounded-xl p-3 text-left sm:col-span-2 ${
              style === "none" ? "glass-accent" : "glass"
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-sm text-text-muted">
              ?
            </span>
            <span className="text-sm font-medium text-text">
              Keins davon — ich erklär&apos;s lieber selbst
            </span>
          </button>
        </div>

        <div className="glass mt-10 rounded-xl p-6">
          <p className="text-sm font-semibold text-text">Lieber direkt schreiben?</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              WhatsApp: {CONTACT.phoneDisplay}
            </a>
            <a href={CONTACT.tel} className="text-text-muted hover:text-accent">
              Telefon: {CONTACT.phoneDisplay}
            </a>
            <a href={CONTACT.mailto} className="text-text-muted hover:text-accent">
              E-Mail: {CONTACT.email}
            </a>
            <a
              href={CONTACT.trustpilot}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent"
            >
              ★ Schon Kunde? Bewertung auf Trustpilot abgeben
            </a>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-text">2. Worum geht es?</p>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                type="text"
                autoComplete="name"
              />
            </Field>
            <Field label="Firma">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="input"
                type="text"
                autoComplete="organization"
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="E-Mail *">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                type="email"
                autoComplete="email"
              />
            </Field>
            <Field label="Telefon">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input"
                type="tel"
                autoComplete="tel"
              />
            </Field>
          </div>
          <Field label="Nachricht *">
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input min-h-32 resize-y"
              placeholder="Erzähl uns kurz von deinem Unternehmen und was du dir für die Website wünschst."
            />
          </Field>

          <motion.button
            type="submit"
            whileHover={{ scale: canSubmit ? 1.02 : 1 }}
            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
            disabled={!canSubmit || status === "sending"}
            className="mt-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
          </motion.button>

          {status === "sent" && (
            <p className="text-sm text-text-muted">
              Danke! Deine Anfrage ist bei uns eingegangen — wir melden uns meist innerhalb eines
              Werktags.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-text-muted">
              Das hat leider nicht geklappt. Schreib uns direkt an{" "}
              <a href={CONTACT.mailto} className="text-accent hover:underline">
                {CONTACT.email}
              </a>
              .
            </p>
          )}

          <p className="text-xs text-text-muted">
            Kein Spam, keine Weitergabe an Dritte. Wir melden uns meist innerhalb eines Werktags.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-text-muted">{label}</span>
      {children}
    </label>
  );
}
