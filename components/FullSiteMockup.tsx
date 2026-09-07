import type { CaseStudy } from "@/lib/cases";
import EditorialSite from "./mockups/EditorialSite";
import BoldSite from "./mockups/BoldSite";
import CorporateSite from "./mockups/CorporateSite";
import PlayfulSite from "./mockups/PlayfulSite";
import EcommerceSite from "./mockups/EcommerceSite";

/**
 * Jede Stilrichtung hat ihr eigenes Layout (Reihenfolge der Sektionen, Typografie,
 * Bausteine) statt eines einzigen, nur umgefärbten Templates — siehe components/mockups/.
 */
export default function FullSiteMockup({ c }: { c: CaseStudy }) {
  switch (c.styleId) {
    case "editorial":
      return <EditorialSite c={c} />;
    case "bold":
      return <BoldSite c={c} />;
    case "corporate":
      return <CorporateSite c={c} />;
    case "playful":
      return <PlayfulSite c={c} />;
    case "ecommerce":
      return <EcommerceSite c={c} />;
  }
}
