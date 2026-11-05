export type StyleId = "ruhig" | "klar" | "edel" | "experimentell" | "laut" | "warm";

export interface StyleMeta {
  id: StyleId;
  label: string;
  short: string;
}

export const STYLES: Record<StyleId, StyleMeta> = {
  ruhig: {
    id: "ruhig",
    label: "Ruhig & Reduziert",
    short: "Viel Luft, grosse Schrift, sanfte Bewegung",
  },
  klar: {
    id: "klar",
    label: "Klar & Vertrauensvoll",
    short: "Hell, verständlich, das Wichtigste sofort sichtbar",
  },
  edel: {
    id: "edel",
    label: "Edel & Gedruckt",
    short: "Gesetzt wie auf Papier, bewusst ohne Animation",
  },
  experimentell: {
    id: "experimentell",
    label: "Experimentell & Bewegt",
    short: "Starke Farben und viel Bewegung",
  },
  laut: {
    id: "laut",
    label: "Laut & Direkt",
    short: "Harte Kontraste und ein einziger grosser Effekt",
  },
  warm: {
    id: "warm",
    label: "Warm & Persönlich",
    short: "Weiche Formen, warme Farben, eine persönliche Stimme",
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
    ...example("florabunt"),
    clientName: "Florabunt",
    industry: "Blumenladen",
    styleId: "warm",
    summary: "Warm und persönlich, wie ein Gruss der Floristin. Was gerade blüht, steht im Mittelpunkt.",
    features: [
      "Blühkalender zeigt, was gerade Saison hat",
      "Strauss zusammenstellen mit Live-Preis",
      "Persönlicher Ton statt Werbesprache",
    ],
  },
  {
    ...example("mmac-gym"),
    clientName: "mmac Gym",
    industry: "Boxclub",
    styleId: "laut",
    summary: "Die ganze Seite ist ein Training: Beim Scrollen läuft die Rundenuhr, dann schlägt der Gong.",
    features: [
      "Rundenuhr als grosser Effekt",
      "Nimmt Einsteigern die Angst vor dem ersten Training",
      "Ein klares Ziel: Probetraining buchen",
    ],
  },
  {
    ...example("flow"),
    clientName: "Flow",
    industry: "Tanzstudio",
    styleId: "experimentell",
    summary: "Eine Linie zeichnet sich beim Scrollen über die Seite und führt bis zur Buchung.",
    features: [
      "Scroll-Animation von der Hand des Tänzers bis zum Button",
      "Stundenplan trägt die Wahl direkt in die Anfrage ein",
      "Bewegung lässt sich jederzeit ausschalten",
    ],
  },
  {
    ...example("schattenhalde"),
    clientName: "Schattenhalde",
    industry: "Weingut",
    styleId: "edel",
    summary: "Gesetzt wie ein Weinetikett, ganz ohne Animation. Die Seite erzählt ein Jahr im Rebberg.",
    features: [
      "Jahreszeiten führen durch die Seite",
      "Weinkarte wie auf Papier gesetzt",
      "Ein klares Ziel: Degustation reservieren",
    ],
  },
  {
    ...example("kalk-ton"),
    clientName: "Kalk & Ton",
    industry: "Architekturbüro",
    styleId: "ruhig",
    summary: "Ruhig und grosszügig, damit die Häuser und die Haltung des Büros wirken können.",
    features: [
      "Projekte im Wechsel von Bild und Text",
      "Grosse Schrift und viel Luft",
      "Ablauf vom ersten Gespräch bis zum Schlüssel",
    ],
  },
  {
    ...example("mundart"),
    clientName: "Mundart",
    industry: "Zahnarztpraxis",
    styleId: "klar",
    summary: "Zahnmedizin in normalen Worten: Die Seite übersetzt Fachbegriffe und nimmt die Angst.",
    features: [
      "Übersetzer für Fachwörter als eigene Idee",
      "Termin in drei Schritten wählen",
      "Preise offen auf der Seite",
    ],
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
