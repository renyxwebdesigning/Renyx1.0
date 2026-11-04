import BrowserFrame from "./BrowserFrame";
import type { CaseStudy } from "@/lib/cases";

/** Zeigt die echte, klickbare Beispielseite aus public/beispiele/ im Browser-Rahmen. */
export default function ExampleSite({ c }: { c: CaseStudy }) {
  return (
    <BrowserFrame url={c.displayUrl}>
      <iframe
        src={c.siteUrl}
        title={`Beispielseite ${c.clientName}`}
        loading="lazy"
        className="block h-[80svh] min-h-[560px] w-full bg-white"
      />
    </BrowserFrame>
  );
}
