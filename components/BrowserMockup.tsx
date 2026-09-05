import type { CaseStudy } from "@/lib/cases";

function MockupContent({ c }: { c: CaseStudy }) {
  const { palette, styleId, clientName } = c;
  const base = { background: palette.bg, color: palette.text };
  const tint = (a: number) => palette.accent + Math.round(a * 255).toString(16).padStart(2, "0");

  if (styleId === "editorial") {
    return (
      <div style={base} className="flex h-full flex-col gap-2.5 px-[8%] py-[7%] @lg:gap-4">
        <div className="flex items-center justify-between">
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[0.45rem] font-bold @lg:h-9 @lg:w-9 @lg:text-base"
            style={{ background: palette.accent, color: palette.bg }}
          >
            F
          </span>
          <div className="flex gap-2.5 text-[0.4rem] uppercase tracking-[0.2em] opacity-50 @lg:gap-6 @lg:text-xs">
            <span>Sortiment</span>
            <span>Über uns</span>
            <span>Kontakt</span>
          </div>
        </div>

        <p className="mt-1 text-[0.5rem] uppercase tracking-[0.3em] opacity-60 @lg:text-sm">{clientName}</p>
        <p className="max-w-[85%] font-display text-base font-semibold leading-snug @lg:text-4xl">
          {c.tagline}
        </p>
        <div className="h-px w-10 @lg:w-16" style={{ background: palette.accent }} />

        <div className="mt-auto grid grid-cols-3 gap-2 pt-1 @lg:gap-5">
          {["Zopf", "Gipfeli", "Sauerteig"].map((item) => (
            <div key={item} className="flex flex-col gap-1 @lg:gap-2">
              <div className="h-6 w-full rounded-md @lg:h-24" style={{ background: tint(0.16) }} />
              <span className="text-[0.4rem] opacity-70 @lg:text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (styleId === "bold") {
    return (
      <div style={base} className="flex h-full flex-col gap-2.5 px-[7%] py-[7%] @lg:gap-5">
        <div className="flex items-center justify-between">
          <p
            className="text-[0.5rem] font-bold uppercase tracking-widest @lg:text-base"
            style={{ color: palette.accent }}
          >
            {clientName}
          </p>
          <div className="flex flex-col gap-[3px] @lg:gap-1">
            <span className="h-[2px] w-4 @lg:h-[3px] @lg:w-8" style={{ background: palette.text }} />
            <span className="h-[2px] w-4 @lg:h-[3px] @lg:w-8" style={{ background: palette.text }} />
            <span className="h-[2px] w-3 @lg:h-[3px] @lg:w-6" style={{ background: palette.text }} />
          </div>
        </div>

        <p className="font-display text-lg font-bold uppercase leading-[0.95] @lg:text-5xl">
          {c.tagline}
        </p>

        <div className="mt-1 grid grid-cols-2 gap-2 @lg:gap-4">
          <div className="rounded-md p-2 @lg:rounded-xl @lg:p-4" style={{ background: tint(0.1) }}>
            <p className="text-[0.35rem] uppercase tracking-widest opacity-60 @lg:text-xs">Vorher</p>
            <div className="mt-1 h-6 w-full rounded @lg:mt-2 @lg:h-24 @lg:rounded-lg" style={{ background: tint(0.14) }} />
          </div>
          <div className="rounded-md p-2 @lg:rounded-xl @lg:p-4" style={{ background: tint(0.16) }}>
            <p className="text-[0.35rem] uppercase tracking-widest @lg:text-xs" style={{ color: palette.accent }}>
              Nachher
            </p>
            <div className="mt-1 h-6 w-full rounded @lg:mt-2 @lg:h-24 @lg:rounded-lg" style={{ background: tint(0.35) }} />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span
            className="w-fit rounded-full px-3.5 py-1.5 text-[0.55rem] font-bold uppercase tracking-wide @lg:px-7 @lg:py-3 @lg:text-base"
            style={{ background: palette.accent, color: palette.bg }}
          >
            Anfragen
          </span>
          <span className="text-[0.45rem] opacity-60 @lg:text-sm">15+ Jahre Erfahrung</span>
        </div>
      </div>
    );
  }

  if (styleId === "corporate") {
    return (
      <div style={base} className="flex h-full flex-col px-[6%] py-[6%]">
        <div
          className="mb-3 flex items-center justify-between border-b pb-2.5 text-[0.45rem] opacity-70 @lg:mb-6 @lg:pb-4 @lg:text-sm"
          style={{ borderColor: tint(0.4) }}
        >
          <span className="font-semibold">{clientName}</span>
          <span className="hidden gap-3 @lg:flex @lg:gap-6">
            <span>Leistungen</span>
            <span>Team</span>
            <span>Kontakt</span>
          </span>
        </div>

        <p className="max-w-[75%] font-display text-base font-semibold leading-snug @lg:text-3xl">
          {c.tagline}
        </p>

        <div className="mt-2 flex items-center gap-4 text-[0.4rem] @lg:mt-6 @lg:gap-8 @lg:text-sm">
          <span>
            <b className="font-mono text-[0.6rem] @lg:text-xl" style={{ color: palette.accent }}>
              500+
            </b>{" "}
            Mandanten
          </span>
          <span>
            <b className="font-mono text-[0.6rem] @lg:text-xl" style={{ color: palette.accent }}>
              20
            </b>{" "}
            Jahre
          </span>
          <div className="ml-auto flex -space-x-1.5 @lg:-space-x-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-3.5 w-3.5 rounded-full border @lg:h-8 @lg:w-8 @lg:border-2"
                style={{ background: tint(0.25), borderColor: palette.bg }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-3 gap-1.5 pt-2 @lg:gap-3 @lg:pt-4">
          {["Steuern", "Buchhaltung", "Beratung"].map((t) => (
            <div
              key={t}
              className="rounded-md border p-1.5 text-[0.42rem] @lg:rounded-lg @lg:p-4 @lg:text-sm"
              style={{ borderColor: tint(0.5) }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (styleId === "playful") {
    return (
      <div style={base} className="relative flex h-full flex-col gap-2 overflow-hidden px-[8%] py-[7%] @lg:gap-5">
        <div
          className="absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-30 @lg:h-56 @lg:w-56"
          style={{ background: palette.accent }}
        />
        <div
          className="absolute -bottom-10 -left-8 h-20 w-20 rounded-full opacity-20 @lg:h-48 @lg:w-48"
          style={{ background: palette.accent }}
        />

        <p className="relative font-display text-base font-bold leading-tight @lg:text-4xl">
          {c.tagline}
        </p>
        <div className="relative flex flex-wrap gap-1.5 @lg:gap-3">
          {["Schnitt", "Farbe", "Styling"].map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-1 text-[0.45rem] font-medium @lg:px-5 @lg:py-2 @lg:text-sm"
              style={{ background: tint(0.22), color: palette.text }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="relative mt-auto flex flex-col gap-1.5 rounded-lg p-2 @lg:gap-3 @lg:rounded-2xl @lg:p-5"
          style={{ background: tint(0.12) }}
        >
          <div className="flex items-center gap-1.5 @lg:gap-3">
            {["Mo", "Di", "Mi"].map((d, i) => (
              <span
                key={d}
                className="rounded-full px-2 py-0.5 text-[0.4rem] font-semibold @lg:px-4 @lg:py-1.5 @lg:text-sm"
                style={
                  i === 1
                    ? { background: palette.accent, color: palette.bg }
                    : { background: "transparent", color: palette.text, opacity: 0.6 }
                }
              >
                {d}
              </span>
            ))}
            <div className="ml-auto flex -space-x-1.5 @lg:-space-x-3">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="h-3.5 w-3.5 rounded-full border-2 @lg:h-8 @lg:w-8"
                  style={{ background: tint(0.4), borderColor: palette.bg }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-1.5 @lg:gap-3">
            {["09:00", "11:30"].map((t) => (
              <span
                key={t}
                className="rounded-md px-1.5 py-0.5 text-[0.4rem] @lg:rounded-lg @lg:px-3 @lg:py-1.5 @lg:text-sm"
                style={{ background: tint(0.2) }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ecommerce
  return (
    <div style={base} className="flex h-full flex-col px-[6%] py-[6%]">
      <div className="mb-1.5 flex items-center justify-between text-[0.45rem] opacity-80 @lg:mb-4 @lg:text-sm">
        <span className="font-semibold">{clientName}</span>
        <div className="hidden gap-2 opacity-60 @lg:flex @lg:gap-5">
          <span>Keramik</span>
          <span>Textil</span>
          <span>Deko</span>
        </div>
        <span>🛒 2</span>
      </div>

      <div className="mb-1.5 flex gap-1.5 @lg:mb-4 @lg:gap-3">
        <span
          className="rounded-full px-2 py-0.5 text-[0.38rem] @lg:px-4 @lg:py-1.5 @lg:text-xs"
          style={{ background: tint(0.18) }}
        >
          Filter
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[0.38rem] @lg:px-4 @lg:py-1.5 @lg:text-xs"
          style={{ background: tint(0.18) }}
        >
          Sortieren
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[0.38rem] font-semibold @lg:px-4 @lg:py-1.5 @lg:text-xs"
          style={{ background: palette.accent, color: palette.bg }}
        >
          Bestseller
        </span>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2 @lg:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative flex flex-col gap-1 rounded-md border p-1.5 @lg:gap-2 @lg:rounded-xl @lg:p-3"
            style={{ borderColor: tint(0.4) }}
          >
            {i === 0 && (
              <span
                className="absolute right-1 top-1 rounded px-1 py-[1px] text-[0.32rem] font-bold @lg:right-2.5 @lg:top-2.5 @lg:px-2 @lg:py-0.5 @lg:text-xs"
                style={{ background: palette.accent, color: palette.bg }}
              >
                TOP
              </span>
            )}
            <div className="h-8 w-full rounded @lg:h-28 @lg:rounded-lg" style={{ background: tint(0.3) }} />
            <span className="text-[0.45rem] font-semibold @lg:text-base" style={{ color: palette.accent }}>
              CHF {28 + i * 6}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center gap-1 @lg:mt-4 @lg:gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full @lg:h-2 @lg:w-2"
            style={{ background: i === 0 ? palette.accent : tint(0.3) }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BrowserMockup({
  c,
  className = "",
}: {
  c: CaseStudy;
  className?: string;
}) {
  return (
    <div className={`corner-brackets relative ${className}`}>
      <div className="overflow-hidden rounded-lg border border-border bg-bg-elevated-2 shadow-xl shadow-black/30">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded bg-black/20 px-2 py-0.5 font-mono text-[0.55rem] text-text-muted">
            {c.clientName.toLowerCase().replace(/\s+/g, "-")}.ch
          </span>
        </div>
        {/* @container establishes a container-query context sized to this
           mockup's own rendered width, so content can scale up on the big
           portfolio detail page without relying on viewport breakpoints
           (which can't tell a small grid card from a full-width box). */}
        <div className="aspect-[4/3] @container">
          <MockupContent c={c} />
        </div>
      </div>
      <div className="corner-br" />
    </div>
  );
}
