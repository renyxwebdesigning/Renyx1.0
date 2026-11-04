import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceRows from "@/components/ServiceRows";
import { PACKAGES, PACKAGE_ORDER, type PackageId } from "@/lib/packages";
import { CARE_PRICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Von der Beratung bis zur Sichtbarkeit bei Google: So entsteht deine Website bei Renyx — drei klare Pakete ab CHF 600.",
  alternates: { canonical: "/leistungen" },
};

const STEPS = [
  { title: "Beratung & Analyse", desc: "Wünsche, Konkurrenz und mehrere Design-Varianten." },
  { title: "Aufbau", desc: "Aus dem Entwurf wird eine schnelle, moderne Website." },
  { title: "Funktionen", desc: "Terminbuchung, Shop, Bewertungen oder Geschäfts-E-Mail nach Bedarf." },
  { title: "Launch & Sichtbarkeit", desc: "Live gehen, Google Business und Google-Sichtbarkeit einrichten." },
];

const PLAN_DETAILS: Record<PackageId, { features: string[]; highlighted?: boolean }> = {
  landingpage: {
    features: ["1 Seite mit allem Wichtigen", "Bewährtes Design, angepasst an dich", "Kontaktformular per E-Mail-Link"],
  },
  "kleine-website": {
    features: ["3–4 individuell gestaltete Seiten", "Kontaktformular mit E-Mail-Versand", "SEO-Grundlagen & eigene Domain"],
    highlighted: true,
  },
  "vollstaendige-website": {
    features: ["5+ Seiten, komplett individuell", "Erweiterte Funktionen", "Vertiefte SEO & 3 Monate Wartung"],
  },
};

const PLANS = PACKAGE_ORDER.map((id) => ({ id, ...PACKAGES[id], ...PLAN_DETAILS[id] }));

export default function Leistungen() {
  return (
    <>
      <PageHeader label="Leistungen" title="Von der Idee bis online." />

      <section className="wrap pb-[clamp(5rem,11vw,11rem)]">
        <ServiceRows />
      </section>

      <section className="wrap pb-[clamp(5rem,11vw,11rem)]">
        <ScrollReveal>
          <h2 className="display display-md">Drei klare Preise.</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-3 lg:gap-8">
          {PLANS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08} className="flex">
              <div className={`flex w-full flex-col border-t pt-6 ${p.highlighted ? "border-accent" : ""}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-medium">{p.label}</h3>
                  {p.highlighted && <p className="text-sm text-accent">Beliebteste Wahl</p>}
                </div>
                <p className="display mt-10 text-[clamp(2.5rem,3.9vw,4.75rem)] whitespace-nowrap">{p.price}</p>
                <p className="label mt-2">einmalig</p>
                <ul className="mt-8 flex flex-1 flex-col gap-2 text-text-muted">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  href={`/kontakt?paket=${p.id}`}
                  className={`btn mt-10 w-full ${p.highlighted ? "btn-primary" : "btn-ghost"}`}
                  aria-label={`${p.label} anfragen`}
                >
                  Anfragen
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-bone text-ink">
        <div className="wrap section grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="display display-md">Der Ablauf</h2>
          </ScrollReveal>
          <ol className="border-b border-ink/25">
            {STEPS.map((s) => (
              <li key={s.title} className="grid gap-1 border-t border-ink/25 py-6 md:grid-cols-[1fr_1.4fr] md:gap-8">
                <h3 className="text-xl font-medium tracking-[-0.01em]">{s.title}</h3>
                <p className="text-lg leading-snug text-ink/70">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <ScrollReveal>
          <h2 className="display display-md">Nach dem Launch</h2>
          <p className="lead mt-5 max-w-sm">Du bekommst alle Zugänge. Wir helfen, wenn du uns brauchst.</p>
          <Link href="/leistungen/wartung-hosting" className="arrow-link mt-4">
            Wartung &amp; Hosting <span aria-hidden>→</span>
          </Link>
        </ScrollReveal>
        <ul className="border-b self-start">
          {CARE_PRICES.map((c) => (
            <li key={c.name} className="flex items-baseline justify-between gap-6 border-t py-6">
              <span className="text-xl font-medium tracking-[-0.01em]">{c.name}</span>
              <span className="whitespace-nowrap text-xl text-text-muted">{c.price}</span>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Welches Paket passt?" />
    </>
  );
}
