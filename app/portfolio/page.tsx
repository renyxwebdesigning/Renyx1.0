import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import WorkTile from "@/components/WorkTile";
import { CASES } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Sechs klickbare Beispielseiten in unterschiedlichen Stilrichtungen — als Orientierung, welche Richtung zu eurem Unternehmen passt.",
  alternates: { canonical: "/portfolio" },
};

export default function Portfolio() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Sechs Richtungen."
        lead="Sechs klickbare Konzeptbeispiele aus eigener Hand, keine Kundenprojekte. Firmennamen und Logos sind erfunden, die Bilder folgen noch."
      />
      <section className="wrap pb-[clamp(5rem,11vw,11rem)]">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {CASES.map((c, i) => (
            <ScrollReveal key={c.slug} delay={(i % 2) * 0.08}>
              <WorkTile c={c} />
            </ScrollReveal>
          ))}
        </div>
      </section>
      <CtaBand title="Etwas anderes im Kopf?" />
    </>
  );
}
