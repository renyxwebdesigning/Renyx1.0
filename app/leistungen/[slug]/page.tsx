import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ScrollReveal from "@/components/ScrollReveal";
import { CARE_INCLUDED, CARE_PRICES, SERVICES, getServiceBySlug } from "@/lib/services";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.metaDescription,
    alternates: { canonical: `/leistungen/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const idx = SERVICES.findIndex((x) => x.slug === slug);
  const next = SERVICES[(idx + 1) % SERVICES.length];

  return (
    <>
      <header className="wrap pb-16 pt-32 sm:pb-24 sm:pt-44">
        <ScrollReveal>
          <Link href="/leistungen" className="arrow-link label hover:text-text">
            <span aria-hidden>←</span> Leistungen
          </Link>
          <h1 className="display display-xl mt-6 text-balance">{s.title}</h1>
          <p className="lead mt-10 max-w-2xl !text-text">{s.lead}</p>
        </ScrollReveal>
      </header>

      <section className="wrap grid gap-10 pb-[clamp(5rem,11vw,11rem)] lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <ScrollReveal>
          <h2 className="display display-md">Was dazugehört</h2>
        </ScrollReveal>
        <ul className="border-b">
          {s.includes.map((item) => (
            <li key={item.title} className="grid gap-1 border-t py-6 md:grid-cols-[1fr_1.4fr] md:gap-8">
              <h3 className="text-xl font-medium tracking-[-0.01em]">{item.title}</h3>
              <p className="text-lg leading-snug text-text-muted">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-bone text-ink">
        <div className="wrap section">
          <ScrollReveal>
            <h2 className="display display-lg max-w-[13ch] text-balance">{s.point.title}</h2>
            <p className="mt-8 max-w-xl text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.4] text-ink/70">{s.point.text}</p>
          </ScrollReveal>
        </div>
      </section>

      {s.slug === "wartung-hosting" && (
        <section className="wrap section grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <ScrollReveal>
            <h2 className="display display-md">Preise</h2>
            <p className="lead mt-5 max-w-sm">{CARE_INCLUDED}</p>
          </ScrollReveal>
          <ul className="self-start border-b">
            {CARE_PRICES.map((c) => (
              <li key={c.name} className="flex items-baseline justify-between gap-6 border-t py-6">
                <span className="text-xl font-medium tracking-[-0.01em]">{c.name}</span>
                <span className="whitespace-nowrap text-xl text-text-muted">{c.price}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={s.slug === "wartung-hosting" ? "border-t" : ""}>
        <Link href={`/leistungen/${next.slug}`} className="row-link wrap block py-14 sm:py-20">
          <span className="label block">Nächste Leistung</span>
          <span className="row-title display display-lg mt-4 block">
            {next.title} <span aria-hidden>→</span>
          </span>
        </Link>
      </section>

      <CtaBand title={s.cta} />
    </>
  );
}
