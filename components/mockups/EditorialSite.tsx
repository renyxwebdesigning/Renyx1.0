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

/** Editorial Minimal: Serifen-Typo, viel Weissraum, asymmetrische Fotoflächen statt Karten. */
export default function EditorialSite({ c }: { c: CaseStudy }) {
  const { palette, site, clientName } = c;
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

        <div ref={(el) => { refs.current.hero = el; }} className="scroll-mt-14 grid gap-6 px-[7%] py-12 sm:grid-cols-5 sm:gap-10 sm:py-20">
          <div className="sm:col-span-3">
            <p className="text-[0.6rem] uppercase tracking-[0.35em] opacity-50 sm:text-xs">{c.industry}</p>
            <h1 style={font} className="mt-4 text-2xl leading-[1.15] sm:text-5xl">{c.tagline}</h1>
            <p className="mt-4 max-w-sm text-[0.68rem] leading-relaxed opacity-70 sm:mt-6 sm:text-sm">{site.heroSub}</p>
            <div className="mt-6 h-px w-14" style={{ background: palette.accent }} />
          </div>
          <div className="sm:col-span-2">
            <div className="aspect-[3/4] w-full" style={{ background: tint(0.18) }} />
          </div>
        </div>

        <div ref={(el) => { refs.current.about = el; }} className="scroll-mt-14 border-t px-[7%] py-10 text-center sm:py-16" style={{ borderColor: tint(0.15) }}>
          <p style={font} className="mx-auto max-w-md text-base italic leading-relaxed sm:text-2xl">
            &bdquo;{site.about.split(". ")[0]}.&ldquo;
          </p>
          <p className="mx-auto mt-4 max-w-md text-[0.62rem] leading-relaxed opacity-60 sm:text-sm">
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
            <div className="col-span-2 row-span-2 aspect-square sm:aspect-auto" style={{ background: tint(0.22) }} />
            <div className="aspect-square" style={{ background: tint(0.14) }} />
            <div className="aspect-square" style={{ background: tint(0.3) }} />
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
