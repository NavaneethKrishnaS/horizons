/*
  Who we are, in the form a search engine reads.

  This is the one structured-data block that belongs on every page
  rather than on one of them: it says which company the site is, and it
  is what Google draws the panel beside a result from. It lived on
  /company alone, where it was correct and almost never seen.

  TravelAgency rather than Organization, because the specific type is
  what earns the panel. Every figure comes from data/company.ts and
  data/contact.ts, which are themselves copied off the certificates, so
  nothing here is invented and nothing can drift from the page that
  prints the same numbers.

  Page-specific structured data stays on its page. The FAQPage block on
  /faq and the Article block on /how-to-get-to-kerala describe those
  pages rather than the company, and must not be hoisted into here.
*/
import { COMPANY } from "@/data/company";
import { PHONE_HREF } from "@/data/contact";
import { CONTACT_EMAIL } from "@/lib/whatsapp";

const SITE = "https://horizonsindia.com";

export const ORGANISATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: COMPANY.tradingAs,
  legalName: COMPANY.legalName,
  url: SITE,
  logo: `${SITE}/icon.svg`,
  email: CONTACT_EMAIL,
  /* E.164, which is the form Google would rather be given than a pretty one. */
  telephone: PHONE_HREF.replace("tel:", ""),
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
