export type PackageId = "landingpage" | "kleine-website" | "vollstaendige-website";

export const PACKAGES: Record<PackageId, { label: string; price: string }> = {
  landingpage: { label: "Starter-Website", price: "CHF 600" },
  "kleine-website": { label: "Website", price: "CHF 1'000" },
  "vollstaendige-website": { label: "High-End-Website", price: "ab CHF 2'000" },
};

export const PACKAGE_ORDER: PackageId[] = [
  "landingpage",
  "kleine-website",
  "vollstaendige-website",
];
