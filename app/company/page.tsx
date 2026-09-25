import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import CompanyHero from "@/components/company/CompanyHero";
import CompanyRegister from "@/components/company/CompanyRegister";
import CompanyDocuments from "@/components/company/CompanyDocuments";
import CompanyCTA from "@/components/company/CompanyCTA";
import { COMPANY } from "@/data/company";
import { CONTACT_EMAIL } from "@/lib/whatsapp";
import { PHONE_DISPLAY } from "@/data/contact";

export const metadata: Metadata = pageMeta({
  title:
    "Company details | HORIZONS by Scenic Escapes",
  description:
    "HORIZONS is the travel name of Scenic Escapes India Private Limited — CIN U79110KL2024PTC090388, GSTIN 32ABOCS6035R1ZN, registered in Kollam, Kerala. The certificates, and the registers to check them against.",
  path: "/company",
});

export default function CompanyPage() {
  /*
    The same particulars in the form a search engine reads, so the
    company is matched to its own registration rather than to whoever
    else has used the word horizons.
  */
  const structured = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.tradingAs,
    legalName: COMPANY.legalName,
    url: "https://horizonsindia.com",
    email: CONTACT_EMAIL,
    telephone: PHONE_DISPLAY,
    foundingDate: "2024-11-05",
    taxID: COMPANY.gstin,
    identifier: [
      {
        "@type": "PropertyValue",
        name: "Corporate Identity Number",
        value: COMPANY.cin,
      },
      { "@type": "PropertyValue", name: "GSTIN", value: COMPANY.gstin },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pratheeksha, 364/3, Charamuri Junction, Alumkadavu",
      addressLocality: "Karunagappally",
      addressRegion: "Kerala",
      postalCode: "690573",
      addressCountry: "IN",
    },
  };

  return (
    <main className="overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />

      <CompanyHero />
      <CompanyRegister />
      <CompanyDocuments />
      <CompanyCTA />
    </main>
  );
}
