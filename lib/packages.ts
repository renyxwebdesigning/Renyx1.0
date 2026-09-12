export type PackageId = "landingpage" | "kleine-website" | "vollstaendige-website";

export const PACKAGES: Record<PackageId, { label: string; price: string }> = {
  landingpage: { label: "Landingpage", price: "CHF 150–300" },
  "kleine-website": { label: "Kleine Website", price: "CHF 300–600" },
  "vollstaendige-website": { label: "Vollständige Website", price: "CHF 600–1'000" },
};

export const PACKAGE_ORDER: PackageId[] = [
  "landingpage",
  "kleine-website",
  "vollstaendige-website",
];
