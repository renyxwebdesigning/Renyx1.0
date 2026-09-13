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

const ROLES = ["Beratung", "Buchhaltung", "Recht"];

/** Klassisch & Seriös: Serifen-Überschriften, doppelte Zierlinie, echtes Team, formale Tabelle. */
export default function CorporateSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName, images } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-libre-baskerville)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="h-1" style={{ background: palette.accent }} />
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-[6%] py-3" style={{ borderColor: tint(0.35), background: palette.bg + "f2" }}>
          <span style={font} className="text-xs sm:text-base">{site.navLabel}</span>
          <div className="hidden gap-5 text-[0.6rem] opacity-70 sm:flex sm:text-xs">
            {NAV.slice(1).map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="hover:opacity-100">{s.label}</button>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-12 px-[6%] py-12 text-center sm:py-20">
          <h1 style={font} className="mx-auto max-w-lg text-xl leading-snug sm:text-4xl">{c.tagline}</h1>
          <p className="mx-auto mt-3 max-w-sm text-[0.62rem] opacity-70 sm:mt-4 sm:text-sm">{site.heroSub}</p>
          <div className="mx-auto mt-7 flex max-w-xs items-center justify-center gap-6 border-y-2 py-3.5 text-[0.58rem] sm:mt-9 sm:gap-10 sm:py-5 sm:text-sm" style={{ borderColor: palette.accent }}>
            <span><b className="font-mono" style={{ color: palette.accent }}>500+</b> Mandanten</span>
            <span><b className="font-mono" style={{ color: palette.accent }}>20</b> Jahre</span>
          </div>
        </div>

        <div ref={(el) => { refs.current.services = el; }} className="scroll-mt-12 border-t px-[6%] py-9 sm:py-14" style={{ borderColor: tint(0.2) }}>
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

        <div ref={(el) => { refs.current.team = el; }} className="scroll-mt-12 border-t px-[6%] py-9 sm:py-14" style={{ borderColor: tint(0.2) }}>
          <h2 style={font} className="text-sm sm:text-xl">Ihr Team</h2>
          <div className="mt-4 grid grid-cols-3 gap-2.5 sm:mt-7 sm:gap-5">
            {ROLES.map((role, i) => (
              <div key={role} className="text-center">
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full border-2" style={{ borderColor: tint(0.5) }}>
                  <img src={images[i]} alt={role} className="h-full w-full object-cover" style={{ filter: "grayscale(0.5)" }} />
                </div>
                <p style={font} className="mt-2 text-[0.55rem] sm:mt-3 sm:text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 border-t px-[6%] py-9 sm:py-14" style={{ borderColor: tint(0.2), background: tint(0.05) }}>
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

        <div ref={(el) => { refs.current.contact = el; }} className="scroll-mt-12 grid grid-cols-2 gap-3 border-t-2 px-[6%] py-6 text-[0.58rem] opacity-75 sm:gap-6 sm:py-10 sm:text-sm" style={{ borderColor: palette.accent }}>
          <div><p style={font} className="text-[0.6rem] not-italic opacity-100 sm:text-sm">Adresse</p><p className="mt-1">{site.address}</p></div>
          <div><p style={font} className="text-[0.6rem] not-italic opacity-100 sm:text-sm">Kontakt</p><p className="mt-1">hallo@{clientName.toLowerCase().replace(/\s+/g, "-")}.ch</p></div>
        </div>
      </div>
    </BrowserFrame>
  );
}
