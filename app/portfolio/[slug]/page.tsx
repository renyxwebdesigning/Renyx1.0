import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import BrowserMockup from "@/components/BrowserMockup";
import { CASES, STYLES, getCaseBySlug } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return {};
  return {
    title: c.clientName,
    description: c.summary,
  };
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) notFound();

  const style = STYLES[c.styleId];
  const idx = CASES.findIndex((x) => x.slug === slug);
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <Link href="/portfolio" className="text-sm text-text-muted hover:text-accent">
          ← Alle Stilrichtungen
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-medium text-accent">
            {style.label}
          </span>
          <span className="glass rounded-full px-3 py-1 font-mono text-xs text-text-muted">
            Konzeptbeispiel
          </span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-5xl">{c.clientName}</h1>
        <p className="mt-2 text-text-muted">{c.industry}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <BrowserMockup c={c} className="mt-10" />
      </ScrollReveal>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <ScrollReveal>
          <h2 className="font-display text-lg font-semibold text-accent">Herausforderung</h2>
          <p className="mt-3 text-text-muted">{c.challenge}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <h2 className="font-display text-lg font-semibold text-accent">Lösung</h2>
          <p className="mt-3 text-text-muted">{c.solution}</p>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.15}>
        <div className="glass mt-14 rounded-2xl p-8">
          <h2 className="font-display text-lg font-semibold">Im Detail umgesetzt</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {c.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="glass-accent mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold">Dieser Stil trifft es genau?</h2>
            <p className="mt-2 text-text-muted">
              Sag uns im Kontaktformular Bescheid — wir nehmen &quot;{c.clientName}&quot; als
              Referenz für euer Projekt.
            </p>
          </div>
          <Link
            href={`/kontakt?stil=${c.styleId}`}
            className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            Diesen Stil anfragen
          </Link>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <Link
          href={`/portfolio/${next.slug}`}
          className="glass glow-hover mt-16 flex items-center justify-between rounded-2xl p-6"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Nächstes Beispiel</p>
            <p className="mt-1 font-display text-lg font-semibold">{next.clientName}</p>
          </div>
          <span className="text-accent">→</span>
        </Link>
      </ScrollReveal>
    </div>
  );
}
