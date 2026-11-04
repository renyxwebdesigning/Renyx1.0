import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import HeroBackdrop from "@/components/HeroBackdrop";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceRows from "@/components/ServiceRows";
import Team from "@/components/Team";
import WorkTile from "@/components/WorkTile";
import { CASES } from "@/lib/cases";
import { SITE } from "@/lib/constants";

const HOME_TITLE = `Webdesign Zürich für Kleinunternehmen — ${SITE.name}`;
const HOME_DESCRIPTION =
  "Webdesign Zürich: Renyx gestaltet Webseiten und UI/UX-Design für kleine Unternehmen — von der ersten Analyse bis zum Launch, persönlich und ohne Agentur-Aufpreis.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: HOME_TITLE, description: HOME_DESCRIPTION },
  twitter: { title: HOME_TITLE, description: HOME_DESCRIPTION },
};

const STEPS = [
  { t: "Gespräch", d: "Kurz kennenlernen, kein Briefing-Dokument." },
  { t: "Entwurf", d: "Innert Tagen ein klickbarer Entwurf." },
  { t: "Umsetzung", d: "Laufende Zwischenstände, keine Überraschung." },
  { t: "Launch", d: "Live, mit Anleitung oder laufender Betreuung." },
];

export default function Home() {
  const [first, ...rest] = CASES.slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden">
        <HeroBackdrop />
        <div className="wrap relative pb-24 pt-32 sm:pb-20">
          <ScrollReveal y={28}>
            <p className="label !text-text">Webdesign für Kleinunternehmen in {SITE.city}</p>
            <h1 className="display display-xl mt-6 max-w-[11ch]">Websites, die wirklich etwas bringen.</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-8 sm:mt-14 md:flex-row md:items-end md:justify-between">
              <p className="lead max-w-md !text-text">Design und Entwicklung aus einer Hand, persönlich bis zum Launch.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-primary">
                  Projekt starten
                </Link>
                <Link href="/portfolio" className="btn btn-ghost">
                  Konzepte ansehen
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="wrap section">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="display display-lg">Konzepte</h2>
              <p className="label mt-4">Beispiele aus eigener Hand, keine Kundenprojekte.</p>
            </div>
            <Link href="/portfolio" className="arrow-link">
              Alle sechs ansehen <span aria-hidden>→</span>
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-12 flex flex-col gap-10 sm:mt-16 sm:gap-14">
          <ScrollReveal>
            <WorkTile c={first} large heading="h3" />
          </ScrollReveal>
          <div className="grid gap-10 md:grid-cols-2 md:gap-6">
            {rest.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 0.08}>
                <WorkTile c={c} heading="h3" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap pb-[clamp(5rem,11vw,11rem)]">
        <ScrollReveal>
          <h2 className="label">Leistungen</h2>
        </ScrollReveal>
        <div className="mt-6">
          <ServiceRows />
        </div>
      </section>

      <section className="bg-bone text-ink">
        <div className="wrap section">
          <ScrollReveal>
            <h2 className="display display-lg max-w-[12ch]">In 1–2 Wochen online.</h2>
          </ScrollReveal>
          <ol className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.t} delay={i * 0.07}>
                <li className="list-none border-t border-ink/25 pt-5">
                  <h3 className="display display-md !text-[2rem]">{s.t}</h3>
                  <p className="mt-3 max-w-[24ch] text-lg leading-snug text-ink/70">{s.d}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="display display-lg">Noah &amp; Elia</h2>
            <p className="lead mt-6 max-w-sm">Zwei Brüder. Kein Projektmanager dazwischen.</p>
            <Link href="/ueber-uns" className="arrow-link mt-6">
              Über uns <span aria-hidden>→</span>
            </Link>
          </ScrollReveal>
          <Team />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
