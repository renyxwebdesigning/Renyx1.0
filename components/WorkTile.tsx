import type { CSSProperties } from "react";
import Link from "next/link";
import { STYLES, type CaseStudy, type StyleId } from "@/lib/cases";

// Jede Stilrichtung zeigt sich über ihre eigene Typografie und Farbwelt.
const TYPE: Record<StyleId, { style: CSSProperties; className: string }> = {
  editorial: {
    style: { fontFamily: "var(--font-playfair)", fontWeight: 500 },
    className: "leading-[1.06] tracking-[-0.015em]",
  },
  bold: {
    style: { fontFamily: "var(--font-archivo-black)" },
    className: "uppercase leading-[0.96] tracking-[-0.02em]",
  },
  corporate: {
    style: { fontFamily: "var(--font-libre-baskerville)" },
    className: "leading-[1.14] tracking-[-0.02em]",
  },
  playful: {
    style: { fontFamily: "var(--font-baloo)", fontWeight: 600 },
    className: "leading-[1.02] tracking-[-0.01em]",
  },
  ecommerce: {
    style: { fontFamily: "var(--font-work-sans)", fontWeight: 700 },
    className: "leading-[1.02] tracking-[-0.035em]",
  },
  gastro: {
    style: { fontFamily: "var(--font-cormorant)", fontWeight: 500 },
    className: "italic leading-[1.04]",
  },
};

export default function WorkTile({
  c,
  large = false,
  heading = "h2",
}: {
  c: CaseStudy;
  large?: boolean;
  heading?: "h2" | "h3";
}) {
  const type = TYPE[c.styleId];
  const Title = heading;
  return (
    <Link href={`/portfolio/${c.slug}`} className="group block">
      <div
        className={`relative flex w-full flex-col justify-between overflow-hidden rounded-lg p-6 sm:p-10 lg:p-14 ${
          large ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
        }`}
        style={{ background: c.palette.bg, color: c.palette.text }}
      >
        <p className="text-sm opacity-75 sm:text-base">
          {c.clientName}
        </p>
        <p
          style={type.style}
          className={`${type.className} max-w-[16ch] text-balance transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 ${
            large ? "text-[2.1rem] sm:text-6xl lg:text-[6.5rem]" : "text-[2.1rem] sm:text-5xl lg:text-[4.25rem]"
          }`}
        >
          {c.tagline}
        </p>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-6">
        <Title className="text-lg font-medium tracking-[-0.01em]">{c.industry}</Title>
        <p className="label shrink-0">{STYLES[c.styleId].label}</p>
      </div>
    </Link>
  );
}
