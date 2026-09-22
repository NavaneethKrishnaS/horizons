/*
  The stays.

  Properties we can put people into, across India. The shortlist came from
  i-escape's India collection — which is the best-judged list of small
  Indian hotels anywhere, and worth saying so — but nothing here is their
  writing. Names, regions, room counts, what is on site and how far the
  airport is are facts. Everything written below is ours.

  Photography. A hotel's photograph is the product, so a generic shot of
  some other backwater sitting under a named property would mislead the
  person deciding whether to book it. Until a property sends its own, its
  card is set in type instead — which reads as a decision rather than as
  a missing image, and leaves the gap visible so it gets filled. Add the
  `image` field and the card becomes a photograph.
*/

export type Collection =
  | "backwaters"
  | "kochi"
  | "coast"
  | "hills"
  | "konkan"
  | "cities"
  | "rajasthan"
  | "north";

export interface CollectionMeta {
  id: Collection;
  label: string;
  /*
    The label reads as a heading; this one reads inside a sentence. "Also
    in Further north, and out to sea" is a heading dropped into prose and
    sounds like it.
  */
  short: string;
  blurb: string;
}

/*
  Outward from home, the same way the journeys are ordered. Four of the
  eight are Kerala, because four of the eight should be.
*/
export const collections: CollectionMeta[] = [
  {
    id: "backwaters",
    label: "The backwaters",
    short: "the backwaters",
    blurb:
      "Vembanad and the canals that feed it. Farm islands, teak houses, and boats that are somewhere to sleep rather than something to look at.",
  },
  {
    id: "kochi",
    label: "Fort Kochi",
    short: "Fort Kochi",
    blurb:
      "Four hundred years of trading port, and the handful of houses in it that have been brought back properly.",
  },
  {
    id: "coast",
    label: "The Kerala coast",
    short: "the Kerala coast",
    blurb:
      "Marari, Varkala and the Malabar shore north of them — the parts of the coast that never became a strip.",
  },
  {
    id: "hills",
    label: "The hill country",
    short: "the hill country",
    blurb:
      "Cardamom, tea and the Periyar. Two thousand metres of height between the backwaters and Tamil Nadu.",
  },
  {
    id: "konkan",
    label: "Goa & the Konkan",
    short: "Goa and the Konkan",
    blurb:
      "The coast north of us: Gokarna, Goa, and the Maharashtrian shore almost nobody stops on.",
  },
  {
    id: "cities",
    label: "The cities",
    short: "the cities",
    blurb: "Somewhere good to land, and somewhere good to leave from.",
  },
  {
    id: "rajasthan",
    label: "Rajasthan",
    short: "Rajasthan",
    blurb:
      "Forts, havelis, tented camps on dam walls, and the leopard country in between.",
  },
  {
    id: "north",
    label: "Further north, and out to sea",
    short: "the north",
    blurb:
      "The Ganges, Dal Lake, the Darjeeling tea gardens, and an island in the Andamans.",
  },
];

export interface Stay {
  slug: string;
  name: string;
  /* One line, under the name. */
  standfirst: string;
  collection: Collection;
  /* For the eyebrow: "Kerala backwaters · 10 rooms". */
  place: string;
  rooms: string;
  /* "Boutique hotel", "Homestay", "Houseboat". */
  kind: string;
  /*
    Distance from Kerala, the same scale the journeys use: 0 Kerala,
    3 Karnataka and the Nilgiris, 6 Goa and the Konkan, 7 the cities and
    the east, 8 Rajasthan and the north, 9 the Himalaya and the islands.
    The list is sorted on it.
  */
  from: number;
  /* Two or three sentences, ours. */
  summary: string;
  /* What is actually there. Facts. */
  features: string[];
  /* Getting to it. */
  getting: string;
  /*
    The property's own photographs, once it has sent them. Left off
    until then — see the note at the top of the file. Nothing here uses
    stock.

    `image` is the one that leads: the card, the masthead, the share
    preview. `images` is everything else it sent, in the order it should
    be shown. Setting `image` alone is enough; the gallery simply does
    not appear until there is more than one.
  */
  image?: string;
  imageAlt?: string;
  images?: { src: string; alt: string }[];
}

const catalogue: Stay[] = [
  /* ——— The backwaters ————————————————————————————————————— */
  {
    slug: "philipkuttys-farm",
    name: "Philipkutty's Farm",
    standfirst: "Seven cottages on a farm island, and the family who farm it.",
    collection: "backwaters",
    place: "Near Kumarakom",
    rooms: "7 waterfront cottages",
    kind: "Homestay",
    from: 0,
    summary:
      "A working farm on reclaimed land in Lake Vembanad, run by three generations of the same family. The cottages stand in a line along the water with the boats going past the veranda, and meals are taken with the family rather than in a restaurant. It is the best place we know to understand how Kuttanad actually works, and the cooking is why people come back.",
    features: [
      "All meals included, cooked by the family",
      "Cooking lessons, if you ask",
      "Canoes and country boats off the jetty",
      "Birdwatching — this is Kumarakom's water",
      "Coconut, nutmeg, cocoa and banana growing between the cottages",
      "Ayurvedic treatments arranged",
    ],
    getting: "About two and a half hours from Kochi airport, the last stretch by boat.",
  },
  {
    slug: "kumarakom-lake-resort",
    name: "Kumarakom Lake Resort",
    standfirst: "Old Kerala houses moved here whole, on ten acres of Vembanad shore.",
    collection: "backwaters",
    place: "Kumarakom",
    rooms: "65 rooms, 7 houseboats",
    kind: "Resort",
    from: 0,
    summary:
      "The largest thing on this list and the only one that earns it. The cottages were built from the frames of old illams — several bought entire from families who would not modernise them, taken apart and brought here — so the woodwork is genuinely a century or two old even where the plumbing is not. Ten acres of garden with canals running through, and the lake at the end of them.",
    features: [
      "A meandering pool that runs through the grounds",
      "Ayurvedic centre and spa",
      "Seven houseboats of its own",
      "Kayaking, sailing and fishing on Vembanad",
      "The ettukettu restaurant — open-sided, under a beamed roof",
      "Sunset cruise on the lake most evenings",
    ],
    getting: "78km from Kochi airport, about two and a half hours.",
  },
  {
    slug: "purity",
    name: "Purity",
    standfirst: "Fourteen rooms on the quiet side of Vembanad, and a lot of colour.",
    collection: "backwaters",
    place: "Lake Vembanad, western shore",
    rooms: "14 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "On the western shore of the lake, which is the side without the boat traffic. The building is white and almost nothing in it is — the colour is used with real judgement rather than thrown at the walls, which is rarer in Kerala than it ought to be. Small enough that breakfast arrives the way you asked for it the evening before.",
    features: [
      "Pool looking out over the lake",
      "Dosa made to order at breakfast",
      "Cooking classes",
      "Canoes, and boats out onto the lake",
      "Birdwatching",
      "Spa treatments and yoga",
    ],
    getting: "About an hour and a half from Kochi airport.",
  },
  {
    slug: "cranganor",
    name: "Cranganor",
    standfirst: "Ten rooms on the Periyar, and a kitchen run by the village.",
    collection: "backwaters",
    place: "North Paravur, on the Periyar",
    rooms: "10 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "A riverside house at North Paravur, on a stretch of the Periyar no itinerary has found yet, thirty-five minutes from the airport. Every room has a balcony or a veranda onto the garden and the water. The food is cooked by a team of women from the surrounding neighbourhood and is the argument for staying two nights rather than one.",
    features: [
      "Every room onto the river or the garden",
      "Pool deck rooms down at the water",
      "Malayali home cooking, served open-sided",
      "Kayaks and country boats",
      "Bicycles into the village",
      "Ayurvedic treatments and yoga",
    ],
    getting: "Thirty-five minutes from Kochi airport — the closest thing on this list to it.",
  },
  {
    slug: "vismaya-lake-heritage",
    name: "Vismaya Lake Heritage",
    standfirst: "A teak house on a quiet backwater, taken by the room or whole.",
    collection: "backwaters",
    place: "Lake Vembanad",
    rooms: "2 rooms, or the house for five",
    kind: "Guesthouse",
    from: 0,
    summary:
      "A restored teakwood house with two rooms either side of a wood-clad sitting room, built around a traditional open skylight with swinging benches under it. There is no menu — somebody asks what you would like and then cooks it, and you eat it on the veranda, in the garden or on the jetty. Two couples travelling together can take the whole house.",
    features: [
      "Whole-house booking for up to five",
      "Meals cooked to order, eaten wherever you like",
      "A jetty, and a punt off it",
      "Birdwatching on water with nothing on it",
      "Ayurvedic treatments arranged",
      "Bicycles",
    ],
    getting: "Around an hour and a half from Kochi airport.",
  },
  {
    slug: "spice-coast-cruises",
    name: "Spice Coast Cruises",
    standfirst: "Seven kettuvallams that were rice barges first, and still look it.",
    collection: "backwaters",
    place: "Alleppey",
    rooms: "7 boats, one or two bedrooms",
    kind: "Houseboats",
    from: 0,
    summary:
      "Converted cargo boats rather than new builds dressed up as old ones — split bamboo and coir roofs, earth-toned cloth, and none of the plastic and chrome that has crept into the Alleppey fleet. One or two cabins, a chef aboard, and no menu: what you eat depends on what you say and what the market had that morning.",
    features: [
      "One- and two-bedroom boats",
      "A chef on board, cooking to order",
      "Moorings in villages rather than at the jetty",
      "Fishing and birdwatching off the deck",
      "Farm and village visits along the way",
      "The narrow Kuttanad canals the big boats cannot enter",
    ],
    getting: "Boards at Alleppey, about an hour and a half from Kochi airport.",
  },
  {
    slug: "gramam-homestay",
    name: "Gramam Homestay",
    standfirst: "Two rooms with a family, ten kilometres from Fort Kochi.",
    collection: "backwaters",
    place: "Near Fort Kochi",
    rooms: "2 rooms",
    kind: "Homestay",
    from: 0,
    summary:
      "The smallest thing on this list. A family house among the palms with a restored coir-processing bungalow beside it, ten kilometres out of Fort Kochi and entirely inside village life. Home cooking, taken in the dining room while the family eat separately — which is the Kerala homestay convention, and worth knowing before you arrive rather than after.",
    features: [
      "Traditional Keralan breakfast included",
      "Cooking classes with the family",
      "Bicycles, and a village to ride round",
      "Birdwatching and fishing",
      "Ayurvedic treatments arranged",
      "Close enough to go into Kochi for the evening",
    ],
    getting: "Ten kilometres from Fort Kochi; under an hour from the airport.",
  },
  /* ——— Fort Kochi ————————————————————————————————————————— */
  {
    slug: "malabar-house",
    name: "Malabar House",
    standfirst: "Seventeen rooms in an eighteenth-century residence, opposite the parade ground.",
    collection: "kochi",
    place: "Fort Kochi",
    rooms: "17 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "The first serious small hotel in Fort Kochi and still the one others are measured against. An eighteenth-century house on the parade ground, hung with contemporary Indian art, with a courtyard pool at the back. The roof garden suites have L-shaped terraces you can eat dinner on.",
    features: [
      "Roof garden suites with private terraces",
      "Courtyard and pool",
      "Malabar Junction, its restaurant, on seafood",
      "Contemporary Indian art throughout",
      "Ayurvedic treatments",
      "Everything in Fort Kochi within a walk",
    ],
    getting: "Fort Kochi, about an hour and a half from the airport.",
  },
  {
    slug: "old-harbour-hotel",
    name: "Old Harbour Hotel",
    standfirst: "Thirteen rooms in a building first recorded in 1788.",
    collection: "kochi",
    place: "Fort Kochi",
    rooms: "13 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "Dutch and Portuguese in its bones, on the harbour side of Fort Kochi, with hardwood floors, Casablanca fans turning over the air conditioning, and a garden with a pool in it. Art-led without being precious about it. The restaurant is named 1788 after the first year the building appears in the records.",
    features: [
      "Garden and pool behind the house",
      "The 1788 restaurant, spilling onto a terrace",
      "Sitar and tabla some evenings",
      "Rooms in natural cotton, soft lighting",
      "The Chinese nets and the harbour on the doorstep",
      "Spa treatments",
    ],
    getting: "Fort Kochi, an hour and a half from the airport.",
  },
  {
    slug: "tea-bungalow",
    name: "Tea Bungalow",
    standfirst: "A tea company's guesthouse, ten rooms, in the old spice quarter.",
    collection: "kochi",
    place: "Fort Kochi",
    rooms: "10 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "Built in 1912 as a guesthouse for a British tea company and still laid out like one — high ceilings, deep verandas, plantation furniture. The rooms are named after the Arabian and Indian Ocean ports the trade ran to: Malabar, Zanzibar, and so on. Close to Mattancherry and the godowns where the pepper is still graded.",
    features: [
      "Plantation-house rooms, six in the old building",
      "Garden and pool",
      "Walking distance of the spice markets",
      "Bicycles",
      "Boat trips arranged",
      "Quieter than the parade-ground end of the fort",
    ],
    getting: "Fort Kochi, an hour and a half from the airport.",
  },
  {
    slug: "the-old-courtyard-hotel",
    name: "The Old Courtyard",
    standfirst: "Nine rooms round a courtyard, a street back from the waterfront.",
    collection: "kochi",
    place: "Fort Kochi",
    rooms: "9 rooms",
    kind: "Heritage hotel",
    from: 0,
    summary:
      "Small, old and very well placed — a street back from Fort Kochi's north waterfront, arranged around a courtyard you can hear the harbour from. The plainest rooms are plain, so it is worth taking a higher category; what you are paying for is the building and the position rather than the fittings.",
    features: [
      "A genuine courtyard, not a light well",
      "A short walk to the Chinese nets",
      "Nine rooms, so it never feels busy",
      "Boat trips and guided walks arranged",
      "Good value for the location",
      "Ask for one of the larger rooms",
    ],
    getting: "Fort Kochi, an hour and twenty minutes from the airport.",
  },
  /* ——— The Kerala coast ——————————————————————————————————— */
  {
    slug: "marari-villas",
    name: "Marari Villas",
    standfirst: "Three private villas under the palms, three hundred metres from the sand.",
    collection: "coast",
    place: "Marari beach",
    rooms: "3 villas, each for two to four",
    kind: "Villas",
    from: 0,
    summary:
      "An English-Russian couple looked at the coast from Mumbai to Trivandrum before choosing this stretch of Marari, and then built three villas on it out of the frames of old Keralan houses. Each has its own walled garden and pool. There is a chef shared between them and a manager, Mr George, whom guests tend to talk about more than the architecture.",
    features: [
      "Private walled garden and pool with each villa",
      "A chef cooking to order, at set times",
      "A reserved stretch of Marari beach, 300m away",
      "Semi open-air bathrooms under the banana palms",
      "Kitchenettes, so the villas work for longer stays",
      "Village tour by auto-rickshaw",
    ],
    getting: "70km from Kochi airport, about an hour and a half. 15km from Alleppey.",
  },
  {
    slug: "marari-beach-resort",
    name: "Marari Beach Resort",
    standfirst: "Sixty-two thatched cottages laid out like the fishing village next door.",
    collection: "coast",
    place: "Mararikulam",
    rooms: "62 cottages",
    kind: "Beach resort",
    from: 0,
    summary:
      "Large, and designed carefully enough that it does not feel it. The cottages copy the local fishermen's huts — palm thatch pulled low over a raised veranda, wooden slat shutters — and are spread through gardens rather than stacked. A serious environmental programme sits behind it, and the beach is still the empty one it was built for.",
    features: [
      "Cottages modelled on the village houses",
      "Ayurvedic centre and yoga",
      "Two pools, tennis and badminton",
      "Kayaking and boat trips",
      "Cooking classes",
      "An unbuilt-on beach behind the palms",
    ],
    getting: "About an hour and a half from Kochi airport.",
  },
  {
    slug: "villa-jacaranda",
    name: "Villa Jacaranda",
    standfirst: "Four rooms on the Varkala cliff, and a garden that smells of it.",
    collection: "coast",
    place: "Varkala",
    rooms: "4 rooms",
    kind: "Guesthouse",
    from: 0,
    summary:
      "On a quiet bend of road at Varkala with the sea visible from the veranda. Terracotta floors, generous rooms, and furniture the owner has carried home from a lot of places — Tuscan armoires, Byzantine chandeliers, Burmese lacquer — which in most hands would be a mess and here is not. Four rooms, a pool and a fragrant garden.",
    features: [
      "Sea views from the veranda",
      "Pool in the garden",
      "Varkala's cliff path and beaches nearby",
      "Ayurvedic treatments — Varkala is the place for them",
      "Cooking classes",
      "Surfing off the beach below",
    ],
    getting: "About an hour from Trivandrum airport.",
  },
  {
    slug: "neeleshwar-hermitage",
    name: "Neeleshwar Hermitage",
    standfirst: "Eighteen thatched cottages on the Malabar coast, where almost nothing is built.",
    collection: "coast",
    place: "Neeleshwar, north Kerala",
    rooms: "18 cottages, plus a houseboat",
    kind: "Beach resort",
    from: 0,
    summary:
      "Far north, past Kannur, on a stretch of coast that tourism has not reached and may not. Thatched cottages in two tiers looking at the sea, a serious Ayurvedic spa, and a houseboat of its own on the Valiyaparamba backwater behind. This is Theyyam country between December and April, and the hotel will get you to one.",
    features: [
      "Private plunge pool cottages in walled gardens",
      "Ayurveda taken seriously — full programmes, not just massages",
      "Its own houseboat on the northern backwaters",
      "Two restaurants, one open to the sea",
      "Theyyam in season, and Bekal fort up the road",
      "Yoga, cooking classes and guided walks",
    ],
    getting: "About an hour and a half from Mangalore airport; two from Kannur.",
  },
  /* ——— The hill country ——————————————————————————————————— */
  {
    slug: "shalimar-spice-garden",
    name: "Shalimar Spice Garden",
    standfirst: "Twenty-four cottages in a spice garden, over a wooden bridge.",
    collection: "hills",
    place: "Thekkady",
    rooms: "24 suites and cottages",
    kind: "Resort",
    from: 0,
    summary:
      "You cross a wooden bridge to get in, which sets the tone. Elephant-grass thatch, private verandas with divans on them, and the whole thing set inside a working spice garden on the edge of the Periyar reserve. Simple rather than luxurious, and the better for it. There is an Ayurvedic centre and a pool among the trees.",
    features: [
      "Cottages and suites, all with verandas",
      "Ayurvedic centre",
      "Pool in the garden",
      "Periyar reserve and its boat trips nearby",
      "Guided walks in the plantations",
      "Meals in the open-sided restaurant or in the garden",
    ],
    getting: "Thekkady, about four hours from Kochi airport.",
  },
  {
    slug: "windermere-estate",
    name: "Windermere Estate",
    standfirst: "Eighteen rooms on a cardamom estate above Munnar.",
    collection: "hills",
    place: "Munnar",
    rooms: "18 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "A working cardamom and coffee estate high on the slopes above Munnar, with the rooms spread between villas and cottages named after what grows around them. Big picture windows, terracotta floors, and walking straight out of the door into the plantation. For walkers and people who want the tea country without the tea-town traffic.",
    features: [
      "Rooms across villas and cottages on the estate",
      "Walks from the door into cardamom and coffee",
      "Birdwatching — this is good Western Ghats forest edge",
      "Estate tours",
      "Yoga",
      "Munnar and Eravikulam within reach for the day",
    ],
    getting: "Munnar, about four hours from Kochi airport.",
  },
  {
    slug: "windermere-river-house",
    name: "Windermere River House",
    standfirst: "Five rooms on the Periyar, with jungle on the other bank.",
    collection: "hills",
    place: "The Periyar river",
    rooms: "5 rooms",
    kind: "Boutique hotel",
    from: 0,
    summary:
      "An estate house of five bedrooms right on the Periyar, with wild country on the far bank and very little in between. Four of the rooms look over the gardens and the river; the fifth is larger and loses the view for the space. South Indian cooking, done at home rather than for a restaurant.",
    features: [
      "Four rooms onto the river, two with balconies",
      "Kayaking on the Periyar",
      "Birdwatching and wildlife on the opposite bank",
      "Bicycles",
      "Yoga",
      "Cooking that leans South Indian, with lighter northern dishes",
    ],
    getting: "On the Periyar, a few hours inland from Kochi.",
  },
  /* ——— Goa & the Konkan ——————————————————————————————————— */
  {
    slug: "swaswara",
    name: "SwaSwara",
    standfirst: "A yoga retreat beside Om Beach, and nothing to do but the point of it.",
    collection: "konkan",
    place: "Gokarna, Karnataka",
    rooms: "24 villas",
    kind: "Yoga retreat",
    from: 3,
    summary:
      "Twenty-four villas set around a pool among coconut groves and paddy, a few minutes from Om Beach — so named because of the shape it makes. A proper retreat rather than a hotel with a yoga mat: full programmes, Ayurveda, meditation, art, and a kitchen built around what the garden grows.",
    features: [
      "Yoga and meditation programmes",
      "Ayurvedic treatments",
      "Art classes",
      "Dolphin watching and boat trips",
      "Hiking in the Western Ghats behind",
      "Om Beach a few minutes away",
    ],
    getting: "About two hours from Goa's Dabolim airport.",
  },
  {
    slug: "kahani-paradise",
    name: "Kahani Paradise",
    standfirst: "Six suites above a beach, an hour south of Goa and nothing like it.",
    collection: "konkan",
    place: "Gokarna, Karnataka",
    rooms: "6 suites",
    kind: "Guesthouse",
    from: 3,
    summary:
      "Along the coast from Goa and a world from it — a hillside house above an empty beach with six suites in it, each built around antique doors the owner spent years collecting. Indian textiles against clean modern lines, and the whole place small enough to take over.",
    features: [
      "Six suites, all different",
      "Pool with the sea below it",
      "Whole-house booking",
      "Spa treatments and yoga",
      "Tennis, badminton and croquet",
      "Gokarna's temples and beaches nearby",
    ],
    getting: "About two and a half hours from Goa's Dabolim airport.",
  },
  {
    slug: "vaayu-kula",
    name: "Vaayu Kula",
    standfirst: "Eight rooms, a surf school and a seafront kitchen on a quiet Goan beach.",
    collection: "konkan",
    place: "North Goa",
    rooms: "8 rooms, 1 cottage",
    kind: "Boutique hotel",
    from: 6,
    summary:
      "On a stretch of North Goa that has stayed quiet, with a surf school attached, a wellness space and a restaurant on the sand. Bright rooms in earth tones with French doors onto balconies, and enough art and salvaged furniture about the place that it reads as somebody's project rather than a business plan.",
    features: [
      "Surf school on site",
      "Seafront restaurant",
      "Wellness space, yoga and spa treatments",
      "Stand-up paddleboarding",
      "Ocean views from the balconies",
      "Farm tours and plantation visits",
    ],
    getting: "About an hour from Goa's Dabolim airport; closer to Mopa.",
  },
  {
    slug: "ahilya-by-the-sea",
    name: "Ahilya By The Sea",
    standfirst: "Three hand-carved villas over Dolphin Bay, taken by the room or whole.",
    collection: "konkan",
    place: "North Goa",
    rooms: "10 rooms across 3 villas",
    kind: "Boutique hotel",
    from: 6,
    summary:
      "Three Balinese-inflected villas built from hand-carved laterite with wooden trim, set in gardens above Dolphin Bay at the quiet end of North Goa. Antiques in the rooms, pools between them, and the option of taking a whole villa for eight or ten — which is how most groups end up using it.",
    features: [
      "Three villas, bookable whole for 8–10",
      "Swimming pools in the gardens",
      "Antique-filled rooms",
      "Dolphin Bay below",
      "Ayurvedic and spa treatments",
      "Old Goa and Panjim within reach",
    ],
    getting: "Under an hour from Dabolim airport.",
  },
  {
    slug: "siolim-house",
    name: "Siolim House",
    standfirst: "A seventeenth-century casa palacio in a village off the trail.",
    collection: "konkan",
    place: "Siolim, North Goa",
    rooms: "9 suites, plus a 3-bedroom villa",
    kind: "Boutique hotel",
    from: 6,
    summary:
      "An Indo-Portuguese palace house from the seventeenth century, remodelled into nine large suites without being sanded smooth. Siolim itself is a village rather than a resort strip, which is the point of staying here. There is a three-bedroom villa at the entrance to the village that can be taken room by room.",
    features: [
      "Nine large suites in the old house",
      "Little Siolim Villa, three bedrooms, nearby",
      "Pool and courtyards",
      "Ayurvedic and spa treatments",
      "Bicycles, boat trips and birdwatching",
      "A working Goan village rather than a beach strip",
    ],
    getting: "About an hour from Dabolim airport.",
  },
  {
    slug: "amrapali",
    name: "Amrapali",
    standfirst: "Five rooms in a century-old Portuguese villa near Old Goa.",
    collection: "konkan",
    place: "North Goa",
    rooms: "5 rooms",
    kind: "Guesthouse",
    from: 6,
    summary:
      "A hundred-year-old Portuguese villa with five rooms and a pool, close to Old Goa and to the airport — which makes it a sensible first or last night as well as a stay in its own right. Quiet, unfussy and run by people who are there.",
    features: [
      "Five rooms in the old villa",
      "Pool in the garden",
      "Ten minutes from Old Goa's churches",
      "Close to the airport for early flights",
      "Breakfast on the veranda",
      "Panjim and Fontainhas nearby",
    ],
    getting: "Twenty minutes from Dabolim airport.",
  },
  {
    slug: "aashyana",
    name: "Aashyana",
    standfirst: "Nine houses in four acres of garden, straight onto Candolim beach.",
    collection: "konkan",
    place: "Candolim, North Goa",
    rooms: "9 houses for 2–10",
    kind: "Beach villas",
    from: 6,
    summary:
      "Villas and cottages scattered through four acres of tropical garden with direct access to the sand at Candolim. The villas sleep six to thirteen and the cottages two to four, so it works for a family that wants to be together and apart at the same time. Everything is run as a house rather than a hotel.",
    features: [
      "Houses sleeping two to ten",
      "Four acres of garden",
      "Direct access to Candolim beach",
      "Pools",
      "Staffed and catered",
      "Good for a group taking several houses",
    ],
    getting: "Around 45 minutes from Dabolim airport.",
  },
  {
    slug: "the-beach-houses",
    name: "The Beach Houses",
    standfirst: "Five restored Portuguese houses on Ashwem sand.",
    collection: "konkan",
    place: "Ashwem, North Goa",
    rooms: "5 villas for 2–7",
    kind: "Beach villas",
    from: 6,
    summary:
      "Nineteenth-century Portuguese dwellings brought back and set down on one of the better beaches in North Goa, each sleeping between two and seven. The idea is to be in the landscape rather than looking at it — open to the sea, low on partitions, and very little between you and the sand.",
    features: [
      "Five houses, each for two to seven",
      "Directly on Ashwem beach",
      "Restored nineteenth-century buildings",
      "Staffed",
      "Good for families and small groups",
      "Quiet end of the north coast",
    ],
    getting: "About an hour and a quarter from Dabolim; closer to Mopa.",
  },
  {
    slug: "otter-creek-tents",
    name: "Otter Creek Tents",
    standfirst: "Three tents on a creek, a flip-flop from the beach.",
    collection: "konkan",
    place: "North Goa",
    rooms: "3 tents",
    kind: "Luxury tents",
    from: 6,
    summary:
      "Three tents and nothing else, pitched where a creek meets a quiet beach. Muslin-draped four-posters, proper beds, and the water on two sides. It is small enough that taking all three is the obvious move for a group, and rustic in the way that is a decision rather than a shortfall.",
    features: [
      "Three tents only",
      "Four-poster beds under muslin",
      "Creek on one side, beach on the other",
      "Take the whole place for six",
      "Meals cooked on site",
      "Birdlife on the creek at both ends of the day",
    ],
    getting: "About an hour and a half from Dabolim airport.",
  },
  {
    slug: "anahata-retreat",
    name: "Anahata Retreat",
    standfirst: "Yoga and eco-cottages on a busy beach, set back from it.",
    collection: "konkan",
    place: "North Goa",
    rooms: "21 rooms",
    kind: "Wellness retreat",
    from: 6,
    summary:
      "On one of North Goa's popular beaches but arranged so that you need not notice — cottages set back in gardens, a yoga shala, and a wellness programme that is the reason to come. Larger than most places on this list, and built lightly.",
    features: [
      "Daily yoga",
      "Wellness and Ayurvedic programmes",
      "Eco-built cottages",
      "Pool",
      "Beach access",
      "Kitchen built around the treatments",
    ],
    getting: "About an hour and a half from Dabolim airport.",
  },
  {
    slug: "cabo-serai",
    name: "Cabo Serai",
    standfirst: "Cottages and tents on a clifftop above one of south Goa's best beaches.",
    collection: "konkan",
    place: "Cabo de Rama, South Goa",
    rooms: "8 cottages, 3 tents",
    kind: "Eco resort",
    from: 6,
    summary:
      "Hidden in the palms on the cliff above Cabo de Rama beach, and near enough invisible from the sand. Eight cottages and three tents, sea views from most of them, yoga, and a kitchen that has thought about it. Remarkable value for what it is and where it is.",
    features: [
      "Sea-view cottages and luxury tents",
      "Yoga",
      "Spa treatments",
      "Kayaking and scuba nearby",
      "Forest bathing on the headland",
      "One of the emptiest good beaches in Goa below",
    ],
    getting: "About an hour and a quarter from Dabolim airport.",
  },
  {
    slug: "vivenda-dos-palhacos",
    name: "Vivenda Dos Palhacos",
    standfirst: "A Hindu-Portuguese hacienda in Majorda, run by a brother and sister.",
    collection: "konkan",
    place: "Majorda, South Goa",
    rooms: "7 rooms, 1 cottage",
    kind: "Guesthouse",
    from: 6,
    summary:
      "A restored hacienda in a quiet South Goan village, a short walk from the best white sand on that coast. Every room is named and decorated after somewhere the family lived in Bengal and Tamil Nadu, and the bar is in a converted horse box. It has a following, and deserves it.",
    features: [
      "Seven rooms, each different",
      "A cottage for two to four",
      "Pool in the garden",
      "A short walk to Majorda beach",
      "Dinner at a long table, if you want it",
      "Bicycles",
    ],
    getting: "Twenty-five minutes from Dabolim airport.",
  },
  {
    slug: "coco-shambhala-sindhudurg",
    name: "Coco Shambhala Sindhudurg",
    standfirst: "Four villas with infinity pools, on a coast nobody stops on.",
    collection: "konkan",
    place: "Konkan coast, Maharashtra",
    rooms: "4 villas for 2–4",
    kind: "Villas",
    from: 6,
    summary:
      "Four villas on the Maharashtrian coast between Goa and Mumbai — the stretch everybody drives or flies over. Floor-to-ceiling glass, grey cement and coconut wood, a private infinity pool with each villa, and the beach two hundred metres down the hill.",
    features: [
      "Private infinity pool with each villa",
      "200m from the beach",
      "Scuba diving and kayaking",
      "Whale watching in season",
      "Cooking classes",
      "Sauna, spa treatments and yoga",
    ],
    getting: "About two and a half hours north of Goa's Dabolim airport.",
  },
  /* ——— The cities ————————————————————————————————————————— */
  {
    slug: "abode-bombay",
    name: "Abode Bombay",
    standfirst: "Twenty-five rooms in Colaba, and the best service in the city.",
    collection: "cities",
    place: "Colaba, Mumbai",
    rooms: "25 rooms",
    kind: "Boutique hotel",
    from: 7,
    summary:
      "In the middle of southern Mumbai, a few minutes from the Gateway, and run with more care than hotels ten times the price. Reclaimed teak, Art Deco fittings, and an ethical operation behind it that is genuine rather than a page on the website. If you are starting or ending in Bombay, start or end here.",
    features: [
      "Walking distance of the Gateway and Colaba Causeway",
      "Rooms from compact to generous — take a Luxury",
      "Reclaimed teak and Art Deco throughout",
      "Breakfast worth getting up for",
      "Spa treatments",
      "Staff who will actually plan your day with you",
    ],
    getting: "Southern Mumbai, about an hour from the airport in traffic.",
  },
  {
    slug: "le-sutra",
    name: "Le Sutra",
    standfirst: "An art hotel in a leafy Bandra lane, fourteen rooms, all different.",
    collection: "cities",
    place: "Bandra, Mumbai",
    rooms: "14 rooms",
    kind: "Boutique hotel",
    from: 7,
    summary:
      "Every room is an installation on a theme, which sounds exhausting and is not — they are done with wit and they are comfortable. Tucked into a quiet lane in Bandra, which is the half of Mumbai people actually want to spend an evening in. Good food downstairs.",
    features: [
      "Fourteen rooms, each conceived separately",
      "Bandra on the doorstep",
      "Restaurant and bar",
      "Quiet lane, despite the location",
      "Closer to the airport than the south of the city",
      "A gift themed to your room, on leaving",
    ],
    getting: "Bandra, about 40 minutes from the airport.",
  },
  {
    slug: "the-imperial",
    name: "The Imperial",
    standfirst: "Delhi's landmark hotel, and the best introduction to India there is.",
    collection: "cities",
    place: "Janpath, New Delhi",
    rooms: "234 rooms",
    kind: "Luxury hotel",
    from: 7,
    summary:
      "Opened in 1936 on Janpath, with one of the great collections of colonial-era Indian art hanging in its corridors — enough of it that the hotel runs tours of its own walls. Large, formal and genuinely grand rather than expensively decorated. For a first night in India it is hard to better.",
    features: [
      "An art collection you can be walked through",
      "Central New Delhi, on Janpath",
      "Pool and spa",
      "Several restaurants, one of them a Delhi institution",
      "Connaught Place a short walk",
      "The last of the true colonial hotels still run as one",
    ],
    getting: "Central Delhi, 40 minutes to an hour from the airport.",
  },
  {
    slug: "the-lodhi",
    name: "The Lodhi",
    standfirst: "Big contemporary rooms with private plunge pools, in green Delhi.",
    collection: "cities",
    place: "New Delhi",
    rooms: "100+ rooms",
    kind: "Boutique hotel",
    from: 7,
    summary:
      "The opposite of The Imperial and equally good at it — low, modern, made of stone and water, in the leafy part of New Delhi near the Lodhi Gardens and Humayun's tomb. The rooms are very large and most have their own plunge pool on the terrace.",
    features: [
      "Private plunge pools with most rooms",
      "Lodhi Gardens and Humayun's tomb nearby",
      "Serious spa",
      "Several restaurants",
      "Quiet, for central Delhi",
      "Good for a long layover as much as a stay",
    ],
    getting: "Central Delhi, 40 minutes to an hour from the airport.",
  },
  {
    slug: "mizpah",
    name: "Mizpah",
    standfirst: "Four rooms in a residential Delhi street, for people who hate hotels.",
    collection: "cities",
    place: "Safdarjung Enclave, New Delhi",
    rooms: "4 rooms",
    kind: "Bed and breakfast",
    from: 7,
    summary:
      "A four-room B&B in a quiet upmarket enclave, which in Delhi is worth a great deal. Somebody's house, run properly, with breakfast and conversation and none of the lobby. The right answer for a night either side of a flight if a large hotel is not what you want.",
    features: [
      "Four rooms",
      "Residential street, away from the noise",
      "Breakfast included",
      "Owners on hand for advice",
      "Close to the southern Delhi markets",
      "Good value for the city",
    ],
    getting: "South Delhi, about 30 minutes from the airport.",
  },
  {
    slug: "the-glenburn-penthouse",
    name: "The Glenburn Penthouse",
    standfirst: "Nine suites and a rooftop pool over colonial Kolkata.",
    collection: "cities",
    place: "Kolkata",
    rooms: "9 suites",
    kind: "Boutique hotel",
    from: 7,
    summary:
      "Kolkata's first proper boutique hotel, run by the family behind Glenburn Tea Estate, on the top two floors of a building looking straight at the city's colonial architecture. Nine suites, a rooftop pool, and tea served the way a tea family serves it.",
    features: [
      "Nine suites over two floors",
      "Rooftop pool and terrace",
      "Views over colonial Kolkata",
      "Glenburn's own Darjeeling tea",
      "City walks arranged",
      "Pairs naturally with the tea estate itself",
    ],
    getting: "Central Kolkata, 45 minutes from the airport.",
  },
  /* ——— Rajasthan —————————————————————————————————————————— */
  {
    slug: "raas-jodhpur",
    name: "Raas Jodhpur",
    standfirst: "Rose sandstone in the old city, with Mehrangarh filling the window.",
    collection: "rajasthan",
    place: "Jodhpur",
    rooms: "40 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "A haveli compound inside the old walls, rebuilt in rose sandstone and glass, with the fort standing directly above it — the view from the terrace is the reason the hotel exists and it does not disappoint. Contemporary inside, old outside, and the balance between the two is the best in the city.",
    features: [
      "Fort views from most rooms and the terrace",
      "Pool in the courtyard",
      "Spa",
      "Inside the old city walls, on foot from the markets",
      "Contemporary rooms in a historic shell",
      "The clock tower bazaar ten minutes away",
    ],
    getting: "Jodhpur old city; 30 minutes from the airport.",
  },
  {
    slug: "raas-chhatrasagar",
    name: "Raas Chhatrasagar",
    standfirst: "Sixteen tents pitched along a nineteenth-century dam wall.",
    collection: "rajasthan",
    place: "Nimaj, near Jodhpur",
    rooms: "16 tents",
    kind: "Luxury tents",
    from: 8,
    summary:
      "The tents stand in a line on top of a dam built in 1890, with the reservoir on one side and farmland on the other, and birds on the water in numbers that surprise people who came for forts. Run by the family who own the land. One of the genuinely unusual places to stay in India.",
    features: [
      "Tents on the dam wall, water on one side",
      "Serious birdlife — bring binoculars",
      "Village and farm visits",
      "Meals outdoors",
      "Pool",
      "Between Jodhpur, Udaipur and Jaipur on the road",
    ],
    getting: "About two hours from Jodhpur airport.",
  },
  {
    slug: "mihirgarh",
    name: "Mihirgarh",
    standfirst: "Nine suites in a fort that was built, from scratch, in 2009.",
    collection: "rajasthan",
    place: "Near Jodhpur",
    rooms: "9 suites",
    kind: "Desert hotel",
    from: 8,
    summary:
      "A fort in the Thar with no history at all — the Rohet family built it this century, in the old way, out of mud and lime. Nine enormous suites, most with a plunge pool, and Marwari horses in the stables. Riding here is the best in Rajasthan and the reason a lot of people come.",
    features: [
      "Nine suites, most with private plunge pools",
      "Marwari horse riding",
      "Royal picnics out in the desert",
      "Pool",
      "Village visits with the family",
      "Utterly quiet",
    ],
    getting: "About an hour from Jodhpur.",
  },
  {
    slug: "rohet-garh",
    name: "Rohet Garh",
    standfirst: "A family fort in a village, and the desert safaris that made it.",
    collection: "rajasthan",
    place: "Rohet, near Jodhpur",
    rooms: "32 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "The Rohet family's own fort in the middle of the village, opened to guests decades before heritage hotels were a category. Bruce Chatwin and William Dalrymple both wrote here. Traditional Rajasthani, homely rather than grand, and the village safaris out to the Bishnoi settlements are the real product.",
    features: [
      "Family-run, and it shows",
      "Bishnoi village safaris",
      "Pool in the courtyard",
      "Horse riding",
      "Traditional Rajasthani rooms",
      "An easy first stop out of Jodhpur",
    ],
    getting: "Forty minutes from Jodhpur.",
  },
  {
    slug: "brij-lakshman-sagar",
    name: "Brij Lakshman Sagar",
    standfirst: "Twelve cottages round a lake, in the Pali badlands.",
    collection: "rajasthan",
    place: "Pali, Rajasthan",
    rooms: "12 cottages",
    kind: "Rural hotel",
    from: 8,
    summary:
      "Cottage suites perched around a small lake in the rocky country between Jodhpur and Udaipur — a landscape that looks like nothing else in Rajasthan and gets skipped entirely by people driving between the two. Built from local stone and mud, with plunge pools and a view off the edge.",
    features: [
      "Cottages with plunge pools over the lake",
      "Local stone and mud construction",
      "Village walks",
      "Meals outdoors by the water",
      "Birdlife on the lake",
      "A good break on the Jodhpur–Udaipur road",
    ],
    getting: "About two hours from Jodhpur.",
  },
  {
    slug: "28-kothi",
    name: "28 Kothi",
    standfirst: "Five rooms in a quiet part of Jaipur, run with taste.",
    collection: "rajasthan",
    place: "Jaipur",
    rooms: "5 rooms",
    kind: "Guesthouse",
    from: 8,
    summary:
      "Five airy rooms in a residential corner of Jaipur, away from the old-city crush, done with more style than most hotels in the city manage at any price. Small, personal, and the kind of place people book again rather than trading up.",
    features: [
      "Five rooms",
      "Pool and garden",
      "Quiet residential Jaipur",
      "Breakfast on the terrace",
      "Owners who will tell you where to eat",
      "Good value for the city",
    ],
    getting: "Jaipur, 30 minutes from the airport.",
  },
  {
    slug: "rajmahal-palace-raas",
    name: "Rajmahal Palace Raas",
    standfirst: "An eighteenth-century royal palace, reimagined in colour.",
    collection: "rajasthan",
    place: "Jaipur",
    rooms: "13 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "Built in 1729, lived in by the Jaipur royal family, and reopened as a thirteen-room hotel with a bold contemporary hand — hand-painted wallpapers, strong colour, and none of the reverence that usually flattens a palace conversion. Central, and unlike anywhere else in the city.",
    features: [
      "Thirteen rooms in the old palace",
      "Hand-painted wallpapers and strong colour",
      "Pool in the grounds",
      "Central Jaipur",
      "Bar and restaurant worth staying in for",
      "Spa treatments",
    ],
    getting: "Central Jaipur, 25 minutes from the airport.",
  },
  {
    slug: "samode-haveli",
    name: "Samode Haveli",
    standfirst: "A nineteenth-century mansion hidden in the old city.",
    collection: "rajasthan",
    place: "Jaipur old city",
    rooms: "50 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "The Samode family's town house, tucked behind a gate in the old city — courtyards, terraces, gardens and a painted dining room that stops people in the doorway. Larger than it feels, because it is arranged as a series of separate spaces rather than corridors.",
    features: [
      "Courtyards, terraces and gardens",
      "The painted Sheesh Mahal dining room",
      "Pool",
      "Inside the old city walls",
      "Spa",
      "Pairs with Samode Palace an hour away",
    ],
    getting: "Jaipur old city, 30 minutes from the airport.",
  },
  {
    slug: "samode-palace",
    name: "Samode Palace",
    standfirst: "A fairytale palace in the Aravallis, above its own village.",
    collection: "rajasthan",
    place: "Samode, near Jaipur",
    rooms: "43 rooms",
    kind: "Luxury hotel",
    from: 8,
    summary:
      "Four hundred years old, built into the hills an hour north of Jaipur, and rambling enough that guests get lost in it happily. The Durbar Hall and the Sheesh Mahal are as good as anything in Rajasthan. Below it is a working village rather than a hotel approach road.",
    features: [
      "The Durbar Hall and the mirrored Sheesh Mahal",
      "Two pools, one on the roof",
      "Village below, walkable",
      "Spa",
      "Dinner in the courtyards",
      "An hour from Jaipur, and worth the hour",
    ],
    getting: "About an hour north of Jaipur.",
  },
  {
    slug: "anopura",
    name: "Anopura",
    standfirst: "Seven rooms and four villas on a farm, an hour from Jaipur.",
    collection: "rajasthan",
    place: "Near Jaipur",
    rooms: "7 rooms, 4 villas",
    kind: "Eco retreat",
    from: 8,
    summary:
      "A farm in rural Rajasthan turned into a small retreat, with pools, home-grown food and a great deal of quiet. Villas for two to six alongside the rooms, which makes it work for a family. An hour from Jaipur and a different country from it.",
    features: [
      "Rooms and villas for two to six",
      "Pools",
      "Food grown on the farm",
      "Village and farm walks",
      "Yoga",
      "A restorative stop between cities",
    ],
    getting: "Just over an hour from Jaipur.",
  },
  {
    slug: "raas-devigarh",
    name: "Raas Devigarh",
    standfirst: "An eighteenth-century Rajput palace, stripped back to white marble.",
    collection: "rajasthan",
    place: "Delwara, near Udaipur",
    rooms: "39 suites",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "A palace in the Aravallis under an hour from Udaipur, taken back to bare marble and clean lines rather than restored to how it looked. The result divides people and we are on its side: the building is still entirely there, and the minimalism lets you see it.",
    features: [
      "Thirty-nine suites, all in marble",
      "Pool with the hills beyond",
      "Spa",
      "Delwara village below, and its stepwell",
      "Under an hour from Udaipur",
      "Dinner on the ramparts",
    ],
    getting: "Forty-five minutes from Udaipur.",
  },
  {
    slug: "dev-shree",
    name: "Dev Shree",
    standfirst: "Eight rooms in a family haveli, deep in the countryside.",
    collection: "rajasthan",
    place: "Deogarh, Rajasthan",
    rooms: "8 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "The family's own house rather than their fort, with eight rooms, a garden and a lake below. Exceptionally well done — the level of comfort is high and the atmosphere is still somebody's home. Good walking and riding country, and almost no other visitors.",
    features: [
      "Eight rooms in the family house",
      "Pool and garden",
      "Lake below, and birdlife on it",
      "Walks and rides from the door",
      "Meals with the family",
      "Between Udaipur and Jodhpur",
    ],
    getting: "About two hours from Udaipur.",
  },
  {
    slug: "shahpura-bagh",
    name: "Shahpura Bagh",
    standfirst: "Eleven rooms on a family estate, halfway between everywhere.",
    collection: "rajasthan",
    place: "Shahpura, Rajasthan",
    rooms: "11 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "A family-run estate in a quiet corner of Rajasthan that exists, as far as most itineraries are concerned, to break a long drive — and turns out to be somewhere people wish they had given two nights. Lakes, a pool, cricket on the lawn, and the family at dinner.",
    features: [
      "Eleven rooms across two buildings",
      "Pool",
      "Lakes and birdlife on the estate",
      "Walks, cycling and village visits",
      "Meals with the family",
      "Well placed between Udaipur, Jaipur and Bundi",
    ],
    getting: "About three hours from Udaipur, three from Jaipur.",
  },
  {
    slug: "rawla-bisalpur",
    name: "Rawla Bisalpur",
    standfirst: "Four rooms in a restored haveli, and leopards without the crowd.",
    collection: "rajasthan",
    place: "Bisalpur, Rajasthan",
    rooms: "4 rooms",
    kind: "Guesthouse",
    from: 8,
    summary:
      "A small haveli brought back carefully, deep in the countryside, with four rooms and a family running it. Leopard safaris go out from here into hills that see a fraction of the vehicles Jawai does, which is the whole argument for coming.",
    features: [
      "Four rooms only",
      "Leopard safaris with no queue at the sighting",
      "Family hospitality",
      "Village walks",
      "Meals on the roof",
      "Rural Rajasthan as it actually is",
    ],
    getting: "A few hours from Udaipur.",
  },
  {
    slug: "jawai",
    name: "Jawai",
    standfirst: "Ten tents in leopard country, and the granite hills they live in.",
    collection: "rajasthan",
    place: "Jawai, Rajasthan",
    rooms: "10 tents",
    kind: "Luxury tented camp",
    from: 8,
    summary:
      "A sharply designed camp in the Jawai hills, where leopards live in the granite outcrops alongside the Rabari herders and have done for generations without anyone being eaten. Ten tents, serious guiding, and a landscape — bare rock, thorn, a lake — unlike anywhere else in India.",
    features: [
      "Ten tents, all with views out",
      "Leopard tracking in the granite hills",
      "Rabari herders and their settlements",
      "Birdlife on the Jawai dam",
      "Pool",
      "Some of the best guiding in Rajasthan",
    ],
    getting: "About three hours from Udaipur or Jodhpur.",
  },
  {
    slug: "the-serai",
    name: "The Serai",
    standfirst: "Twenty-one tented suites in the desert, an hour from Jaisalmer.",
    collection: "rajasthan",
    place: "Near Jaisalmer",
    rooms: "21 tented suites",
    kind: "Luxury tents",
    from: 8,
    summary:
      "Colonial-safari in style, on a hundred acres of desert east of Jaisalmer, with canvas suites, a good spa and a level of service that does not usually turn up in the middle of the Thar. Some suites have private pools. Dinner is outside, and it is very quiet.",
    features: [
      "Tented suites, some with private pools",
      "Spa",
      "Camel and jeep excursions into the desert",
      "Dinner under the sky",
      "Pool",
      "An hour from Jaisalmer's fort",
    ],
    getting: "About an hour east of Jaisalmer.",
  },
  {
    slug: "suryagarh",
    name: "Suryagarh",
    standfirst: "A fort-scale hotel on the edge of the Thar, built this century.",
    collection: "rajasthan",
    place: "Jaisalmer",
    rooms: "82 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "Built in yellow Jaisalmer sandstone to look four hundred years old, and carrying it off. Large, but arranged around courtyards so it never feels it. What sets it apart is the programming — dawn trips to abandoned villages, musicians in the courtyard, food that takes the region seriously.",
    features: [
      "Courtyards, a stepwell and a large pool",
      "Spa",
      "Dawn excursions into the desert and to Kuldhara",
      "Thali dinners built on Marwari cooking",
      "Musicians in the evening",
      "Twenty minutes from Jaisalmer fort",
    ],
    getting: "Fifteen minutes from Jaisalmer town.",
  },
  {
    slug: "garh-jaisal-haveli-hotel",
    name: "Garh Jaisal Haveli",
    standfirst: "Seven rooms inside the living fort at Jaisalmer.",
    collection: "rajasthan",
    place: "Jaisalmer fort",
    rooms: "7 rooms",
    kind: "Historic guesthouse",
    from: 8,
    summary:
      "Inside the walls of the fort itself — one of the few forts in the world people still live in — run by a family who do. Seven rooms, a roof terrace over the desert, and the whole town below at your feet in the evening. Simple, and irreplaceable for the position.",
    features: [
      "Inside the fort walls",
      "Roof terrace over the desert",
      "Seven rooms, family-run",
      "Everything in the fort on foot",
      "Breakfast on the roof",
      "Simple rooms — come for where it is",
    ],
    getting: "Inside Jaisalmer fort; cars stop at the gate.",
  },
  {
    slug: "narendra-bhawan",
    name: "Narendra Bhawan",
    standfirst: "The last Maharaja of Bikaner's residence, reimagined with a straight face and a wink.",
    collection: "rajasthan",
    place: "Bikaner",
    rooms: "82 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "The house of the last Maharaja of Bikaner, turned into something that is part period piece, part design hotel and entirely committed to the bit. Art Deco rooms, a rooftop, a library, and a restaurant doing regional food that most hotels in Rajasthan would not attempt.",
    features: [
      "Art Deco and colonial rooms, no two alike",
      "Rooftop pool and bar",
      "Regional Rajasthani cooking, properly researched",
      "Library and courtyards",
      "Spa",
      "Bikaner's fort and the camel farm nearby",
    ],
    getting: "Bikaner, about five hours from Jaisalmer.",
  },
  {
    slug: "khem-villas",
    name: "Khem Villas",
    standfirst: "Thirty rewilded acres beside Ranthambhore, and rooms in all of them.",
    collection: "rajasthan",
    place: "Ranthambore",
    rooms: "26 rooms, villas and tents",
    kind: "Safari lodge",
    from: 8,
    summary:
      "Started by conservationists who bought thirty acres of farmland next to the park and spent decades turning it back into forest, which is now full of animals in its own right. Rooms, cottages, villas and tents, and guiding that comes from people who know the individual tigers.",
    features: [
      "Thirty acres of rewilded land, with a lake",
      "Rooms, cottages, villas and tents",
      "Park safaris with expert guides",
      "Birdlife on the property, before you even go out",
      "Pool",
      "The fort at Ranthambhore, which most people skip",
    ],
    getting: "Sawai Madhopur, about four hours from Jaipur.",
  },
  {
    slug: "sher-bagh",
    name: "Sher Bagh",
    standfirst: "Twelve 1920s-style tents at the gate of Ranthambhore.",
    collection: "rajasthan",
    place: "Ranthambore",
    rooms: "12 tents",
    kind: "Safari camp",
    from: 8,
    summary:
      "Canvas done in the manner of a 1920s shooting camp, minus the shooting — campaign furniture, brass, and a fire in the evening. Twelve tents only, close to the park gates, with guiding from the family that has run it for decades.",
    features: [
      "Twelve tents, campaign-furnished",
      "Close to the park gates for early drives",
      "Fire and dinner outdoors",
      "Pool",
      "Spa treatments",
      "Long-standing guides who know the park",
    ],
    getting: "Sawai Madhopur, about four hours from Jaipur.",
  },
  {
    slug: "ramathra-fort",
    name: "Ramathra Fort",
    standfirst: "A 350-year-old hilltop fort, six rooms and six tents, and a lake below.",
    collection: "rajasthan",
    place: "Ramathra, Rajasthan",
    rooms: "6 rooms, 6 tents",
    kind: "Fort hotel and camp",
    from: 8,
    summary:
      "On a hill in the middle of farming country between Ranthambhore and Bharatpur, still owned by the family it was built for in 1645. Six rooms in the fort and six tents on the terraces below, with a view across to a lake that fills with birds. A window into rural Rajasthan rather than a monument.",
    features: [
      "Six rooms in the fort, six tents below",
      "A lake with serious birdlife",
      "Village walks and farm visits",
      "Boat trips on the lake",
      "Meals on the ramparts",
      "Between Ranthambhore, Bharatpur and Agra",
    ],
    getting: "About three hours from Jaipur, three and a half from Agra.",
  },
  /* ——— Further north, and out to sea —————————————————————— */
  {
    slug: "suryauday-haveli",
    name: "Suryauday Haveli",
    standfirst: "Fourteen rooms on the ghats at Varanasi, with the river at the door.",
    collection: "north",
    place: "Varanasi",
    rooms: "14 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "A haveli on Shivala Ghat, built by the royal family of Nepal, with the Ganges directly below it. Staying on the river rather than back in the city changes Varanasi completely — you wake to it, and the boats leave from your own steps at dawn.",
    features: [
      "Directly on the ghats",
      "Sunrise and sunset boat trips from the steps",
      "Courtyard and terrace over the river",
      "Ayurvedic treatments",
      "Guided walks into the old city",
      "Fourteen rooms, several with river views",
    ],
    getting: "Varanasi, about 45 minutes from the airport.",
  },
  {
    slug: "ekaa-villa",
    name: "Ekaa Villa",
    standfirst: "Thirteen rooms in Agra, run by people trying to give the city back its reputation.",
    collection: "north",
    place: "Agra",
    rooms: "13 rooms",
    kind: "Boutique hotel",
    from: 8,
    summary:
      "Agra is a city most people endure for one morning, and this is the place that argues with that. Small, friendly, very well fed, and run by a team who will take you into the parts of Agra nobody schedules — the old city, the marble inlay workshops, the far bank at Mehtab Bagh.",
    features: [
      "Thirteen rooms",
      "Food that people write home about",
      "Walks and workshops in the old city",
      "Pool",
      "Close to the Taj for a sunrise start",
      "Staff who will get you in at first light",
    ],
    getting: "Agra, three and a half hours from Delhi by road or two by train.",
  },
  {
    slug: "chandra-mahal-haveli",
    name: "Chandra Mahal Haveli",
    standfirst: "A village manor with eleven rooms, an hour short of the Taj.",
    collection: "north",
    place: "Near Agra",
    rooms: "11 rooms",
    kind: "Guesthouse",
    from: 8,
    summary:
      "A palatial old manor in a village outside Agra, with eleven rooms, a pool and courtyards, and the Taj Mahal a comfortable morning away. Staying out here instead of in Agra itself is the difference between a night in a city you will not enjoy and a night somewhere worth arriving at.",
    features: [
      "Eleven rooms in the old manor",
      "Pool and courtyards",
      "Guided walk around the village",
      "Day trips to the Taj and Fatehpur Sikri",
      "Meals cooked in the house",
      "Quiet, which Agra is not",
    ],
    getting: "About an hour from Agra.",
  },
  {
    slug: "sukoon",
    name: "Sukoon",
    standfirst: "A five-room houseboat on Dal Lake, with water on every side.",
    collection: "north",
    place: "Dal Lake, Kashmir",
    rooms: "5 rooms",
    kind: "Houseboat hotel",
    from: 9,
    summary:
      "A Kashmiri houseboat done properly — carved cedar, three-hundred-and-sixty degrees of lake and mountain, and five rooms. Shikaras come to the deck. The owners will take you out to the floating gardens, to the villages round the lake, and up into the hills behind.",
    features: [
      "Five rooms on the water",
      "Carved cedar throughout",
      "Shikara trips from the deck",
      "Floating vegetable gardens at dawn",
      "Guided hikes in the hills",
      "Kashmiri cooking",
    ],
    getting: "Srinagar, 30 minutes from the airport, the last part by boat.",
  },
  {
    slug: "glenburn-tea-estate",
    name: "Glenburn Tea Estate",
    standfirst: "Colonial bungalows on a working tea garden, with Kanchenjunga in front.",
    collection: "north",
    place: "Darjeeling",
    rooms: "8 rooms",
    kind: "Guesthouse",
    from: 9,
    summary:
      "A tea estate above the Rungeet river with two planters' bungalows on it, eight rooms between them, and Kanchenjunga filling the horizon on a clear morning. Four meals a day, walks down through the tea to the river, and the factory to go round. Among the best-run places in India.",
    features: [
      "Two bungalows, eight rooms",
      "Kanchenjunga views",
      "Tea tasting and the working factory",
      "Walks down to the Rungeet",
      "All meals, and very good ones",
      "Darjeeling and its railway nearby",
    ],
    getting: "About two hours from Bagdogra airport.",
  },
  {
    slug: "jalakara",
    name: "Jalakara",
    standfirst: "Seven rooms in the jungle on Havelock, twenty minutes from the best beach in India.",
    collection: "north",
    place: "Havelock, Andaman Islands",
    rooms: "6 rooms, 1 villa",
    kind: "Boutique hotel",
    from: 9,
    summary:
      "Inland on Havelock rather than on the sand, in a betel plantation that has gone back to jungle, which is cooler and quieter and means you have to want to be here. Seven rooms, a pool cut into the slope, and Radhanagar beach twenty minutes away.",
    features: [
      "Six rooms and a villa, in jungle",
      "Pool",
      "Radhanagar beach 20 minutes away",
      "Diving and snorkelling on the reef",
      "Bicycles and scooters",
      "Very few people, which is the island's point",
    ],
    getting: "Ferry from Port Blair, then 20 minutes by road.",
  },
];

/*
  Sorted outward from Kerala, the same way the journeys are.

  Somebody in Kochi looking for somewhere to put a client next week should
  not have to scroll past Rajasthan to find it. Sort is stable, so places
  the same distance out keep the order they were written in above.
*/
export const stays: Stay[] = [...catalogue].sort((a, b) => a.from - b.from);
