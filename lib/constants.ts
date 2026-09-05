export const SITE = {
  name: "Flux",
  domain: "flux.ch",
  tagline: "Webdesign & UI/UX für Kleinunternehmen in Zürich",
  city: "Zürich",
};

export const CONTACT = {
  email: "noah@kramer7.ch",
  phoneDisplay: "076 593 20 22",
  phoneIntl: "+41765932022",
  whatsapp: "https://wa.me/41765932022",
  trustpilot: "https://www.trustpilot.com/evaluate/flux.ch",
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
    role: "Webdesign & Entwicklung",
  },
  {
    name: "Elia",
    role: "UI/UX & Konzept",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
];
