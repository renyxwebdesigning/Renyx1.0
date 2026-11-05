import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT, LEGAL, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung gemäss Art. 3 Abs. 1 lit. s UWG.",
  alternates: { canonical: "/impressum" },
};

export default function Impressum() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-36 sm:pt-44">
      <ScrollReveal>
        <p className="label">
          Impressum
        </p>
        <h1 className="mt-3 display display-md">Angaben gemäss UWG</h1>

        <div className="mt-10 flex flex-col gap-8 text-sm text-text-muted">
          <section>
            <h2 className="text-base font-medium text-text">Anbieter</h2>
            <p className="mt-2">
              {LEGAL.owners.join(" & ")}
              <br />
              handelnd unter der Bezeichnung &quot;{SITE.name}&quot;
            </p>
            {!LEGAL.hasCommercialRegisterEntry && (
              <p className="mt-2 text-xs opacity-70">
                Nicht im Handelsregister eingetragen (keine Pflicht unterhalb der gesetzlichen
                Umsatzschwelle).
              </p>
            )}
          </section>

          <section>
            <h2 className="text-base font-medium text-text">Kontakt</h2>
            <p className="mt-2">
              Telefon: {CONTACT.phoneDisplay}
              <br />
              E-Mail: {CONTACT.email}
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium text-text">Postadresse</h2>
            {LEGAL.address ? (
              <p className="mt-2 whitespace-pre-line">{LEGAL.address}</p>
            ) : (
              <p className="mt-2 rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-xs text-text">
                Wird in Kürze ergänzt. Bis dahin erreicht ihr uns zuverlässig per Telefon oder
                E-Mail oben.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-base font-medium text-text">Haftung für Inhalte</h2>
            <p className="mt-2">
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine
              Gewähr. Die auf dieser Seite gezeigten Portfolio-Projekte sind, sofern nicht anders
              gekennzeichnet, Konzeptbeispiele und keine tatsächlich umgesetzten Kundenprojekte.
              Firmennamen, Logos, Adressen und Kontaktangaben dieser Beispiele sind erfunden. Die Fotos darin stammen von Unsplash und Pexels.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium text-text">Haftung für Links</h2>
            <p className="mt-2">
              Diese Website enthält Links zu externen Websites Dritter (u.a. WhatsApp, Trustpilot),
              auf deren Inhalte wir keinen Einfluss haben. Für diese Inhalte kann daher keine
              Gewähr übernommen werden; es gilt jeweils die Datenschutzerklärung des externen
              Anbieters.
            </p>
          </section>

          <section>
            <h2 className="text-base font-medium text-text">Urheberrecht</h2>
            <p className="mt-2">
              Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem
              schweizerischen Urheberrecht. Jede Verwertung ausserhalb der Grenzen des
              Urheberrechts bedarf der vorherigen schriftlichen Zustimmung.
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
}
