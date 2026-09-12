export type PackageId = "landingpage" | "kleine-website" | "vollstaendige-website" | "premium";

export const PACKAGES: Record<PackageId, { label: string; price: string }> = {
  landingpage: { label: "Landingpage", price: "CHF 150–400" },
  "kleine-website": { label: "Kleine Website", price: "CHF 400–700" },
  "vollstaendige-website": { label: "Vollständige Website", price: "CHF 700–1'000" },
  premium: { label: "Premium", price: "CHF 1'000–2'000" },
};

export const PACKAGE_ORDER: PackageId[] = [
  "landingpage",
  "kleine-website",
  "vollstaendige-website",
  "premium",
];
