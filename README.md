# Flux — Website

Next.js-Website für Flux (Webdesign & UI/UX für Kleinunternehmen in Zürich).

## Entwicklung

```bash
npm install
npm run dev
```

Seite läuft dann auf [http://localhost:3000](http://localhost:3000).

## Struktur

- `app/` — Seiten (Home, Leistungen, Portfolio, Über uns, Kontakt)
- `components/` — UI-Bausteine (Navbar, Footer, Case-Cards, Kontaktformular, Style-Finder ...)
- `lib/cases.ts` — die 5 fiktiven Portfolio-Beispiele (Konzeptbeispiele, keine echten Kundenprojekte)
- `lib/constants.ts` — Kontaktdaten, Navigation

## Inhalte anpassen

- **Case-Studies ersetzen**: Sobald es echte Kundenprojekte gibt, in `lib/cases.ts` die Einträge in `CASES` durch echte Projekte ersetzen (gleiche Struktur beibehalten).
- **Kontaktdaten ändern**: in `lib/constants.ts` (`CONTACT`, `TEAM`).
- **Logo**: aktuell ein reiner Text-Wordmark ("Flux.") in `components/Navbar.tsx` und `components/Footer.tsx` — bei einem echten Logo dort durch `<Image>` ersetzen.

## Kontaktformular

Das Formular unter `/kontakt` hat aktuell **kein Backend** — beim Absenden öffnet sich das E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht an `noah@kramer7.ch` (`mailto:`-Link). Das funktioniert ohne jede Konfiguration, hat aber zwei Nachteile: Es braucht ein eingerichtetes Mail-Programm auf dem Gerät der Besucherin, und es gibt keine Aufzeichnung der Anfragen auf eurer Seite.

Sobald ein Account bei einem E-Mail-Service existiert (z.B. [Resend](https://resend.com)), lässt sich das aufwerten:

1. API-Key als Vercel Environment Variable hinterlegen
2. Eine Next.js API Route (`app/api/kontakt/route.ts`) anlegen, die die Formulardaten serverseitig per Resend verschickt
3. In `components/ContactForm.tsx` den `mailto:`-Redirect durch einen `fetch("/api/kontakt", ...)`-Aufruf ersetzen

## Deployment auf Vercel

1. Repo auf GitHub pushen
2. Auf [vercel.com/new](https://vercel.com/new) das Repo importieren — Next.js wird automatisch erkannt, keine weitere Konfiguration nötig
3. Unter Project → Settings → Domains die Domain `flux.ch` hinzufügen und die angezeigten DNS-Einträge beim Domain-Registrar setzen
