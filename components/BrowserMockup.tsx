import type { CaseStudy } from "@/lib/cases";

function MockupContent({ c }: { c: CaseStudy }) {
  const { palette, styleId, clientName } = c;
  const base = { background: palette.bg, color: palette.text };

  if (styleId === "editorial") {
    return (
      <div style={base} className="flex h-full flex-col justify-center gap-4 px-[8%] py-[10%]">
        <p className="text-[0.55rem] uppercase tracking-[0.3em] opacity-60">{clientName}</p>
        <p className="max-w-[80%] font-display text-lg font-semibold leading-snug sm:text-2xl">
          {c.tagline}
        </p>
        <div className="h-px w-10" style={{ background: palette.accent }} />
        <p className="max-w-[70%] text-[0.6rem] opacity-70 sm:text-xs">{c.summary}</p>
      </div>
    );
  }

  if (styleId === "bold") {
    return (
      <div style={base} className="flex h-full flex-col justify-between px-[7%] py-[9%]">
        <p className="text-[0.55rem] font-bold uppercase tracking-widest" style={{ color: palette.accent }}>
          {clientName}
        </p>
        <p className="font-display text-xl font-bold uppercase leading-[0.95] sm:text-3xl">
          {c.tagline}
        </p>
        <span
          className="w-fit rounded-full px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-wide"
          style={{ background: palette.accent, color: palette.bg }}
        >
          Anfragen
        </span>
      </div>
    );
  }

  if (styleId === "corporate") {
    return (
      <div style={base} className="flex h-full flex-col px-[7%] py-[8%]">
        <div className="mb-4 flex items-center justify-between border-b pb-3 text-[0.5rem] opacity-60" style={{ borderColor: palette.accent + "40" }}>
          <span className="font-semibold">{clientName}</span>
          <span className="hidden gap-3 sm:flex">
            <span>Leistungen</span>
            <span>Team</span>
            <span>Kontakt</span>
          </span>
        </div>
        <p className="max-w-[75%] font-display text-lg font-semibold leading-snug sm:text-2xl">
          {c.tagline}
        </p>
        <div className="mt-auto grid grid-cols-3 gap-2">
          {["Steuern", "Buchhaltung", "Beratung"].map((t) => (
            <div key={t} className="rounded-md border p-2 text-[0.5rem]" style={{ borderColor: palette.accent + "50" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (styleId === "playful") {
    return (
      <div style={base} className="relative flex h-full flex-col justify-center gap-3 overflow-hidden px-[8%] py-[10%]">
        <div
          className="absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-30"
          style={{ background: palette.accent }}
        />
        <p className="font-display text-lg font-bold leading-tight sm:text-2xl">{c.tagline}</p>
        <div className="flex flex-wrap gap-1.5">
          {["Schnitt", "Farbe", "Styling"].map((t) => (
            <span
              key={t}
              className="rounded-full px-2.5 py-1 text-[0.55rem] font-medium"
              style={{ background: palette.accent + "25", color: palette.text }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // ecommerce
  return (
    <div style={base} className="flex h-full flex-col px-[6%] py-[7%]">
      <div className="mb-3 flex items-center justify-between text-[0.5rem] opacity-70">
        <span className="font-semibold">{clientName}</span>
        <span>🛒 2</span>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1 rounded-md border p-1.5" style={{ borderColor: palette.accent + "40" }}>
            <div className="aspect-square w-full rounded" style={{ background: palette.accent + "30" }} />
            <span className="text-[0.5rem] font-semibold" style={{ color: palette.accent }}>
              CHF {28 + i * 6}
            </span>
          </div>
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
    <div
      className={`overflow-hidden rounded-lg border border-border bg-bg-elevated-2 shadow-xl shadow-black/30 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 truncate rounded bg-black/20 px-2 py-0.5 text-[0.55rem] text-text-muted">
          {c.clientName.toLowerCase().replace(/\s+/g, "-")}.ch
        </span>
      </div>
      <div className="aspect-[16/10]">
        <MockupContent c={c} />
      </div>
    </div>
  );
}
