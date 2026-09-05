"use client";

import { useRef } from "react";
import type { CaseStudy } from "@/lib/cases";
import BrowserFrame from "./BrowserFrame";

const NAV_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Über uns" },
  { id: "menu", label: "Angebot" },
  { id: "gallery", label: "Galerie" },
  { id: "reviews", label: "Stimmen" },
  { id: "contact", label: "Kontakt" },
];

export default function FullSiteMockup({ c }: { c: CaseStudy }) {
  const { palette, styleId, site, clientName } = c;
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const rounded = styleId === "bold" ? "rounded-sm" : styleId === "playful" ? "rounded-2xl" : "rounded-lg";
  const pill = styleId === "bold" ? "rounded-sm" : "rounded-full";
  const headingFont =
    styleId === "bold" ? "font-display font-bold uppercase" : "font-display font-semibold";
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const base = { background: palette.bg, color: palette.text };

  return (
    <BrowserFrame
      url={`${clientName.toLowerCase().replace(/\s+/g, "-")}.ch`}
      contentClassName=""
    >
      <div
        ref={scrollRef}
        style={base}
        className="h-[420px] overflow-y-auto @container sm:h-[560px]"
      >
        {/* Nav */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b px-[6%] py-3 backdrop-blur-sm"
          style={{ borderColor: tint(0.35), background: palette.bg + "e6" }}
        >
          <span className="text-xs font-bold tracking-wide sm:text-sm">{site.navLabel}</span>
          <div className="hidden gap-4 text-[0.6rem] opacity-70 sm:flex sm:text-xs">
            {NAV_SECTIONS.slice(0, -1).map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="hover:opacity-100">
                {s.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className={`${pill} px-2.5 py-1 text-[0.55rem] font-semibold sm:px-4 sm:py-1.5 sm:text-xs`}
            style={{ background: palette.accent, color: palette.bg }}
          >
            Kontakt
          </button>
        </div>

        {/* Hero */}
        <div
          ref={(el) => {
            sectionRefs.current.hero = el;
          }}
          className="scroll-mt-12 px-[6%] py-10 sm:py-16"
        >
          <p className="text-[0.6rem] uppercase tracking-[0.3em] opacity-60 sm:text-xs">
            {c.industry}
          </p>
          <h1 className={`${headingFont} mt-2 max-w-md text-xl leading-tight sm:text-4xl`}>
            {c.tagline}
          </h1>
          <p className="mt-3 max-w-sm text-[0.65rem] opacity-75 sm:mt-4 sm:text-sm">{site.heroSub}</p>
          <div className="mt-5 flex gap-2 sm:mt-7 sm:gap-3">
            <span
              className={`${pill} px-3 py-1.5 text-[0.6rem] font-semibold sm:px-6 sm:py-2.5 sm:text-sm`}
              style={{ background: palette.accent, color: palette.bg }}
            >
              {styleId === "ecommerce" ? "Jetzt einkaufen" : "Termin anfragen"}
            </span>
            <span
              className={`${pill} border px-3 py-1.5 text-[0.6rem] font-semibold sm:px-6 sm:py-2.5 sm:text-sm`}
              style={{ borderColor: tint(0.5) }}
            >
              Mehr erfahren
            </span>
          </div>
        </div>

        {/* About */}
        <div
          ref={(el) => {
            sectionRefs.current.about = el;
          }}
          className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12"
          style={{ borderColor: tint(0.2) }}
        >
          <h2 className={`${headingFont} text-sm sm:text-2xl`}>Über uns</h2>
          <p className="mt-3 max-w-md text-[0.62rem] leading-relaxed opacity-75 sm:mt-4 sm:text-sm">
            {site.about}
          </p>
        </div>

        {/* Menu / Leistungen */}
        <div
          ref={(el) => {
            sectionRefs.current.menu = el;
          }}
          className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12"
          style={{ borderColor: tint(0.2) }}
        >
          <h2 className={`${headingFont} text-sm sm:text-2xl`}>{site.menuTitle}</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:gap-4">
            {site.menu.map((item) => (
              <div
                key={item.name}
                className={`${rounded} flex items-center justify-between border px-2.5 py-2 text-[0.55rem] sm:px-4 sm:py-3 sm:text-sm`}
                style={{ borderColor: tint(0.3) }}
              >
                <span>{item.name}</span>
                <span className="font-semibold" style={{ color: palette.accent }}>
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div
          ref={(el) => {
            sectionRefs.current.gallery = el;
          }}
          className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12"
          style={{ borderColor: tint(0.2) }}
        >
          <h2 className={`${headingFont} text-sm sm:text-2xl`}>Galerie</h2>
          <div className="mt-4 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-3">
            {[0.35, 0.2, 0.5, 0.28, 0.45, 0.18].map((a, i) => (
              <div key={i} className={`${rounded} aspect-square`} style={{ background: tint(a) }} />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div
          ref={(el) => {
            sectionRefs.current.reviews = el;
          }}
          className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12"
          style={{ borderColor: tint(0.2) }}
        >
          <h2 className={`${headingFont} text-sm sm:text-2xl`}>Das sagen unsere Kund:innen</h2>
          <div className="mt-4 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-4">
            {site.testimonials.map((t) => (
              <div
                key={t.name}
                className={`${rounded} border p-2.5 text-[0.58rem] sm:p-4 sm:text-sm`}
                style={{ borderColor: tint(0.3), background: tint(0.08) }}
              >
                <div className="mb-1.5 text-[0.55rem] sm:mb-2 sm:text-sm" style={{ color: palette.accent }}>
                  ★★★★★
                </div>
                <p className="opacity-80">&quot;{t.text}&quot;</p>
                <p className="mt-2 text-[0.5rem] font-semibold opacity-60 sm:text-xs">{t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Kontakt */}
        <div
          ref={(el) => {
            sectionRefs.current.contact = el;
          }}
          className="scroll-mt-12 border-t px-[6%] py-8 sm:py-12"
          style={{ borderColor: tint(0.3), background: tint(0.06) }}
        >
          <h2 className={`${headingFont} text-sm sm:text-2xl`}>Kontakt</h2>
          <p className="mt-2 text-[0.6rem] opacity-75 sm:mt-3 sm:text-sm">{site.address}</p>
          <p className="mt-1 text-[0.6rem] opacity-75 sm:text-sm">
            hallo@{clientName.toLowerCase().replace(/\s+/g, "-")}.ch
          </p>
          <div className="mt-4 flex items-center justify-between border-t pt-3 text-[0.5rem] opacity-50 sm:mt-6 sm:pt-4 sm:text-xs">
            <span>
              © {new Date().getFullYear()} {clientName}
            </span>
            <div className="flex gap-1.5 sm:gap-2">
              <span className="h-3 w-3 rounded-full border sm:h-5 sm:w-5" style={{ borderColor: tint(0.5) }} />
              <span className="h-3 w-3 rounded-full border sm:h-5 sm:w-5" style={{ borderColor: tint(0.5) }} />
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
