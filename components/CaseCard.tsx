import Link from "next/link";
import BrowserMockup from "./BrowserMockup";
import type { CaseStudy } from "@/lib/cases";
import { STYLES } from "@/lib/cases";

export default function CaseCard({ c }: { c: CaseStudy }) {
  const style = STYLES[c.styleId];
  return (
    <Link
      href={`/portfolio/${c.slug}`}
      className="group block rounded-xl border border-border bg-bg-elevated p-4 transition-colors hover:border-accent/50"
    >
      <BrowserMockup c={c} className="transition-transform duration-300 group-hover:-translate-y-1" />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-semibold text-text">{c.clientName}</p>
          <p className="text-sm text-text-muted">{c.industry}</p>
        </div>
        <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[0.65rem] font-medium text-accent">
          {style.label}
        </span>
      </div>
      <p className="mt-3 text-sm text-text-muted">{c.summary}</p>
    </Link>
  );
}
