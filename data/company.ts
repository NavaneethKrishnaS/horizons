/*
  The company, on paper.

  Every figure here is copied from a certificate we hold and nothing is
  inferred: the CIN and the date of incorporation from the Certificate of
  Incorporation issued by the Central Registration Centre, the GSTIN and
  the principal place of business from Form GST REG-06. If a line cannot
  be pointed at on one of those two documents it does not belong in this
  file.

  The certificates themselves sit in public/documents. The GST one is
  published as its first two pages only — the third is Annexure B, the
  directors' particulars, which is nobody's business but the department's.
*/

export const COMPANY = {
  legalName: "Scenic Escapes India Private Limited",
  tradingAs: "HORIZONS by Scenic Escapes",
  constitution: "Private company limited by shares",
  incorporated: "5 November 2024",
  cin: "U79110KL2024PTC090388",
  gstin: "32ABOCS6035R1ZN",
  gstType: "Regular",
  jurisdiction: "Kerala, India",
};

/* The registered office, as it reads on both certificates. */
export const OFFICE = [
  "Pratheeksha, 364/3",
  "Karunagappally – Alumkadavu Road",
  "Charamuri Junction, Maru South",
  "Karunagappally, Kollam",
  "Kerala 690573, India",
];

/*
  The three facts an agent or an accounts department asks for first, in
  the order they ask for them.
*/
export const HEADLINE_FACTS = [
  { label: "Corporate Identity Number", value: COMPANY.cin },
  { label: "GSTIN", value: COMPANY.gstin },
  { label: "Incorporated", value: COMPANY.incorporated },
];

export const REGISTER: { term: string; value: string; note?: string }[] = [
  { term: "Legal name", value: COMPANY.legalName },
  { term: "Trading as", value: COMPANY.tradingAs },
  { term: "Constitution", value: COMPANY.constitution },
  {
    term: "Incorporated",
    value: COMPANY.incorporated,
    note: "Under the Companies Act, 2013, by the Central Registration Centre, Ministry of Corporate Affairs",
  },
  { term: "Corporate Identity Number", value: COMPANY.cin },
  {
    term: "GSTIN",
    value: COMPANY.gstin,
    note: "Regular registration under the Kerala Goods and Services Tax Act, 2017",
  },
];

/*
  Both registers are public and free to search, which is the whole point
  of printing the numbers: they are checkable without us.
*/
export const REGISTERS = [
  {
    name: "Ministry of Corporate Affairs",
    what: "Search the CIN under View Company or LLP Master Data for the incorporation date, the registered office and the filing status.",
    href: "https://www.mca.gov.in/content/mca/global/en/mca/fo-llp-services/view-company-llp-master-data.html",
  },
  {
    name: "Goods and Services Tax portal",
    what: "Search the GSTIN under Search Taxpayer for the legal name, the constitution and whether the registration is active.",
    href: "https://services.gst.gov.in/services/searchtp",
  },
];

export const DOCUMENTS = [
  {
    title: "Certificate of Incorporation",
    issuer: "Central Registration Centre, Ministry of Corporate Affairs",
    dated: "5 November 2024",
    file: "/documents/certificate-of-incorporation.pdf",
    preview: "/images/company/certificate-of-incorporation.jpg",
    pages: "One page",
  },
  {
    title: "GST Registration Certificate",
    issuer: "Form GST REG-06, Office of the State Tax Officer, Karunagappally",
    dated: "Issued 18 October 2025",
    file: "/documents/gst-registration-certificate.pdf",
    preview: "/images/company/gst-registration-certificate.jpg",
    pages: "Two pages",
  },
];

export const PREVIEW = { width: 848, height: 1200 };
