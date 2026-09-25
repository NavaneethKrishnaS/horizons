/*
  The words on each page's preview card.

  One file rather than eleven, because the cards have to agree with the
  pages and with each other — and because a card is read at thumbnail
  size, where the difference between a good line and a long one is the
  difference between something legible and a grey smudge.

  Each entry echoes the page's own eyebrow and headline rather than
  inventing a new sentence for the card. Change a page's headline and
  this is the file that has to follow it.
*/

export type OgCardCopy = { label: string; title: string; note?: string };

export const OG_CARDS: Record<string, OgCardCopy> = {
  about: {
    label: "About HORIZONS",
    title: "Crafting extraordinary journeys across South India",
  },
  journal: {
    label: "The Journal",
    title: "A country that begins at the water.",
    note: "The spice coast, the backwaters, and the people who live on them.",
  },
  houseboats: {
    label: "Kerala backwaters",
    title: "Curated houseboat experiences",
    note: "One, two and three bedroom kettuvallam houseboats cruising out of Alleppey.",
  },
  packages: {
    label: "Journeys",
    title: "Thirty-nine ways across India.",
    note: "Itineraries we run on the ground, from Kerala to Ladakh.",
  },
  stays: {
    label: "Places to stay",
    title: "Where we would put you.",
    note: "Sixty-five small hotels, family houses and houseboats across India.",
  },
  contact: {
    label: "Contact",
    title: "Tell us where you want to go.",
    note: "What you write reaches the people who plan the journeys.",
  },
  faq: {
    label: "Questions",
    title: "The things people ask first.",
    note: "Check-in times, the best months, the airports, and how a journey is planned.",
  },
  "how-to-get-to-kerala": {
    label: "Getting here",
    title: "How to get to Kerala.",
    note: "All four airports on a map, what each is near, and how long every drive really takes.",
  },
  company: {
    label: "Company",
    title: "Who you are dealing with.",
    note: "Scenic Escapes India Private Limited — the register, and the certificates to check it against.",
  },
  privacy: {
    label: "Privacy",
    title: "What happens to what you tell us.",
    note: "No cookies, no analytics, nothing collected by the website at all.",
  },
  terms: {
    label: "Terms",
    title: "What we promise, and what we ask.",
    note: "How a booking is made, what comes back if you cancel, and what we answer for.",
  },
};
