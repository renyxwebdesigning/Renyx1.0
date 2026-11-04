import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import Team from "@/components/Team";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Noah & Elia — zwei Brüder aus der Region Zürich, die Webdesign und UI/UX für kleine Unternehmen machen.",
  alternates: { canonical: "/ueber-uns" },
};

const VALUES = [
  { t: "Ehrlich", d: "Wir versprechen nichts, was wir nicht halten können." },
  { t: "Persönlich", d: "Du schreibst direkt mit denen, die deine Website bauen." },
  { t: "Lokal", d: "Wir kennen die Region und wie kleine Unternehmen hier arbeiten." },
];

export default function UeberUns() {
  return (
    <>
      <PageHeader
        label="Über uns"
        title="Zwei Brüder, ein Handwerk."
        lead="Renyx bringt gutes Design zu kleinen Unternehmen in der Region Zürich."
      />

      <section className="wrap">
        <Team />
      </section>

      <section className="wrap section grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <ScrollReveal>
          <h2 className="display display-md">Wofür wir stehen</h2>
        </ScrollReveal>
        <ul className="border-b">
          {VALUES.map((v) => (
            <li key={v.t} className="grid gap-1 border-t py-6 md:grid-cols-[1fr_2fr] md:gap-8">
              <h3 className="text-xl font-medium tracking-[-0.01em]">{v.t}</h3>
              <p className="text-lg leading-snug text-text-muted">{v.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Lernen wir uns kennen." />
    </>
  );
}
