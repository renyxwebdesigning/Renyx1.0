import { CONTACT, SITE, TEAM } from "./constants";

// Adresse ist hier hart hinterlegt (nicht aus LEGAL.address geparst), weil die
// Postfach-Notation dort als Freitext gespeichert ist. Bei einer Adressänderung
// hier UND in LEGAL.address (lib/constants.ts) aktualisieren.
export const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: `https://${SITE.domain}`,
  logo: `https://${SITE.domain}/icon.svg`,
  image: `https://${SITE.domain}/opengraph-image`,
  description:
    "Renyx gestaltet Webseiten und UI/UX-Design für Kleinunternehmen in Zürich und im Embrachertal — von der Analyse bis zum Launch.",
  email: CONTACT.email,
  telephone: CONTACT.phoneIntl,
  priceRange: "CHF 150–1'000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Baltsbergstrasse 144",
    postalCode: "8424",
    addressLocality: "Embrach",
    addressRegion: "ZH",
    addressCountry: "CH",
  },
  areaServed: [
    { "@type": "City", name: "Zürich" },
    { "@type": "AdministrativeArea", name: "Kanton Zürich" },
    { "@type": "Place", name: "Embrachertal" },
  ],
  founder: TEAM.map((t) => ({ "@type": "Person", name: t.fullName })),
  sameAs: [CONTACT.trustpilot],
} satisfies Record<string, unknown>;
