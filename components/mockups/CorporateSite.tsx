"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Leistungen" },
  { id: "team", label: "Team" },
  { id: "reviews", label: "Referenzen" },
  { id: "contact", label: "Kontakt" },
];

/** Klassisch & Seriös: Serifen-Überschriften, Kennzahlen-Leiste, Team statt Galerie, formale Tabelle. */
export default function CorporateSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-libre-baskerville)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-[6%] py-3" style={{ borderColor: tint(0.35), background: palette.bg + "f2" }}>
          <span style={font} className="text-xs sm:text-base">{site.navLabel}</span>
          <div className="hidden gap-5 text-[0.6rem] opacity-70 sm:flex sm:text-xs">
            {NAV.slice(1).map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="hover:opacity-100">{s.label}</button>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-12 px-[6%] py-10 text-center sm:py-16">
          <h1 style={font} className="mx-auto max-w-md text-lg leading-snug sm:text-3xl">{c.tagline}</h1>
          <p className="mx-auto mt-3 max-w-sm text-[0.62rem] opacity-70 sm:mt-4 sm:text-sm">{site.heroSub}</p>
          <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-6 border-y py-3 text-[0.58rem] sm:mt-8 sm:gap-10 sm:py-4 sm:text-sm" style={{ borderColor: tint(0.3) }}>
            <span><b className="font-mono" style={{ color: palette.accent }}>500+</b> Mandanten</span>
            <span><b className="font-mono" style={{ color: palette.accent }}>20</b> Jahre</span>
          </div>
        </div>

        <div ref={(el) => { refs.current.services = el; }} className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12" style={{ borderColor: tint(0.2) }}>
          <h2 style={font} className="text-sm sm:text-xl">{site.menuTitle}</h2>
          <div className="mt-4 divide-y border-t sm:mt-6" style={{ borderColor: tint(0.2) }}>
            {site.menu.map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2.5 text-[0.62rem] sm:py-3.5 sm:text-sm" style={{ borderColor: tint(0.2) }}>
                <span className="flex items-center gap-2">
                  <span style={{ color: palette.accent }}>✓</span>
                  {item.name}
                </span>
                <span className="opacity-60">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.team = el; }} className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12" style={{ borderColor: tint(0.2) }}>
          <h2 style={font} className="text-sm sm:text-xl">Ihr Team</h2>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
            {["Beratung", "Buchhaltung", "Recht"].map((role, i) => (
              <div key={role} className="rounded border p-2 text-center sm:p-4" style={{ borderColor: tint(0.25) }}>
                <div className="mx-auto h-6 w-6 rounded-full sm:h-12 sm:w-12" style={{ background: tint(0.3 + i * 0.1) }} />
                <p className="mt-1.5 text-[0.55rem] font-semibold sm:mt-2 sm:text-xs">{role}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12" style={{ borderColor: tint(0.2), background: tint(0.05) }}>
          <h2 style={font} className="text-sm sm:text-xl">Referenzen</h2>
          <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
            {site.testimonials.map((t) => (
              <div key={t.name} className="border-l-2 pl-3 text-[0.6rem] italic opacity-80 sm:pl-4 sm:text-sm" style={{ borderColor: palette.accent }}>
                &bdquo;{t.text}&ldquo;
                <p className="mt-1 text-[0.55rem] not-italic opacity-60 sm:text-xs">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.contact = el; }} className="scroll-mt-12 grid grid-cols-2 gap-3 border-t px-[6%] py-6 text-[0.58rem] opacity-75 sm:gap-6 sm:py-10 sm:text-sm" style={{ borderColor: tint(0.25) }}>
          <div><p style={font} className="text-[0.6rem] not-italic opacity-100 sm:text-sm">Adresse</p><p className="mt-1">{site.address}</p></div>
          <div><p style={font} className="text-[0.6rem] not-italic opacity-100 sm:text-sm">Kontakt</p><p className="mt-1">hallo@{clientName.toLowerCase().replace(/\s+/g, "-")}.ch</p></div>
        </div>
      </div>
    </BrowserFrame>
  );
}
