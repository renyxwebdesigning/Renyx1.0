import Link from "next/link";
import { CONTACT, NAV_LINKS, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="font-display text-xl font-bold text-text">
              Flux<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              {SITE.tagline}. Von Noah &amp; Elia, gebaut in {SITE.city}.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Navigation</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-text">Kontakt</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-text-muted">
              <li>
                <a href={CONTACT.mailto} className="transition-colors hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.tel} className="transition-colors hover:text-accent">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  WhatsApp schreiben
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flux — {SITE.domain}</p>
          <p>Webdesign &amp; UI/UX für Kleinunternehmen in {SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
