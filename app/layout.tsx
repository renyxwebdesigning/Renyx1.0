import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
  Playfair_Display,
  Archivo_Black,
  Libre_Baskerville,
  Baloo_2,
  Work_Sans,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE } from "@/lib/constants";
import { BUSINESS_JSON_LD } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Die folgenden Fonts werden nur in den Portfolio-Mockups (FullSiteMockup-Varianten)
// verwendet, damit sich die fünf Stilrichtungen auch typografisch klar unterscheiden.
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: ["400"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${archivoBlack.variable} ${libreBaskerville.variable} ${baloo2.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BUSINESS_JSON_LD) }}
        />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
