import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

// Kopf für Unterseiten: kleine Einordnung, grosse Headline, höchstens ein Satz dazu.
export default function PageHeader({
  label,
  title,
  lead,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <header className="wrap pb-16 pt-36 sm:pb-24 sm:pt-48">
      <ScrollReveal>
        <p className="label">{label}</p>
        <h1 className="display display-lg mt-6 max-w-[14ch] text-balance">{title}</h1>
        {lead && <p className="lead mt-8 max-w-xl">{lead}</p>}
      </ScrollReveal>
    </header>
  );
}
