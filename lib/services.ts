export interface Service {
  slug: string;
  title: string;
  /** Kurzzeile für die Listen auf der Startseite und der Leistungsseite */
  short: string;
  metaDescription: string;
  /** Erklärt in ein bis zwei Sätzen, was die Leistung ist */
  lead: string;
  includes: { title: string; desc: string }[];
  /** Heller Abschnitt: warum das wichtig ist */
  point: { title: string; text: string };
  cta: string;
}

export const CARE_PRICES = [
  { name: "Einzelne Anpassung", price: "CHF 30/Std." },
  { name: "Wartungsvertrag", price: "CHF 100/Mt." },
];

export const SERVICES: Service[] = [
  {
    slug: "webdesign",
    title: "Webdesign",
    short: "Individuell gestaltet, kein Baukasten.",
    metaDescription:
      "Webdesign Zürich für Kleinunternehmen: individuell gestaltete Websites statt Baukasten-Templates, von Renyx aus einer Hand.",
    lead: "Webdesign bestimmt, wie deine Website aussieht und welchen Eindruck sie hinterlässt. Wir gestalten sie passend zu deinem Unternehmen, nicht aus einem Baukasten.",
    includes: [
      { title: "Eigenes Design", desc: "Farben, Schrift und Bilder, die zu deinem Unternehmen passen." },
      { title: "Mehrere Entwürfe", desc: "Du siehst Varianten und entscheidest, welche Richtung passt." },
      { title: "Für jeden Bildschirm", desc: "Sieht auf Handy, Tablet und Computer gut aus." },
      { title: "Fertige Website", desc: "Wir gestalten und programmieren alles aus einer Hand." },
    ],
    point: {
      title: "Der erste Eindruck zählt.",
      text: "Noch bevor jemand einen Satz liest, entscheidet das Aussehen darüber, ob dein Unternehmen vertrauenswürdig wirkt.",
    },
    cta: "Bereit für ein neues Design?",
  },
  {
    slug: "ui-ux",
    title: "UI/UX",
    short: "Kurze Wege bis zur Anfrage.",
    metaDescription:
      "UI/UX Design für kleine Unternehmen: klare Struktur, einfache Navigation und kurze Wege bis zur Anfrage, Buchung oder zum Kauf.",
    lead: "UI ist alles, was man sieht und anklickt: Knöpfe, Menüs, Formulare. UX ist, wie einfach sich die Website dabei anfühlt. Zusammen sorgen sie dafür, dass Besucher schnell finden, was sie suchen.",
    includes: [
      { title: "Klare Struktur", desc: "Inhalte in der Reihenfolge, in der deine Kundschaft sie braucht." },
      { title: "Einfache Navigation", desc: "Mit wenigen Klicks auf der richtigen Seite." },
      { title: "Kurze Wege", desc: "Terminbuchung, Kontaktformular oder Kauf ohne Umwege." },
      { title: "Leicht zu bedienen", desc: "Gut lesbar und bequem, auch auf dem Handy." },
    ],
    point: {
      title: "Wer suchen muss, geht.",
      text: "Eine schöne Website bringt wenig, wenn niemand den Kontakt-Knopf findet. Gute UI/UX macht aus Besuchern Anfragen.",
    },
    cta: "Soll deine Website einfacher werden?",
  },
  {
    slug: "wartung-hosting",
    title: "Wartung & Hosting",
    short: "Auf Wunsch auch nach dem Launch.",
    metaDescription:
      "Wartung und Hosting für deine Website: Updates, SEO-Pflege und kleine Anpassungen von Renyx. Einzeln oder im Wartungsvertrag.",
    lead: "Hosting hält deine Website online. Wartung hält sie aktuell. Beides kannst du uns überlassen oder selbst übernehmen.",
    includes: [
      { title: "Hosting", desc: "Auf Wunsch kümmern wir uns um den Betrieb deiner Website." },
      { title: "Updates", desc: "Laufende Updates, damit alles aktuell bleibt." },
      { title: "SEO-Pflege", desc: "Damit du bei Google sichtbar bleibst." },
      { title: "Kleine Anpassungen", desc: "Kleine Design-Änderungen, ohne neues Projekt." },
    ],
    point: {
      title: "Oder ganz selbstständig.",
      text: "Du bekommst alle Zugänge und eine einfache Anleitung. Wir helfen nur, wenn du uns brauchst.",
    },
    cta: "Sollen wir uns darum kümmern?",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
