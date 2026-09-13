export type StyleId = "editorial" | "bold" | "corporate" | "playful" | "ecommerce" | "gastro";

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
  gastro: {
    id: "gastro",
    label: "Gastro & Ambiente",
    short: "Dunkel, stimmungsvoll, grossformatige Foodfotografie",
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
  /** Ordered placeholder photography for this mockup — each style component indexes into it as needed. */
  images: string[];
  palette: {
    bg: string;
    surface: string;
    accent: string;
    text: string;
  };
  /** Content used inside the full-page site mockup on the case detail page. */
  site: {
    navLabel: string;
    heroSub: string;
    about: string;
    menuTitle: string;
    menu: { name: string; price: string }[];
    testimonials: { name: string; text: string }[];
    address: string;
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
    images: [
      "https://picsum.photos/seed/feinbrot-hero/900/1200",
      "https://picsum.photos/seed/feinbrot-gallery-1/700/700",
      "https://picsum.photos/seed/feinbrot-gallery-2/700/700",
      "https://picsum.photos/seed/feinbrot-gallery-3/700/700",
    ],
    palette: { bg: "#f7f3ec", surface: "#ffffff", accent: "#8a6d3b", text: "#2a2420" },
    site: {
      navLabel: "Feinbrot",
      heroSub: "Täglich frisch gebacken im Kreis 4 — Sauerteig, Zopf und Gipfeli aus reinem Handwerk.",
      about:
        "Seit 2011 backen wir jeden Morgen ab vier Uhr von Hand, mit Naturteig statt Fertigmischungen. Kein Standort-Konzept, keine Filialkette — nur ein Ofen, ein Team und Stammkundschaft, die uns seit Jahren treu ist.",
      menuTitle: "Heutiges Sortiment",
      menu: [
        { name: "Zopf", price: "CHF 6.50" },
        { name: "Gipfeli", price: "CHF 2.20" },
        { name: "Sauerteigbrot", price: "CHF 7.80" },
        { name: "Nussgipfel", price: "CHF 3.40" },
      ],
      testimonials: [
        { name: "Priska H.", text: "Der beste Zopf im Quartier, und man merkt, dass hier noch von Hand gearbeitet wird." },
        { name: "Marco T.", text: "Komme seit Jahren jeden Samstag hier vorbei — nie enttäuscht worden." },
      ],
      address: "Feldstrasse 12, 8004 Zürich",
    },
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
    images: [
      "https://picsum.photos/seed/vogel-before/900/700",
      "https://picsum.photos/seed/vogel-after/900/700",
    ],
    palette: { bg: "#161412", surface: "#1f1c19", accent: "#e8b23d", text: "#f5f1ea" },
    site: {
      navLabel: "Vogel",
      heroSub: "Innenausbau, Möbel und Renovationen — von Hand gefertigt in Zürich und Umgebung.",
      about:
        "Seit über 15 Jahren bauen wir Möbel und Innenausbauten, die genau in den Raum passen, für den sie gedacht sind. Kein Katalog, keine Massenware — jedes Stück wird bei euch vor Ort vermessen und in unserer Werkstatt gefertigt.",
      menuTitle: "Leistungen",
      menu: [
        { name: "Innenausbau", price: "auf Anfrage" },
        { name: "Möbel nach Mass", price: "auf Anfrage" },
        { name: "Küchenbau", price: "auf Anfrage" },
        { name: "Renovationen", price: "auf Anfrage" },
      ],
      testimonials: [
        { name: "Familie Steiner", text: "Termintreu, sauber gearbeitet, und das Resultat übertrifft unsere Erwartungen." },
        { name: "R. Baumann", text: "Endlich ein Schreiner, der zurückruft und liefert, was er verspricht." },
      ],
      address: "Industriestrasse 44, 8005 Zürich",
    },
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
    images: [
      "https://picsum.photos/seed/meier-team-1/500/500",
      "https://picsum.photos/seed/meier-team-2/500/500",
      "https://picsum.photos/seed/meier-team-3/500/500",
    ],
    palette: { bg: "#0f1a17", surface: "#16241f", accent: "#2f9e6e", text: "#eef4f1" },
    site: {
      navLabel: "Meier & Partner",
      heroSub: "Steuern, Buchhaltung und Nachfolgeplanung für KMU und Privatpersonen in Zürich.",
      about:
        "Seit 1998 begleiten wir Zürcher KMU und Privatpersonen durch Steuererklärungen, Buchhaltung und Unternehmensnachfolgen. Wir glauben, dass gute Beratung mit Zuhören beginnt — nicht mit einem Formular.",
      menuTitle: "Dienstleistungen",
      menu: [
        { name: "Steuerberatung", price: "auf Anfrage" },
        { name: "Buchhaltung", price: "auf Anfrage" },
        { name: "Nachfolgeplanung", price: "auf Anfrage" },
        { name: "Unternehmensberatung", price: "auf Anfrage" },
      ],
      testimonials: [
        { name: "P. Hofmann, KMU-Inhaber", text: "Endlich ein Treuhandbüro, das komplizierte Sachverhalte verständlich erklärt." },
        { name: "S. Widmer", text: "Sehr persönliche Betreuung, immer erreichbar, nie das Gefühl eine Nummer zu sein." },
      ],
      address: "Bahnhofstrasse 88, 8001 Zürich",
    },
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
    images: [
      "https://picsum.photos/seed/bluem-client-1/300/300",
      "https://picsum.photos/seed/bluem-client-2/300/300",
      "https://picsum.photos/seed/bluem-client-3/300/300",
    ],
    palette: { bg: "#fdf2ec", surface: "#ffffff", accent: "#e8735a", text: "#3a2a24" },
    site: {
      navLabel: "Studio Blüm",
      heroSub: "Haarschnitt, Farbe und Styling in entspannter Atmosphäre, mitten in Zürich.",
      about:
        "Studio Blüm ist ein kleines Team, das grossen Wert auf Beratung legt. Wir nehmen uns Zeit für jeden Termin, statt euch im Minutentakt durchzuschleusen — deshalb bucht ihr bei uns online, nicht per Warteliste.",
      menuTitle: "Leistungen & Preise",
      menu: [
        { name: "Damenschnitt", price: "ab CHF 65" },
        { name: "Coloration", price: "ab CHF 90" },
        { name: "Herrenschnitt", price: "ab CHF 45" },
        { name: "Make-up", price: "ab CHF 55" },
      ],
      testimonials: [
        { name: "Nina K.", text: "Buchung online in 30 Sekunden erledigt, und das Ergebnis war jedes Mal top." },
        { name: "Fabienne R.", text: "Endlich ein Studio, bei dem ich nicht zehn Mal anrufen muss für einen Termin." },
      ],
      address: "Langstrasse 145, 8004 Zürich",
    },
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
    images: [
      "https://picsum.photos/seed/manufaktur-1/700/700",
      "https://picsum.photos/seed/manufaktur-2/700/700",
      "https://picsum.photos/seed/manufaktur-3/700/700",
      "https://picsum.photos/seed/manufaktur-4/700/700",
    ],
    palette: { bg: "#111318", surface: "#1a1d24", accent: "#f97316", text: "#f2f2f0" },
    site: {
      navLabel: "Manufaktur Nord",
      heroSub: "Handgemachte Keramik aus dem eigenen Atelier — kleine Serien, viele Unikate.",
      about:
        "Wir töpfern seit 2016 in einem kleinen Atelier im Norden Zürichs. Jedes Stück wird einzeln gedreht und glasiert — darum sieht keine Tasse genau wie die andere aus, und darum verkaufen wir bewusst in kleinen Serien statt in Masse.",
      menuTitle: "Bestseller",
      menu: [
        { name: "Kaffeetasse „Nord“", price: "CHF 28" },
        { name: "Schale „Rund“", price: "CHF 34" },
        { name: "Vase „Linie“", price: "CHF 40" },
        { name: "Set „Basis“ (4-teilig)", price: "CHF 46" },
      ],
      testimonials: [
        { name: "Lea M.", text: "Bestellung war unkompliziert, Versand schnell, und die Qualität ist spürbar hochwertig." },
        { name: "Jonas P.", text: "Man merkt bei jedem Stück, dass es von Hand gemacht ist. Kaufe hier immer wieder." },
      ],
      address: "Ateliers Nord, 8037 Zürich",
    },
  },
  {
    slug: "restaurant-rosmarin",
    clientName: "Restaurant Rosmarin",
    industry: "Restaurant & Bar",
    styleId: "gastro",
    tagline: "Gutes Essen braucht keine Eile.",
    summary:
      "Eine dunkle, stimmungsvolle Seite für ein Quartier-Restaurant — grossformatige Fotos statt einer PDF-Karte, Reservation in einem Schritt.",
    challenge:
      "Rosmarin nahm Reservationen bisher nur telefonisch entgegen, oft ausserhalb der Bürozeiten verpasst. Die Speisekarte lag als drei Jahre alte PDF online, ohne Fotos — potenzielle Gäste konnten sich die Atmosphäre vorher nicht vorstellen.",
    solution:
      "Eine Seite, die sofort die Stimmung des Lokals transportiert: grossformatige Food- und Raumfotos, eine übersichtliche Karte mit Preisen und ein Reservationsformular, das in unter einer Minute ausgefüllt ist und per E-Mail direkt im Restaurant landet.",
    features: [
      "Reservation ohne Anruf, in unter einer Minute",
      "Karte mit saisonalen Preisen, jederzeit selbst anpassbar",
      "Grossformatige Fotos ohne lange Ladezeit auf dem Handy",
    ],
    images: [
      "https://picsum.photos/seed/rosmarin-hero/1200/900",
      "https://picsum.photos/seed/rosmarin-dish-1/700/700",
      "https://picsum.photos/seed/rosmarin-dish-2/700/700",
      "https://picsum.photos/seed/rosmarin-dish-3/700/700",
      "https://picsum.photos/seed/rosmarin-interior/1200/800",
    ],
    palette: { bg: "#151013", surface: "#211a1d", accent: "#c2452f", text: "#f3ece7" },
    site: {
      navLabel: "Rosmarin",
      heroSub: "Saisonale Küche und Naturweine in warmer Atmosphäre, mitten im Kreis 5.",
      about:
        "Seit 2019 kochen wir im Rosmarin mit dem, was der Markt gerade hergibt — kurze Karte, dafür jeden Tag frisch. Kein Fine-Dining-Getue, sondern ein Ort, an dem man auch spontan noch einen Tisch bekommt und lange sitzen bleibt.",
      menuTitle: "Aus der Küche",
      menu: [
        { name: "Rindstatar, Röstii", price: "CHF 32" },
        { name: "Risotto der Saison", price: "CHF 28" },
        { name: "Gebratener Kabeljau", price: "CHF 36" },
        { name: "Tagesdessert", price: "CHF 12" },
      ],
      testimonials: [
        { name: "Corinne W.", text: "Die Karte wechselt ständig, und trotzdem wird alles top umgesetzt. Unser Stammlokal." },
        { name: "David N.", text: "Reservation online war in zwei Minuten erledigt, keine Warteschlaufe am Telefon mehr." },
      ],
      address: "Bertastrasse 23, 8003 Zürich",
    },
  },
];

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find((c) => c.slug === slug);
}
