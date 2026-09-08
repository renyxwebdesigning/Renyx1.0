export const SITE = {
  name: "Renyx",
  domain: "renyx.ch",
  tagline: "Webdesign & UI/UX für Kleinunternehmen in Zürich",
  city: "Zürich",
};

export const CONTACT = {
  email: "info@renyx.ch",
  phoneDisplay: "076 593 20 22",
  phoneIntl: "+41765932022",
  whatsapp: "https://wa.me/41765932022",
  trustpilot: "https://www.trustpilot.com/evaluate/renyx.ch",
  get tel() {
    return `tel:${this.phoneIntl}`;
  },
  get mailto() {
    return `mailto:${this.email}`;
  },
};

export const TEAM = [
  {
    name: "Noah",
    fullName: "Noah Kramer",
    role: "Webdesign & Entwicklung",
  },
  {
    name: "Elia",
    fullName: "Elia Kramer",
    role: "UI/UX & Konzept",
  },
];

/**
 * Legal details for the Impressum. No postal address yet (see conversation
 * with the client) — flagged there instead of silently fabricated, since an
 * Impressum is only ever real information, unlike the fictional case studies.
 * Fill in `address` as soon as a mailing address (e.g. a Postfach) exists.
 */
export const LEGAL = {
  owners: TEAM.map((t) => t.fullName),
  address: "Baltsbergstrasse 144\n8424 Embrach" as string | null,
  hasCommercialRegisterEntry: false,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export const LEGAL_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
