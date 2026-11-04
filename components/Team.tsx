import Image from "next/image";
import { TEAM } from "@/lib/constants";
import ScrollReveal from "./ScrollReveal";

const PHOTOS: Record<string, string> = { Noah: "/team/noah.png", Elia: "/team/elia.png" };

// Zwei Porträts nebeneinander, darunter nur Name und Rolle.
export default function Team() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6">
      {TEAM.map((m, i) => (
        <ScrollReveal key={m.name} delay={i * 0.08}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gradient-to-b from-[#26211c] to-bg-elevated">
            <Image
              src={PHOTOS[m.name]}
              alt={`Porträt von ${m.fullName}`}
              fill
              sizes="(min-width: 1024px) 40vw, 50vw"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-4 text-lg font-medium tracking-[-0.01em]">{m.name}</p>
          <p className="label">{m.role}</p>
        </ScrollReveal>
      ))}
    </div>
  );
}
