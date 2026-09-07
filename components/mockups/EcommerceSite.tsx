"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

const NAV = [
  { id: "hero", label: "Neu" },
  { id: "products", label: "Produkte" },
  { id: "trust", label: "Über uns" },
  { id: "reviews", label: "Bewertungen" },
];

/** Shop & Produkt: sofort Produktraster statt Text-Hero, Warenkorb, Sternebewertungen. */
export default function EcommerceSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-work-sans)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-[6%] py-3" style={{ borderColor: tint(0.3), background: palette.bg + "f2" }}>
          <span style={font} className="text-xs sm:text-base">{site.navLabel}</span>
          <div className="hidden gap-4 text-[0.6rem] opacity-70 sm:flex sm:text-xs">
            {NAV.slice(1).map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="hover:opacity-100">{s.label}</button>
            ))}
          </div>
          <span className="rounded-full px-2.5 py-1 text-[0.6rem] font-semibold sm:text-xs" style={{ background: palette.accent, color: palette.bg }}>🛒 2</span>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-12 flex items-center justify-between px-[6%] py-2.5 text-[0.55rem] sm:py-3.5 sm:text-xs" style={{ background: tint(0.15) }}>
          <span style={font}>{c.tagline}</span>
          <span style={{ color: palette.accent }}>Gratis Versand ab CHF 60</span>
        </div>

        <div ref={(el) => { refs.current.products = el; }} className="scroll-mt-12 px-[6%] py-6 sm:py-10">
          <h2 style={font} className="text-sm sm:text-xl">{site.menuTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-4">
            {site.menu.map((item, i) => (
              <div key={item.name} className="flex flex-col gap-1.5 rounded-lg border p-2 sm:gap-2.5 sm:p-3.5" style={{ borderColor: tint(0.3) }}>
                <div className="relative aspect-square w-full rounded" style={{ background: tint(0.22 + i * 0.05) }}>
                  {i === 0 && <span className="absolute right-1 top-1 rounded px-1 py-[1px] text-[0.4rem] font-bold sm:right-2 sm:top-2 sm:px-1.5 sm:text-[0.6rem]" style={{ background: palette.accent, color: palette.bg }}>NEU</span>}
                </div>
                <span className="text-[0.55rem] font-medium sm:text-sm">{item.name}</span>
                <div className="flex items-center justify-between">
                  <span className="text-[0.55rem] font-bold sm:text-sm" style={{ color: palette.accent }}>{item.price}</span>
                  <span className="rounded px-1.5 py-0.5 text-[0.5rem] font-semibold sm:px-2.5 sm:py-1 sm:text-xs" style={{ background: tint(0.3) }}>+</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.trust = el; }} className="scroll-mt-12 grid grid-cols-3 gap-2 border-y px-[6%] py-6 text-center sm:gap-4 sm:py-10" style={{ borderColor: tint(0.25) }}>
          {["Handgemacht", "Kleine Serien", "Versand in 48h"].map((t) => (
            <div key={t}>
              <div className="mx-auto h-5 w-5 rounded-full sm:h-8 sm:w-8" style={{ background: tint(0.3) }} />
              <p className="mt-1.5 text-[0.5rem] font-medium opacity-75 sm:mt-2 sm:text-xs">{t}</p>
            </div>
          ))}
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 px-[6%] py-6 sm:py-10">
          <h2 style={font} className="text-sm sm:text-xl">Bewertungen</h2>
          <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
            {site.testimonials.map((t) => (
              <div key={t.name} className="flex items-start gap-2.5 rounded-lg border p-2.5 text-[0.58rem] sm:gap-3 sm:p-4 sm:text-sm" style={{ borderColor: tint(0.25) }}>
                <span style={{ color: palette.accent }}>★★★★★</span>
                <div>
                  <p className="opacity-80">{t.text}</p>
                  <p className="mt-1 text-[0.5rem] font-semibold opacity-55 sm:text-xs">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-[6%] py-4 text-[0.55rem] opacity-60 sm:py-6 sm:text-xs" style={{ borderColor: tint(0.25) }}>
          <span>{site.address}</span>
          <span>© {new Date().getFullYear()} {clientName}</span>
        </div>
      </div>
    </BrowserFrame>
  );
}
