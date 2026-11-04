import type { ReactNode } from "react";

export default function BrowserFrame({
  url,
  children,
  className = "",
  contentClassName = "",
}: {
  url: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-xl border border-border bg-bg-elevated-2">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 truncate rounded px-2 py-0.5 text-xs text-text-muted">
            {url}
          </span>
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
