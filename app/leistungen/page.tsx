import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Webdesign, UI/UX Design und Wartung für Kleinunternehmen in Zürich — alles aus einer Hand, von der Analyse bis zum Launch.",
};

const SERVICES = [
  {
    title: "Webdesign",
    desc: "Eine Website, die aussieht wie euer Unternehmen — nicht wie ein austauschbares Template.",
    includes: [
      "Individuelles Design statt Baukasten-Vorlage",
      "Mobile-first, funktioniert auf jedem Gerät",
      "Texte, die auf den Punkt kommen, gemeinsam erarbeitet",
      "SEO-Grundlagen, damit man euch findet",
    ],
  },
  {
    title: "UI/UX Design",
    desc: "Kurze Wege bis zum Ziel — egal ob Terminbuchung, Anfrage oder Kaufabschluss.",
    includes: [
      "Klare Struktur statt Menü-Wirrwarr",
      "Nutzerführung, die auf euer Zielpublikum abgestimmt ist",
      "Interaktive Elemente, die Spass machen statt zu nerven",
      "Barrierearmes Design für alle Besucher:innen",
    ],
  },
  {
    title: "Entwicklung",
    desc: "Schnelle, stabile Umsetzung — ohne aufgeblähte Systeme, die ihr nie brauchen werdet.",
    includes: [
      "Moderne, schnelle Technik statt trägem Baukasten",
      "Einfache Inhaltspflege, wo sinnvoll",
      "Saubere Umsetzung des Designs, Pixel für Pixel",
      "Getestet auf allen gängigen Browsern & Geräten",
    ],
  },
  {
    title: "Wartung & Hosting",
    desc: "Nach dem Launch überlassen wir euch nicht euch selbst — Unterhalt ist optional bei uns.",
    includes: [
      "Übergabe mit einfacher Anleitung, falls ihr selbst übernehmt",
      "Oder: wir kümmern uns laufend um Updates & Hosting",
      "Ansprechpartner bei Fragen, kein Ticket-System",
      "Kleine Anpassungen unkompliziert nachträglich möglich",
    ],
  },
];

export default function Leistungen() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Leistungen</p>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-bold sm:text-5xl">
          Alles, was eure Website braucht — aus einer Hand.
        </h1>
        <p className="mt-5 max-w-xl text-text-muted">
          Von der ersten Analyse bis zum Launch übernehmen wir jeden Schritt. Danach entscheidet
          ihr: selbst weiterführen oder den Unterhalt bei uns lassen.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {SERVICES.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-bg-elevated p-8">
              <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-sm text-text-muted">{s.desc}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 rounded-2xl border border-accent/30 bg-accent-soft p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Keine versteckten Preislisten.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-muted">
            Jedes Projekt ist unterschiedlich — darum sprechen wir lieber persönlich über euren
            Bedarf. So viel vorweg: Wir sind spürbar günstiger als die meisten Agenturen.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Unverbindlich anfragen
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
