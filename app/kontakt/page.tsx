import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Meld dich unverbindlich bei Renyx — per Formular, WhatsApp, Telefon oder E-Mail. Wir melden uns meist innerhalb eines Werktags.",
  alternates: { canonical: "/kontakt" },
};

export default function Kontakt() {
  return (
    <div className="wrap grid gap-14 pb-24 pt-36 sm:pb-32 sm:pt-48 lg:grid-cols-2 lg:gap-16">
      <ScrollReveal>
        <p className="label">Kontakt</p>
        <h1 className="display mt-6 max-w-[11ch] text-balance text-[clamp(2.7rem,5.2vw,6rem)]">Erzähl uns von deinem Projekt.</h1>
        <p className="lead mt-8 max-w-sm">Antwort meist innerhalb eines Werktags.</p>
        <ul className="mt-10 flex flex-col gap-1 text-lg">
          <li>
            <a href={CONTACT.mailto} className="underline-link inline-block py-1">
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a href={CONTACT.tel} className="underline-link inline-block py-1">
              {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="underline-link inline-block py-1">
              WhatsApp
            </a>
          </li>
        </ul>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </ScrollReveal>
    </div>
  );
}
