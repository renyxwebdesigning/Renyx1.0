export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-lg font-bold text-bg">
        R
      </span>
      <span className="font-display text-xl font-bold tracking-tight">Renyx</span>
    </span>
  );
}
