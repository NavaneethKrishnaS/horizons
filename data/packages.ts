/*
  The tour catalogue.

  These are the journeys we run on the ground for our partner agencies in
  Switzerland — Sakadoh in Lausanne and Martin Vernier's art-and-history
  tours. The routes are ours; what is written here is the itinerary, not
  anyone's scheduled departure. There are no dates and no prices: each one
  is built around the people travelling, and quoted when they ask.
*/

export type Collection =
  | "himalaya"
  | "north"
  | "sacred"
  | "south"
  | "kerala"
  | "craft"
  | "wellness";

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

export const collections: CollectionMeta[] = [
  {
    id: "himalaya",
    label: "The Himalaya",
    blurb:
      "Ladakh, Zanskar, Sikkim. High, dry, Buddhist country on the old routes between India and Tibet.",
  },
  {
    id: "sacred",
    label: "Sacred India",
    blurb:
      "The Ganges, the Buddha's own ground, and the rock-cut temples of the Deccan.",
  },
  {
    id: "north",
    label: "Rajasthan",
    blurb: "Desert cities, the forts of the Rajputs, and the road to the Thar.",
  },
  {
    id: "south",
    label: "The South",
    blurb:
      "The Dravidian temple country, the Malabar coast, and the line of rail that runs beside it.",
  },
  {
    id: "craft",
    label: "Craft & Cloth",
    blurb: "Journeys built around the people who still make things by hand.",
  },
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
const WORDS = [
  "no", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "twenty-one",
  "twenty-two", "twenty-three", "twenty-four", "twenty-five", "twenty-six",
  "twenty-seven", "twenty-eight", "twenty-nine", "thirty",
];

export function spelled(count: number) {
  return WORDS[count] ?? String(count);
}

export const packages: TourPackage[] = [
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
  {
    slug: "kerala-ayurveda",
    tier: "journey",
    title: "Ayurveda in Kerala",
    standfirst: "Fourteen days at Chowara, and about three hours of it each day is treatment.",
    collection: "wellness",
    region: "Kerala",
    duration: "14 days",
    days: 14,
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
    collection: "south",
    region: "Karnataka",
    duration: "4 days, 3 nights",
    days: 4,
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
];
