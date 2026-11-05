import Image from "next/image";
import Link from "next/link";
import { STYLES, type CaseStudy } from "@/lib/cases";

export default function WorkTile({
  c,
  large = false,
  heading = "h2",
}: {
  c: CaseStudy;
  large?: boolean;
  heading?: "h2" | "h3";
}) {
  const Title = heading;
  return (
    <Link href={`/portfolio/${c.slug}`} className="group block">
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-border ${
          large ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={c.preview}
          alt={`Startseite von ${c.clientName}`}
          fill
          sizes={large ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          className={`object-cover ${large ? "object-top md:object-center" : "object-top"} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]`}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-6">
        <Title className="text-lg font-medium tracking-[-0.01em]">
          {c.clientName} <span className="text-text-muted">· {c.industry}</span>
        </Title>
        <p className="label shrink-0">{STYLES[c.styleId].label}</p>
      </div>
    </Link>
  );
}
