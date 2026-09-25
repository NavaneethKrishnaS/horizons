/*
  Who we are and how to reach us, in one place.

  Everything the contact page prints about the company comes from here,
  so correcting a number is a one-line edit rather than a hunt through
  markup. Anything left empty is not printed — an address block with a
  gap in it is worse than no address block, and a registration number
  must never be guessed at.
*/

export const ORGANISATION = "Scenic Escapes India Private Limited";

/* The same line the houseboat booking card dials. */
export const PHONE_DISPLAY = "+91 94950 50352";
export const PHONE_HREF = "tel:+919495050352";

/*
  Said plainly, because someone writing from Paris at midnight wants to
  know whether the silence means anything. Correct these two if they
  overpromise — they are the only claim on the page we make about
  ourselves rather than about India.
*/
export const REPLY = {
  promise: "Within a day, usually the same one.",
  hours: "Monday to Saturday, 9.00 to 19.00 IST",
};

/*
  The registered office, line by line. Left empty until the exact
  wording is to hand; the block simply does not render.
*/
export const ADDRESS: string[] = [
  "Pratheeksha, 364/3",
  "Charamuri Junction, Alumkadavu",
  "Karunagappally, Kollam",
  "Kerala 690573, India",
];

/* Google Maps, or anywhere the address can be opened. Optional. */
export const MAP_LINK = "";

/*
  CIN, GSTIN and any tourism registration. Printed small, at the foot of
  the page, for the planners and agents who look for them.
*/
export const REGISTRATION: { term: string; value: string }[] = [
  { term: "CIN", value: "U79110KL2024PTC090388" },
  { term: "GSTIN", value: "32ABOCS6035R1ZN" },
];
