/*
  The shape of a clause on the privacy and terms pages.

  It lives here rather than in the component that renders it: data
  importing a type back out of a component is the wrong way round, even
  when the import is erased at compile time.
*/
export type LegalSection = {
  id: string;
  heading: string;
  body: string[];
  list?: string[];
  links?: { label: string; href: string; external?: boolean }[];
};
