import type { Metadata } from "next";
import { Suspense } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Meld dich unverbindlich bei Flux — per Formular, WhatsApp, Telefon oder E-Mail. Wir melden uns meist innerhalb eines Werktags.",
};

export default function Kontakt() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Kontakt</p>
        <h1 className="mt-3 max-w-xl text-balance font-display text-4xl font-bold sm:text-5xl">
          Erzähl uns von deinem Projekt.
        </h1>
        <p className="mt-5 max-w-xl text-text-muted">
          Kein Preisrechner, kein Callcenter — nur ein kurzes Formular. Wir melden uns persönlich
          zurück, meist innerhalb eines Werktags.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="mt-14">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </ScrollReveal>
    </div>
  );
}
