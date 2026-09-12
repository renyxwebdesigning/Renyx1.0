import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Noah & Elia — zwei Brüder aus Zürich, die Webdesign und UI/UX für kleine Unternehmen machen.",
  alternates: { canonical: "/ueber-uns" },
};

const VALUES = [
  {
    t: "Ehrlich statt aufgeblasen",
    d: "Wir versprechen nichts, was wir nicht halten können — und sagen lieber einmal zu viel, wie der Stand ist.",
  },
  {
    t: "Persönlich statt anonym",
    d: "Ihr schreibt mit uns, nicht mit einem Projektmanager, der drei Ebenen von der Umsetzung entfernt ist.",
  },
  {
    t: "Lokal verwurzelt",
    d: `Wir kennen ${SITE.city} und die Art, wie hier kleine Unternehmen arbeiten — kein Copy-Paste-Konzept von irgendwo.`,
  },
];

export default function UeberUns() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Über uns</p>
        <h1 className="mt-3 text-balance font-display text-4xl font-bold sm:text-5xl">
          Zwei Brüder, ein Handwerk.
        </h1>
        <p className="mt-6 text-lg text-text-muted">
          Renyx gibt es als Unternehmen erst seit Kurzem. Unsere Erfahrung mit Design und Webseiten
          nicht — die bringen wir jetzt dorthin, wo sie aus unserer Sicht am meisten bewirkt:
          zu kleinen Unternehmen in {SITE.city}, die sich einen grossen Auftritt sonst kaum leisten
          könnten.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        <ScrollReveal>
          <div className="glass glow-hover overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/team/noah.png"
                alt="Noah"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8">
              <h2 className="font-display text-xl font-semibold">Noah</h2>
              <p className="mt-1 text-sm text-accent">Webdesign &amp; Entwicklung</p>
              <p className="mt-4 text-sm text-text-muted">
                Verantwortet die technische Umsetzung — von der ersten Idee bis zum Launch.
                Erster Ansprechpartner für alles rund um eure Anfrage.
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="glass glow-hover overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/team/elia.png"
                alt="Elia"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-8">
              <h2 className="font-display text-xl font-semibold">Elia</h2>
              <p className="mt-1 text-sm text-accent">UI/UX &amp; Konzept</p>
              <p className="mt-4 text-sm text-text-muted">
                Verantwortet Design und Nutzerführung — damit eure Website nicht nur gut aussieht,
                sondern für eure Kundschaft auch einfach zu bedienen ist.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.15}>
        <h2 className="mt-20 font-display text-2xl font-bold sm:text-3xl">Wofür wir stehen</h2>
      </ScrollReveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {VALUES.map((v, i) => (
          <ScrollReveal key={v.t} delay={0.05 * i}>
            <h3 className="font-display font-semibold">{v.t}</h3>
            <p className="mt-2 text-sm text-text-muted">{v.d}</p>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="glass-accent mt-20 rounded-2xl p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Lernen wir uns kennen.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-text-muted">
            Ein kurzes Gespräch reicht meistens schon, um zu wissen, ob wir zueinander passen.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
