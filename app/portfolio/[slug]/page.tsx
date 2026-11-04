import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ExampleSite from "@/components/ExampleSite";
import ScrollReveal from "@/components/ScrollReveal";
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
    alternates: { canonical: `/portfolio/${slug}` },
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
    <>
      <header className="wrap pb-12 pt-32 sm:pt-44">
        <ScrollReveal>
          <Link href="/portfolio" className="arrow-link label hover:text-text">
            <span aria-hidden>←</span> Portfolio
          </Link>
          <h1 className="display display-lg mt-6 max-w-[16ch] text-balance">{c.clientName}</h1>
          <p className="label mt-6">
            Konzeptbeispiel · {c.industry} · {style.label}
          </p>
        </ScrollReveal>
      </header>

      <section className="wrap">
        <ScrollReveal delay={0.1}>
          <ExampleSite c={c} />
          <a href={c.siteUrl} target="_blank" rel="noopener" className="arrow-link mt-5">
            Seite in neuem Tab öffnen <span aria-hidden>→</span>
          </a>
        </ScrollReveal>
      </section>

      <section className="wrap section grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <ScrollReveal>
          <p className="lead !text-text">{c.summary}</p>
          <Link href={`/kontakt?stil=${c.styleId}`} className="btn btn-primary mt-8">
            Diesen Stil anfragen
          </Link>
        </ScrollReveal>
        <ul className="self-start border-b">
          {c.features.map((f) => (
            <li key={f} className="border-t py-5 text-lg leading-snug">
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t">
        <Link href={`/portfolio/${next.slug}`} className="row-link wrap block py-14 sm:py-20">
          <span className="label block">Nächstes Konzept</span>
          <span className="row-title display display-lg mt-4 block">
            {next.clientName} <span aria-hidden>→</span>
          </span>
        </Link>
      </section>
    </>
  );
}
