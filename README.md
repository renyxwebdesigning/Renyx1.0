# Renyx — Website

Next.js-Website für Renyx (Webdesign & UI/UX für Kleinunternehmen in Zürich).

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
- **Logo**: aktuell ein reiner Text-Wordmark ("Renyx.") in `components/Navbar.tsx` und `components/Footer.tsx` — bei einem echten Logo dort durch `<Image>` ersetzen.

## Kontaktformular

Das Formular unter `/kontakt` sendet serverseitig über [Resend](https://resend.com) (`app/api/kontakt/route.ts`) an `CONTACT.email`. Damit das live funktioniert:

1. Bei [resend.com](https://resend.com) einen Account anlegen und einen API-Key erstellen
2. Den Key als Environment Variable `RESEND_API_KEY` in Vercel hinterlegen (Project → Settings → Environment Variables) und lokal in `.env.local` für's Testen
3. Zum Testen reicht der Standard-Absender `onboarding@resend.dev` (funktioniert ohne weitere Einrichtung). Für einen eigenen Absender wie `kontakt@renyx.ch` muss die Domain in Resend verifiziert werden (DNS-Einträge beim Registrar setzen) — der Absender lässt sich dann über die Env Variable `RESEND_FROM_EMAIL` setzen, z.B. `Renyx <kontakt@renyx.ch>`

Ohne gesetzten `RESEND_API_KEY` gibt die API-Route einen Fehler zurück und das Formular zeigt dem Besucher an, sich direkt per E-Mail zu melden.

## Deployment auf Vercel

1. Repo auf GitHub pushen
2. Auf [vercel.com/new](https://vercel.com/new) das Repo importieren — Next.js wird automatisch erkannt, keine weitere Konfiguration nötig
3. Unter Project → Settings → Domains die Domain `renyx.ch` hinzufügen und die angezeigten DNS-Einträge beim Domain-Registrar setzen
