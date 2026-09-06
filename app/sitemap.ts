import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/leistungen`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ueber-uns`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/kontakt`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/datenschutz`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const caseRoutes: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: `${base}/portfolio/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...caseRoutes];
}
