import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CaseCard from "@/components/CaseCard";
import { CASES } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Fünf ausgearbeitete Konzeptbeispiele in unterschiedlichen Stilrichtungen — als Orientierung, welche Richtung zu eurem Unternehmen passt.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Portfolio</p>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-bold sm:text-5xl">
          Fünf Stilrichtungen.
        </h1>
        <p className="mt-5 max-w-2xl text-text-muted">
          Renyx ist noch jung — diese fünf Projekte sind bewusst ausgearbeitete{" "}
          <strong className="text-text">Konzeptbeispiele</strong>, keine echten Kundenarbeiten.
          Sie zeigen unser Können und dienen als Vorlage: Sag uns im Kontaktformular, welche
          Richtung euch am meisten anspricht — oder auch, dass keine davon passt.
        </p>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CASES.map((c, i) => (
          <ScrollReveal key={c.slug} delay={i * 0.06}>
            <CaseCard c={c} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="glass mt-16 rounded-2xl p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Keine Richtung passt genau?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-text-muted">
            Kein Problem — die meisten Projekte sind ein Mix aus mehreren Stilen. Schreib uns
            einfach, was dir vorschwebt.
          </p>
          <Link
            href="/kontakt"
            className="mt-7 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Zum Kontaktformular
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
