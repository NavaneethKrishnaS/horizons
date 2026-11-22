import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import CompanyHero from "@/components/company/CompanyHero";
import CompanyRegister from "@/components/company/CompanyRegister";
import CompanyDocuments from "@/components/company/CompanyDocuments";
import CompanyCTA from "@/components/company/CompanyCTA";

export const metadata: Metadata = pageMeta({
  title:
    "Company details | HORIZONS by Scenic Escapes",
  description:
    "HORIZONS is the travel name of Scenic Escapes India Private Limited — CIN U79110KL2024PTC090388, GSTIN 32ABOCS6035R1ZN, registered in Kollam, Kerala. The certificates, and the registers to check them against.",
  path: "/company",
});

export default function CompanyPage() {
  return (
    <main className="overflow-x-clip">
      <CompanyHero />
      <CompanyRegister />
      <CompanyDocuments />
      <CompanyCTA />
    </main>
  );
}
