/*
  The tour catalogue.

  These are the journeys we run on the ground for our partner agencies in
  Switzerland — Sakadoh in Lausanne and Martin Vernier's art-and-history
  tours. The routes are ours; what is written here is the itinerary, not
  anyone's scheduled departure. There are no dates and no prices: each one
  is built around the people travelling, and quoted when they ask.
*/

export type Collection =
  | "kerala"
  | "wellness"
  | "tamil"
  | "south"
  | "deccan"
  | "sacred"
  | "north"
  | "craft"
  | "himalaya";

/*
  Two lengths of thing, and two people buying them.

  A journey is two or three weeks, for someone flying in. An escape is
  a few days, usually for someone who already lives here. Neither is
  priced on the page: both are built around the people travelling, and
  quoted when they ask.
*/
export type Tier = "journey" | "escape";

export interface CollectionMeta {
  id: Collection;
  label: string;
  blurb: string;
}

/*
  In order of distance from home.

  We are a Kerala company and most of the people who ask us for something
  are either in Kerala or coming to it, so the list opens where we are and
  works outward. Everything else on this page sorts the same way.
*/
export const collections: CollectionMeta[] = [
  {
    id: "kerala",
    label: "Kerala",
    blurb:
      "Home. The backwaters, the hills behind them, and the coast on the other side.",
  },
  {
    id: "wellness",
    label: "Stillness",
    blurb: "Somewhere to stop, in a country that does not often let you.",
  },
  {
    id: "tamil",
    label: "Tamil Nadu",
    blurb:
      "The Dravidian temple country, the Chola river towns, and what the French left at Pondicherry.",
  },
  {
    id: "south",
    label: "The South",
    blurb:
      "Journeys that cross more than one southern state — coast to coast, or the whole peninsula at once.",
  },
  {
    id: "deccan",
    label: "Karnataka & Goa",
    blurb:
      "Hampi and the Hoysalas, the coffee hills, the Nilgiris, and the Portuguese coast beyond them.",
  },
  {
    id: "sacred",
    label: "Sacred India",
    blurb:
      "The Ganges, the Buddha's own ground, and the rock-cut temples of the Deccan.",
  },
  {
    id: "north",
    label: "Rajasthan & the north",
    blurb:
      "Desert cities, the forts of the Rajputs, the road to the Thar — and, at the far end, the Andamans.",
  },
  {
    id: "craft",
    label: "Craft & Cloth",
    blurb: "Journeys built around the people who still make things by hand.",
  },
  {
    id: "himalaya",
    label: "The Himalaya",
    blurb:
      "Ladakh, Zanskar, Sikkim. High, dry, Buddhist country on the old routes between India and Tibet.",
  },
];

export interface ItineraryDay {
  /* "1", or "10 – 14" where several days run together. */
  day: string;
  text: string;
}

export interface TourPackage {
  slug: string;
  tier: Tier;
  title: string;
  /* One line, under the title. */
  standfirst: string;
  collection: Collection;
  /* For the eyebrow line: "Ladakh · 14 days". */
  region: string;
  duration: string;
  /* Sorting only. */
  days: number;
  /*
    How far this journey's centre of gravity is from Kerala, on a scale
    we keep to ourselves: 0 Kerala, 1 Kerala with one neighbour, 2 Tamil
    Nadu, 3 Karnataka and the Nilgiris, 4 the whole south at once, 5 the
    Deccan, 6 Goa and Maharashtra, 7 the Ganges and the east, 8 Rajasthan
    and Delhi, 9 the Himalaya.

    The catalogue is sorted on it, so the south comes first everywhere it
    is listed. That is deliberate: it is where we are, it is what we know
    best, and it is what most of the people asking us are within a day of.
  */
  from: number;
  /* Two or three sentences. */
  summary: string;
  /* The route, in order, as a reader would follow it on a map. */
  route: string[];
  highlights: string[];
  /* Only where we have it day by day. */
  itinerary?: ItineraryDay[];
  image: string;
  imageAlt: string;
  /*
    Who took the placeholder photograph. Not rendered — the Unsplash
    licence covers commercial use with no credit, and their API rule
    that does require it binds the application that queries the API,
    which the site does not. It is kept so we know whose picture is
    whose, can credit anyone who asks, and can see at a glance which
    journeys are still waiting for a photograph of our own.
  */
  credit?: { photographer: string; url: string };
}

const P = "https://images.unsplash.com";

/*
  The hero counts the catalogue out loud, and a numeral in a headline
  set in Cormorant looks like a price. This spells it, and spells it
  from the data, so that adding a journey cannot leave the headline
  quietly lying about how many there are — which is exactly what it did
  the first time we added one.
*/
const UNITS = [
  "no", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen",
];

const TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
  "eighty", "ninety",
];

export function spelled(count: number) {
  if (!Number.isInteger(count) || count < 0 || count > 99) return String(count);
  if (count < 20) return UNITS[count];

  const tens = TENS[Math.floor(count / 10)];
  const unit = count % 10;

  return unit ? `${tens}-${UNITS[unit]}` : tens;
}

/*
  Authored in groups, so that related journeys sit next to each other while
  we are editing. The order below is NOT the order the site shows them in —
  see the export at the foot of the file.
*/
const catalogue: TourPackage[] = [
  /* ——— The Himalaya ——————————————————————————————————————— */
  {
    slug: "zanskar-traverse",
    tier: "journey",
    title: "Across the Himalaya by Zanskar",
    standfirst: "Leh to Lahaul, over a pass at five thousand one hundred metres.",
    collection: "himalaya",
    region: "Ladakh & Himachal Pradesh",
    duration: "18 days",
    days: 18,
    from: 9,
    summary:
      "The long way through: up the Indus past the monasteries, west into Zanskar, then south on foot through the Lungnak gorges and over the Shingo-la into Lahaul. Part vehicle, part trek, sleeping in hotels where there are hotels and in tents where there are none. It is the hardest thing we run and the one people talk about afterwards.",
    route: [
      "Delhi",
      "Leh",
      "Alchi",
      "Zangla",
      "Padum",
      "Karcha",
      "Puktal",
      "Shingo-la",
      "Lahaul",
      "Manali",
    ],
    highlights: [
      "Two days acclimatising in Leh before anything is asked of you",
      "The eleventh-century wall paintings at Alchi, and the lateral valleys above the Indus",
      "Zangla, Padum and the Karcha monastery in the heart of Zanskar",
      "Puktal, built into a cliff face above the Tsarap, reached on foot",
      "The Shingo-la at 5,100m, and the drop into Lahaul on the far side",
    ],
    itinerary: [
      { day: "1 – 2", text: "Fly to Delhi, then on to Leh. Two days doing very little, which at 3,500m is the work." },
      { day: "3 – 4", text: "Leh, and the monasteries upstream along the Indus." },
      { day: "5 – 6", text: "Alchi and the temples in the side valleys off the main road." },
      { day: "7 – 11", text: "Into Zanskar: Zangla, Padum, Tahan-Tungri and Karcha." },
      { day: "12 – 13", text: "The Lungnak gorges, and the walk up to Puktal monastery." },
      { day: "14", text: "Over the Shingo-la, 5,100m, and down into Lahaul." },
      { day: "15 – 17", text: "Manali, Chandigarh, and the night train to Delhi." },
      { day: "18", text: "Delhi, and the flight home." },
    ],
    image: `${P}/photo-1643368214091-6af1a029aee0`,
    credit: {
      photographer: "Anuj Bansal",
      url: "https://unsplash.com/photos/a-mountain-range-with-a-lake-in-the-foreground-TzeoULMYyEQ",
    },
    imageAlt: "The Zanskar range in Ladakh",
  },
  {
    slug: "ladakh-archaeology",
    tier: "journey",
    title: "Ladakh, an archaeology",
    standfirst: "A dig, and the country around it.",
    collection: "himalaya",
    region: "Ladakh",
    duration: "14 days",
    days: 14,
    from: 9,
    summary:
      "Ladakh sits north of the Himalaya, beyond the high passes, on what was once a junction of the Silk Road. This journey follows the excavations that have been running there since 2013 — the sites themselves, the questions they raise, and the people asking them. It takes in a good deal of historical and religious Ladakh that organised tourism does not reach.",
    route: ["Leh", "The Indus valley", "Excavation sites", "Side valleys"],
    highlights: [
      "Sites under active excavation, explained by the people excavating them",
      "Rock carvings and inscriptions left by traffic on the Silk Road",
      "Monasteries and villages well off the through road",
      "Time enough to understand what you are looking at",
    ],
    image: `${P}/photo-1760835251791-1fda687de791`,
    credit: {
      photographer: "Ben Gillam",
      url: "https://unsplash.com/photos/monastery-nestled-in-mountains-with-trees-and-field-zsqiNk8UO2o",
    },
    imageAlt: "Ancient rock carvings in Ladakh",
  },
  {
    slug: "kashmir-to-ladakh",
    tier: "journey",
    title: "Kashmir to Ladakh",
    standfirst: "The road the Buddhist pilgrims took, in the order they took it.",
    collection: "himalaya",
    region: "Kashmir & Ladakh",
    duration: "15 days",
    days: 15,
    from: 9,
    summary:
      "It begins on Nageen Lake at Srinagar and climbs the range to Leh, following the missionaries who carried Buddhism onto the Tibetan plateau in the first millennium. Short approach walks and wild camps, run as an archaeological expedition rather than a sightseeing tour.",
    route: ["Srinagar", "Nageen Lake", "The passes", "Leh"],
    highlights: [
      "Srinagar and the lake, before the climb begins",
      "The first-millennium pilgrim route, taken in its own direction",
      "Itinerant wild camps rather than hotels",
      "Approach walks kept short enough to be about the place, not the effort",
    ],
    image: `${P}/photo-1595815771614-ade9d652a65d`,
    credit: {
      photographer: "Isa",
      url: "https://unsplash.com/photos/green-and-brown-wooden-house-on-lake-near-snow-covered-mountain-during-daytime-72GwiojCwoI",
    },
    imageAlt: "The road between Kashmir and Ladakh",
  },
  {
    slug: "nubra-and-pangong",
    tier: "journey",
    title: "Nubra and Pangong",
    standfirst: "Three days on Bactrian camels, on a road that used to matter.",
    collection: "himalaya",
    region: "Northern Ladakh",
    duration: "15 days",
    days: 15,
    from: 9,
    summary:
      "North of Leh, Nubra is called the valley of flowers. From there the journey follows old caravan routes across the Changthang plateau to Pangong Lake on the Tibetan frontier — three days of it on the back of a Bactrian camel, which is what carried the trade in the first place.",
    route: ["Leh", "Nubra", "Changthang", "Pangong Tso"],
    highlights: [
      "Nubra, green in a country that is otherwise not",
      "Three days of camel trekking on the old Silk Road alignment",
      "The Changthang plateau, empty in a way that is hard to describe",
      "Pangong Tso, on the frontier",
    ],
    image: `${P}/photo-1636800877579-b69375ae9532`,
    credit: {
      photographer: "Vivek",
      url: "https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-MEaPZmSKyws",
    },
    imageAlt: "Pangong Lake in northern Ladakh",
  },
  {
    slug: "ladakh-at-village-pace",
    tier: "journey",
    title: "Ladakh, at village pace",
    standfirst: "Staying in people's houses, and walking between them.",
    collection: "himalaya",
    region: "Central Ladakh",
    duration: "By arrangement",
    days: 13,
    from: 9,
    summary:
      "The same country as the other Ladakh journeys, taken at a human scale. Homestays, itinerant camps, the Sham valley on foot, and the major sites approached by the back way rather than the car park. It is built around meeting people rather than seeing things.",
    route: ["Leh", "The Sham valley", "Village homestays", "Side valleys"],
    highlights: [
      "Staying with families rather than in hotels",
      "The Sham valley walked rather than driven",
      "The well-known monasteries, reached by the route that makes sense of them",
      "Long enough in one place to be recognised the next morning",
    ],
    image: `${P}/photo-1758826138422-a002270a9d53`,
    credit: {
      photographer: "remapstudio",
      url: "https://unsplash.com/photos/buildings-of-a-mountain-village-on-a-rugged-slope-l_0BFtgnegE",
    },
    imageAlt: "A Ladakhi village house",
  },
  {
    slug: "sikkim-and-darjeeling",
    tier: "journey",
    title: "Sikkim and Darjeeling",
    standfirst: "The old Buddhist kingdom, and the hill station below it.",
    collection: "himalaya",
    region: "Sikkim & West Bengal",
    duration: "15 days",
    days: 15,
    from: 9,
    summary:
      "Gangtok, Rumtek and the first monasteries of Sikkim, then west to Yuksom where the kingdom was founded, and down to Darjeeling through the tea. There is an optional two-day walk up to Tonglu at 3,070m for anyone who wants the ridge.",
    route: [
      "Delhi",
      "Gangtok",
      "Rumtek",
      "Tashiding",
      "Yuksom",
      "Khecheopalri",
      "Pelling",
      "Darjeeling",
      "Ghoom",
    ],
    highlights: [
      "Rumtek, seat of the Karmapa",
      "Yuksom, where Sikkim was founded, and the lake at Khecheopalri",
      "Pelling, and the view of Kangchenjunga if the weather allows it",
      "Darjeeling and the monastery at Ghoom",
      "An optional walk to Tonglu, 3,070m, and back",
    ],
    itinerary: [
      { day: "1 – 2", text: "Fly to Delhi. A day in the old city and the new." },
      { day: "3", text: "Delhi to Bagdogra, and up the road to Gangtok." },
      { day: "4 – 5", text: "Gangtok, and the monastery at Rumtek." },
      { day: "6 – 7", text: "West through Tashiding to Yuksom, and a day in the village." },
      { day: "8", text: "Khecheopalri Lake, then on to Pelling." },
      { day: "9 – 10", text: "Down to Darjeeling; the monastery at Ghoom." },
      { day: "11 – 12", text: "The walk up to Tonglu and back, for those who want it." },
      { day: "13 – 15", text: "Darjeeling to Delhi, a last day in the city, and home." },
    ],
    image: `${P}/photo-1661970072086-b7b1c3d7c787`,
    credit: {
      photographer: "Rudra Gupta",
      url: "https://unsplash.com/photos/a-town-on-a-hill-O2HwTDAJoR0",
    },
    imageAlt: "Tea terraces below Darjeeling",
  },
  {
    slug: "sikkim-david-neel",
    tier: "journey",
    title: "Sikkim, after Alexandra David-Néel",
    standfirst: "Following the woman who walked to Lhasa.",
    collection: "himalaya",
    region: "Sikkim",
    duration: "About two weeks",
    days: 14,
    from: 9,
    summary:
      "A journey built around one traveller's route through Sikkim, and around what she was looking for. Tibetan Buddhism as it is practised here, the monasteries she stayed in, and the people she met — the thirteenth Dalai Lama among them.",
    route: ["Gangtok", "The monasteries of Sikkim", "The Sikkim hills"],
    highlights: [
      "The monasteries on her route, in her order",
      "Tibetan Buddhism in the place she first encountered it",
      "The thirteenth Dalai Lama's exile in Sikkim",
      "A thread to follow, rather than a list to complete",
    ],
    image: `${P}/photo-1687074106203-f3dad46d9eb6`,
    credit: {
      photographer: "Shoummo Sen Gupta",
      url: "https://unsplash.com/photos/a-view-of-a-mountain-range-through-two-golden-pillars-jePzQqaZ9dU",
    },
    imageAlt: "A monastery in the Sikkim hills",
  },
  /* ——— Sacred India ——————————————————————————————————————— */
  {
    slug: "the-ganges",
    tier: "journey",
    title: "A journey down the Ganges",
    standfirst: "From where it comes out of the mountains to where it is burned beside.",
    collection: "sacred",
    region: "Uttarakhand & Uttar Pradesh",
    duration: "15 days",
    days: 15,
    from: 7,
    summary:
      "Delhi and Agra first, then north to Haridwar where the Ganges leaves the hills, up to the confluence at Deoprayag, and afterwards down the river — Allahabad, where it meets the Yamuna, and Varanasi, where the whole thing arrives at its conclusion. Sarnath, where the Buddha gave his first sermon, is an afternoon out from there.",
    route: [
      "Delhi",
      "Agra",
      "Haridwar",
      "Deoprayag",
      "Rishikesh",
      "Allahabad",
      "Varanasi",
      "Sarnath",
    ],
    highlights: [
      "The Taj Mahal, on a day trip out of Delhi rather than in a rush",
      "Haridwar at the point the river leaves the mountains",
      "Deoprayag, where the Bhagirathi and the Alaknanda become the Ganges",
      "The confluence at Allahabad",
      "Varanasi, with two days in it rather than one",
      "Sarnath, where the first sermon was given",
    ],
    itinerary: [
      { day: "1 – 2", text: "Fly to Delhi. A day in the old city and the new." },
      { day: "3 – 4", text: "By road to Agra for the Taj Mahal, and back to Delhi." },
      { day: "5", text: "A last morning in Delhi, then north to Haridwar." },
      { day: "6 – 7", text: "Haridwar, up to Deoprayag, and back by way of Rishikesh." },
      { day: "8", text: "A free morning, then the night train to Allahabad." },
      { day: "9", text: "Allahabad and the confluence." },
      { day: "10 – 11", text: "On to Varanasi. Two days, one of them unplanned." },
      { day: "12", text: "Sarnath in the morning; the afternoon your own." },
      { day: "13 – 15", text: "Fly to Delhi, a last day, and home." },
    ],
    image: `${P}/photo-1706186829065-ede677efe384`,
    credit: {
      photographer: "Martijn Vonk",
      url: "https://unsplash.com/photos/a-body-of-water-with-a-city-in-the-background-_ZQE8Ep-ceY",
    },
    imageAlt: "Steps down to the Ganges at Varanasi",
  },
  {
    slug: "footsteps-of-the-buddha",
    tier: "journey",
    title: "In the footsteps of the Buddha",
    standfirst: "The places, in the order they happened.",
    collection: "sacred",
    region: "Uttar Pradesh & Bihar",
    duration: "About two weeks",
    days: 14,
    from: 7,
    summary:
      "The geography of one life: where he was born, where he understood something, where he first said it aloud, and where he died. Read against the India he was born into — millennial, brahminical, Hindu — because the teaching does not make much sense without it.",
    route: [
      "The birthplace",
      "Bodh Gaya",
      "Sarnath",
      "Kushinagar",
      "The Gangetic plain",
    ],
    highlights: [
      "The four places, taken in sequence rather than by convenience",
      "Bodh Gaya, and the tree",
      "Sarnath, where the first sermon was given",
      "The archaeology as well as the pilgrimage",
      "The Hindu and brahminical world the whole thing grew out of",
    ],
    image: `${P}/photo-1663026334668-4b71de9d98ff`,
    credit: {
      photographer: "TONG KBP",
      url: "https://unsplash.com/photos/a-tall-building-with-a-gold-top-wcpnpwvdWzI",
    },
    imageAlt: "The Mahabodhi temple at Bodh Gaya",
  },
  {
    slug: "taj-mahal-to-calcutta",
    tier: "journey",
    title: "From the Taj Mahal to Calcutta",
    standfirst: "Three weeks across the north, ending at the delta.",
    collection: "sacred",
    region: "Uttar Pradesh, Bihar & Bengal",
    duration: "About three weeks",
    days: 21,
    from: 7,
    summary:
      "It opens with the Taj Mahal and Fatehpur Sikri — Indo-Islamic architecture at the point it stopped being able to improve on itself — and then works east through Khajuraho, Bodh Gaya and Varanasi to Kolkata. Hindu and Buddhist pilgrimage alternating the whole way.",
    route: [
      "Agra",
      "Fatehpur Sikri",
      "Khajuraho",
      "Bodh Gaya",
      "Varanasi",
      "Kolkata",
    ],
    highlights: [
      "The Taj Mahal and Fatehpur Sikri at the start, not squeezed in",
      "Khajuraho, and the carving nobody quite prepares you for",
      "Bodh Gaya and Varanasi, a day apart",
      "Kolkata at the end, which is a different country again",
      "Three weeks, so that none of it is at a run",
    ],
    image: `${P}/photo-1690389373004-4e576329565d`,
    credit: {
      photographer: "Katsuma Tanaka",
      url: "https://unsplash.com/photos/a-view-of-the-taj-from-the-ruins-of-the-taj-Xu9_34DiY1w",
    },
    imageAlt: "The Taj Mahal at Agra",
  },
  {
    slug: "deccan-rock-temples",
    tier: "journey",
    title: "The rock temples of the Deccan",
    standfirst: "Ajanta, Ellora, Elephanta — and the kingdoms that followed them.",
    collection: "sacred",
    region: "Maharashtra & Karnataka",
    duration: "About three weeks",
    days: 21,
    from: 5,
    summary:
      "Sanctuaries cut into the hard basalt of the Deccan, at Ajanta, Ellora and Elephanta, and then south to the Chalukya capitals and Vijayanagara — the last of the great Hindu kingdoms. Paced to allow thinking time, with the old bazaars of Goa on the way.",
    route: [
      "Mumbai",
      "Elephanta",
      "Ajanta",
      "Ellora",
      "The Chalukya capitals",
      "Vijayanagara",
      "Old Goa",
    ],
    highlights: [
      "Ajanta and Ellora, cut rather than built",
      "Elephanta, an hour off Mumbai by boat",
      "Badami, Aihole and Pattadakal, where south Indian temple form was worked out",
      "Vijayanagara at Hampi, spread over miles of boulder country",
      "The historic bazaars of old Goa",
    ],
    image: `${P}/photo-1631774934803-554afa7371c9`,
    credit: {
      photographer: "Setu Chhaya",
      url: "https://unsplash.com/photos/a-large-stone-building-with-columns-and-a-doorway-NNw5d3K_j9o",
    },
    imageAlt: "Rock-cut temple architecture at Ellora",
  },
  /* ——— Rajasthan ——————————————————————————————————————————— */
  {
    slug: "rajasthan-and-the-thar",
    tier: "journey",
    title: "Rajasthan and the Thar",
    standfirst: "Three weeks of maharajas, and the desert they built against.",
    collection: "north",
    region: "Rajasthan",
    duration: "21 days",
    days: 21,
    from: 8,
    summary:
      "The history of the place from the Aryan arrivals of the second millennium BC through to the Rajput states — which is to say, palaces and desert fortresses, and the odd, anachronistic, genuinely enchanting business of them still standing in the middle of modern India.",
    route: [
      "Delhi",
      "Jaipur",
      "Jodhpur",
      "Jaisalmer",
      "Udaipur",
      "The Thar desert",
    ],
    highlights: [
      "The Rajput courts, and where they came from",
      "Desert citadels, taken slowly",
      "Jaisalmer, which is still lived in",
      "The gap between the palaces and the country around them",
      "Three weeks, so the desert has time to register",
    ],
    image: `${P}/photo-1777816267401-1a3fb7ed3f12`,
    credit: {
      photographer: "Ranjini Hemanth",
      url: "https://unsplash.com/photos/ornate-golden-sandstone-building-with-intricate-balconies-zPbuM52StUw",
    },
    imageAlt: "A fort in the Thar desert, Rajasthan",
  },
  {
    slug: "rajasthan-sketchbook",
    tier: "journey",
    title: "Rajasthan, drawn by hand",
    standfirst: "A fortnight with a sketchbook, and someone to teach you.",
    collection: "north",
    region: "Rajasthan & Uttar Pradesh",
    duration: "15 days",
    days: 15,
    from: 8,
    summary:
      "The classic route — Delhi, Agra, Jaipur, Jaisalmer, Jodhpur — but travelled at drawing speed, which is much slower than looking speed. Drawing sessions every day, taught, for people at any level including none. You come home with the book.",
    route: [
      "Delhi",
      "Agra",
      "Bharatpur",
      "Fatehpur Sikri",
      "Jaipur",
      "Jaisalmer",
      "Jodhpur",
    ],
    highlights: [
      "Drawing the Taj Mahal rather than photographing it",
      "The bird sanctuary at Bharatpur, and Fatehpur Sikri",
      "Amber, and the palaces of Jaipur",
      "Three days in Jaisalmer, which is what it takes",
      "Mehrangarh above Jodhpur",
      "A taught drawing session most days",
    ],
    itinerary: [
      { day: "1 – 2", text: "Fly to Delhi. Guided visits, and the first drawing." },
      { day: "3", text: "On to Agra. The Taj Mahal in the afternoon, and time to draw it." },
      { day: "4", text: "Fatehpur Sikri on the way to Bharatpur, then the bird sanctuary." },
      { day: "5 – 6", text: "To Jaipur. The palaces, and drawing between them." },
      { day: "7", text: "Amber in the morning; the night train west." },
      { day: "8 – 10", text: "Jaisalmer. Three days, most of them with a pencil." },
      { day: "11 – 12", text: "Jodhpur, the fort, and the blue city below it." },
      { day: "13 – 15", text: "Fly to Delhi, a last day, and home." },
    ],
    image: `${P}/photo-1649497539295-ff89b0639669`,
    credit: {
      photographer: "Freysteinn G. Jonsson",
      url: "https://unsplash.com/photos/a-large-group-of-blue-buildings-in-a-city-ZPGlQRGlMJA",
    },
    imageAlt: "The blue city of Jodhpur",
  },
  /* ——— Craft & Cloth ——————————————————————————————————————— */
  {
    slug: "rajput-textiles",
    tier: "journey",
    title: "The textile trail of the Rajputs",
    standfirst: "Thirteen days of block prints, tie-dye and pearl embroidery.",
    collection: "craft",
    region: "Rajasthan",
    duration: "13 days",
    days: 13,
    from: 8,
    summary:
      "Rajasthan taken through its cloth: the mud-print village at Akola, bandhani and lehariya tie-dye in Udaipur, Moti Bharat pearl embroidery at Jalore, durrie weaving at Salawas, and the block-printing towns of Bagru and Sanganer. Workshops throughout, with the people who do it.",
    route: [
      "Udaipur",
      "Akola",
      "Jalore",
      "Salawas",
      "Jodhpur",
      "Pushkar",
      "Bagru",
      "Sanganer",
      "Jaipur",
      "Abhaneri",
      "Agra",
      "Delhi",
    ],
    highlights: [
      "Mud-resist printing at Akola, which is done in one village and nowhere else",
      "Bandhani and lehariya tie-dye, and trying both",
      "Moti Bharat pearl embroidery at Jalore",
      "Durrie weaving at Salawas",
      "Wooden block printing at Pushkar, Bagru and Sanganer",
      "The stepwell at Abhaneri, and the Taj Mahal at sunset",
    ],
    itinerary: [
      { day: "1 – 2", text: "Delhi, then the internal flight to Udaipur. The mud-print village at Akola." },
      { day: "3", text: "The palace, and the bandhani and lehariya workshops." },
      { day: "4", text: "On to Jalore, and the Moti Bharat pearl embroiderers." },
      { day: "5 – 6", text: "Jodhpur by way of the durrie weavers at Salawas. Mehrangarh, and a day of bandhej." },
      { day: "7", text: "Pushkar, and wooden block printing." },
      { day: "8 – 9", text: "Jaipur through Bagru and Sanganer. The textile museums and the shops." },
      { day: "10 – 11", text: "Agra by way of the Abhaneri stepwell. The Taj at sunset, the fort next morning." },
      { day: "12 – 13", text: "Old Delhi and Dilli Haat, then home." },
    ],
    image: `${P}/photo-1534408925131-1b9560f72a9a`,
    credit: {
      photographer: "Ibrahim Rifath",
      url: "https://unsplash.com/photos/elephant-print-at-n3k8sCkxpKU",
    },
    imageAlt: "Block-printed cloth drying in Rajasthan",
  },
  /* ——— The South ——————————————————————————————————————————— */
  {
    slug: "south-india-by-rail",
    tier: "journey",
    title: "South India by rail",
    standfirst: "The Konkan line, Kerala to Mumbai, with a sketchbook.",
    collection: "south",
    region: "Kerala, Karnataka, Goa & Maharashtra",
    duration: "15 days",
    days: 15,
    from: 4,
    summary:
      "North up the coast entirely by train — Kozhikode, Kannur, Udupi, Gokarna, Goa, Mumbai — on one of the best railway journeys there is. Drawing sessions at every stop, and a decent chance of a Theyyam ceremony at Kannur if the season is right.",
    route: [
      "Kozhikode",
      "Kannur",
      "Udupi",
      "Gokarna",
      "Goa",
      "Mumbai",
      "Elephanta",
    ],
    highlights: [
      "The whole coast by train, second class and overnight sleeper",
      "Theyyam at Kannur, season permitting",
      "The temple at Udupi and the town at Gokarna",
      "Panaji and the Portuguese churches of old Goa",
      "Elephanta island, an hour out of Mumbai",
      "A drawing session most days",
    ],
    itinerary: [
      { day: "1 – 2", text: "Fly to Kozhikode. Rest, then a first walk and a first drawing." },
      { day: "3 – 4", text: "The train to Kannur. Workshops, the beach, and possibly Theyyam." },
      { day: "5", text: "North to Udupi. The temple, and time to draw it." },
      { day: "6 – 7", text: "On to Gokarna. A guided morning, an afternoon drawing." },
      { day: "8", text: "The train into Goa." },
      { day: "9 – 11", text: "Panaji and old Goa, a day of drawing, a day free. Overnight train out." },
      { day: "12 – 14", text: "Mumbai at dawn. The city, Elephanta, and a last free day." },
      { day: "15", text: "Home from Mumbai." },
    ],
    image: `${P}/photo-1662544097759-1dae27b23dcb`,
    credit: {
      photographer: "Praswin Prakashan",
      url: "https://unsplash.com/photos/train-tracks-next-to-a-river-tpt7ZfJNjOg",
    },
    imageAlt: "The Konkan railway on the west coast",
  },
  {
    slug: "dravidian-india",
    tier: "journey",
    title: "Dravidian India, east to west",
    standfirst: "A thousand years of temple building, coast to coast.",
    collection: "south",
    region: "Tamil Nadu & Kerala",
    duration: "About three weeks",
    days: 21,
    from: 1,
    summary:
      "Dravidian architecture across the span it was built in — from small isolated shrines to temple cities covered in relief carving. The route crosses the peninsula through rice country, tea gardens and tropical forest, and finishes on the other coast.",
    route: [
      "Tamil Nadu temple country",
      "The Ghats",
      "Tea country",
      "Kerala",
      "The Malabar coast",
    ],
    highlights: [
      "Temple complexes, and the small shrines that explain them",
      "Relief carving read properly rather than glanced at",
      "Rice fields, tea gardens and forest between the towns",
      "The crossing from one coast to the other",
      "Places to stay chosen for where they are, not their star rating",
    ],
    image: `${P}/photo-1642516861335-97971622499e`,
    credit: {
      photographer: "Avin CP",
      url: "https://unsplash.com/photos/a-very-large-building-with-a-very-tall-tower-dGu_b4S7DXM",
    },
    imageAlt: "A Dravidian temple gopuram in Tamil Nadu",
  },
  /* ——— Stillness ——————————————————————————————————————————— */
  /* ——— Short escapes ——————————————————————————————————————— */
  {
    slug: "kochi-to-kollam",
    tier: "escape",
    title: "Kochi to Kollam, the whole backwater",
    standfirst:
      "Five days on one boat, ending at the village where the houseboat was invented.",
    collection: "kerala",
    region: "Kerala backwaters",
    duration: "5 days, 4 nights",
    days: 5,
    from: 0,
    summary:
      "Most people see the backwaters for a night. This runs their entire length — from Kumbalam below Kochi down through Kumarakom, Kuttanad and Kayamkulam to Alumkadavu, which is where the kettuvallam was first converted and where our own boats still come from. One boat, four nights, and the canals get narrower as you go.",
    route: [
      "Kumbalam",
      "Kumarakom",
      "Pulincunno",
      "Kavalam",
      "Champakulam",
      "Kayamkulam",
      "Alumkadavu",
    ],
    highlights: [
      "Four nights moored in four different villages, not one jetty",
      "Kuttanad, farmed below sea level, from the canals that drain it",
      "Kayaking into water the houseboat cannot reach",
      "Kathakali one evening and kalaripayattu another",
      "The church at Champakulam, and the paddy bunds around Nedumudy",
      "Alumkadavu at the end, and the yard the boats are built in",
    ],
    itinerary: [
      { day: "1", text: "Board at Kumbalam at midday. Through the Kochi backwaters, and the first night at Kumarakom on the Vembanad." },
      { day: "2", text: "A village walk, then kayaking the small canals. Slowly into the Kuttanad paddy country; the night at Pulincunno." },
      { day: "3", text: "Out early, when the light and the canal traffic are both worth being up for. Interior Kuttanad by canoe. The night at Kavalam." },
      { day: "4", text: "Kainakary, the church at Champakulam, then Nedumudy, Thottappally and Thrikkunnapuzha. Kayamkulam by evening." },
      { day: "5", text: "An early cruise past Amritapuri, and off the boat at Alumkadavu between half nine and eleven." },
    ],
    image: `${P}/photo-1602216056096-3b40cc0c9944`,
    imageAlt: "A houseboat on the Kerala backwaters",
  },
  {
    slug: "the-high-range",
    tier: "escape",
    title: "The high range",
    standfirst: "Tea, cardamom, and the highest ground south of the Himalaya.",
    collection: "kerala",
    region: "Munnar & Thekkady",
    duration: "5 days, 4 nights",
    days: 5,
    from: 0,
    summary:
      "Up out of the heat into the Kannan Devan hills, where the tea is, and then south along the ridge to Periyar. Anamudi is here — 2,695 metres, the highest peak in the Western Ghats and the highest point in India outside the Himalaya — and so is the largest surviving population of Nilgiri tahr. Two nights in the tea, two beside the lake, and a road between them that is the point rather than the price of getting there.",
    route: [
      "Kochi",
      "Munnar",
      "Eravikulam",
      "Mattupetty",
      "Kumily",
      "Periyar",
      "Thekkady",
    ],
    highlights: [
      "Eravikulam, and the tahr that come down to the road in the mornings",
      "Anamudi at 2,695m, seen from the park below it",
      "Tea, from the estates that made Munnar, with someone who knows how it is graded",
      "A cardamom and pepper plantation at Kumily, walked rather than driven past",
      "Periyar lake at first light, which is when the elephants come to drink",
      "The drive itself — the ghat road, and where to stop on it",
    ],
    itinerary: [
      { day: "1", text: "Up from Kochi through the ghats. Waterfalls and the first tea near Adimali; into Munnar by afternoon." },
      { day: "2", text: "Eravikulam early, before the cloud. The afternoon in the estates — Mattupetty, the dam, and how tea is actually made." },
      { day: "3", text: "South along the ridge to Thekkady. Spice country from Kumily onward; an evening walk in the plantations." },
      { day: "4", text: "Periyar at dawn, on the lake. The afternoon free, or bamboo rafting in the reserve for anyone who wants the long version." },
      { day: "5", text: "Down through the cardamom hills and back to Kochi." },
    ],
    image: `${P}/photo-1711192702535-eac61a78ecb0`,
    imageAlt: "Tea-covered hills at Munnar",
    credit: {
      photographer: "zablanca_clicks",
      url: "https://unsplash.com/photos/a-lush-green-hillside-with-trees-and-mountains-in-the-background-JSM39nD0i-8",
    },
  },
  {
    slug: "coorg-and-bylakuppe",
    tier: "escape",
    title: "Coffee country, and a Tibetan town in it",
    standfirst: "Kodagu, and the monastery an hour from the coffee.",
    collection: "deccan",
    region: "Karnataka",
    duration: "4 days, 3 nights",
    days: 4,
    from: 3,
    summary:
      "Kodagu grows most of India's coffee, on estates under shade trees with pepper vines running up them. An hour away at Bylakuppe is something nobody expects: Tibetan settlements begun in 1961, and Namdroling, founded in 1963 by Penor Rinpoche and now the largest teaching centre of the Nyingma school anywhere, with several thousand monks and nuns. The two things are half a morning apart and neither prepares you for the other.",
    route: [
      "Madikeri",
      "Coffee estates",
      "Talakaveri",
      "Abbey Falls",
      "Bylakuppe",
      "Namdroling",
    ],
    highlights: [
      "A working coffee estate, at whatever stage of the year you arrive",
      "Pepper grown up the shade trees, which is why Kodagu smells the way it does",
      "Talakaveri, where the Kaveri rises",
      "Namdroling at Bylakuppe, and the prayer hall at the hour it is being used",
      "Kodava food, which is not like anything else in the south",
      "Nights on an estate rather than in a town",
    ],
    itinerary: [
      { day: "1", text: "Into Kodagu and up to Madikeri. The afternoon settling in on the estate; a walk through the coffee before dark." },
      { day: "2", text: "The estate properly — picking, drying, grading, depending on the month. Abbey Falls, and Raja's Seat for the evening." },
      { day: "3", text: "East to Bylakuppe. Namdroling, the settlements around it, and the long way back through Kushalnagar." },
      { day: "4", text: "Talakaveri in the morning if the weather is with us, then down out of the hills." },
    ],
    image: `${P}/photo-1730621697273-233e874a7f88`,
    imageAlt: "A road through the coffee estates of Coorg",
    credit: {
      photographer: "Praswin Prakashan",
      url: "https://unsplash.com/photos/an-empty-road-in-the-middle-of-a-lush-green-valley-fXzJvnay0sE",
    },
  },
  {
    slug: "chettinad-and-madurai",
    tier: "escape",
    title: "Chettinad, and the temple at Madurai",
    standfirst: "Merchants' mansions, tiles made by hand, and one of the great living temples.",
    collection: "tamil",
    region: "Tamil Nadu",
    duration: "4 days, 3 nights",
    days: 4,
    from: 2,
    summary:
      "In the nineteenth century the Nattukottai Chettiars banked across Burma, Ceylon, Vietnam and Malaya, and brought the money home to seventy-odd villages in Sivaganga and Pudukottai. What they built there is unlike anything else in India: courtyard houses of Burmese teak and Italian marble, Belgian mirrors and Indonesian crockery, many of them now half empty. An hour and a half away is Madurai, and the Meenakshi temple, which is the opposite — never empty for a day.",
    route: [
      "Madurai",
      "Meenakshi temple",
      "Karaikudi",
      "Kanadukathan",
      "Athangudi",
    ],
    highlights: [
      "The Meenakshi temple: fourteen gopurams, the southern one 52 metres, built in the late sixteenth century",
      "Chettiar mansions at Kanadukathan, entered rather than photographed from the gate",
      "Athangudi tiles, still pressed by hand on sheets of glass, one at a time",
      "Chettinad cooking, which is a cuisine rather than a spice level",
      "Karaikudi's antique quarter, where the houses are being sold off piece by piece",
      "A night in one of the mansions, because several are now the only way they survive",
    ],
    itinerary: [
      { day: "1", text: "Into Madurai. The Meenakshi temple in the evening, which is when the city uses it." },
      { day: "2", text: "The temple again at first light, then east to Chettinad and into a mansion for the night." },
      { day: "3", text: "Kanadukathan and the houses. The tile works at Athangudi in the afternoon, and the antique shops at Karaikudi." },
      { day: "4", text: "A last village or two, and back to Madurai or on to Thanjavur." },
    ],
    image: `${P}/photo-1660915223003-7df0db2e57d8`,
    imageAlt: "A Chettinad house in Tamil Nadu",
    credit: {
      photographer: "Nakkeeran Raveendran",
      url: "https://unsplash.com/photos/a-building-with-a-red-roof-c6SNid8b-nQ",
    },
  },
  /* ——— Kerala ————————————————————————————————————————————— */
  {
    slug: "epics-of-kerala",
    tier: "journey",
    title: "The length of Kerala",
    standfirst:
      "Trivandrum to Kochi the slow way, taking in every landscape the state has.",
    collection: "kerala",
    region: "Kerala",
    duration: "15 days",
    days: 15,
    from: 0,
    summary:
      "Kerala is six hundred kilometres of coast with mountains behind it, and most visitors see about a fifth of that. This runs the whole thing from the bottom up: the beaches below Trivandrum, the island canals at Munroe, the backwaters, the tea and cardamom of the high range, a stretch of coast almost nobody stops on, and Fort Kochi at the end. Nothing is more than a half day's drive from the last thing.",
    route: [
      "Trivandrum",
      "Kovalam",
      "Munroe Island",
      "The backwaters",
      "Mararikulam",
      "Thekkady",
      "Munnar",
      "Arattupuzha",
      "Fort Kochi",
    ],
    highlights: [
      "Munroe Island, where the canals are too small for anything but a canoe",
      "A night on a houseboat, and several more beside the water rather than on it",
      "Periyar at Thekkady, and the cardamom the hills there are named for",
      "Munnar, and the estates that made it",
      "Arattupuzha, which is a beach with a village on it and nothing else",
      "Fort Kochi at the end — the Jewish quarter, the Chinese nets, the godowns",
    ],
    itinerary: [
      { day: "1", text: "Into Trivandrum, and straight down to the coast." },
      { day: "2", text: "Kovalam. The morning at the lighthouse beach, the afternoon at whatever pace the journey in has left you." },
      { day: "3 – 4", text: "North to Munroe Island. Two days of canals, coir making, and canoes at the hours the water is worth seeing." },
      { day: "5", text: "Onto a houseboat and into the backwaters proper." },
      { day: "6 – 7", text: "Off at Mararikulam. A fishing village, a long beach, and nothing asked of you." },
      { day: "8 – 9", text: "Up into the hills to Thekkady. Periyar on the water at dawn; the spice plantations after." },
      { day: "10 – 11", text: "Along the ridge to Munnar. Eravikulam early on one of the two mornings, the estates on the other." },
      { day: "12 – 13", text: "Down to the coast at Arattupuzha, which is the quietest stop on the whole route." },
      { day: "14", text: "Fort Kochi. The old town on foot, and Kathakali in the evening." },
      { day: "15", text: "The morning free, and out through Kochi." },
    ],
    image: `${P}/photo-1615289139857-99b7eb0702dd`,
    imageAlt: "Sunset on the Kerala coast",
    credit: {
      photographer: "Ankit Dandhare",
      url: "https://unsplash.com/photos/body-of-water-during-sunset-oej657B2qNE",
    },
  },
  {
    slug: "kerala-unhurried",
    tier: "journey",
    title: "Kerala, unhurried",
    standfirst:
      "Six places almost no itinerary includes, and two or three nights in each.",
    collection: "kerala",
    region: "Kerala",
    duration: "13 days",
    days: 13,
    from: 0,
    summary:
      "This is the one we build for people who have decided not to see very much. Poovar, where a river meets the sea behind a sandbar; Quilon at the southern end of the backwaters; Nedumudy in the middle of the Kuttanad paddy; Vagamon, a grassland ridge the guidebooks have not caught up with; and Vypin, an island off Kochi with a beach on one side and the harbour on the other. Nothing on the list is famous. That is the point of the list.",
    route: [
      "Trivandrum",
      "Poovar",
      "Quilon",
      "Nedumudy",
      "Vagamon",
      "Vypin Island",
      "Kochi",
    ],
    highlights: [
      "Poovar, reached by boat, where the Neyyar comes out behind a sandbar",
      "The Ashtamudi lake at Quilon, which is the backwaters without the traffic",
      "Nedumudy, below sea level, where the paddy is worked off the bunds",
      "Vagamon's meadows and pine ridge, at fifteen hundred metres",
      "Vypin — a beach, a Portuguese fort at Pallipuram, and the harbour mouth",
      "Two or three nights everywhere, so that nothing is a stop",
    ],
    itinerary: [
      { day: "1", text: "Into Trivandrum and down the coast to Poovar." },
      { day: "2 – 3", text: "Poovar. The estuary by boat, the beach on the far side of it, and the backwater behind." },
      { day: "4 – 5", text: "North to Quilon and the Ashtamudi. Cashew, coir, and the Chinese nets at Thangassery." },
      { day: "6 – 7", text: "Nedumudy, in the middle of Kuttanad. Canoes along the bunds; the paddy at the hour it is worked." },
      { day: "8 – 9", text: "Up to Vagamon. The meadows, the pine forest, and the walk along the ridge." },
      { day: "10 – 12", text: "Down to Vypin. Three nights: the beach, the fort at Pallipuram, and Fort Kochi across the water whenever you want it." },
      { day: "13", text: "Out through Kochi." },
    ],
    image: `${P}/photo-1705838617550-ae0573ebefc8`,
    imageAlt: "A canoe on a narrow canal in Kerala",
    credit: {
      photographer: "Sebastian Kohlhauer",
      url: "https://unsplash.com/photos/a-boat-floating-down-a-river-surrounded-by-palm-trees-WNwYsa_kMqY",
    },
  },
  {
    slug: "kerala-in-guesthouses",
    tier: "journey",
    title: "Kerala, in other people's houses",
    standfirst:
      "Fifteen days of guesthouses and family homes, ending in the Theyyam country.",
    collection: "kerala",
    region: "Kerala & north Malabar",
    duration: "15 days",
    days: 15,
    from: 0,
    summary:
      "No hotel on this one. Every night is in a house somebody lives in or has kept in the family — a homestay on the paddy, a working farm above a river, a tea bungalow, a hundred-and-fifty-year-old tharavad on the north coast. It goes further north than most Kerala itineraries ever do, into Malabar, where Theyyam is performed between December and April and is not a show.",
    route: [
      "Kochi",
      "Kuttanad",
      "Thekkady",
      "Thodupuzha",
      "Fort Kochi",
      "Calicut",
      "Wayanad",
      "Thalassery",
      "Nileshwar",
    ],
    highlights: [
      "A night on a houseboat, and the rest of the water seen from the bank",
      "A working farm above the Thodupuzha river — cooking, and the village around it",
      "Kathakali at Fort Kochi, and Theyyam in the north, which are not the same thing at all",
      "Wayanad: cardamom, coffee, and the forest either side of the ghat road",
      "Thalassery, where the food is the reason to stop",
      "Nileshwar and the Bekal coast, about as far north as Kerala goes",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Kochi, and out to the backwaters the same day if the flight allows." },
      { day: "3", text: "A homestay in Kuttanad, among the paddy, with the day spent on the water." },
      { day: "4 – 5", text: "Up to Periyar at Thekkady — the lake early, the spice plantations after." },
      { day: "6 – 7", text: "Down to a farm above the river at Thodupuzha. Cooking, the plantation, and the village." },
      { day: "8 – 9", text: "Back to Fort Kochi. The old town, the godowns, and Kathakali in the evening." },
      { day: "10", text: "North by train to Calicut, which is the right way to arrive on the Malabar coast." },
      { day: "11 – 12", text: "Up into Wayanad. Plantations, the forest edge, and the road itself." },
      { day: "13", text: "Thalassery, and a tharavad on the coast. Theyyam in season." },
      { day: "14 – 15", text: "Nileshwar. Bekal fort for anyone who wants it, and out through Calicut." },
    ],
    image: `${P}/photo-1551292083-5d458a10336d`,
    imageAlt: "A Theyyam performer in north Kerala",
    credit: {
      photographer: "Vineeth Vinod",
      url: "https://unsplash.com/photos/person-red-tribal-mask-NwxSI7wD-gc",
    },
  },
  {
    slug: "kerala-with-children",
    tier: "journey",
    title: "Kerala with children",
    standfirst: "Ten days built around what children actually like doing.",
    collection: "kerala",
    region: "Kerala",
    duration: "10 days",
    days: 10,
    from: 0,
    summary:
      "The same places as any other Kerala itinerary, arranged differently: shorter drives, something to do rather than something to look at, and a beach at the end rather than an airport. Bicycles at Alleppey, a cooking lesson children are allowed to ruin, a night on a boat, elephants at Periyar, and tea estates you walk into rather than photograph from the car.",
    route: [
      "Fort Kochi",
      "Munnar",
      "Periyar",
      "Alleppey",
      "The backwaters",
      "Mararikulam",
    ],
    highlights: [
      "Kathakali at Fort Kochi, with the make-up being put on beforehand, which is the part children watch",
      "A walk up through the tea at Kolukkumalai rather than a viewpoint",
      "Periyar: the spice garden, and the lake first thing",
      "Bicycles along the bunds at Alleppey, which are flat and have no traffic",
      "A night on the houseboat, and the crew who will show them how it is steered",
      "Mararikulam at the end — two days of beach and nothing scheduled",
    ],
    itinerary: [
      { day: "1 – 2", text: "Fort Kochi. The nets, the synagogue, the streets, and Kathakali on the second evening." },
      { day: "3 – 4", text: "Up to Munnar. One day for the drive and the estates, one for the walk at Kolukkumalai." },
      { day: "5 – 6", text: "Periyar. The spice garden, the lake at first light, and an easy trek for anyone who wants it." },
      { day: "7", text: "Down to Alleppey. Bicycles in the afternoon and a cooking lesson before dinner." },
      { day: "8", text: "Onto the boat, and a night on the water." },
      { day: "9", text: "Off at Mararikulam. The beach, and nothing else." },
      { day: "10", text: "The morning free, and out through Kochi." },
    ],
    image: `${P}/photo-1631347370339-16ffcfa30676`,
    imageAlt: "The beach at Alappuzha at sunset",
    credit: {
      photographer: "Ajin K S",
      url: "https://unsplash.com/photos/silhouette-of-man-standing-on-beach-during-sunset-OY06toBDDxg",
    },
  },
  {
    slug: "kerala-ayurveda",
    tier: "journey",
    title: "Ayurveda in Kerala",
    standfirst: "Fourteen days at Chowara, and about three hours of it each day is treatment.",
    collection: "wellness",
    region: "Kerala",
    duration: "14 days",
    days: 14,
    from: 0,
    summary:
      "A fortnight in a village on the coast south of Thiruvananthapuram, at one of two centres — one in the middle of village life with the beach a walk away, the other in bungalows above the sea. It opens with a consultation, and the treatment is built from that: massage, oils, steam, and internal medicine. Yoga if you want it.",
    route: ["Thiruvananthapuram", "Chowara", "The Arabian Sea"],
    highlights: [
      "A doctor's consultation first, and a programme built from it",
      "Around three hours of treatment a day for fourteen days",
      "Body, head and face massage, oil applications and steam",
      "Vegetarian food, cooked for the treatment",
      "Yoga available, and the sea a few minutes away",
      "Two centres — one in the village, one above the water",
    ],
    image: `${P}/photo-1663480450637-a635e10ac562`,
    credit: {
      photographer: "Jay Shah",
      url: "https://unsplash.com/photos/a-boat-on-the-water-o7S72bq6S1E",
    },
    imageAlt: "The Kerala coast near Chowara",
  },
  /* ——— Kerala, and one neighbour ——————————————————————————— */
  {
    slug: "kochi-to-chennai",
    tier: "journey",
    title: "Kochi to Chennai",
    standfirst:
      "Coast to coast across the bottom of India, in eleven days rather than three weeks.",
    collection: "south",
    region: "Kerala & Tamil Nadu",
    duration: "11 days",
    days: 11,
    from: 1,
    summary:
      "The short version of the traverse. Out of Kochi, up through the backwaters and the tea, over the Western Ghats at Munnar, and then east across Tamil Nadu — Madurai, Chettinad, Trichy, Thanjavur — to Pondicherry and the Coromandel coast. Eleven days is not long for that much ground, so the stops are chosen rather than collected.",
    route: [
      "Fort Kochi",
      "Alleppey",
      "Munnar",
      "Madurai",
      "Chettinad",
      "Trichy",
      "Thanjavur",
      "Pondicherry",
      "Mahabalipuram",
      "Chennai",
    ],
    highlights: [
      "A night on the backwaters before the road east begins",
      "The ghat crossing at Munnar, which is the moment the country changes",
      "The Meenakshi temple at Madurai in the evening",
      "Chettinad: the merchants' houses, and lunch in one of them",
      "Brihadeeswarar at Thanjavur, finished in 1010 and still standing square",
      "Pondicherry, then the Pallava carvings at Mahabalipuram on the way to the airport",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Kochi. Fort Kochi on foot, and the evening for Kathakali." },
      { day: "3", text: "Down to Alleppey and onto the water." },
      { day: "4 – 5", text: "Up to Munnar. The estates, and Eravikulam early on the second morning." },
      { day: "6", text: "Over the ghats into Tamil Nadu, and into Madurai for the evening ceremony." },
      { day: "7", text: "East through Chettinad to Trichy, and on to Thanjavur." },
      { day: "8", text: "The Chola temples, then up the coast to Pondicherry." },
      { day: "9", text: "Pondicherry: the French quarter in the morning, Auroville after." },
      { day: "10", text: "Mahabalipuram — the shore temple, the rathas, and the stone carvers still working." },
      { day: "11", text: "Up to Chennai and out." },
    ],
    image: `${P}/photo-1642516861335-97971622499e`,
    imageAlt: "The Brihadeeswarar temple at Thanjavur",
    credit: {
      photographer: "Avin CP",
      url: "https://unsplash.com/photos/a-very-large-building-with-a-very-tall-tower-dGu_b4S7DXM",
    },
  },
  {
    slug: "tamil-nadu-and-kerala",
    tier: "journey",
    title: "Tamil Nadu and Kerala",
    standfirst:
      "Fifteen days from the Coromandel coast to the Malabar one. A journey we have run.",
    collection: "south",
    region: "Tamil Nadu & Kerala",
    duration: "15 days",
    days: 15,
    from: 1,
    summary:
      "This is not a brochure route. It is one we built for a group and ran end to end, and the shape of it is the shape it actually took: four nights on the Coromandel coast before moving at all, the Chola country in the middle, three nights at Kumily because the plantations there reward them, and Kovalam at the end so that the last day is not a drive to an airport. The temple visits are timed to the ceremonies rather than to the opening hours.",
    route: [
      "Chennai",
      "Mamallapuram",
      "Trichy",
      "Srirangam",
      "Madurai",
      "Kumily",
      "Kochi",
      "The backwaters",
      "Kovalam",
      "Kanyakumari",
    ],
    highlights: [
      "Four nights at Mamallapuram, including a day in Chennai by rickshaw",
      "Srirangam, the largest working temple complex in India, and Rock Fort above Trichy",
      "The evening ceremony at the Meenakshi temple, which is the one worth staying for",
      "Chacko's spice plantation at Kumily — three nights there, not one",
      "A night on a houseboat in the backwaters",
      "Kanyakumari where the three seas meet, and Padmanabhapuram palace on the way",
    ],
    itinerary: [
      { day: "1", text: "Late into Chennai, and straight down to Mamallapuram." },
      { day: "2", text: "The morning free. The carvings in the afternoon, with a guide." },
      { day: "3", text: "Into Chennai for the day, by rickshaw, and back down the coast by evening." },
      { day: "4", text: "Mamallapuram again in the morning; the afternoon left alone." },
      { day: "5", text: "West to Trichy. Rock Fort in the afternoon." },
      { day: "6", text: "Srirangam early, then on to Madurai. The flower market and the Gandhi museum." },
      { day: "7", text: "The Meenakshi temple in the morning, and again for the night ceremony." },
      { day: "8", text: "Over the ghats to Kumily. A nature walk in the afternoon." },
      { day: "9", text: "The spice plantations with Chacko." },
      { day: "10", text: "The morning free; the last boat on the lake in the afternoon." },
      { day: "11", text: "Down to Kochi. Kathakali in the evening." },
      { day: "12", text: "Fort Kochi in the morning, the afternoon free." },
      { day: "13", text: "Onto the houseboat, and a night in the backwaters." },
      { day: "14", text: "Off the boat and down to Kovalam." },
      { day: "15", text: "The day at leisure, and out of Trivandrum around midnight." },
    ],
    image: `${P}/photo-1676465997765-4e37e9da8cde`,
    imageAlt: "The temples at Mahabalipuram",
    credit: {
      photographer: "DICSON",
      url: "https://unsplash.com/photos/a-group-of-people-standing-in-front-of-a-tall-building-j2X9B8NSVWU",
    },
  },
  {
    slug: "karnataka-and-kerala",
    tier: "journey",
    title: "Karnataka and Kerala",
    standfirst:
      "Mysore, a tiger reserve, the Malabar coast and the backwaters. Also one of ours.",
    collection: "south",
    region: "Karnataka & Kerala",
    duration: "14 days",
    days: 14,
    from: 1,
    summary:
      "Another journey we have actually run, north to south. It starts in Bangalore and comes down through Mysore into Bandipur for two safaris, then crosses into Kerala at Kannur — which is Theyyam country and almost never on an itinerary — and takes the train south to Kochi. After that it is the route we know best: Kumily, the backwaters, and the coast at Kovalam.",
    route: [
      "Bangalore",
      "Mysore",
      "Bandipur",
      "Kannur",
      "Kochi",
      "Kumily",
      "Alleppey",
      "Kovalam",
      "Kanyakumari",
    ],
    highlights: [
      "Mysore with a guide — the palace, and the market, which is the better half",
      "Two safaris at Bandipur, an evening one and a morning one",
      "Kannur, for the north Malabar coast and the weaving around it",
      "The train down to Kochi, which is how people here actually travel",
      "Chacko's spice plantations at Kumily, and the Green Walk in the park",
      "A night on a houseboat, then Kanyakumari and Padmanabhapuram at the end",
    ],
    itinerary: [
      { day: "1", text: "Into Bangalore, and a night near the airport." },
      { day: "2", text: "Down to Mysore in the afternoon. The evening free." },
      { day: "3", text: "Mysore properly, with a guide." },
      { day: "4", text: "South to Bandipur, and the afternoon safari." },
      { day: "5", text: "The morning safari, then over into Kerala and down to Kannur." },
      { day: "6", text: "Kannur, with a guide." },
      { day: "7", text: "The early train to Kochi. Fort Kochi in the afternoon." },
      { day: "8", text: "The morning free; a guided walk and Kathakali after." },
      { day: "9", text: "Up to Kumily. The last boat on the lake in the afternoon." },
      { day: "10", text: "The spice plantations with Chacko, and the Green Walk in the park." },
      { day: "11", text: "Down to Alleppey, onto the houseboat, and into the backwaters." },
      { day: "12", text: "Off the boat in the morning and south to Kovalam." },
      { day: "13", text: "Kanyakumari for the day, with Padmanabhapuram palace on the way." },
      { day: "14", text: "The day at leisure, and out of Trivandrum in the evening." },
    ],
    image: `${P}/photo-1659126574791-13313aa424bd`,
    imageAlt: "Mysore Palace lit at night",
    credit: {
      photographer: "Mahendra Maddirala",
      url: "https://unsplash.com/photos/mysore-palace-illuminated-at-night-x3y2phkf7fI",
    },
  },
  /* ——— Tamil Nadu ————————————————————————————————————————— */
  {
    slug: "tamil-nadu-end-to-end",
    tier: "journey",
    title: "Tamil Nadu, end to end",
    standfirst:
      "The Pallavas, the Cholas, the Chettiars and the French, in one line down the coast.",
    collection: "tamil",
    region: "Tamil Nadu",
    duration: "14 days",
    days: 14,
    from: 2,
    summary:
      "Tamil Nadu on its own, which almost nobody does — it usually gets a week on the way to Kerala. Fourteen days is enough to take the dynasties in order: the Pallava shore at Mamallapuram and Kanchipuram, the Nayak city at Madurai, the Chettiar villages, and then the Chola river towns, where the eleventh century is still the best thing anyone built. Pondicherry at the end, because after all that stone a French grid and a sea wall are a relief.",
    route: [
      "Chennai",
      "Mamallapuram",
      "Kanchipuram",
      "Athoor",
      "Madurai",
      "Chettinad",
      "Thanjavur",
      "Tranquebar",
      "Chidambaram",
      "Pondicherry",
      "Auroville",
    ],
    highlights: [
      "Mamallapuram: the shore temple, the five rathas, and the carvers still at work",
      "Kanchipuram, and silk being woven where it has been woven for a thousand years",
      "The flower market at Dindigul, at the hour it is worth being at",
      "Chettinad — the mansions at Kanadukathan, and the tiles at Athangudi",
      "Brihadeeswarar at Thanjavur, Darasuram and Gangaikondacholapuram",
      "Tranquebar, a Danish fort on a Tamil beach, and Pondicherry after it",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Chennai, and down to Mamallapuram. The bas-reliefs and the shore temple." },
      { day: "3", text: "Kanchipuram for the day — the temples, and the silk." },
      { day: "4", text: "By train to Dindigul, and out to a house by the lake at Athoor." },
      { day: "5", text: "The villages, temples and plantations around the lake." },
      { day: "6", text: "The flower market, then Madurai. The Nayak palace, and the Meenakshi temple in the evening." },
      { day: "7", text: "East into Chettinad. Thirumayam fort on the way." },
      { day: "8", text: "The mansions at Kanadukathan, and the tile works." },
      { day: "9", text: "North to Thanjavur, and the great temple." },
      { day: "10", text: "Darasuram and Gangaikondacholapuram, then out to Tranquebar on the coast." },
      { day: "11", text: "Chidambaram in the morning, and on to Pondicherry." },
      { day: "12", text: "The ashram, the French quarter, and Auroville." },
      { day: "13 – 14", text: "Back up the coast to Chennai, and out." },
    ],
    image: `${P}/photo-1597073642928-48c0971f7ded`,
    imageAlt: "The seafront at Pondicherry",
    credit: {
      photographer: "maniraj",
      url: "https://unsplash.com/photos/aerial-view-of-city-buildings-near-body-of-water-during-daytime-mJ9jvm9OkYA",
    },
  },
  {
    slug: "temple-country",
    tier: "journey",
    title: "The temple country",
    standfirst:
      "Tirupati to Rameswaram, along the pilgrim route rather than the tourist one.",
    collection: "tamil",
    region: "Tamil Nadu & Andhra Pradesh",
    duration: "12 days",
    days: 12,
    from: 2,
    summary:
      "The same temples everyone photographs, seen the way the people queueing for them see them. It follows the pilgrimage line — Tirupati, which takes more offerings than anywhere else on earth; Kanchipuram; Madurai; Kanyakumari at the tip; and Rameswaram, out on its island, where the corridor runs for more than a thousand feet. It is a demanding fortnight and a completely different India from the one in the brochures.",
    route: [
      "Chennai",
      "Tirupati",
      "Vellore",
      "Kanchipuram",
      "Madurai",
      "Kanyakumari",
      "Rameswaram",
      "Chettinad",
      "Trichy",
      "Pondicherry",
      "Mamallapuram",
    ],
    highlights: [
      "Tirupati, and the scale of what arrives there every single day",
      "The golden temple at Vellore, and Kanchipuram's thousand years of building",
      "Madurai, twice — once in daylight and once for the night ceremony",
      "Kanyakumari, where the Bay of Bengal, the Arabian Sea and the Indian Ocean meet",
      "Ramanathaswamy at Rameswaram, and the corridor that is the longest of its kind",
      "Srirangam at Trichy, which is a temple with a town inside it",
    ],
    itinerary: [
      { day: "1", text: "Into Chennai and straight up to Tirupati." },
      { day: "2", text: "Tirupati, early, which is the only sensible hour for it." },
      { day: "3", text: "Down to Vellore, and the golden temple." },
      { day: "4", text: "Kanchipuram on the way south, then the long run to Madurai." },
      { day: "5", text: "Madurai. The temple in the morning and again at night." },
      { day: "6", text: "South to Kanyakumari, for the point and the sunset off it." },
      { day: "7", text: "Across to Rameswaram." },
      { day: "8", text: "Rameswaram: the temple, the corridor, and Dhanushkodi at the end of the island." },
      { day: "9", text: "North through Chettinad to Trichy." },
      { day: "10", text: "Srirangam and Rock Fort, then up the coast to Pondicherry." },
      { day: "11", text: "Pondicherry in the morning, Mamallapuram in the afternoon, Chennai by evening." },
      { day: "12", text: "Out of Chennai." },
    ],
    image: `${P}/photo-1692173248120-59547c3d4653`,
    imageAlt: "A gopuram at the Meenakshi temple, Madurai",
    credit: {
      photographer: "Priya Singh",
      url: "https://unsplash.com/photos/a-tall-tower-with-a-statue-on-top-of-it-euPcmfnuOe8",
    },
  },
  /* ——— Karnataka, the Nilgiris and Goa ————————————————————— */
  {
    slug: "misty-south-india",
    tier: "journey",
    title: "The hill stations",
    standfirst:
      "Munnar, the Nilgiris, Mudumalai and Coorg — fourteen days above the heat.",
    collection: "deccan",
    region: "Kerala, Tamil Nadu & Karnataka",
    duration: "14 days",
    days: 14,
    from: 3,
    summary:
      "A journey that stays high. It runs along the Western Ghats rather than across them: Munnar, then over to Pollachi and up to Coonoor in the Nilgiris, down into the Mudumalai and Bandipur forests, and north into the Kodagu coffee country before dropping to Mysore. Three states, one mountain range, and the temperature rarely above the mid-twenties.",
    route: [
      "Kochi",
      "Munnar",
      "Pollachi",
      "Coonoor",
      "Mudumalai",
      "Madikeri",
      "Bylakuppe",
      "Mysore",
    ],
    highlights: [
      "Munnar and the Kannan Devan estates to begin with",
      "Pollachi, and the Anamalai hills behind it",
      "Coonoor, the Nilgiri tea, and the mountain railway if the timing allows",
      "Three nights in the Mudumalai forest, which is the point of going",
      "Kodagu: coffee under shade trees, with pepper running up them",
      "Namdroling at Bylakuppe, and Mysore at the end",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Kochi, and a day in the old town before going up." },
      { day: "3 – 4", text: "Munnar. The estates, and Eravikulam on the second morning." },
      { day: "5", text: "East to Pollachi, below the Anamalais." },
      { day: "6", text: "Up into the Nilgiris to Coonoor." },
      { day: "7 – 9", text: "Down to Mudumalai. Three nights on the forest edge, with drives at both ends of the day." },
      { day: "10 – 11", text: "North into Kodagu. A coffee estate, and the country around Madikeri." },
      { day: "12", text: "Bylakuppe and Namdroling on the way to Mysore." },
      { day: "13", text: "Mysore — the palace, and the market." },
      { day: "14", text: "Up to Bangalore and out." },
    ],
    image: `${P}/photo-1620498530575-16b80aa7aa36`,
    imageAlt: "Tea gardens at Coonoor in the Nilgiris",
    credit: {
      photographer: "Gaurav Gupta",
      url: "https://unsplash.com/photos/green-grass-field-under-blue-sky-during-daytime-VCttzf7En8M",
    },
  },
  {
    slug: "karnataka-dynasties",
    tier: "journey",
    title: "The dynasties of Karnataka",
    standfirst:
      "Hoysala, Vijayanagara, Chalukya, Adil Shahi — six hundred years of building, in order.",
    collection: "deccan",
    region: "Karnataka & Telangana",
    duration: "14 days",
    days: 14,
    from: 3,
    summary:
      "Karnataka has the densest run of great architecture in India and almost none of the crowds that go with it. This takes the dynasties chronologically: the Chalukyan experiments at Aihole and Badami, where south Indian temple form was worked out; the Hoysala carving at Belur and Halebid, which is the most detailed stonework anywhere in the country; Hampi, capital of Vijayanagara and still the most extraordinary ruin in India; then Bijapur, Bidar and Hyderabad for what the Deccan sultanates built after.",
    route: [
      "Bangalore",
      "Mysore",
      "Somnathpur",
      "Shravanabelagola",
      "Belur",
      "Halebid",
      "Hampi",
      "Pattadakal",
      "Badami",
      "Aihole",
      "Bijapur",
      "Bidar",
      "Hyderabad",
    ],
    highlights: [
      "Somnathpur, the most complete Hoysala temple there is",
      "The seventeen-metre Bahubali at Shravanabelagola, carved in the tenth century from one rock",
      "Belur and Halebid, where the stone was worked like ivory",
      "Two full days at Hampi, which is not enough but is what most people have",
      "Aihole and Pattadakal, where the southern temple was being invented",
      "Golgumbaz at Bijapur, then bidri work at Bidar and Charminar at the end",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Bangalore, and on to Mysore by way of Srirangapatna." },
      { day: "3", text: "Mysore: the market and the palace, then Somnathpur in the afternoon." },
      { day: "4", text: "North to Hassan, with Shravanabelagola on the way." },
      { day: "5", text: "Belur and Halebid, both in one day, which is the right way to compare them." },
      { day: "6", text: "The long drive to Hampi." },
      { day: "7", text: "Hampi, all day: the bazaar, Vittala, the Tungabhadra, the hills above it." },
      { day: "8 – 9", text: "Pattadakal and Badami — the cave temples, and the tank below them." },
      { day: "10", text: "Aihole in the morning; Bijapur, Golgumbaz and the Jama Masjid after." },
      { day: "11", text: "Bidar: the fort, and the bidri workshops in the town." },
      { day: "12 – 13", text: "Into Telangana. Hyderabad, Charminar, and the Mecca Masjid." },
      { day: "14", text: "Out of Hyderabad." },
    ],
    image: `${P}/photo-1722934804353-0d9f6a55ab5e`,
    imageAlt: "The stone chariot at Vittala, Hampi",
    credit: {
      photographer: "Aravind Shivkumar",
      url: "https://unsplash.com/photos/a-group-of-stone-structures-sitting-on-top-of-a-dirt-field-jDMCUnvD5lY",
    },
  },
  {
    slug: "bombay-to-goa",
    tier: "journey",
    title: "Bombay to Goa, down the coast",
    standfirst:
      "The Konkan road, which is the part of the drive everybody skips.",
    collection: "deccan",
    region: "Maharashtra & Goa",
    duration: "10 days",
    days: 10,
    from: 6,
    summary:
      "Everybody flies Bombay to Goa in an hour. The coast in between is a week: fishing villages, a sea fort at Murud that has never been taken, the hill station at Mahabaleshwar where Bombay went to escape itself, and the temple beach at Ganpatipule. Goa at the end gets three days, which is enough for Old Goa and Panjim without pretending it is a beach holiday.",
    route: [
      "Mumbai",
      "Murud",
      "Mahabaleshwar",
      "Pratapgarh",
      "Chiplun",
      "Ganpatipule",
      "Panjim",
      "Old Goa",
    ],
    highlights: [
      "Bombay properly: Victoria Terminus, the Gateway, Crawford market, and the dhobi ghat",
      "Murud-Janjira, a fort in the sea that was never taken by anyone",
      "Mahabaleshwar at fourteen hundred metres, and Pratapgarh below it",
      "Ganpatipule, where the temple is on the beach rather than above it",
      "Old Goa: Bom Jesus, the cathedral, and St Francis",
      "Fontainhas at Panjim, which is the last Portuguese quarter left standing",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Bombay." },
      { day: "3", text: "The city on foot and by train. Elephanta for anyone who wants it." },
      { day: "4", text: "South down the coast to Murud, and the fort in the bay." },
      { day: "5", text: "Inland and up to Mahabaleshwar." },
      { day: "6", text: "Pratapgarh in the morning, then down to Chiplun." },
      { day: "7", text: "Back to the coast at Ganpatipule." },
      { day: "8", text: "On into Goa." },
      { day: "9", text: "Panjim and Old Goa — the churches, and Fontainhas after." },
      { day: "10", text: "Out of Goa." },
    ],
    image: `${P}/photo-1567005753256-c0529035b300`,
    imageAlt: "A Portuguese church in Goa",
    credit: {
      photographer: "Anantha Krishna A",
      url: "https://unsplash.com/photos/white-and-brown-concrete-building-y6NZHThhLj4",
    },
  },
  /* ——— The whole south at once ————————————————————————————— */
  {
    slug: "everlasting-south-india",
    tier: "journey",
    title: "A month in the south",
    standfirst:
      "Thirty days, Chennai to Goa, and the only version that leaves nothing out.",
    collection: "south",
    region: "Tamil Nadu, Kerala, Karnataka & Goa",
    duration: "30 days",
    days: 30,
    from: 4,
    summary:
      "The longest thing we run. It crosses the peninsula twice: down the Coromandel coast through the Chola country to Madurai, over the ghats into Kerala for the tea, the backwaters and two weeks' worth of coast, then north through Mysore and Coorg to Hampi and Badami, and out at Goa. A month sounds excessive until you see how much of it is spent standing still — most stops here are two or three nights.",
    route: [
      "Chennai",
      "Mahabalipuram",
      "Pondicherry",
      "Thanjavur",
      "Chettinad",
      "Madurai",
      "Munnar",
      "Mararikulam",
      "Alleppey",
      "Fort Kochi",
      "Mysore",
      "Madikeri",
      "Hassan",
      "Hampi",
      "Badami",
      "Panjim",
    ],
    highlights: [
      "The Pallava and Chola coast, taken slowly rather than in three days",
      "Chettinad and Madurai before the crossing into Kerala",
      "The backwaters, a beach at Mararikulam, and Fort Kochi with time in it",
      "Mysore, the Hoysala temples, and the Kodagu coffee",
      "Two days at Hampi and two at Badami",
      "Chorla Ghat on the way down to Goa, which is the best road in the south",
    ],
    itinerary: [
      { day: "1 – 3", text: "Chennai, then Mahabalipuram for two nights." },
      { day: "4 – 5", text: "Pondicherry: the French town, and Auroville." },
      { day: "6 – 7", text: "Thanjavur and the Chola temples; on into Chettinad." },
      { day: "8", text: "Chettinad to Madurai." },
      { day: "9 – 10", text: "Over the ghats to Munnar, and two nights in the tea." },
      { day: "11 – 12", text: "Down to Mararikulam. Two days on the coast." },
      { day: "13 – 14", text: "Alleppey and the backwaters, then Fort Kochi." },
      { day: "15 – 17", text: "North to Mysore. The palace, the market, Somnathpur." },
      { day: "18 – 19", text: "Kodagu, and a coffee estate at Madikeri." },
      { day: "20 – 21", text: "Hassan, Belur and Halebid." },
      { day: "22 – 23", text: "Hampi, and a full day in it." },
      { day: "24 – 25", text: "Badami, Pattadakal and Aihole." },
      { day: "26 – 27", text: "Chorla Ghat, on the Karnataka–Goa border." },
      { day: "28 – 29", text: "Down into Goa. Panjim, Old Goa, and the coast." },
      { day: "30", text: "Out of Goa." },
    ],
    image: `${P}/photo-1691075213372-ff9e2d6d7645`,
    imageAlt: "A Kathakali performer in costume",
    credit: {
      photographer: "Anantha Krishnan",
      url: "https://unsplash.com/photos/a-man-dressed-in-a-colorful-costume-standing-next-to-other-men-zMfvtg7jfuc",
    },
  },
  /* ——— Rajasthan and the north ————————————————————————————— */
  {
    slug: "essential-rajasthan",
    tier: "journey",
    title: "Rajasthan, the short version",
    standfirst:
      "Nine days, four cities, and the Taj Mahal. For people who do not have three weeks.",
    collection: "north",
    region: "Rajasthan, Uttar Pradesh & Delhi",
    duration: "9 days",
    days: 9,
    from: 8,
    summary:
      "Rajasthan condensed to the four cities that are worth it if you only have one go at them: Udaipur on its lake, Jodhpur under Mehrangarh, Jaipur, and Agra for the Taj at sunrise. Internal flights at either end so the days are spent in the places rather than on the road between them. It is a first trip to India, done properly rather than done fast.",
    route: [
      "Delhi",
      "Udaipur",
      "Ranakpur",
      "Jodhpur",
      "Pushkar",
      "Jaipur",
      "Amber",
      "Fatehpur Sikri",
      "Agra",
    ],
    highlights: [
      "Old Delhi and the Qutub Minar on the first day, before flying south",
      "Lake Pichola at sunset, from a boat rather than a terrace",
      "The Jain temples at Ranakpur — 1,444 pillars, no two carved the same",
      "Mehrangarh at Jodhpur, and the blue town under it",
      "Amber, the City Palace and Jantar Mantar at Jaipur",
      "Fatehpur Sikri, then the Taj Mahal at first light",
    ],
    itinerary: [
      { day: "1", text: "Into Delhi." },
      { day: "2", text: "Delhi: Jama Masjid, the Red Fort, Humayun's tomb, Qutub Minar. The evening flight to Udaipur." },
      { day: "3", text: "Udaipur. The City Palace, Jagdish temple, the gardens, and the lake at sunset." },
      { day: "4", text: "North through Ranakpur to Jodhpur." },
      { day: "5", text: "Mehrangarh in the morning, the clock-tower bazaar after, and on towards Jaipur by way of Pushkar." },
      { day: "6", text: "Jaipur: Amber, the City Palace, Jantar Mantar, the Hawa Mahal." },
      { day: "7", text: "East to Agra, with Fatehpur Sikri on the way." },
      { day: "8", text: "The Taj at sunrise, then back to Delhi." },
      { day: "9", text: "Out of Delhi." },
    ],
    image: `${P}/photo-1615836245337-f5b9b2303f10`,
    imageAlt: "A boat on Lake Pichola at Udaipur",
    credit: {
      photographer: "Jainam Mehta",
      url: "https://unsplash.com/photos/red-and-white-boat-on-body-of-water-near-beige-concrete-building-during-daytime-AVFjDGbqiqE",
    },
  },
  {
    slug: "havelis-and-palaces",
    tier: "journey",
    title: "Havelis and palaces",
    standfirst:
      "Rajasthan through the houses rather than the forts — and the country between them.",
    collection: "north",
    region: "Rajasthan & Uttar Pradesh",
    duration: "15 days",
    days: 15,
    from: 8,
    summary:
      "The long loop, and the one that goes where the coaches do not. Bundi and Bijaipur instead of only Jaipur and Udaipur; Jojawar, where the local train runs through the Aravallis and the Raika herders still bring their camels down; Nagaur and Bikaner on the desert edge; and Shekhawati at the end, where the merchant families painted the outside of their houses and then left them.",
    route: [
      "Delhi",
      "Agra",
      "Jaipur",
      "Bundi",
      "Bijaipur",
      "Chittorgarh",
      "Udaipur",
      "Ranakpur",
      "Jojawar",
      "Jodhpur",
      "Nagaur",
      "Bikaner",
      "Shekhawati",
    ],
    highlights: [
      "The Taj at sunrise, and Fatehpur Sikri on the way to Jaipur",
      "Bundi's palace, which Kipling wrote about and almost nobody visits",
      "Chittorgarh, the largest fort in India, and the road down to Udaipur",
      "The Aravalli train from Jojawar, and a morning with Raika herders",
      "Nagaur and Bikaner on the way into the desert",
      "The painted havelis of Shekhawati, most of them still shut and unrestored",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Delhi, and a day in it." },
      { day: "3 – 4", text: "Agra: the fort, and the Taj. On to Jaipur by way of Fatehpur Sikri." },
      { day: "5", text: "Jaipur — Amber, the City Palace, Jantar Mantar, the Hawa Mahal." },
      { day: "6", text: "South to Bundi and the palace on the hill." },
      { day: "7", text: "The Bijolia temples and the Menal gorge, then a night at Bijaipur." },
      { day: "8", text: "Chittorgarh in the morning, Udaipur by evening." },
      { day: "9", text: "Udaipur, at its own pace." },
      { day: "10", text: "Ranakpur, then Jojawar, and out to a Raika village." },
      { day: "11", text: "The rural train through the Aravallis, then Jodhpur and Mehrangarh." },
      { day: "12", text: "Nagaur fort, and on to Bikaner." },
      { day: "13", text: "Into Shekhawati, and the painted houses." },
      { day: "14 – 15", text: "Back to Delhi, and out." },
    ],
    image: `${P}/photo-1669548329838-45008f9a45fc`,
    imageAlt: "Mehrangarh above the blue town at Jodhpur",
    credit: {
      photographer: "Vishal Gehlot",
      url: "https://unsplash.com/photos/a-city-with-a-large-rock-cliff-U2Ji6d9CEGM",
    },
  },
  {
    slug: "holi-in-rajasthan",
    tier: "journey",
    title: "Holi, in Rajasthan",
    standfirst:
      "Ten days built around one afternoon — the colours, thrown with a family rather than at a party.",
    collection: "north",
    region: "Rajasthan & Uttar Pradesh",
    duration: "10 days",
    days: 10,
    from: 8,
    summary:
      "There is one date this runs on and it moves with the moon, usually in March. The rest of the journey is arranged around it: Shekhawati and its painted houses first, then Pushkar, Jaipur, and Holi itself spent at an Indian family's house rather than at a hotel event. Afterwards it is Kalakho, the stepwell at Abhaneri, and Agra. Book it early; the towns fill.",
    route: [
      "Delhi",
      "Alsisar",
      "Pushkar",
      "Jaipur",
      "Kalakho",
      "Abhaneri",
      "Agra",
    ],
    highlights: [
      "Alsisar in Shekhawati, and the frescoed havelis around it",
      "The village school, and the welcome the first evening",
      "Pushkar and its lake, which is a pilgrimage town rather than a sight",
      "Holi with a family — the colours, the food after, and none of the staging",
      "Chand Baori at Abhaneri, thirteen storeys of steps going down",
      "The Taj Mahal and the Red Fort at Agra at the end",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Delhi, and out to Alsisar in Shekhawati the same day." },
      { day: "3", text: "The village, the school, and the painted houses." },
      { day: "4", text: "South to Pushkar, and the temples around the lake." },
      { day: "5", text: "On to Jaipur. Amber, the Hawa Mahal, the City Palace, Jantar Mantar." },
      { day: "6", text: "Holi, with an Indian family, for as long as it lasts." },
      { day: "7", text: "Out to Kalakho — the village, the temple, and a cooking lesson." },
      { day: "8", text: "Chand Baori at Abhaneri, then Agra. The Taj and the Red Fort." },
      { day: "9", text: "Back to Delhi, and the old city in the afternoon." },
      { day: "10", text: "Out of Delhi." },
    ],
    image: `${P}/photo-1764959485498-ea69e96c9b75`,
    imageAlt: "Bowls of coloured powder for Holi",
    credit: {
      photographer: "Kamakshi Subramani",
      url: "https://unsplash.com/photos/three-bowls-of-colorful-powders-on-vibrant-background-oTXn3qq1ycw",
    },
  },
  {
    slug: "taj-mahal-and-the-andamans",
    tier: "journey",
    title: "The Taj Mahal, and the Andamans",
    standfirst:
      "A week of Mughal north India, then a thousand kilometres out into the Bay of Bengal.",
    collection: "north",
    region: "Delhi, Rajasthan & the Andaman Islands",
    duration: "13 days",
    days: 13,
    from: 8,
    summary:
      "An odd pairing that works better than it sounds. Delhi, Jaipur and Agra first, on bicycles where the traffic allows it — which is more of Jaipur and Agra than you would think. Then a flight to Port Blair and across to Havelock, which has the best beach in India and a reef off it, and where nothing at all is expected of you for three days. The cellular jail on the way back is the part nobody forgets.",
    route: [
      "Delhi",
      "Jaipur",
      "Fatehpur Sikri",
      "Agra",
      "Port Blair",
      "Havelock Island",
    ],
    highlights: [
      "Old Delhi by rickshaw, and the Qutub Minar",
      "Jaipur by bicycle, which is the only pleasant way to do Amber and the old city",
      "Fatehpur Sikri, abandoned in 1610 and barely touched since",
      "The Taj at sunrise, and the old city of Agra by bicycle after",
      "Radhanagar beach on Havelock, and the reef off it",
      "The cellular jail at Port Blair on the way home",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Delhi, and the city — Old Delhi, the Red Fort, Jama Masjid, Qutub Minar." },
      { day: "3", text: "To Jaipur. Sisodia Rani and the Galta temples in the afternoon." },
      { day: "4", text: "Jaipur by bicycle: the Hawa Mahal, Amber, the City Palace. A cooking class after." },
      { day: "5", text: "Agra, by way of Fatehpur Sikri." },
      { day: "6", text: "The Taj at sunrise. Agra fort, Itmad-ud-Daulah and Mehtab Bagh after." },
      { day: "7", text: "The old city by bicycle, then back to Delhi." },
      { day: "8", text: "Fly to Port Blair, and the ferry across to Havelock." },
      { day: "9 – 10", text: "Havelock. Radhanagar, the reef, and bicycles for the rest of it." },
      { day: "11", text: "Back to Port Blair. The cellular jail, and the anthropological museum." },
      { day: "12 – 13", text: "Port Blair to Delhi, and out." },
    ],
    image: `${P}/photo-1586053226626-febc8817962f`,
    imageAlt: "A boat on a beach in the Andaman Islands",
    credit: {
      photographer: "tatonomusic",
      url: "https://unsplash.com/photos/brown-boat-on-beach-during-daytime-1X3YSIuqYeM",
    },
  },
  {
    slug: "north-to-south",
    tier: "journey",
    title: "North to south, the whole way down",
    standfirst:
      "Delhi to the backwaters in three weeks. The first trip, for people who want all of it.",
    collection: "north",
    region: "Delhi, Rajasthan, Tamil Nadu & Kerala",
    duration: "22 days",
    days: 22,
    from: 8,
    summary:
      "India top to bottom, which is a thing people ask for and which is genuinely worth doing once. The Mughal north and Rajasthan for the first nine days — Delhi, Agra, Jaipur, Jodhpur, Udaipur — then a flight south and a complete change of country: Pondicherry, the Chola temples, Madurai, the tea at Munnar, and the backwaters at the end. Two Indias, and the flight in the middle is the point.",
    route: [
      "Delhi",
      "Agra",
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Pondicherry",
      "Kumbakonam",
      "Madurai",
      "Munnar",
      "Fort Kochi",
      "Alleppey",
      "Mararikulam",
    ],
    highlights: [
      "Delhi, Agra and the Taj in the first four days",
      "Jaipur, Jodhpur and Udaipur — enough Rajasthan to understand it",
      "The flight south, and how completely different the country is at the other end",
      "The Chola temples around Kumbakonam, which are the best of the south",
      "Madurai, and the crossing into Kerala over the ghats at Munnar",
      "Fort Kochi, a night on the backwaters, and the beach at Mararikulam",
    ],
    itinerary: [
      { day: "1 – 2", text: "Into Delhi, and a day in it." },
      { day: "3", text: "To Agra, and the Taj." },
      { day: "4 – 5", text: "Jaipur — Amber, the City Palace, the old city." },
      { day: "6 – 7", text: "Jodhpur and Mehrangarh." },
      { day: "8 – 9", text: "Udaipur and the lake." },
      { day: "10 – 11", text: "South by air, and on to Pondicherry." },
      { day: "12", text: "Kumbakonam, and the Chola temples around it." },
      { day: "13 – 14", text: "Madurai. The Meenakshi temple, twice." },
      { day: "15 – 16", text: "Over the ghats to Munnar, and two nights in the tea." },
      { day: "17 – 19", text: "Down to Fort Kochi, then Alleppey and a night on the water." },
      { day: "20 – 21", text: "Mararikulam. The coast, and nothing asked of you." },
      { day: "22", text: "Out through Kochi." },
    ],
    image: `${P}/photo-1587135941948-670b381f08ce`,
    imageAlt: "The Taj Mahal at Agra in the last of the light",
    credit: {
      photographer: "Rowan Heuvel",
      url: "https://unsplash.com/photos/taj-mahal-in-agra-at-sunset-sAB4BWrQ4Y4",
    },
  },
];

/*
  Sorted outward from Kerala.

  We are a Kerala company. Someone in Kochi or Kollam looking at this page
  should find the things they can reach this weekend at the top of it, and
  someone flying in for three weeks loses nothing by scrolling. Sort is
  stable, so journeys the same distance out keep the order they were
  written in above.
*/
export const packages: TourPackage[] = [...catalogue].sort(
  (a, b) => a.from - b.from
);
