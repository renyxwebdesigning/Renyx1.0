import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { PACKAGES, PACKAGE_ORDER, type PackageId } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Von der Beratung bis zur Sichtbarkeit bei Google: So entsteht deine Website bei Renyx — vier klare Pakete ab CHF 150.",
};

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path
        d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1 0-1.95-.16-2.83-.46L5 21l1.55-3.6C5.2 16.02 4 14.15 4 12Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPuzzle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path
        d="M9 4h3a1 1 0 0 1 1 1v1.6a1.6 1.6 0 1 0 0 3.2V11a1 1 0 0 1-1 1h-1.6a1.6 1.6 0 1 1-3.2 0H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h1.6a1.6 1.6 0 1 0 0-3.2V4a1 1 0 0 1 1-1Z"
        transform="translate(1.5 1.5)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 13h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path
        d="M12 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c1-1 1-2.5.3-3.3-.8-.7-2.3-.7-3.3.3Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15 9 12c0-4 2-7.5 5.5-9.5C18 4 19 8 15.5 12L12 15Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12 5.5 13 4 16.5 7.5 15" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9 12-1.5-2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STEPS = [
  {
    icon: IconChat,
    title: "Beratung & Design-Analyse",
    desc: "Wir besprechen deine Wünsche und dein Wunsch-Design, schauen uns die Konkurrenz an und entwerfen mehrere Design-Varianten.",
  },
  {
    icon: IconLayers,
    title: "Aufbau der Webseite",
    desc: "Aus dem gewählten Entwurf entsteht eine moderne, technisch einwandfrei funktionierende Webseite.",
  },
  {
    icon: IconPuzzle,
    title: "Individuelle Zusatzfunktionen",
    desc: "Terminbuchung, Online-Shop, Bewertungen, Kontaktformular oder eine eigene Geschäfts-E-Mail — ganz nach Bedarf.",
  },
  {
    icon: IconRocket,
    title: "Veröffentlichung & Sichtbarkeit",
    desc: "Deine Seite geht live. Wir richten Google Business und die Google-Sichtbarkeit ein, damit dich Kundschaft findet.",
  },
];

const PLAN_DETAILS: Record<
  PackageId,
  { tagline: string; features: string[]; highlighted?: boolean; badge?: string }
> = {
  landingpage: {
    tagline: "Schnell online, klar und einfach.",
    features: [
      "1 Seite mit allem Wichtigen: Hero, Leistungen, über uns, Kontakt",
      "Bewährtes Design, angepasst an dein Unternehmen",
      "Kontaktformular per E-Mail-Link",
    ],
  },
  "kleine-website": {
    tagline: "Mehr Seiten, mehr Individualität.",
    features: [
      "3–4 Seiten, individuell gestaltet nach deinem Stil",
      "Echtes Kontaktformular mit E-Mail-Versand",
      "SEO-Grundlagen & eigene Domain inklusive",
    ],
  },
  "vollstaendige-website": {
    tagline: "Der Rundum-Auftritt für dein Unternehmen.",
    features: [
      "5+ Seiten, z. B. mit Portfolio oder Referenzen",
      "Komplett individuelles Design mit erweiterten Funktionen",
      "Vertiefte SEO-Optimierung & 3 Monate Wartung inklusive",
    ],
    highlighted: true,
    badge: "Beliebteste Wahl",
  },
  premium: {
    tagline: "Für höchste Ansprüche & viel Wachstum.",
    features: [
      "Unbegrenzte Seiten, z. B. mit eigener Inhaltspflege",
      "Individuelle Formulare oder Rechner nach Bedarf",
      "Laufende Wartung & Priorität bei Anfragen inklusive",
    ],
  },
};

const PLANS = PACKAGE_ORDER.map((id) => ({
  id,
  name: PACKAGES[id].label,
  price: PACKAGES[id].price,
  ...PLAN_DETAILS[id],
}));

export default function Leistungen() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Leistungen</p>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-bold sm:text-5xl">
          Deine Website — von der Idee bis online.
        </h1>
        <p className="mt-5 max-w-xl text-text-muted">
          Wir übernehmen jeden Schritt: Beratung, Design, Umsetzung und Sichtbarkeit bei Google. Du
          entscheidest nur noch, wie viel Betreuung du danach möchtest.
        </p>
      </ScrollReveal>

      {/* Ablauf */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <ScrollReveal key={s.title} delay={i * 0.08}>
              <div className="glass glow-hover h-full rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon />
                  </span>
                  <span className="font-mono text-sm font-bold text-accent/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-base font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.desc}</p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Preise */}
      <ScrollReveal delay={0.1} className="mt-24">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">Preise</p>
        <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-bold sm:text-4xl">
          Transparent statt versteckt.
        </h2>
        <p className="mt-4 max-w-xl text-text-muted">
          Vier klare Pakete, keine Überraschungen. Nicht sicher, was zu dir passt? Wähl eins aus —
          im Kontaktformular bestätigen wir dir deine Wahl und beraten dich unverbindlich weiter.
        </p>
      </ScrollReveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
        {PLANS.map((p, i) => (
          <ScrollReveal key={p.id} delay={0.1 + i * 0.08} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-2xl p-7 ${
                p.highlighted
                  ? "glass-accent lg:-translate-y-3 lg:shadow-2xl"
                  : "glass"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-bg">
                  {p.badge}
                </span>
              )}
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-text-muted">{p.tagline}</p>
              <p className="mt-6">
                <span className="font-display text-2xl font-bold">{p.price}</span>
                <span className="ml-1.5 text-xs text-text-muted">einmalig</span>
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/kontakt?paket=${p.id}`}
                className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                  p.highlighted
                    ? "bg-accent text-bg hover:bg-accent-hover"
                    : "border border-border text-text hover:border-accent/60"
                }`}
              >
                Anfragen
              </Link>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Support & Wartung */}
      <ScrollReveal delay={0.15} className="mt-16">
        <div className="glass rounded-2xl p-8 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="font-display text-xl font-semibold">Auch nach dem Launch nicht allein.</h2>
              <p className="mt-3 max-w-md text-sm text-text-muted">
                Du erhältst alle Zugänge, um deine Website selbst zu pflegen. Brauchst du
                Unterstützung, sind wir günstig zur Stelle — einmalig oder laufend.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:border-l sm:border-border sm:pl-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-text-muted">Einzelne Anpassung</span>
                <span className="whitespace-nowrap font-mono text-sm font-bold text-accent">
                  CHF 30/Std.
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm text-text-muted">Wartungsvertrag</span>
                <span className="whitespace-nowrap font-mono text-sm font-bold text-accent">
                  CHF 100/Mt.
                </span>
              </div>
              <p className="mt-1 text-xs text-text-muted">
                Laufende Updates, SEO-Pflege & kleine Design-Anpassungen inklusive.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 rounded-2xl border border-border p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Bereit für den nächsten Schritt?</h2>
          <p className="mx-auto mt-3 max-w-lg text-text-muted">
            Schreib uns kurz, worum es geht — wir sagen dir unverbindlich, welches Paket für dich
            am meisten Sinn ergibt.
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
