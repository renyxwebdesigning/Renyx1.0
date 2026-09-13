"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "menu", label: "Karte" },
  { id: "gallery", label: "Ambiente" },
  { id: "reviews", label: "Stimmen" },
  { id: "reserve", label: "Reservieren" },
];

/** Gastro & Ambiente: dunkel, stimmungsvoll, vollflächiges Foto als Hero, Reservations-Widget statt Warenkorb. */
export default function GastroSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName, images } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-cormorant)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div ref={(el) => { refs.current.hero = el; }} className="relative scroll-mt-12 aspect-[4/3] w-full sm:aspect-[16/9]">
          <img src={images[0]} alt={clientName} className="h-full w-full object-cover" style={{ filter: "brightness(0.55) saturate(1.1)" }} />
          <div className="absolute inset-0 flex items-center justify-between px-[6%] py-4">
            <span style={{ ...font, fontStyle: "italic" }} className="text-base tracking-wide sm:text-2xl">{site.navLabel}</span>
            <div className="hidden gap-5 text-[0.6rem] uppercase tracking-[0.25em] sm:flex">
              {NAV.slice(1).map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)} className="hover:opacity-70">{s.label}</button>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 px-[6%] pb-8 sm:pb-14">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] opacity-80 sm:text-xs">{c.industry}</p>
            <h1 style={font} className="mt-3 max-w-md text-3xl italic leading-[1.05] sm:text-6xl">{c.tagline}</h1>
            <button
              className="mt-6 rounded-sm border px-5 py-2 text-[0.6rem] uppercase tracking-[0.2em] sm:mt-8 sm:px-8 sm:py-3 sm:text-sm"
              style={{ borderColor: palette.accent, color: palette.accent }}
              onClick={() => scrollTo("reserve")}
            >
              Tisch reservieren
            </button>
          </div>
        </div>

        <div ref={(el) => { refs.current.menu = el; }} className="scroll-mt-12 border-t px-[7%] py-10 sm:py-16" style={{ borderColor: tint(0.2) }}>
          <p style={{ ...font, fontStyle: "italic" }} className="text-center text-sm opacity-70 sm:text-lg">{site.heroSub}</p>
          <h2 style={font} className="mt-8 text-center text-lg italic sm:mt-12 sm:text-3xl">{site.menuTitle}</h2>
          <div className="mx-auto mt-6 max-w-md sm:mt-9">
            {site.menu.map((item) => (
              <div key={item.name} className="flex items-baseline gap-3 py-2.5 text-[0.66rem] sm:py-4 sm:text-base">
                <span>{item.name}</span>
                <span className="flex-1 border-b border-dotted opacity-30" style={{ borderColor: palette.text }} />
                <span style={{ color: palette.accent }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.gallery = el; }} className="scroll-mt-12 grid grid-cols-3 gap-1.5 border-t px-[7%] py-8 sm:gap-2.5 sm:py-14" style={{ borderColor: tint(0.2) }}>
          {images.slice(1, 4).map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden">
              <img src={src} alt="" className="h-full w-full object-cover" style={{ filter: "brightness(0.85) saturate(1.05)" }} />
            </div>
          ))}
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 border-t px-[7%] py-10 text-center sm:py-16" style={{ borderColor: tint(0.2), background: tint(0.06) }}>
          <p style={{ ...font, fontStyle: "italic" }} className="mx-auto max-w-md text-lg leading-relaxed sm:text-2xl">
            &bdquo;{site.testimonials[0].text}&ldquo;
          </p>
          <p className="mt-4 text-[0.6rem] uppercase tracking-[0.25em] opacity-60 sm:text-xs">{site.testimonials[0].name}</p>
        </div>

        <div ref={(el) => { refs.current.reserve = el; }} className="scroll-mt-12 border-t px-[7%] py-10 sm:py-16" style={{ borderColor: tint(0.2) }}>
          <div className="mx-auto max-w-sm rounded-sm border p-5 sm:p-8" style={{ borderColor: tint(0.35) }}>
            <p style={font} className="text-center text-base italic sm:text-xl">Tisch reservieren</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[0.55rem] sm:mt-6 sm:gap-3 sm:text-sm">
              <span className="rounded-sm border px-2 py-1.5 text-center" style={{ borderColor: tint(0.3) }}>Datum</span>
              <span className="rounded-sm border px-2 py-1.5 text-center" style={{ borderColor: tint(0.3) }}>19:30</span>
              <span className="rounded-sm border px-2 py-1.5 text-center" style={{ borderColor: tint(0.3) }}>2 Pers.</span>
            </div>
            <button className="mt-4 w-full rounded-sm py-2 text-[0.6rem] uppercase tracking-[0.2em] sm:mt-5 sm:py-3 sm:text-sm" style={{ background: palette.accent, color: palette.bg }}>
              Reservieren
            </button>
          </div>
        </div>

        <div className="border-t px-[7%] py-6 text-center text-[0.55rem] uppercase tracking-[0.2em] opacity-45 sm:py-8 sm:text-xs" style={{ borderColor: tint(0.2) }}>
          {site.address} · © {new Date().getFullYear()} {clientName}
        </div>
      </div>
    </BrowserFrame>
  );
}
