import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE } from "@/lib/constants";
import { BUSINESS_JSON_LD } from "@/lib/structured-data";

// Grundschrift der Seite: eine einzige Familie, Hierarchie entsteht über Grösse und Gewicht.
const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const DEFAULT_DESCRIPTION =
  "Webdesign Zürich für Kleinunternehmen: Renyx gestaltet Webseiten und UI/UX-Design — von der Analyse bis zum Launch, persönlich und ohne Agentur-Aufpreis.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${hostGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
