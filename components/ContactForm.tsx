"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { STYLES, type StyleId } from "@/lib/cases";
import { CONTACT } from "@/lib/constants";
import { PACKAGES, PACKAGE_ORDER, type PackageId } from "@/lib/packages";

type StyleChoice = StyleId | "none";
type PackageChoice = PackageId | "none";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const initialStyle = searchParams.get("stil") as StyleChoice | null;
  const initialPackage = searchParams.get("paket") as PackageChoice | null;

  const [style, setStyle] = useState<StyleChoice | "">(
    initialStyle && (initialStyle === "none" || initialStyle in STYLES) ? initialStyle : ""
  );
  const [pkg, setPkg] = useState<PackageChoice | "">(
    initialPackage && (initialPackage === "none" || initialPackage in PACKAGES) ? initialPackage : ""
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

  const packageLabel = useMemo(() => {
    if (!pkg) return "Keine Angabe";
    if (pkg === "none") return "Noch unklar — bitte beraten";
    return `${PACKAGES[pkg].label} (${PACKAGES[pkg].price})`;
  }, [pkg]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, phone, styleLabel, packageLabel, message }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t pt-8">
        <p className="display display-md">Danke, {name.trim().split(" ")[0]}.</p>
        <p className="lead mt-4">Wir melden uns meist innerhalb eines Werktags.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Name">
          <input required value={name} onChange={(e) => setName(e.target.value)} className="input" type="text" autoComplete="name" />
        </Field>
        <Field label="Firma" optional>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="input" type="text" autoComplete="organization" />
        </Field>
        <Field label="E-Mail">
          <input required value={email} onChange={(e) => setEmail(e.target.value)} className="input" type="email" autoComplete="email" />
        </Field>
        <Field label="Telefon" optional>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" type="tel" autoComplete="tel" />
        </Field>
        <Field label="Paket" optional>
          <select value={pkg} onChange={(e) => setPkg(e.target.value as PackageChoice | "")} className="input">
            <option value="">Keine Angabe</option>
            {PACKAGE_ORDER.map((id) => (
              <option key={id} value={id}>
                {PACKAGES[id].label} · {PACKAGES[id].price}
              </option>
            ))}
            <option value="none">Noch unklar, bitte beraten</option>
          </select>
        </Field>
        <Field label="Stil" optional>
          <select value={style} onChange={(e) => setStyle(e.target.value as StyleChoice | "")} className="input">
            <option value="">Keine Angabe</option>
            {Object.values(STYLES).map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
            <option value="none">Keins davon</option>
          </select>
        </Field>
      </div>
      <Field label="Worum geht es?">
        <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="input resize-y" />
      </Field>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-60">
          {status === "sending" ? "Wird gesendet …" : "Anfrage senden"}
        </button>
        <p className="label !text-sm">Kein Spam, keine Weitergabe an Dritte.</p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-accent">
          Das hat leider nicht geklappt. Schreib uns direkt an{" "}
          <a href={CONTACT.mailto} className="underline underline-offset-4">
            {CONTACT.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-[0.9375rem] text-text-muted">
      <span>
        {label}
        {optional && <span className="opacity-75"> (optional)</span>}
      </span>
      {children}
    </label>
  );
}
