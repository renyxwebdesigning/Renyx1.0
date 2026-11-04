import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

// Abschluss jeder Seite: volle orange Fläche, eine Frage, eine Aktion.
export default function CtaBand({ title = "Neues Projekt?" }: { title?: string }) {
  return (
    <section className="bg-accent text-ink">
      <div className="wrap py-20 sm:py-32">
        <ScrollReveal>
          <h2 className="display display-xl text-balance">{title}</h2>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-16">
            <Link href="/kontakt" className="btn btn-ink">
              Projekt starten
            </Link>
            <a href={CONTACT.tel} className="text-lg font-medium underline decoration-1 underline-offset-[0.25em]">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
