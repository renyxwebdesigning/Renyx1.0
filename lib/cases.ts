export type StyleId = "tradition" | "frisch" | "bold" | "elegant" | "technisch" | "handwerk";

export interface StyleMeta {
  id: StyleId;
  label: string;
  short: string;
}

export const STYLES: Record<StyleId, StyleMeta> = {
  tradition: {
    id: "tradition",
    label: "Hell & Traditionell",
    short: "Sauber, vertrauenswürdig, das Wichtigste sofort sichtbar",
  },
  frisch: {
    id: "frisch",
    label: "Frisch & Lebendig",
    short: "Kräftige Farbe, grosse Schrift, viel Persönlichkeit",
  },
  bold: {
    id: "bold",
    label: "Bold & Direkt",
    short: "Mutig, grosse Schrift, starke Kontraste",
  },
  elegant: {
    id: "elegant",
    label: "Klar & Elegant",
    short: "Reduziert, ruhig, schnell erfasst",
  },
  technisch: {
    id: "technisch",
    label: "Ruhig & Technisch",
    short: "Dunkle Töne, viel Luft, präzise Details",
  },
  handwerk: {
    id: "handwerk",
    label: "Kräftig & Handwerklich",
    short: "Dunkel, markant, starke Akzentfarbe",
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
    ...example("orion-glas"),
    clientName: "Orion Glas",
    industry: "Glaserei",
    styleId: "tradition",
    summary: "Hell und übersichtlich, mit dem Notdienst immer im Blick.",
    features: [
      "Notdienst-Nummer immer sichtbar",
      "Service und Produkte klar getrennt",
      "Eigene Seite für den 24-Stunden-Notdienst",
    ],
  },
  {
    ...example("velo-kettenblatt"),
    clientName: "Velo Kettenblatt",
    industry: "Velogeschäft",
    styleId: "frisch",
    summary: "Frisch und persönlich, mit eigenen Zeichnungen statt Bildern.",
    features: [
      "Service mit Preisen auf einen Blick",
      "Eigene Seite für den Velo-Treff",
      "Öffnungszeiten und Anfahrt direkt erreichbar",
    ],
  },
  {
    ...example("atelier-nachtfalter"),
    clientName: "Atelier Nachtfalter",
    industry: "Mode-Store",
    styleId: "bold",
    summary: "Mutig und reduziert, die Schrift trägt die ganze Seite.",
    features: [
      "Grosse Typografie als Gestaltungsmittel",
      "Übersicht aller Designer und Labels",
      "Besuchsseite statt Onlineshop",
    ],
  },
  {
    ...example("bottega-lino"),
    clientName: "Bottega Lino",
    industry: "Schuhmacherei",
    styleId: "elegant",
    summary: "Klar und schnell erfasst, damit man sofort den richtigen Service findet.",
    features: [
      "Eigene Seite für jede Dienstleistung",
      "Telefonnummer in der Navigation",
      "Öffnungszeiten und Anfahrt auf einer Seite",
    ],
  },
  {
    ...example("tonfeld"),
    clientName: "Tonfeld",
    industry: "Lautsprecher & HiFi",
    styleId: "technisch",
    summary: "Ruhig und präzise, passend zu hochwertiger Audiotechnik.",
    features: [
      "Eigene Lautsprecher im Überblick",
      "Anlässe und Vorführungen im Showroom",
      "Beratung nach Vereinbarung",
    ],
  },
  {
    ...example("funkenhof-metallbau"),
    clientName: "Funkenhof Metallbau",
    industry: "Metallbau & Kunstschmiede",
    styleId: "handwerk",
    summary: "Kräftig und markant, mit viel Platz für die einzelnen Gewerke.",
    features: [
      "Eigene Seite für jede Leistung",
      "Brunnenröhren mit Massen und Oberflächen",
      "Anfrageformular nach Thema",
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
