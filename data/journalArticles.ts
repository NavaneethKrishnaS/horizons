/*
  The Journal's articles.

  The six-chapter story on /journal stays exactly as it is. These sit
  beneath it: longer, plainer pieces that answer the things people
  actually type into Google before they book a houseboat.

  THE RULE FOR THIS FILE: every fact in here is already approved
  elsewhere on this site. The hours come from commonItinerary in
  data/houseboat.shared.ts, the capacities and crew from
  data/houseboats.ts, and everything else from the answers in
  data/faq.ts. Nothing has been looked up, inferred or rounded. If a
  sentence here cannot be pointed at in one of those three files, it
  does not belong in this file.

  That rule is not fussiness. An audit of this site in November found
  six factual claims that had drifted from the truth, every one of them
  written because it sounded right. Articles are where that happens
  most easily, because the form invites elaboration.

  Sections carry ids because the rail down the left side of the article
  links to them, and those same links are what let a search engine send
  somebody straight to the hour they asked about.
*/

export type ArticleSection = {
  id: string;
  /* shown in the rail; keep it short enough not to wrap */
  rail: string;
  /* the small olive line above the heading — an hour, or a short label */
  kicker?: string;
  heading: string;
  body: string[];
  /* one of the journal engravings, by file name, shown after this section */
  art?: { src: string; alt: string; width: number };
};

export type JournalArticle = {
  slug: string;
  /* the small line above the title */
  eyebrow: string;
  title: string;
  standfirst: string;
  /* for the search result and the share card */
  metaTitle: string;
  metaDescription: string;
  /* the engraving in the rail */
  railArt: { src: string; alt: string };
  sections: ArticleSection[];
};

export const ARTICLES: JournalArticle[] = [
  {
    slug: "a-day-and-a-night-on-a-houseboat",
    eyebrow: "Houseboats",
    title: "A day and a night on a houseboat",
    standfirst:
      "Noon to nine the next morning, hour by hour: when you board, when the engine stops, and why the air conditioning goes off at the same time.",
    metaTitle: "A day and a night on a Kerala houseboat, hour by hour",
    metaDescription:
      "What actually happens between noon and nine the next morning on an Alleppey houseboat: boarding, the cruise, the meals, the anchorage at dusk, and the night with the engine off.",
    railArt: { src: "/images/journal/paddle.webp", alt: "A canoe paddle" },
    sections: [
      {
        id: "you-board",
        rail: "You board",
        kicker: "12:00",
        heading: "You board",
        body: [
          "Check-in is at noon. There is a welcome drink, and then the cabin is yours — the boat is not shared with anybody else, whichever size you have taken. The one-bedroom boat takes two guests comfortably. The two-bedroom takes up to seven.",
          "Larger parties are arranged as more than one boat travelling together rather than as strangers sharing one.",
        ],
      },
      {
        id: "the-cruise-begins",
        rail: "The cruise begins",
        kicker: "12:30",
        heading: "The cruise begins",
        body: [
          "Out into the Alleppey backwaters: villages along the bank, the narrower canals behind them, and paddy fields lying lower than the water you are sitting on.",
        ],
      },
      {
        id: "lunch",
        rail: "Lunch",
        kicker: "13:30",
        heading: "Lunch",
        body: [
          "A traditional Kerala lunch, cooked on board while you were moving. Meals are included and all of them are cooked on the boat: the welcome drink, lunch, evening tea with snacks, dinner, and breakfast the next morning.",
        ],
        art: {
          src: "/images/journal/cardamom.webp",
          alt: "Cardamom pods, drawn",
          width: 150,
        },
      },
      {
        id: "tea",
        rail: "Tea, and the light goes",
        kicker: "17:30",
        heading: "Tea, and the light goes",
        body: [
          "Tea and local snacks, while the sun drops behind the palms on the far bank. This is the hour most people photograph.",
        ],
      },
      {
        id: "the-engine-stops",
        rail: "The engine stops",
        kicker: "18:00",
        heading: "The engine stops",
        body: [
          "The boat anchors for the night. Local navigation regulations require it, and no houseboat in Kerala does otherwise — so this is not a thing to shop around for, and a boat that promised to sail on would be promising something it cannot do.",
          "For most guests it turns out to be the part they remember.",
        ],
        art: {
          src: "/images/journal/ripples.webp",
          alt: "Concentric ripples on water, drawn",
          width: 210,
        },
      },
      {
        id: "the-quiet",
        rail: "Dinner, and the quiet",
        kicker: "20:00",
        heading: "Dinner, and the quiet",
        body: [
          "Dinner is served on board. Afterwards there is the thing nobody books a houseboat for and everybody talks about afterwards, which is the silence.",
          "The air conditioning in the bedroom runs to scheduled hours rather than until morning, because the generator does not run all night. That is deliberate rather than a limitation. The backwaters at three in the morning are worth hearing.",
        ],
      },
      {
        id: "breakfast",
        rail: "Breakfast",
        kicker: "08:00",
        heading: "Breakfast",
        body: ["Served before the final short cruise back."],
      },
      {
        id: "check-out",
        rail: "Check-out",
        kicker: "09:00",
        heading: "Check-out",
        body: [
          "Nine the next morning, after a last stretch of water. Bring a government-issued photo ID — it is asked for at check-in.",
        ],
      },
    ],
  },

  {
    slug: "what-is-included-on-a-houseboat",
    eyebrow: "Houseboats",
    title: "What is included, and what is not",
    standfirst:
      "The boat, the crew and every meal are in the price. Four things are not, and it is better to know which before you step on.",
    metaTitle: "What is included on a Kerala houseboat — and what is not",
    metaDescription:
      "Meals, crew and the whole boat are included on a Kerala houseboat. Transport to the boarding point, drinks beyond those served, personal expenses and anything off the itinerary are not.",
    railArt: { src: "/images/journal/lamp.webp", alt: "An oil lamp" },
    sections: [
      {
        id: "the-boat",
        rail: "The whole boat",
        kicker: "Included",
        heading: "The whole boat, not a cabin on it",
        body: [
          "A houseboat is taken whole. You are not sharing it with another party, and the crew are there for the people on board and nobody else. The one-bedroom boat carries a crew of two; the larger boats carry three or four.",
        ],
      },
      {
        id: "the-meals",
        rail: "Every meal",
        kicker: "Included",
        heading: "Every meal, cooked on board",
        body: [
          "A welcome drink when you arrive, lunch, evening tea with snacks, dinner, and breakfast the next morning. All of it is cooked on the boat while you are on it rather than brought aboard in boxes.",
        ],
        art: {
          src: "/images/journal/peppercorns.webp",
          alt: "Peppercorns, drawn",
          width: 140,
        },
      },
      {
        id: "air-conditioning",
        rail: "Air conditioning",
        kicker: "Included, to hours",
        heading: "Air conditioning, during scheduled hours",
        body: [
          "The bedrooms are air-conditioned during the scheduled operating hours. It does not run all night, because the generator does not run all night.",
          "Guests who have been told this beforehand tend to count it as a feature rather than a fault, which is most of the reason it is written down here.",
        ],
      },
      {
        id: "not-included",
        rail: "What is not",
        kicker: "Not included",
        heading: "Four things that are not",
        body: [
          "Transport to and from the boarding point. Personal expenses. Any beverages beyond those served as part of the meals. And anything not named in the itinerary — if it is not listed, assume it is not in the price and ask us rather than find out on the water.",
          "We would rather write this plainly than have it discovered at check-out. Transport in particular is the one people assume: ask and we will arrange it, but it is a separate line.",
        ],
      },
      {
        id: "the-hours",
        rail: "The hours",
        kicker: "The hours",
        heading: "Noon to nine",
        body: [
          "Standard check-in is at 12:00 and check-out is at 09:00 the following morning. The boat anchors overnight in compliance with local navigation regulations. Carry a government-issued photo ID for check-in.",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) =>
  ARTICLES.find((article) => article.slug === slug);
