import Link from "next/link";
import { SERVICES } from "@/lib/services";

// Die drei Leistungen als grosse Zeilen, jede führt auf ihre eigene Seite.
export default function ServiceRows() {
  return (
    <ul className="border-b">
      {SERVICES.map((s) => (
        <li key={s.slug} className="border-t">
          <Link
            href={`/leistungen/${s.slug}`}
            className="row-link grid gap-2 py-7 sm:py-10 md:grid-cols-[2fr_1fr] md:items-baseline md:gap-10"
          >
            <span className="row-title display display-md !text-[clamp(2.25rem,5vw,5.25rem)]">{s.title}</span>
            <span className="lead flex items-baseline justify-between gap-4">
              {s.short}
              <span aria-hidden>→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
