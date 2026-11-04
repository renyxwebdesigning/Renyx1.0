// Renyx-Zeichen: oranges Quadrat mit «R» + Wortmarke
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.45rem] bg-accent text-[0.95rem] font-semibold text-ink"
      >
        R
      </span>
      <span className="text-xl font-medium tracking-[-0.03em]">Renyx</span>
    </span>
  );
}
