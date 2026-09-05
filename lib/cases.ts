export type StyleId = "editorial" | "bold" | "corporate" | "playful" | "ecommerce";

export interface StyleMeta {
  id: StyleId;
  label: string;
  short: string;
}

export const STYLES: Record<StyleId, StyleMeta> = {
  editorial: {
    id: "editorial",
    label: "Editorial Minimal",
    short: "Ruhig, viel Weissraum, grosse Typografie",
  },
  bold: {
    id: "bold",
    label: "Bold & Direkt",
    short: "Kräftige Kontraste, grosse Statements",
  },
  corporate: {
    id: "corporate",
    label: "Klassisch & Seriös",
    short: "Vertrauen, Struktur, klare Linien",
  },
  playful: {
    id: "playful",
    label: "Verspielt & Freundlich",
    short: "Warme Farben, weiche Formen, nahbar",
  },
  ecommerce: {
    id: "ecommerce",
    label: "Shop & Produkt",
    short: "Klares Produktraster, auf Verkauf optimiert",
  },
};

export interface CaseStudy {
  slug: string;
  clientName: string;
  industry: string;
  styleId: StyleId;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  palette: {
    bg: string;
    surface: string;
    accent: string;
    text: string;
  };
}

export const CASES: CaseStudy[] = [
  {
    slug: "feinbrot",
    clientName: "Bäckerei Feinbrot",
    industry: "Bäckerei & Café",
    styleId: "editorial",
    tagline: "Handwerk, das man schmecken sieht.",
    summary:
      "Eine ruhige, bildstarke Seite für eine Quartierbäckerei — Fokus auf Handwerk statt Rabattaktionen.",
    challenge:
      "Feinbrot backt seit Jahren im Kreis 4, war online aber unsichtbar — die alte Seite bestand aus einer PDF-Speisekarte und einer Google-Maps-Einbettung. Stammkunden fanden Öffnungszeiten nicht, Neukunden fanden die Seite gar nicht erst.",
    solution:
      "Wir haben die Seite auf ein einziges Versprechen zugeschnitten: Handwerk zeigen, nicht behaupten. Grosse, ruhige Produktbilder, eine editierbare Tages-Sortiment-Liste und ein Standort-Block, der auf dem Handy sofort die Route öffnet.",
    features: [
      "Editierbares Tagessortiment ohne Entwicklerhilfe",
      "Ein-Klick Route & Öffnungszeiten mobil oben",
      "Ladezeit unter 1 Sekunde auch mit vielen Bildern",
    ],
    palette: { bg: "#f7f3ec", surface: "#ffffff", accent: "#8a6d3b", text: "#2a2420" },
  },
  {
    slug: "schreinerei-vogel",
    clientName: "Schreinerei Vogel",
    industry: "Schreinerei & Innenausbau",
    styleId: "bold",
    tagline: "Massarbeit statt 08/15.",
    summary:
      "Eine direkte, selbstbewusste Seite für einen Handwerksbetrieb, der auf Empfehlung statt Werbung lebt.",
    challenge:
      "Vogel bekommt fast alle Aufträge über Mundpropaganda — die Webseite sollte diesen Ruf online spürbar machen, statt wie eine generische Handwerker-Vorlage zu wirken, die überall gleich aussieht.",
    solution:
      "Grossformatige Projektfotos, riesige Headlines mit Betriebs-Handschrift und eine direkte Sprache ohne Marketing-Floskeln. Anfragen laufen über ein einziges, kurzes Formular statt einer langen Leistungsliste.",
    features: [
      "Projektgalerie mit Vorher/Nachher-Vergleich",
      "Ein-Formular-Anfrage statt Klick-Marathon",
      "Bewertungen direkt sichtbar, nicht versteckt",
    ],
    palette: { bg: "#161412", surface: "#1f1c19", accent: "#e8b23d", text: "#f5f1ea" },
  },
  {
    slug: "meier-partner",
    clientName: "Meier & Partner Treuhand",
    industry: "Treuhand & Beratung",
    styleId: "corporate",
    tagline: "Klarheit, bevor es kompliziert wird.",
    summary:
      "Eine seriöse, vertrauensbildende Seite für ein Treuhandbüro — Struktur und Ruhe statt Verkaufsdruck.",
    challenge:
      "Treuhand-Kunden entscheiden sich langsam und wollen erst Vertrauen aufbauen. Die alte Seite wirkte wie ein Formular-Portal — kalt, unpersönlich, ohne erkennbare Menschen dahinter.",
    solution:
      "Klare Informationsarchitektur nach Anliegen (Steuern, Buchhaltung, Nachfolge), ein persönlicher Team-Bereich mit echten Ansprechpartnern pro Thema, und ein ruhiges Farbschema, das Seriosität statt Verkaufsdruck signalisiert.",
    features: [
      "Themen-Navigation statt Fachjargon-Menü",
      "Direkter Ansprechpartner pro Dienstleistung",
      "Terminbuchung ohne Login oder App",
    ],
    palette: { bg: "#0f1a17", surface: "#16241f", accent: "#2f9e6e", text: "#eef4f1" },
  },
  {
    slug: "studio-bluem",
    clientName: "Studio Blüm",
    industry: "Coiffeur & Beauty",
    styleId: "playful",
    tagline: "Ein guter Termin fängt online an.",
    summary:
      "Eine warme, einladende Seite für ein Beauty-Studio, gebaut um schnelle Terminbuchung statt langer Texte.",
    challenge:
      "Studio Blüm bekam die meisten Anfragen per Instagram-DM, verlor dabei aber ständig die Übersicht über Terminwünsche. Eine eigene Seite sollte Buchungen bündeln, ohne den persönlichen, freundlichen Ton zu verlieren.",
    solution:
      "Freundliche Farben, runde Formen und eine Terminbuchung, die wie drei Klicks aussieht statt wie ein Formular. Der Instagram-Feed bleibt sichtbar eingebunden, damit sich nichts fremd anfühlt.",
    features: [
      "Terminbuchung in drei Schritten",
      "Live eingebundener Instagram-Feed",
      "Leistungen mit Preisen auf einen Blick",
    ],
    palette: { bg: "#fdf2ec", surface: "#ffffff", accent: "#e8735a", text: "#3a2a24" },
  },
  {
    slug: "manufaktur-nord",
    clientName: "Manufaktur Nord",
    industry: "Online-Shop, handgemachte Produkte",
    styleId: "ecommerce",
    tagline: "Weniger Klicks bis zum Kauf.",
    summary:
      "Ein schlanker Online-Shop für handgemachte Keramik — gebaut auf Conversion, nicht auf Feature-Overkill.",
    challenge:
      "Manufaktur Nord verkaufte bisher nur auf Märkten und über eine Facebook-Seite. Ein vollwertiger Shop musste her — aber ohne die Komplexität eines grossen E-Commerce-Systems, das für 40 Produkte überdimensioniert wäre.",
    solution:
      "Ein reduzierter Produktkatalog mit grossen Bildern, klaren Varianten (Farbe/Grösse) und einem Checkout in einem Schritt. Kein Konto-Zwang, keine unnötigen Formularfelder — jedes zusätzliche Feld kostet Umsatz.",
    features: [
      "Checkout ohne Konto-Pflicht",
      "Klar strukturierte Produktvarianten",
      "Automatische Lagerstand-Anzeige",
    ],
    palette: { bg: "#111318", surface: "#1a1d24", accent: "#f97316", text: "#f2f2f0" },
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
