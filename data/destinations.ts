/*
  Kerala district by district, and then the rest of the country.

  All fourteen districts are here, because a page that calls itself
  Destinations and covers six of them is a page with holes in it. Where
  we have houses and journeys, they are named; where we have neither,
  the district still gets its paragraph, because a visitor asking "what
  is in Palakkad" deserves an answer rather than silence.

  Nothing here is hand-wired that can be looked up instead:

  - stays are slugs, checked against data/stays.ts
  - journeys are found by matching a district's real route stops against
    the route arrays in data/packages.ts, so a journey appears under a
    district because it actually goes there
  - the drive times are the ones data/gettingHere.ts already publishes

  Photographs: ours where we have one of that district, Unsplash where
  we do not, and nothing at all rather than a photograph of somewhere
  else. Three districts are waiting for a picture — Pathanamthitta,
  Malappuram and Kozhikode — and they will look thin until one of ours
  arrives, which is the right kind of thin.
*/

import type { Collection } from "./stays";

export type Destination = {
  id: string;
  district: string;
  name: string;
  standfirst: string;
  body: string[];
  season: string;
  nights: string;
  /* The same advice as `nights`, short enough to sit on an index card. */
  stayLength: string;
  arrive: string;
  collection: Collection;
  /* Slugs, checked against data/stays.ts. */
  stays: string[];
  /* Stops as they are written in a journey's route, in data/packages.ts. */
  routeStops: string[];
  image?: { src: string; alt: string; credit?: string };
  boats?: boolean;
};

const UNSPLASH = "https://images.unsplash.com";

export const KERALA: Destination[] = [
  {
    id: "thiruvananthapuram",
    district: "Thiruvananthapuram",
    name: "Kovalam, Varkala and the capital",
    standfirst:
      "Where the state governs itself, and where its cliffs fall into the sea.",
    body: [
      "Trivandrum is the capital and most visitors see only its airport, which is a shame for the Padmanabhaswamy temple and the Napier museum but understandable: the reason to be down here is the coast.",
      "Kovalam is the old one, three coves and a lighthouse, discovered in the sixties and busy ever since. Varkala is the better half hour further north — a red laterite cliff with the beach below it, a spring that comes out of the rock, and a path along the top that people walk at sunset because there is nothing else that needs doing.",
      "It is the far south, which means it is the beginning or the end of a journey rather than the middle. Most people finish here.",
    ],
    season:
      "November to March. April and May are hot, and the sea is warm enough to forgive it.",
    nights: "Three at the end of a journey.",
    stayLength: "3 nights",
    arrive:
      "Trivandrum airport to Kovalam, 15km, half an hour. Varkala is an hour north of the airport.",
    collection: "coast",
    stays: ["villa-jacaranda"],
    routeStops: ["Trivandrum", "Kovalam", "Poovar"],
    image: {
      src: `${UNSPLASH}/photo-1677216713977-50421d083abf?auto=format&fit=crop&w=2400&q=80`,
      alt: "The Varkala cliff and the beach below it, from the air",
      credit: "cymatics.in",
    },
  },
  {
    id: "kollam",
    district: "Kollam",
    name: "Ashtamudi, Munroe Thuruthu and Alumkadavu",
    standfirst:
      "Eight creeks, a sinking island, and the village where the houseboat was invented.",
    body: [
      "Ashtamudi means eight-branched, which is what the lake is: eight arms of water reaching inland from Kollam town, quieter than Vembanad and used by people rather than visitors. The Chinese nets work here, the ferries are ferries rather than excursions, and the coir is still retted in the shallows.",
      "Munroe Thuruthu is the reason to come. Eight islets where the Kallada river meets the lake, cut through by canals too narrow for anything but a canoe — you go at first light, with a man poling from the back, under coconut palms and past houses whose front step is the water. The land is slowly subsiding, which is why the old houses stand lower each year and why it should be seen now rather than later.",
      "Alumkadavu is ours. It is where the kettuvallam was built for the rice trade, where Babu Varghese converted the first one into something with a bedroom in it in the nineties, and where our founder was working while it happened. The boatyards are still there and still making them the same way, stitched with coir rather than nailed.",
    ],
    season:
      "November to March. Come out of the monsoon and the canals are at their fullest.",
    nights:
      "One or two, usually on the way between Trivandrum and the backwaters.",
    stayLength: "1–2 nights",
    arrive:
      "Kollam is an hour and a half south of Alappuzha and two hours north of Trivandrum airport.",
    collection: "backwaters",
    stays: [],
    routeStops: ["Munroe Island", "Alumkadavu"],
    image: {
      src: `${UNSPLASH}/photo-1583482011546-c327a8076798?auto=format&fit=crop&w=2400&q=80`,
      alt: "Sunrise at Munroe Thuruthu, a boatman poling between the islets",
      credit: "Marieke Weller",
    },
  },
  {
    id: "pathanamthitta",
    district: "Pathanamthitta",
    name: "Aranmula, Gavi and the forest",
    standfirst:
      "Pilgrim country, snake boats, and the road up into the reserve.",
    body: [
      "The least visited district in the south, and the most visited place in Kerala is in it: Sabarimala, where several million pilgrims walk up through the forest between November and January. It is not a sight to be seen — it is somebody else's devotion, and the season is a reason to avoid the roads rather than to use them.",
      "Aranmula is the other thing. A temple on the Pamba, the snake boat race at Onam where the boats carry a hundred rowers and the village is on the bank shouting, and the metal mirror that is made nowhere else on earth — polished bronze, not glass, by four or five families who still know how.",
      "Gavi is up in the hills, on the Periyar reserve's western edge, and a day there is forest, elephants, and nothing to buy.",
    ],
    season:
      "September to March. Onam, in August or September, is when the boats race.",
    nights:
      "A day on the way between the backwaters and the hills, or a night at Gavi.",
    stayLength: "A day",
    arrive:
      "Aranmula is an hour and a half from Alappuzha. Gavi is four hours from Kochi airport.",
    collection: "hills",
    stays: [],
    routeStops: [],
  },
  {
    id: "alappuzha",
    district: "Alappuzha",
    name: "The backwaters and Marari",
    standfirst:
      "Vembanad, the canals that feed it, and the beach on the other side of the road.",
    body: [
      "Alleppey is the town everyone means when they say backwaters. Canals through the middle of it, the rice barges moored along the bank, and behind it the whole system: a lake the size of a small county, the rivers coming into it, and the canals cut between them for the rice trade. People live on the banks the way people elsewhere live on a street. Boats are how the post arrives.",
      "The right way to see it is slowly and from the water, which is what the kettuvallam was built for. One night aboard is the usual and it is enough; the second night is for people who have discovered they do not want to get off. Around the water there are farm islands and old teak houses where you sleep on land and take a boat out in the morning.",
      "Ten kilometres west, Marari is what the coast was before anyone built on it: a fishing village, boats coming in at dawn, the catch sold on the sand. It is where people go after the boat, and where they stay longer than they planned.",
    ],
    season:
      "November to March is the settled weather. June to August is the monsoon, which is beautiful and wet in equal measure, and cheaper.",
    nights: "Three: one on a boat, two on the sand.",
    stayLength: "3 nights",
    arrive:
      "Cochin airport to Alappuzha, 85km, about two hours. The train from Ernakulam does it in forty minutes.",
    collection: "backwaters",
    stays: [
      "spice-coast-cruises",
      "purity",
      "marari-villas",
      "marari-beach-resort",
    ],
    routeStops: ["Alleppey", "The backwaters", "Mararikulam", "Arattupuzha"],
    boats: true,
    image: {
      src: `${UNSPLASH}/photo-1609828913552-f9138ed9e42d?auto=format&fit=crop&w=2400&q=80`,
      alt: "A kettuvallam moored under the palms on the Alappuzha backwaters",
      credit: "Dileep M",
    },
  },
  {
    id: "kottayam",
    district: "Kottayam",
    name: "Kumarakom and the eastern shore",
    standfirst:
      "The quiet side of the same lake, and the rubber country behind it.",
    body: [
      "Kumarakom is Vembanad from the other bank: a bird sanctuary, a handful of houses on the water, and none of Alleppey's traffic. The difference between the two shores is the difference between a town and a village, and which you want depends on whether you would rather walk to a shop or hear nothing at four in the afternoon.",
      "Behind it the district climbs into rubber. Kottayam is the town that taught Kerala to read — the first press, the first college, and a literacy rate that made the state famous — and it is Syrian Christian country, with churches older than anything in Europe's colonies and a kitchen worth the detour.",
      "Most people come for a night beside the lake and leave having eaten better than they expected.",
    ],
    season: "November to March.",
    nights: "Two, often as the calm half of a backwater week.",
    stayLength: "2 nights",
    arrive: "Cochin airport to Kumarakom, 75km, about two hours.",
    collection: "backwaters",
    stays: ["philipkuttys-farm", "kumarakom-lake-resort"],
    routeStops: ["Kumarakom"],
    image: {
      src: `${UNSPLASH}/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2400&q=80`,
      alt: "A houseboat on the Vembanad backwaters",
      credit: "Nature Photographer",
    },
  },
  {
    id: "idukki",
    district: "Idukki",
    name: "Munnar, Thekkady and the high range",
    standfirst:
      "Tea to the horizon, cardamom under it, and a lake with a forest around it.",
    body: [
      "Munnar is the high range: hills planted with tea in every direction until the planting stops and the grassland starts, at sixteen hundred metres, cold enough at night that guests who packed for the backwaters spend the first evening buying a shawl. Stay on an estate rather than in the town — the difference is the difference between a view and a place.",
      "Thekkady is the other half of the district and a different climate: cardamom, pepper and coffee, and the smell of them on the road in. Periyar is the reserve, a reservoir made a century ago with drowned trees still standing in it, and elephant and gaur in the forest around it. The boat on the lake is what everyone does; the better hours are walking with a guide, or in a spice garden with somebody who can tell you what you are smelling.",
      "Together they are the middle of a Kerala journey — down out of the tea, two nights in the spice hills, then on to the water.",
    ],
    season:
      "September to May. The monsoon shuts the views in cloud, though the tea has never looked better than it does wet.",
    nights: "Two in each, and three in Munnar if you are walking.",
    stayLength: "4 nights",
    arrive:
      "Cochin airport to Munnar, 110km, three and a half hours — a slow, climbing road, and the drive is part of it. Thekkady is three hours on from Munnar.",
    collection: "hills",
    stays: ["windermere-estate", "shalimar-spice-garden"],
    routeStops: ["Munnar", "Thekkady", "Periyar"],
    image: {
      src: `${UNSPLASH}/photo-1711192702535-eac61a78ecb0?auto=format&fit=crop&w=2400&q=80`,
      alt: "Tea slopes and the high range above Munnar",
      credit: "zablanca_clicks",
    },
  },
  {
    id: "ernakulam",
    district: "Ernakulam",
    name: "Fort Kochi and the Periyar",
    standfirst:
      "Four hundred years of trading port, on a peninsula you can walk across.",
    body: [
      "The Portuguese came first, then the Dutch, then the British, and all three built here and left. What remains is a few square kilometres of godowns, churches and merchants' houses on a headland, with the container port working away on the other side of the water. It is a walking place, which in India is rarer than it sounds.",
      "The Chinese fishing nets on the seafront, Portuguese houses with the paint coming off them, and a coffee at four while the cargo ships queue outside. In the evening there is Kathakali, and if you have never seen it, see it.",
      "Walk south into Mattancherry for Jew Town. The Paradesi synagogue at the end of Jew Street was built in 1568 and is still in use — a clock tower, Belgian chandeliers, and a floor of hand-painted Chinese tiles, no two of them the same. The street leading to it is spice godowns and antique shops, ginger and pepper still stacked in sacks at the doors, and the Dutch Palace at the other end has Ramayana murals worth the queue. An hour walked slowly here is the best hour in Kochi.",
      "Inland the district follows the Periyar river up towards the forest, past Muziris — the port that traded with Rome and then silted up and vanished — and on to the bird country at Thattekad. Most journeys begin or end at Kochi because the airport is close and the flights are good, which makes it easy to treat as an arrival hall. It is worth two nights of its own.",
    ],
    season:
      "Any month. December to February is the most comfortable; the Biennale, when it runs, fills the winter.",
    nights: "Two.",
    stayLength: "2 nights",
    arrive: "Cochin airport to Fort Kochi, 40km, an hour and a quarter.",
    collection: "kochi",
    stays: [
      "malabar-house",
      "old-harbour-hotel",
      "tea-bungalow",
      "the-old-courtyard-hotel",
      "gramam-homestay",
      "cranganor",
    ],
    routeStops: ["Kochi", "Fort Kochi"],
    image: {
      src: `${UNSPLASH}/photo-1590123732197-e7079d2ceb89?auto=format&fit=crop&w=2400&q=80`,
      alt: "A Chinese fishing net on the Kochi waterfront",
      credit: "gaurav kumar",
    },
  },
  {
    id: "thrissur",
    district: "Thrissur",
    name: "Athirappilly and the Pooram",
    standfirst: "The state's loudest festival, and its best-known waterfall.",
    body: [
      "Thrissur calls itself the cultural capital and has the festival to argue it. The Pooram, in April or May, is two temples competing with elephants, parasols and a percussion ensemble two hundred strong — it runs for thirty-six hours, ends in fireworks before dawn, and is not a thing to wander into unprepared.",
      "Athirappilly is the waterfall everyone has seen without knowing where it is: eighty feet across the Chalakudy river at the edge of the Sholayar forest, at its most absurd in the weeks after the rains.",
      "Guruvayur, north of the town, is one of the most visited temples in India and closed to non-Hindus, which is worth knowing before a driver takes you there.",
    ],
    season:
      "The falls are best from September to December. The Pooram is April or May, and the town is full.",
    nights:
      "A day from Kochi, or a night if you are going to the falls properly.",
    stayLength: "A day",
    arrive:
      "Athirappilly is two hours from Cochin airport; Thrissur town an hour and a half.",
    collection: "kochi",
    stays: [],
    routeStops: [],
    image: {
      src: `${UNSPLASH}/photo-1575305327780-a887f284432f?auto=format&fit=crop&w=2400&q=80`,
      alt: "The Athirappilly falls on the Chalakudy river",
      credit: "Rashi Raffi",
    },
  },
  {
    id: "palakkad",
    district: "Palakkad",
    name: "The gap, and the rice country",
    standfirst:
      "The one break in the Western Ghats, and the paddy that grows because of it.",
    body: [
      "The Palakkad gap is a thirty-kilometre hole in a mountain range that otherwise runs a thousand kilometres unbroken, and it explains a great deal about Kerala: the trade came through it, the Tamil influence came through it, and so does the wind. The district is the flattest and the hottest in the state, and the greenest in the growing season — this is where the rice comes from.",
      "Kalpathy, on the edge of Palakkad town, is a Tamil brahmin village of agraharam streets and a chariot festival in November. Nelliyampathy is the hill station above, quieter than Munnar and with oranges instead of tea. Silent Valley, north of it, is one of the last undisturbed tracts of rainforest in India and is entered by permit.",
      "Almost nobody stays here, which is precisely the argument for a night if you like places that are not arranged for you.",
    ],
    season: "November to February. April and May are genuinely hot.",
    nights: "One, usually on the way to or from Tamil Nadu.",
    stayLength: "1 night",
    arrive:
      "Two and a half hours from Cochin airport, and the road to Coimbatore runs through it.",
    collection: "hills",
    stays: [],
    routeStops: [],
    image: {
      src: `${UNSPLASH}/photo-1662535330891-877130e86a23?auto=format&fit=crop&w=2400&q=80`,
      alt: "Paddy and hills at Akathethara, under a monsoon sky",
      credit: "Hariprasad B",
    },
  },
  {
    id: "malappuram",
    district: "Malappuram",
    name: "Nilambur and the teak",
    standfirst:
      "The oldest teak plantation in the world, and the Malabar kitchen.",
    body: [
      "Malappuram is the most Muslim district in Kerala and the one least arranged for visitors, which shows in the food more than anywhere: this is where the biryani is worth the argument, where pathiri replaces appam, and where a wedding feast runs to courses nobody outside Malabar has heard of.",
      "Nilambur has the Conolly's Plot teak plantation, planted in 1846 and the first in the world, with trees you cannot get your arms around. The Nilambur–Shoranur railway line runs through country worth the ticket on its own.",
      "Kadalundi, on the coast, is a bird sanctuary where the river meets the sea, and it fills with waders between November and April.",
    ],
    season: "November to March.",
    nights: "A day, on the way north.",
    stayLength: "A day",
    arrive:
      "Kozhikode airport is in the district, forty minutes from Nilambur.",
    collection: "coast",
    stays: [],
    routeStops: [],
  },
  {
    id: "kozhikode",
    district: "Kozhikode",
    name: "Calicut and Beypore",
    standfirst:
      "Where Vasco da Gama landed, and where the dhows are still built.",
    body: [
      "Calicut was the greatest port on this coast for six hundred years — the Zamorin's city, where the Chinese fleets came and where da Gama arrived in 1498 at Kappad, a beach now marked by a small stone that understates the consequences considerably.",
      "Beypore, at the mouth of the river, still builds uru — ocean-going dhows, by eye and by hand, for owners in the Gulf. The yard is open to anyone who walks in, and watching a hull the size of a building take shape without a drawing is the best hour in the district.",
      "The city is also, by common agreement, the best place to eat in Kerala. Come hungry, and ask anybody.",
    ],
    season: "November to March.",
    nights: "One, and two if you eat properly.",
    stayLength: "1–2 nights",
    arrive:
      "Kozhikode airport is forty minutes from the city; Wayanad is two and a half hours up the ghat.",
    collection: "coast",
    stays: [],
    routeStops: ["Kozhikode", "Calicut"],
  },
  {
    id: "wayanad",
    district: "Wayanad",
    name: "The plateau",
    standfirst:
      "Up the ghat road into coffee, and the oldest human marks in the state.",
    body: [
      "Wayanad is the only district with no coast, and it feels like a different state: a plateau at nine hundred metres, coffee and pepper under the trees rather than tea on open hills, and forest that runs on into Karnataka and Tamil Nadu as one of the last corridors elephants can still use.",
      "The Edakkal caves have petroglyphs cut into them that are at least six thousand years old — stick figures, wheels, a man with a headdress — reached by a climb that will take an hour of your morning.",
      "Banasura Sagar is the reservoir, the largest earth dam in India, with islands that appear as the water drops. The district was badly hit by landslides in recent years; ask before travelling in heavy monsoon.",
    ],
    season: "October to May. The monsoon here is serious.",
    nights: "Two.",
    stayLength: "2 nights",
    arrive:
      "Kozhikode airport to Wayanad, 95km, two and a half hours up the ghat road.",
    collection: "hills",
    stays: [],
    routeStops: ["Wayanad"],
    image: {
      src: `${UNSPLASH}/photo-1607025188828-be77a08aa372?auto=format&fit=crop&w=2400&q=80`,
      alt: "Banasura Sagar and the hills of Wayanad",
      credit: "Jyoti Singh",
    },
  },
  {
    id: "kannur",
    district: "Kannur",
    name: "Theyyam country",
    standfirst: "Where men become gods for a night, from December to April.",
    body: [
      "Theyyam is the reason to plan a journey around a calendar. It is not a performance for anybody: a village ritual in which a man in costume and firelight becomes a deity, speaks as one, and is consulted as one — it runs in the shrines of north Malabar through the cool months, most nights, somewhere. Being taken to one by somebody who knows the family is an entirely different experience from watching one, which is the whole argument for going with people who are from here.",
      "The rest of the district is quietly remarkable. Muzhappilangad is the only beach in India you are allowed to drive along, four kilometres of hard sand. Thalassery gave the world its biryani and, less probably, taught India cricket. The Kannur fort is Portuguese, then Dutch, then British, in the usual order.",
      "There are no crowds up here, and the coast is almost entirely unbuilt.",
    ],
    season:
      "December to April, which is both the good weather and the Theyyam season.",
    nights: "Two, three if you are following the shrines.",
    stayLength: "2–3 nights",
    arrive:
      "Kannur has its own international airport, twenty minutes from the town.",
    collection: "coast",
    stays: [],
    routeStops: ["Kannur", "Thalassery", "The Malabar coast"],
    image: {
      src: `${UNSPLASH}/photo-1551292083-5d458a10336d?auto=format&fit=crop&w=2400&q=80`,
      alt: "A Theyyam being dressed in north Malabar",
      credit: "Vineeth Vinod",
    },
  },
  {
    id: "kasaragod",
    district: "Kasaragod",
    name: "Bekal, Neeleshwar and Valiyaparamba",
    standfirst:
      "The last district before Karnataka, and the emptiest coast in the state.",
    body: [
      "Kasaragod is the far north, closer to Mangalore than to anywhere in Kerala, and it speaks four languages before breakfast — Malayalam, Tulu, Kannada and Beary. It is the least developed coast in the state and the most beautiful stretch of it.",
      "Bekal fort sits on a headland above the sea, three hundred and fifty years old and built as an observation post, and it is the one thing here everybody photographs. Valiyaparamba is the backwater: a long island between the river and the sea, with ferries instead of roads and almost nobody on it.",
      "Neeleshwar has the beach. This suits a second visit to Kerala better than a first, and it rewards people who like the feeling of having gone further than they needed to.",
    ],
    season: "November to March.",
    nights: "Three or four, because it is a long way to come for less.",
    stayLength: "3–4 nights",
    arrive:
      "Kannur airport to Bekal, 75km, two hours. Mangalore airport is an hour and a half away.",
    collection: "coast",
    stays: ["neeleshwar-hermitage"],
    routeStops: [],
    image: {
      src: `${UNSPLASH}/photo-1698070010241-1ac4d4273dff?auto=format&fit=crop&w=2400&q=80`,
      alt: "Fishing boats on the Kasaragod shore",
      credit: "Praswin Prakashan",
    },
  },
];

/* The collections the rest of the country is arranged in. */
export const BEYOND: { collection: Collection; note: string }[] = [
  {
    collection: "konkan",
    note: "The coast north of Kerala: Goa where it is still a village, and the Konkan above it where nobody has built anything at all.",
  },
  {
    collection: "rajasthan",
    note: "Forts, havelis and the desert, and the small places in them that are not hotels so much as houses that take guests.",
  },
  {
    collection: "cities",
    note: "Delhi, Bombay, Calcutta — where a journey lands and where it leaves from, and worth a night more than most people give them.",
  },
  {
    collection: "north",
    note: "Ladakh, Sikkim, the tea estates of Darjeeling and the islands in the Andaman Sea. The long way from Kerala, in every sense.",
  },
];

/* Look-ups the pages use rather than repeating a find(). */
export function district(id: string) {
  return KERALA.find((place) => place.id === id);
}

export function neighbours(id: string) {
  const index = KERALA.findIndex((place) => place.id === id);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? KERALA[index - 1] : KERALA[KERALA.length - 1],
    next: index < KERALA.length - 1 ? KERALA[index + 1] : KERALA[0],
  };
}
