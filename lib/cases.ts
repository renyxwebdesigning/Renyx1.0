export type StyleId = "handwerk" | "tradition" | "corporate" | "elegant" | "gastro" | "bold";

export interface StyleMeta {
  id: StyleId;
  label: string;
  short: string;
}

export const STYLES: Record<StyleId, StyleMeta> = {
  handwerk: {
    id: "handwerk",
    label: "Warm & Handwerklich",
    short: "Edel, warm, viel Material und Handwerk",
  },
  tradition: {
    id: "tradition",
    label: "Hell & Traditionell",
    short: "Sauberes Design, starke Typografie",
  },
  corporate: {
    id: "corporate",
    label: "Klassisch & Seriös",
    short: "Vertrauen, Struktur, klare Linien",
  },
  elegant: {
    id: "elegant",
    label: "Klar & Elegant",
    short: "Reduziert, ruhig, schnell erfasst",
  },
  gastro: {
    id: "gastro",
    label: "Gastro & Ambiente",
    short: "Dunkel, edel, stimmungsvoll",
  },
  bold: {
    id: "bold",
    label: "Bold & Direkt",
    short: "Mutig, grosse Schrift, starke Kontraste",
  },
};

export interface CaseStudy {
  slug: string;
  /** Erfundener Firmenname des Beispiels. */
  clientName: string;
  industry: string;
  styleId: StyleId;
  summary: string;
  features: string[];
  /** Vorschaubild der Startseite, siehe public/beispiele/vorschau/. */
  preview: string;
  /** Die fertige Beispielseite als statische Dateien unter public/beispiele/. */
  siteUrl: string;
  /** Angezeigte Adresse im Browser-Rahmen. */
  displayUrl: string;
}

const example = (slug: string) => ({
  slug,
  preview: `/beispiele/vorschau/${slug}.jpg`,
  siteUrl: `/beispiele/${slug}/index.html`,
  displayUrl: `${slug}.example`,
});

export const CASES: CaseStudy[] = [
  {
    ...example("schreinerei-ahornhof"),
    clientName: "Schreinerei Ahornhof",
    industry: "Schreinerei",
    styleId: "handwerk",
    summary: "Warm und edel, mit vielen Einblicken in Werkstatt und Projekte.",
    features: [
      "Referenzen nach Kategorien, mit Grossansicht",
      "Eigene Seite für Stellen und Lehrstellen",
      "Anfrageformular nach Thema",
    ],
  },
  {
    ...example("baeckerei-kornblum"),
    clientName: "Bäckerei Kornblum",
    industry: "Bäckerei",
    styleId: "tradition",
    summary: "Sehr sauberes Design und Typografie für einen Betrieb mit vielen Filialen.",
    features: [
      "Filialen mit Live-Anzeige, ob gerade geöffnet ist",
      "Sortiment übersichtlich nach Kategorien",
      "Catering-Anfrage direkt auf der Seite",
    ],
  },
  {
    ...example("steinegg-treuhand"),
    clientName: "Steinegg Treuhand",
    industry: "Treuhandbüro",
    styleId: "corporate",
    summary: "Seriös und ruhig, mit einem Kasten, der die nächsten Steuerfristen anzeigt.",
    features: [
      "Fristen-Tafel zählt die Tage bis zum nächsten Termin",
      "Leistungen als Kontenplan aufgebaut",
      "Abhakbare Checkliste für die Steuerunterlagen",
    ],
  },
  {
    ...example("coiffure-solene"),
    clientName: "Coiffure Solène",
    industry: "Hairsalon",
    styleId: "elegant",
    summary: "Klar und elegant: Termin, Öffnungszeiten und Anfahrt sind sofort da.",
    features: [
      "Telefonnummer auf jeder Seite im Blick",
      "Öffnungszeiten direkt auf der Startseite",
      "Nur die Seiten, die ein Salon wirklich braucht",
    ],
  },
  {
    ...example("glutstein-steakhouse"),
    clientName: "Glutstein Steakhouse",
    industry: "Restaurant",
    styleId: "gastro",
    summary: "Dunkel und edel, stimmungsvoll und mit der ganzen Karte online.",
    features: [
      "Komplette Speisekarte nach Kategorien",
      "Standorte mit Live-Anzeige der Öffnungszeiten",
      "Galerie mit Grossansicht",
    ],
  },
  {
    ...example("schwarzbogen"),
    clientName: "Schwarzbogen",
    industry: "Mode-Store",
    styleId: "bold",
    summary: "Das mutigste Design der Reihe: schwarz-weiss, riesige Schrift, viel Haltung.",
    features: [
      "Grosse Schrift statt langer Texte",
      "Designer-Labels als durchgehendes Band",
      "Führt direkt zum Besuch im Store",
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
