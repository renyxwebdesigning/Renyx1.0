import Link from "next/link";
import { CONTACT, LEGAL_LINKS, NAV_LINKS } from "@/lib/constants";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="wrap pb-10 pt-16 sm:pt-20">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="label mt-4 max-w-xs">Webdesign für kleine Unternehmen in Zürich und der ganzen Schweiz.</p>
        </div>
        <nav aria-label="Fussnavigation">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-block py-1 transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-1">
          <li>
            <a href={CONTACT.mailto} className="inline-block py-1 transition-colors hover:text-accent">
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a href={CONTACT.tel} className="inline-block py-1 transition-colors hover:text-accent">
              {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-1 transition-colors hover:text-accent"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
      <div className="label mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t pt-6 !text-sm">
        <p>© {new Date().getFullYear()} Renyx</p>
        <ul className="flex gap-6">
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-block py-1 transition-colors hover:text-text">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
