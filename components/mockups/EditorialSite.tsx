"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "../BrowserFrame";

const NAV = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Über uns" },
  { id: "menu", label: "Sortiment" },
  { id: "gallery", label: "Galerie" },
  { id: "reviews", label: "Stimmen" },
];

/** Editorial Minimal: Serifen-Typo, extremes Weissraum, riesiges asymmetrisches Foto statt Karten. */
export default function EditorialSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName, images } = c;
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");
  const scrollTo = (id: string) => refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const font = { fontFamily: "var(--font-playfair)" };

  return (
    <BrowserFrame url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}>
      <div style={{ background: palette.bg, color: palette.text }} className="h-[420px] overflow-y-auto sm:h-[560px]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-[7%] py-4" style={{ borderColor: tint(0.25), background: palette.bg + "f2" }}>
          <span style={font} className="text-sm tracking-wide sm:text-base">{site.navLabel}</span>
          <div className="hidden gap-6 text-[0.62rem] uppercase tracking-[0.2em] opacity-60 sm:flex">
            {NAV.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="hover:opacity-100">{s.label}</button>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-14 grid gap-6 px-[7%] py-14 sm:grid-cols-5 sm:gap-10 sm:py-28">
          <div className="flex flex-col justify-center sm:col-span-3">
            <p className="text-[0.6rem] uppercase tracking-[0.4em] opacity-50 sm:text-xs">{c.industry}</p>
            <h1 style={font} className="mt-5 text-3xl leading-[1.05] sm:text-6xl">{c.tagline}</h1>
            <p className="mt-5 max-w-sm text-[0.68rem] leading-relaxed opacity-70 sm:mt-7 sm:text-sm">{site.heroSub}</p>
            <div className="mt-8 h-px w-20" style={{ background: palette.accent }} />
          </div>
          <div className="sm:col-span-2">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img src={images[0]} alt={clientName} className="h-full w-full object-cover grayscale" style={{ mixBlendMode: "luminosity" }} />
              <div className="absolute inset-0" style={{ background: tint(0.28) }} />
            </div>
          </div>
        </div>

        <div ref={(el) => { refs.current.about = el; }} className="scroll-mt-14 border-t px-[7%] py-14 text-center sm:py-24" style={{ borderColor: tint(0.15) }}>
          <p style={font} className="mx-auto max-w-lg text-lg italic leading-relaxed sm:text-3xl">
            &bdquo;{site.about.split(". ")[0]}.&ldquo;
          </p>
          <p className="mx-auto mt-5 max-w-md text-[0.62rem] leading-relaxed opacity-60 sm:text-sm">
            {site.about.split(". ").slice(1).join(". ")}
          </p>
        </div>

        <div ref={(el) => { refs.current.menu = el; }} className="scroll-mt-14 border-t px-[7%] py-10 sm:py-16" style={{ borderColor: tint(0.15) }}>
          <h2 style={font} className="text-sm sm:text-2xl">{site.menuTitle}</h2>
          <div className="mt-5 sm:mt-8">
            {site.menu.map((item, i) => (
              <div key={item.name} className="flex items-baseline justify-between border-t py-2.5 text-[0.62rem] sm:py-4 sm:text-base" style={{ borderColor: tint(0.15) }}>
                <span className="flex items-baseline gap-2 opacity-80">
                  <span className="font-mono text-[0.55rem] opacity-40 sm:text-xs">0{i + 1}</span>
                  {item.name}
                </span>
                <span style={{ color: palette.accent }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={(el) => { refs.current.gallery = el; }} className="scroll-mt-14 border-t px-[7%] py-10 sm:py-16" style={{ borderColor: tint(0.15) }}>
          <h2 style={font} className="text-sm sm:text-2xl">Galerie</h2>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
            <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden sm:aspect-auto">
              <img src={images[1]} alt="" className="h-full w-full object-cover grayscale" />
              <div className="absolute inset-0" style={{ background: tint(0.16) }} />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <img src={images[2]} alt="" className="h-full w-full object-cover grayscale" />
              <div className="absolute inset-0" style={{ background: tint(0.16) }} />
            </div>
            <div className="relative aspect-square overflow-hidden">
              <img src={images[3] ?? images[1]} alt="" className="h-full w-full object-cover grayscale" />
              <div className="absolute inset-0" style={{ background: tint(0.3) }} />
            </div>
          </div>
        </div>

        <div ref={(el) => { refs.current.reviews = el; }} className="scroll-mt-14 border-t px-[7%] py-10 text-center sm:py-16" style={{ borderColor: tint(0.15), background: tint(0.05) }}>
          <p style={font} className="mx-auto max-w-md text-sm italic leading-relaxed sm:text-xl">
            &bdquo;{site.testimonials[0].text}&ldquo;
          </p>
          <p className="mt-3 text-[0.6rem] uppercase tracking-[0.2em] opacity-50 sm:text-xs">{site.testimonials[0].name}</p>
        </div>

        <div className="border-t px-[7%] py-6 text-center text-[0.55rem] uppercase tracking-[0.2em] opacity-45 sm:py-8 sm:text-xs" style={{ borderColor: tint(0.15) }}>
          {site.address} · © {new Date().getFullYear()} {clientName}
        </div>
      </div>
    </BrowserFrame>
  );
}
