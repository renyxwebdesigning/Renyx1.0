import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CaseCard from "@/components/CaseCard";
import { CASES } from "@/lib/cases";
import { SITE } from "@/lib/constants";

const USPS = [
  { value: "1–10", label: "Personen — genau eure Grösse" },
  { value: "1–2 Wo.", label: "Vom Erstgespräch bis zum Launch" },
  { value: "100%", label: "Analyse bis Launch aus einer Hand" },
  { value: "↓", label: "Günstiger als die meisten Agenturen" },
];

const SERVICES = [
  {
    title: "Webdesign",
    desc: "Individuelles Design statt austauschbarem Baukasten-Template — abgestimmt auf dein Unternehmen und deine Kundschaft.",
  },
  {
    title: "UI/UX Design",
    desc: "Klare Struktur, kurze Wege bis zum Ziel — ob Terminbuchung, Kontaktformular oder Kaufabschluss.",
  },
  {
    title: "Wartung & Hosting",
    desc: "Auf Wunsch übernehmen wir Updates und Hosting weiter — oder übergeben dir eine Anleitung, damit du selbst ranmusst.",
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Gespräch statt Fragebogen",
    d: "Wir lernen dein Unternehmen in einem kurzen Gespräch kennen — kein 20-seitiges Briefing-Dokument.",
  },
  {
    n: "02",
    t: "Design zum Anfassen",
    d: "Du siehst innert Tagen einen klickbaren Entwurf, keine Wand aus Text und Moodboards.",
  },
  {
    n: "03",
    t: "Entwicklung mit Feedback-Schlaufen",
    d: "Laufende Zwischenstände statt einer Überraschung kurz vor dem Launch.",
  },
  {
    n: "04",
    t: "Launch & Übergabe",
    d: "Seite geht live, du bekommst eine einfache Anleitung — oder wir übernehmen den Unterhalt für dich.",
  },
];

export default function Home() {
  const featured = CASES.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/hero/gold-particles.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start px-6 pb-20 pt-24 sm:pt-32">
          <ScrollReveal>
            <p className="glass mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs font-medium text-text-muted">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
              Webdesign &amp; UI/UX · {SITE.city}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-[1.1] sm:text-6xl">
              Websites, die wirklich etwas bringen.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-balance text-lg text-text-muted">
              Wir gestalten und entwickeln Webseiten für kleine Unternehmen in {SITE.city} — von
              der ersten Analyse bis zum Launch. Persönlich, direkt, ohne Agentur-Aufpreis.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
              >
                Projekt starten
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition-colors hover:border-accent/60"
              >
                Portfolio ansehen
              </Link>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              Unverbindlich · Antwort meist innerhalb eines Werktags
            </p>
          </ScrollReveal>
        </div>

        <div className="relative border-y border-border bg-bg-elevated/50 backdrop-blur-sm">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4">
            {USPS.map((u) => (
              <div key={u.label}>
                <p className="font-mono text-3xl font-bold text-accent">{u.value}</p>
                <p className="mt-1 text-xs text-text-muted">{u.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Leistungen</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold sm:text-4xl">
            Alles, was deine Website braucht.
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="glass glow-hover h-full rounded-xl p-6">
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-text-muted">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2}>
          <Link
            href="/leistungen"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            Alle Leistungen im Detail →
          </Link>
        </ScrollReveal>
      </section>

      {/* Portfolio / style finder teaser */}
      <section className="border-t border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Stilrichtungen
            </p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-bold sm:text-4xl">
              Noch unsicher, welcher Stil zu dir passt?
            </h2>
            <p className="mt-4 max-w-xl text-text-muted">
              Fünf ausgearbeitete Konzeptbeispiele in unterschiedlichen Stilrichtungen — im
              Kontaktformular kannst du direkt auswählen, welche Richtung dir am besten gefällt.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 0.1}>
                <CaseCard c={c} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2}>
            <Link
              href="/portfolio"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Alle Stilrichtungen ansehen →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Ablauf</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-bold sm:text-4xl">
            So läuft die Zusammenarbeit ab.
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {PROCESS.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.08}>
              <div className="flex gap-5">
                <span className="font-mono text-2xl font-bold text-accent/50">{p.n}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.t}</h3>
                  <p className="mt-2 text-sm text-text-muted">{p.d}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-border bg-bg-elevated/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Über uns</p>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-bold sm:text-4xl">
              Noah &amp; Elia — zwei Brüder aus {SITE.city}.
            </h2>
            <p className="mt-4 max-w-xl text-text-muted">
              Renyx ist jung. Aber unser Handwerk ist es nicht — wir gestalten seit Jahren digitale
              Produkte und bringen dieses Können jetzt zu kleinen Unternehmen in {SITE.city}, ohne
              Agentur-Wasserkopf und Agentur-Preis.
            </p>
            <Link
              href="/ueber-uns"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              Mehr über uns →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <ScrollReveal>
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold sm:text-4xl">
            Bereit für eure Website?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-muted">
            Schreib uns kurz, worum es geht — wir melden uns persönlich zurück.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Jetzt Kontakt aufnehmen
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
