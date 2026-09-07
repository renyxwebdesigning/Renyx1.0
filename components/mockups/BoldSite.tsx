"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

/** Bold & Direkt: riesige Blockschrift, scharfe Kanten, hoher Kontrast, kein Weichzeichnen. */
export default function BoldSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-archivo-black)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 px-[6%] py-3" style={{ borderColor: palette.accent, background: palette.bg }}>
          <span style={font} className="text-xs uppercase sm:text-base">{site.navLabel}</span>
          <div className="flex flex-col gap-[3px]">
            <span className="h-[2px] w-5" style={{ background: palette.text }} />
            <span className="h-[2px] w-5" style={{ background: palette.text }} />
            <span className="h-[2px] w-3" style={{ background: palette.accent }} />
          </div>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-12 px-[6%] py-10 sm:py-16">
          <p className="text-[0.6rem] font-bold uppercase tracking-widest sm:text-sm" style={{ color: palette.accent }}>{c.industry}</p>
          <h1 style={font} className="mt-3 text-[1.6rem] uppercase leading-[0.92] sm:text-6xl">{c.tagline}</h1>
          <button className="mt-6 border-2 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-wide sm:mt-8 sm:px-8 sm:py-3.5 sm:text-sm" style={{ borderColor: palette.accent, background: palette.accent, color: palette.bg }} onClick={() => scrollTo("services")}>
            Anfrage stellen
          </button>
        </div>

        <div ref={(el) => { refs.current.work = el; }} className="scroll-mt-12 grid grid-cols-2 gap-2 border-y-2 px-[6%] py-8 sm:gap-4 sm:py-12" style={{ borderColor: palette.accent }}>
          <div className="flex flex-col gap-2 p-3 sm:gap-4 sm:p-6" style={{ background: tint(0.1) }}>
            <p className="text-[0.5rem] font-bold uppercase tracking-widest opacity-60 sm:text-xs">Vorher</p>
            <div className="aspect-video w-full" style={{ background: tint(0.16) }} />
          </div>
          <div className="flex flex-col gap-2 p-3 sm:gap-4 sm:p-6" style={{ background: tint(0.18) }}>
            <p className="text-[0.5rem] font-bold uppercase tracking-widest sm:text-xs" style={{ color: palette.accent }}>Nachher</p>
            <div className="aspect-video w-full" style={{ background: tint(0.4) }} />
          </div>
        </div>

        <div ref={(el) => { refs.current.services = el; }} className="scroll-mt-12 px-[6%] py-8 sm:py-14">
          <h2 style={font} className="text-base uppercase sm:text-3xl">{site.menuTitle}</h2>
          <div className="mt-5 sm:mt-8">
            {site.menu.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3 border-t-2 py-3 sm:gap-6 sm:py-5" style={{ borderColor: tint(0.3) }}>
                <span style={font} className="text-base opacity-30 sm:text-2xl">0{i + 1}</span>
                <span className="flex-1 text-[0.68rem] font-semibold uppercase sm:text-lg">{item.name}</span>
                <span className="text-[0.62rem] sm:text-base" style={{ color: palette.accent }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 border-t-2 px-[6%] py-8 sm:py-14" style={{ borderColor: palette.accent, background: tint(0.08) }}>
          <p style={font} className="max-w-md text-sm uppercase leading-snug sm:text-2xl">
            &bdquo;{site.testimonials[0].text}&ldquo;
          </p>
          <p className="mt-3 text-[0.6rem] font-bold uppercase tracking-widest opacity-60 sm:text-sm">— {site.testimonials[0].name}</p>
        </div>

        <div className="flex items-center justify-between border-t-2 px-[6%] py-4 text-[0.55rem] uppercase tracking-wide opacity-70 sm:py-6 sm:text-xs" style={{ borderColor: palette.accent }}>
          <span>{clientName} · {site.address}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </BrowserFrame>
  );
}
