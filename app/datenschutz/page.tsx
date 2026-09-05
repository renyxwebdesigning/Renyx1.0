import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung gemäss revDSG.",
};

export default function Datenschutz() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Datenschutz
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Datenschutzerklärung</h1>
        <p className="mt-4 text-sm text-text-muted">
          Diese Erklärung informiert darüber, welche Daten wir beim Besuch von {SITE.domain}{" "}
          verarbeiten und wozu.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm text-text-muted">
          <section>
            <h2 className="font-display text-base font-semibold text-text">
              Verantwortliche Stelle
            </h2>
            <p className="mt-2">
              Noah &amp; Elia Kramer ({SITE.name}), erreichbar unter {CONTACT.email} oder{" "}
              {CONTACT.phoneDisplay}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-text">Kontaktformular</h2>
            <p className="mt-2">
              Wenn ihr das Formular auf unserer Kontaktseite nutzt, werden die eingegebenen Daten
              (Name, ggf. Firma, E-Mail, Telefon, Nachricht, bevorzugter Stil) beim Absenden
              direkt als vorausgefüllte E-Mail in eurem eigenen E-Mail-Programm geöffnet. Diese
              Daten laufen dabei zu keinem Zeitpunkt über einen Server von uns und werden von uns
              nicht gespeichert — ihr entscheidet selbst, ob und wann ihr die E-Mail tatsächlich
              abschickt.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-text">
              Hosting &amp; Server-Logs
            </h2>
            <p className="mt-2">
              Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf der Seite verarbeitet Vercel
              technisch notwendige Zugriffsdaten (u.a. IP-Adresse, Zeitpunkt, aufgerufene Seite)
              zur Auslieferung und Absicherung der Website. Dabei kann eine Datenübermittlung in
              die USA stattfinden; Vercel setzt hierfür die anerkannten
              Standardvertragsklauseln ein. Es findet keine Zusammenführung mit anderen Daten von
              euch statt.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-text">
              Cookies &amp; Tracking
            </h2>
            <p className="mt-2">
              Diese Website setzt keine Cookies und keine Analyse- oder Trackingtools ein.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-text">Externe Links</h2>
            <p className="mt-2">
              Links zu WhatsApp und Trustpilot führen auf Angebote Dritter. Sobald ihr einem
              solchen Link folgt, gilt die Datenschutzerklärung des jeweiligen Anbieters — wir
              haben auf die dortige Datenverarbeitung keinen Einfluss.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-text">Eure Rechte</h2>
            <p className="mt-2">
              Nach dem Schweizer Datenschutzgesetz (revDSG) habt ihr das Recht auf Auskunft,
              Berichtigung und Löschung eurer Daten. Meldet euch dazu jederzeit unter{" "}
              {CONTACT.email}.
            </p>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-text">Änderungen</h2>
            <p className="mt-2">
              Wir passen diese Erklärung an, sobald sich an der Datenverarbeitung auf dieser
              Website etwas ändert — z.B. falls künftig ein echtes Kontaktformular mit Backend
              oder Analyse-Tools hinzukommen.
            </p>
          </section>
        </div>
      </ScrollReveal>
    </div>
  );
}
