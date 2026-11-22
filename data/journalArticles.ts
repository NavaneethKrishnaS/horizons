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
    slug: "when-to-come-to-kerala",
    eyebrow: "Planning",
    title: "When to come to Kerala",
    standfirst:
      "The short answer is October to March. The longer answer is that every month here is the right month for somewhere, and the wrong month for somewhere else.",
    metaTitle: "When to visit Kerala: the seasons, month by month",
    metaDescription:
      "October to March is the settled weather in Kerala, and December to February the best of it. What the monsoon is actually like, why April and May mean going up into the hills, and which months the festivals fall in.",
    railArt: { src: "/images/journal/palm.webp", alt: "A coconut palm" },
    sections: [
      {
        id: "the-short-answer",
        rail: "The short answer",
        kicker: "October to March",
        heading: "October to March, and February if you can",
        body: [
          "October to March, and December to February most of all: dry, clear, and warm without being punishing.",
          "It is also when everybody else comes, so the good rooms go early. That is the one practical consequence of the obvious answer, and it is the reason we ask people for rough dates long before they are ready to commit to exact ones.",
        ],
      },
      {
        id: "the-monsoon",
        rail: "The monsoon",
        kicker: "June to September",
        heading: "The monsoon is not the washout people expect",
        body: [
          "The south-west monsoon runs roughly June to September, and a second, lighter one comes through in October and November. It rains hard and then it stops. The state turns an almost unreasonable green and the light is extraordinary.",
          "In the high range it is a different calculation: the monsoon shuts the views in cloud, though the tea has never looked better than it does wet. On the plateau at Wayanad the monsoon is serious rather than picturesque.",
        ],
        art: {
          src: "/images/journal/monsoon-cloud.webp",
          alt: "A monsoon cloud with rain falling from it, drawn",
          width: 230,
        },
      },
      {
        id: "april-and-may",
        rail: "April and May",
        kicker: "April and May",
        heading: "Hot at sea level — so go up",
        body: [
          "April and May are hot and humid on the coast. The hill country is the sensible answer in those months: Munnar, Wayanad and the tea estates, beautiful in a way the coast is not.",
          "Two places run against that rule. At Kovalam and Varkala the sea is warm enough to forgive the heat. And the Thrissur Pooram, the loudest festival in the state, falls in April or May — the town is full, which is rather the point of it.",
        ],
        art: {
          src: "/images/journal/tea-branch.webp",
          alt: "A sprig of the tea plant in flower, drawn",
          width: 165,
        },
      },
      {
        id: "by-the-calendar",
        rail: "By the calendar",
        kicker: "The dates",
        heading: "Some things only happen in their month",
        body: [
          "If a particular thing is the reason you are coming, it decides the month rather than the weather.",
          "The snake boats race at Onam, in August or September, in the pilgrim country around Aranmula. Theyyam runs from December to April in the north around Kannur, which is also that district's best weather. Athirappilly is at its fullest from September to December. Fort Kochi is good in any month, and in a Biennale year that fills the winter.",
        ],
      },
      {
        id: "district-by-district",
        rail: "District by district",
        kicker: "In short",
        heading: "The seasons, place by place",
        body: [
          "The backwaters, Kumarakom, Kollam, the Malabar coast and Bekal: November to March. Come out of the monsoon and the canals are at their fullest.",
          "The high range — Munnar and Thekkady: September to May. Wayanad: October to May. Kannur for Theyyam: December to April. Palakkad: November to February, and genuinely hot in April and May. Fort Kochi: any month at all.",
        ],
      },
    ],
  },

  {
    slug: "how-long-to-spend-in-kerala",
    eyebrow: "Planning",
    title: "How long each part of Kerala needs",
    standfirst:
      "The commonest mistake in a first Kerala itinerary is fitting in one place too many. Here is what each part of the state actually asks for, in nights.",
    metaTitle: "How long to spend in Kerala: nights needed, region by region",
    metaDescription:
      "How many nights the backwaters, the high range, Fort Kochi, the north and the far south each need, and why a first Kerala itinerary usually tries to do one place too many.",
    railArt: { src: "/images/journal/rope.webp", alt: "Coir rope, drawn" },
    sections: [
      {
        id: "one-too-many",
        rail: "One place too many",
        kicker: "The mistake",
        heading: "The mistake is almost always one place too many",
        body: [
          "Kerala is long and narrow and the roads are busy, so the distances on a map are not the distances in a day. The single thing most first itineraries get wrong is how long it takes to get between places, and the consequence is always the same: a place gets a night it cannot be seen in.",
          "What follows is not a rule. It is how long each part of the state tends to need before it stops feeling like a stop and starts feeling like somewhere you went.",
        ],
      },
      {
        id: "the-water",
        rail: "The water",
        kicker: "3 nights",
        heading: "The backwaters, and the beach behind them",
        body: [
          "Alappuzha — Vembanad, the canals that feed it, and Marari beach on the other side of the road — takes three nights. Kumarakom, the quiet side of the same lake with the rubber country behind it, takes two.",
          "Kollam, where the houseboat was invented at Alumkadavu, is one or two. A houseboat itself accounts for one of whichever of those nights you give it, noon to nine the next morning.",
        ],
        art: {
          src: "/images/journal/paddle.webp",
          alt: "A canoe paddle, drawn",
          width: 130,
        },
      },
      {
        id: "the-hills",
        rail: "The hills",
        kicker: "4 nights",
        heading: "The high range asks for four",
        body: [
          "Munnar, Thekkady and the high range — tea to the horizon, cardamom under it, and a lake with a forest around it — is four nights, and it is the part people most often cut to three and regret.",
          "Wayanad, up the ghat road into coffee country, is two. Palakkad, the one break in the Western Ghats and the rice country that grows because of it, is one.",
        ],
      },
      {
        id: "the-towns",
        rail: "The towns",
        kicker: "2 nights",
        heading: "Fort Kochi, and the coast north of it",
        body: [
          "Fort Kochi is two nights: four hundred years of trading port on a peninsula you can walk across. Calicut and Beypore, where Vasco da Gama landed and where the dhows are still built, is one or two.",
          "Thrissur and Nilambur are each a day rather than a stay — the Pooram and the waterfall for one, the oldest teak plantation in the world and the Malabar kitchen for the other.",
        ],
      },
      {
        id: "the-ends",
        rail: "The two ends",
        kicker: "3–4 nights",
        heading: "The far south, and the far north",
        body: [
          "Thiruvananthapuram with Kovalam and Varkala — where the state governs itself and where its cliffs fall into the sea — is three nights.",
          "The far north is the one most itineraries never reach. Kannur, Theyyam country, is two or three. Kasaragod, the last district before Karnataka and the emptiest coast in the state, is three or four. Both are a long way from Cochin, and both are the reason to come back.",
        ],
      },
    ],
  },

  {
    slug: "how-a-journey-is-put-together",
    eyebrow: "Planning",
    title: "How a journey is put together",
    standfirst:
      "What happens between the first message and the finished itinerary, who you are actually talking to, and why there is not a price on anything.",
    metaTitle: "How we plan a journey in Kerala — and why there are no prices",
    metaDescription:
      "What happens after you write to us: who replies, how quickly, how an itinerary is built and changed, and why a journey is quoted rather than priced.",
    railArt: { src: "/images/journal/pen-nib.webp", alt: "A dip-pen nib" },
    sections: [
      {
        id: "how-to-start",
        rail: "How to start",
        kicker: "First",
        heading: "Three things are enough to begin",
        body: [
          "Tell us who is travelling, roughly when, and what you did the week before. That last one is not small talk — it is the fastest way for us to understand the pace you actually want rather than the pace people think they should ask for.",
          "We come back with a shortlist, including the things we would talk you out of.",
        ],
      },
      {
        id: "who-replies",
        rail: "Who replies",
        kicker: "Who",
        heading: "The person who replies is the person who plans it",
        body: [
          "One of the people who plans the journeys. There is no enquiry desk and no ticket number. There are not many of us, which is the point.",
          "A reply comes within a day, usually the same one.",
        ],
      },
      {
        id: "nothing-is-fixed",
        rail: "Nothing is fixed",
        kicker: "The itinerary",
        heading: "The journeys on the site are a starting point",
        body: [
          "They are not fixed departures and nobody else is on them. They exist to show what a route can look like and how long it takes, and every one of them gets changed once we know who is travelling.",
          "The same is true of the map. Kerala is where we are from and where most of what we run happens, but a journey can go well beyond it.",
        ],
        art: {
          src: "/images/journal/pen-nib.webp",
          alt: "A steel dip-pen nib, drawn",
          width: 160,
        },
      },
      {
        id: "no-prices",
        rail: "Why no prices",
        kicker: "The money",
        heading: "A journey is quoted, not priced",
        body: [
          "The same route costs one thing for two people travelling in February and another for six in July. Publishing a number that is wrong for almost everybody helps nobody, so we do not.",
          "Ask, and you get a real figure for your dates and your party rather than a headline one with conditions under it.",
        ],
      },
      {
        id: "the-practical",
        rail: "The practical bits",
        kicker: "Before you come",
        heading: "Visas, and whether you will manage",
        body: [
          "Most British and European passport holders travel on India\u2019s e-Visa, applied for online before leaving. The rules and the fees change, so check the current position for your own nationality rather than taking ours.",
          "You will manage in English almost everywhere in Kerala; literacy here is among the highest in India. The state\u2019s own language is Malayalam, and a word or two of it is received very warmly.",
        ],
      },
    ],
  },

  {
    slug: "a-day-and-a-night-on-a-houseboat",
    eyebrow: "On the water",
    title: "A day and a night on a houseboat",
    standfirst:
      "Noon to nine the next morning, hour by hour: when you board, when the engine stops, why the air conditioning goes off at the same time, and what is not in the price.",
    metaTitle: "A day and a night on a Kerala houseboat, hour by hour",
    metaDescription:
      "What actually happens between noon and nine the next morning on an Alleppey houseboat: boarding, the cruise, the meals, the anchorage at dusk, the night with the engine off, and what is not included.",
    railArt: { src: "/images/journal/houseboat.webp", alt: "A kettuvallam" },
    sections: [
      {
        id: "you-board",
        rail: "You board",
        kicker: "12:00",
        heading: "You board",
        body: [
          "Check-in is at noon. There is a welcome drink, and then the cabin is yours \u2014 the boat is not shared with anybody else, whichever size you have taken. The one-bedroom boat takes two guests comfortably. The two-bedroom takes up to seven.",
          "Larger parties are arranged as more than one boat travelling together rather than as strangers sharing one. Bring a government-issued photo ID; it is asked for at check-in.",
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
        heading: "Lunch, cooked while you were moving",
        body: [
          "A traditional Kerala lunch, cooked on board. Every meal is included and all of them are cooked on the boat rather than brought aboard in boxes: the welcome drink, lunch, evening tea with snacks, dinner, and breakfast the next morning.",
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
          "The boat anchors for the night. Local navigation regulations require it, and no houseboat in Kerala does otherwise \u2014 so this is not a thing to shop around for, and a boat that promised to sail on would be promising something it cannot do.",
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
        id: "check-out",
        rail: "Breakfast, check-out",
        kicker: "08:00",
        heading: "Breakfast, and nine o\u2019clock",
        body: [
          "Breakfast is served before the final short cruise back, and check-out is at nine the next morning after a last stretch of water.",
        ],
      },
      {
        id: "not-included",
        rail: "What is not included",
        kicker: "The price",
        heading: "Four things that are not in it",
        body: [
          "Transport to and from the boarding point. Personal expenses. Any beverages beyond those served as part of the meals. And anything not named in the itinerary \u2014 if it is not listed, assume it is not in the price and ask rather than find out on the water.",
          "Transport is the one people assume. Ask and we will arrange it, but it is a separate line.",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) =>
  ARTICLES.find((article) => article.slug === slug);
