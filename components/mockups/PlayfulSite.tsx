"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

/** Verspielt & Freundlich: viele Blob-Formen, Chat-Bubble-Bewertungen, echte Kundinnen-Fotos statt Kreise. */
export default function PlayfulSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName, images } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-baloo)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="sticky top-0 z-10 flex items-center justify-between px-[6%] py-3">
          <span className="rounded-full px-3 py-1 text-xs sm:text-base" style={{ ...font, background: tint(0.2) }}>{site.navLabel}</span>
          <button onClick={() => scrollTo("booking")} className="rounded-full px-3 py-1.5 text-[0.6rem] font-semibold sm:px-5 sm:py-2 sm:text-xs" style={{ background: palette.accent, color: palette.bg }}>
            Termin buchen
          </button>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="relative scroll-mt-12 overflow-hidden px-[6%] py-12 text-center sm:py-20">
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full opacity-50 sm:h-64 sm:w-64" style={{ background: palette.accent }} />
          <div className="pointer-events-none absolute -bottom-16 -left-12 h-28 w-28 rounded-full opacity-30 sm:h-52 sm:w-52" style={{ background: palette.accent }} />
          <div className="pointer-events-none absolute right-[15%] bottom-4 h-10 w-10 rounded-full opacity-40 sm:h-20 sm:w-20" style={{ background: palette.accent }} />
          <h1 style={font} className="relative mx-auto max-w-sm text-2xl leading-tight sm:text-5xl">{c.tagline}</h1>
          <p className="relative mx-auto mt-3 max-w-xs text-[0.62rem] opacity-75 sm:mt-5 sm:text-sm">{site.heroSub}</p>
          <div className="relative mx-auto mt-6 flex w-fit -space-x-3 sm:mt-8">
            {images.slice(0, 3).map((src, i) => (
              <div key={i} className="h-10 w-10 overflow-hidden rounded-full border-2 sm:h-16 sm:w-16" style={{ borderColor: palette.bg }}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.menu = el; }} className="scroll-mt-12 px-[6%] py-9 sm:py-14">
          <h2 style={font} className="text-center text-base sm:text-3xl">{site.menuTitle}</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
            {site.menu.map((item, i) => (
              <span key={item.name} className="flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.62rem] font-medium sm:px-6 sm:py-3 sm:text-base" style={{ background: tint(0.15 + i * 0.06) }}>
                {item.name} <b style={{ color: palette.accent }}>{item.price}</b>
              </span>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.booking = el; }} className="scroll-mt-12 px-[6%] py-9 sm:py-14">
          <div className="rounded-[2rem] p-5 sm:rounded-[2.5rem] sm:p-8" style={{ background: tint(0.14) }}>
            <p style={font} className="text-sm sm:text-xl">Nächster freier Termin</p>
            <div className="mt-3 flex items-center gap-2 sm:mt-5 sm:gap-3">
              {["Mo", "Di", "Mi", "Do"].map((d, i) => (
                <span key={d} className="rounded-full px-3 py-1 text-[0.55rem] font-semibold sm:px-5 sm:py-2 sm:text-sm" style={i === 1 ? { background: palette.accent, color: palette.bg } : { opacity: 0.5 }}>{d}</span>
              ))}
            </div>
            <div className="mt-3 flex gap-2 sm:mt-4 sm:gap-3">
              {["09:00", "11:30", "14:00"].map((t) => (
                <span key={t} className="rounded-full px-3 py-1 text-[0.55rem] sm:px-5 sm:py-2 sm:text-sm" style={{ background: tint(0.25) }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-12 space-y-3 px-[6%] py-9 sm:space-y-5 sm:py-14" style={{ background: tint(0.05) }}>
          <h2 style={font} className="mb-2 text-center text-base sm:mb-5 sm:text-3xl">Das sagen unsere Kund:innen</h2>
          {site.testimonials.map((t, i) => (
            <div key={t.name} className={`flex items-end gap-2 ${i % 2 ? "flex-row-reverse" : ""}`}>
              <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10">
                <img src={images[i % images.length]} alt="" className="h-full w-full object-cover" />
              </div>
              <div className={`max-w-[70%] rounded-2xl px-3.5 py-2.5 text-[0.6rem] sm:rounded-3xl sm:px-5 sm:py-3.5 sm:text-sm ${i % 2 ? "rounded-br-sm" : "rounded-bl-sm"}`} style={{ background: i % 2 ? palette.accent : tint(0.18), color: i % 2 ? palette.bg : palette.text }}>
                {t.text}
                <p className="mt-1 text-[0.52rem] font-semibold opacity-70 sm:text-xs">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-[6%] py-6 text-center text-[0.58rem] opacity-60 sm:py-8 sm:text-xs">
          {site.address} · {clientName} © {new Date().getFullYear()}
        </div>
      </div>
    </BrowserFrame>
  );
}
