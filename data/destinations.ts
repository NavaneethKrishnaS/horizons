/*
  Where we would take you, place by place.

  Kerala gets the words because Kerala is what we know: six places, each
  with what it actually is, when it is worth coming, how long to give it
  and how far it is from the aeroplane. The distances are not new — they
  are the same figures the getting-here page uses, so the two pages
  cannot disagree.

  Everything a place claims to hold is checked against the catalogue by
  slug. A stay that is renamed follows its link; a stay that is removed
  disappears from here rather than becoming a dead one.

  The rest of India is deliberately thinner. We work across it, we have
  sixty-five houses on the books and thirty-nine journeys that cross it,
  but the backwaters are where we are from and pretending otherwise on
  our own destinations page would be the first dishonest thing on the
  site.
*/

import type { Collection } from "./stays";

export type Destination = {
  id: string;
  name: string;
  standfirst: string;
  body: string[];
  season: string;
  nights: string;
  arrive: string;
  collection: Collection;
  /* Slugs, checked against data/stays.ts and data/packages.ts. */
  stays: string[];
  journeys: string[];
  /* True where the boats we run ourselves go. */
  boats?: boolean;
};

export const KERALA: Destination[] = [
  {
    id: "backwaters",
    name: "The backwaters",
    standfirst: "Vembanad, the canals that feed it, and the villages that live on both.",
    body: [
      "Nine hundred kilometres of water behind the coast, joined up: a lake the size of a small county, the rivers coming down into it, and the canals cut between them for the rice trade. People live on the banks the way people elsewhere live on a street. Boats are how the post arrives.",
      "The right way to see it is slowly and from the water, which is what the kettuvallam was built for — a rice barge with a bedroom in it. One night aboard is the usual and it is enough; the second night is for people who have discovered they do not want to get off. Around the water there are farm islands and old teak houses where you sleep on land and take a boat out in the morning.",
      "Alleppey is the town everyone means when they say backwaters, and it is where the boats leave from. Kumarakom is the quieter side of the same lake. We are from Alumkadavu, twenty minutes further south, which is where the boats were built before anyone thought of putting a guest in one.",
    ],
    season: "November to March is the settled weather. June to August is the monsoon, which is beautiful and wet in equal measure, and cheaper.",
    nights: "Two or three, with one of them on a boat.",
    arrive: "Cochin airport to Alappuzha, 85km, about two hours. Kumarakom is 75km, the same two hours. The train from Ernakulam does it in forty minutes.",
    collection: "backwaters",
    stays: ["philipkuttys-farm", "purity", "kumarakom-lake-resort", "vismaya-lake-heritage", "spice-coast-cruises"],
    journeys: ["kochi-to-kollam", "kerala-unhurried", "epics-of-kerala"],
    boats: true,
  },
  {
    id: "kochi",
    name: "Fort Kochi",
    standfirst: "Four hundred years of trading port, on a peninsula you can walk across.",
    body: [
      "The Portuguese came first, then the Dutch, then the British, and all three built here and left. What is left is a few square kilometres of godowns, churches and merchants' houses on a headland, with the container port working away on the other side of the water.",
      "It is a walking place, which in India is rarer than it sounds. The Chinese fishing nets on the seafront, the synagogue and the spice warehouses in Mattancherry, Portuguese houses with the paint coming off them, and a coffee at four in the afternoon while the cargo ships queue outside. In the evening there is Kathakali, and if you have never seen it, see it.",
      "Most journeys begin or end here because the airport is close and the flights are good, which makes it easy to treat as an arrival hall. It is worth two nights of its own.",
    ],
    season: "Any month. December to February is the most comfortable; the Biennale, when it runs, fills the winter.",
    nights: "Two.",
    arrive: "Cochin airport to Fort Kochi, 40km, an hour and a quarter.",
    collection: "kochi",
    stays: ["malabar-house", "old-harbour-hotel", "tea-bungalow", "the-old-courtyard-hotel", "gramam-homestay"],
    journeys: ["kochi-to-kollam", "kochi-to-chennai", "epics-of-kerala"],
  },
  {
    id: "munnar",
    name: "Munnar",
    standfirst: "Tea to the horizon, at sixteen hundred metres, and cold enough for a blanket.",
    body: [
      "The high range. Hills planted with tea in every direction until the planting stops and the grassland starts, and in the middle of it a small town that is not the reason to come. The reason is the road up, the light in the morning, and how quiet it is once you are out of the town.",
      "Stay on an estate rather than in Munnar itself. The difference is the difference between a view and a place. From one you walk out into the tea before breakfast; from the other you sit in traffic.",
      "It is cold at night, properly cold by Indian standards, and nobody expects it. Bring something warm — guests who packed for the backwaters spend the first evening buying a shawl.",
    ],
    season: "September to May. The monsoon shuts the views in cloud, though the tea has never looked better than it does wet.",
    nights: "Two. Three if you are walking.",
    arrive: "Cochin airport to Munnar, 110km, three and a half hours — a slow, climbing road, and the drive is part of it.",
    collection: "hills",
    stays: ["windermere-estate", "windermere-river-house"],
    journeys: ["the-high-range", "kerala-unhurried", "misty-south-india"],
  },
  {
    id: "thekkady",
    name: "Thekkady and the Periyar",
    standfirst: "Spice country, and a lake with a forest around it.",
    body: [
      "Cardamom, pepper and coffee grow on these hills, and the smell of them is the first thing you notice on the road in. Periyar is the reserve: a reservoir made a century ago, drowned trees still standing in it, and elephant, gaur and sometimes tiger in the forest around.",
      "The boat on the lake is what everyone does. Go at first light, take the earliest one, and accept that it is a lake with animals on the shore rather than a safari. The better hours are spent walking with a guide from the settlement, or in the spice gardens with somebody who can tell you what you are smelling.",
      "It sits naturally between Munnar and the backwaters, which is how most people take it — down out of the tea, two nights in the spice hills, then on to the water.",
    ],
    season: "September to March. The lake is fullest after the rains and the animals come down to it in the dry months.",
    nights: "Two.",
    arrive: "Four hours from Cochin airport, or three from Munnar over the top.",
    collection: "hills",
    stays: ["shalimar-spice-garden"],
    journeys: ["the-high-range", "epics-of-kerala", "kerala-with-children"],
  },
  {
    id: "coast",
    name: "The Kerala coast",
    standfirst: "Marari, Varkala, and the long sand between them.",
    body: [
      "Five hundred kilometres of coast, and almost none of it built up the way a coast usually is. Marari is a fishing village with a beach in front of it where the boats come in at dawn and the catch is sold on the sand; Varkala is the other thing entirely, a red cliff with the beach at the bottom of it and a spring where the water comes out of the rock.",
      "This is where a journey ends rather than begins. After the boats and the hills, people want three days of nothing, and the coast is where nothing is done best — a room fifty metres from the water, fish for lunch, and no schedule at all.",
      "The sea has a temper in the monsoon and is flat and warm the rest of the year. Swimming is safe at Marari and requires more care at Varkala, where the currents matter.",
    ],
    season: "November to March for the sea. April and May are hot and still good if you stay in the water.",
    nights: "Three, and people always wish they had said four.",
    arrive: "Marari is an hour from Alappuzha. Trivandrum airport to Kovalam is 15km, half an hour; Varkala is an hour north of it.",
    collection: "coast",
    stays: ["marari-villas", "marari-beach-resort", "villa-jacaranda"],
    journeys: ["kerala-unhurried", "kerala-with-children", "epics-of-kerala"],
  },
  {
    id: "malabar",
    name: "North Malabar",
    standfirst: "Theyyam country, and the part of Kerala nobody sends you to.",
    body: [
      "North of Kozhikode the state changes. Fewer visitors, more Muslim and Malabari than the south, the food different enough to notice — biryani and pathiri rather than appam and stew — and the coast almost empty.",
      "Theyyam is the reason to plan around the calendar. It is not a performance for anybody: a village ritual in which a man becomes a god for a night, in costume and firelight, and it runs in the shrines through the cool months. Being taken to one by somebody who knows the family is a different experience from watching one, which is the whole argument for going with people who are from here.",
      "Bekal has the fort on the headland, Wayanad has the hills and the wildlife inland, and Neeleshwar has a beach with nothing on it. It suits a second visit to Kerala better than a first.",
    ],
    season: "December to April, which is both the good weather and the Theyyam season.",
    nights: "Three or four, because it is a long way to come for less.",
    arrive: "Kannur airport to Bekal, 75km, two hours. Kozhikode airport to Wayanad, 95km, two and a half.",
    collection: "coast",
    stays: ["neeleshwar-hermitage"],
    journeys: ["kerala-in-guesthouses"],
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
