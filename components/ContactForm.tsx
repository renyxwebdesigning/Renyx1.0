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
  const [sent, setSent] = useState(false);

  const styleLabel = useMemo(() => {
    if (!style) return "Keine Angabe";
    if (style === "none") return "Keins davon — ich erkläre es lieber";
    return STYLES[style].label;
  }, [style]);

  const canSubmit = name.trim() && email.trim() && message.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const lines = [
      `Name: ${name}`,
      company ? `Firma: ${company}` : null,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      `Bevorzugter Stil: ${styleLabel}`,
      "",
      message,
    ].filter(Boolean);

    const subject = encodeURIComponent(`Projektanfrage von ${name}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setSent(true);
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
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                  active ? "border-accent bg-accent-soft" : "border-border bg-bg-elevated hover:border-accent/40"
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
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors sm:col-span-2 ${
              style === "none" ? "border-accent bg-accent-soft" : "border-border bg-bg-elevated hover:border-accent/40"
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

        <div className="mt-10 rounded-xl border border-border bg-bg-elevated p-6">
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
            disabled={!canSubmit}
            className="mt-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anfrage per E-Mail senden
          </motion.button>

          {sent && (
            <p className="text-sm text-text-muted">
              Dein E-Mail-Programm sollte sich mit der vorausgefüllten Anfrage geöffnet haben —
              einfach abschicken. Falls nicht, schreib uns direkt an {CONTACT.email}.
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
