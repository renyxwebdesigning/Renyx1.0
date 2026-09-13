"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

/** Bold & Direkt: riesige Blockschrift, scharfe Diagonalkanten, maximaler Kontrast, kein Weichzeichnen. */
export default function BoldSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName, images } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-archivo-black)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-4 px-[6%] py-3" style={{ borderColor: palette.accent, background: palette.bg }}>
          <span style={font} className="text-xs uppercase sm:text-base">{site.navLabel}</span>
          <div className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-5" style={{ background: palette.text }} />
            <span className="h-[2px] w-5" style={{ background: palette.text }} />
            <span className="h-[2px] w-3" style={{ background: palette.accent }} />
          </div>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-12 px-[6%] py-12 sm:py-20">
          <p className="text-[0.62rem] font-bold uppercase tracking-widest sm:text-base" style={{ color: palette.accent }}>{c.industry}</p>
          <h1 style={font} className="mt-3 text-[1.9rem] uppercase leading-[0.88] sm:text-7xl">{c.tagline}</h1>
          <button
            className="mt-7 px-5 py-2.5 text-[0.62rem] font-bold uppercase tracking-wide sm:mt-9 sm:px-9 sm:py-4 sm:text-base"
            style={{ background: palette.accent, color: palette.bg, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0% 100%)" }}
            onClick={() => scrollTo("services")}
          >
            Anfrage stellen
          </button>
        </div>

        <div
          ref={(el) => { refs.current.work = el; }}
          className="scroll-mt-12 grid grid-cols-2 gap-[3px] border-y-4 py-[3px] sm:gap-1 sm:py-1"
          style={{ borderColor: palette.accent, background: palette.accent }}
        >
          <div className="relative aspect-[4/5]" style={{ background: palette.bg }}>
            <img src={images[0]} alt="Vorher" className="h-full w-full object-cover" style={{ filter: "grayscale(1) contrast(1.15)" }} />
            <span className="absolute left-0 top-0 px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-widest sm:px-4 sm:py-2 sm:text-xs" style={{ background: palette.bg, color: palette.text }}>Vorher</span>
          </div>
          <div className="relative aspect-[4/5]" style={{ background: palette.bg }}>
            <img src={images[1]} alt="Nachher" className="h-full w-full object-cover" style={{ filter: "saturate(1.3) contrast(1.1)" }} />
            <span className="absolute left-0 top-0 px-2.5 py-1 text-[0.5rem] font-bold uppercase tracking-widest sm:px-4 sm:py-2 sm:text-xs" style={{ background: palette.accent, color: palette.bg }}>Nachher</span>
          </div>
        </div>

        <div ref={(el) => { refs.current.services = el; }} className="scroll-mt-12 px-[6%] py-10 sm:py-16">
          <h2 style={font} className="text-lg uppercase sm:text-4xl">{site.menuTitle}</h2>
          <div className="mt-6 sm:mt-9">
            {site.menu.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3 border-t-2 py-3.5 sm:gap-6 sm:py-6" style={{ borderColor: tint(0.3) }}>
                <span style={font} className="text-lg opacity-30 sm:text-3xl">0{i + 1}</span>
                <span className="flex-1 text-[0.72rem] font-semibold uppercase sm:text-xl">{item.name}</span>
                <span className="text-[0.65rem] font-bold sm:text-lg" style={{ color: palette.accent }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 border-t-4 px-[6%] py-10 sm:py-16" style={{ borderColor: palette.accent, background: tint(0.08) }}>
          <p style={font} className="max-w-md text-base uppercase leading-[1.05] sm:text-3xl">
            &bdquo;{site.testimonials[0].text}&ldquo;
          </p>
          <p className="mt-4 text-[0.6rem] font-bold uppercase tracking-widest opacity-60 sm:text-sm">— {site.testimonials[0].name}</p>
        </div>

        <div className="flex items-center justify-between border-t-4 px-[6%] py-4 text-[0.55rem] uppercase tracking-wide opacity-70 sm:py-6 sm:text-xs" style={{ borderColor: palette.accent }}>
          <span>{clientName} · {site.address}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </BrowserFrame>
  );
}
