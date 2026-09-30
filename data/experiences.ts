/*
  Things to do on the water, which is not the same as a houseboat.

  The houseboat pages answer "where do I sleep". This answers "what do
  I do with a morning", and it is the question the enquiries kept
  arriving with: people who had already decided on the boat and wanted
  to know what else the backwaters were for.

  Four of them, and they are deliberately not four versions of the same
  ride. A shikara is an hour of ease. A country canoe is a village at
  first light. A kayak is work. The state ferry is not an excursion at
  all — it is the bus, and it is on this page because for some guests it
  turns out to be the best thing they do.

  No prices. Every figure we could publish today would be somebody
  else's — the district tourism office lists shikara and motor boats at
  four hundred to a thousand rupees an hour, which is the market rather
  than a quotation from us, and a number on this page would read as a
  promise we had not made. They go in when Surjith sets his own, and
  they are a data change rather than a design one.

  Photographs: ours where we have one, licensed where we do not, as the
  district pages do it. The shikara, the kayak and the ferry are ours.
  The canoe is licensed and should be the first to go when a photograph
  of our own turns up.

  The frames are three by two throughout, which is what these particular
  pictures want: a boat is a long horizontal thing, and the ferry
  photograph is wider still, so a squarer frame took the bow off it.
*/

const UNSPLASH = "https://images.unsplash.com";

export type Experience = {
  id: string;
  title: string;
  standfirst: string;
  body: string[];
  /* The practical column. Short answers, in the order people ask them. */
  facts: { label: string; value: string }[];
  image: { src: string; alt: string };
  /* What the enquiry says when somebody presses the button on this one. */
  enquiry: string;
};

export const experiences: Experience[] = [
  {
    id: "shikara",
    title: "The shikara",
    standfirst: "An hour on the water, in a boat small enough for the canals.",
    body: [
      "A shikara is a small covered boat with a few chairs under a canopy and an engine at the back. It goes where a kettuvallam cannot: the narrow canals behind Alappuzha, the paddy bunds of Kuttanad, the shallow edges of Vembanad where the fishing happens and the big boats draw too much water.",
      "It is taken by the hour, and two or three is the usual. The best hour of the lot is the last one before dark, when the light goes gold and then goes quickly, and the working boats are heading home.",
    ],
    facts: [
      { label: "Where", value: "Alappuzha and Kumarakom" },
      { label: "How long", value: "One to three hours" },
      { label: "Best at", value: "Late afternoon, into dusk" },
      { label: "Suits", value: "Anyone. No effort required" },
    ],
    image: {
      src: "/images/experiences/shikara.webp",
      alt: "A thatched shikara on the Alappuzha backwaters at sunset, village and palms behind",
    },
    enquiry:
      "Hello HORIZONS, I would like to ask about a shikara ride on the backwaters.",
  },
  {
    id: "canoe",
    title: "The country canoe",
    standfirst: "First light, a narrow canoe, and a man poling from the back.",
    body: [
      "If you do one thing on this page, do this one. A country canoe draws a few inches of water and goes into canals a shikara is too wide for — the ones that run between houses, where the front step of a home is the water and the bus is a boat.",
      "Munroe Thuruthu, where the Kallada river meets Ashtamudi, is the place for it; the Kuttanad villages behind Alappuzha are the other. You go at first light, because that is when the water is still and the village is waking rather than performing.",
    ],
    facts: [
      { label: "Where", value: "Munroe Thuruthu, and Kuttanad" },
      { label: "How long", value: "Two to three hours" },
      { label: "Best at", value: "Sunrise. It matters here" },
      { label: "Suits", value: "Anyone who can sit still" },
    ],
    image: {
      src: `${UNSPLASH}/photo-1583482011546-c327a8076798?auto=format&fit=crop&w=2000&q=80`,
      alt: "A boatman poling a narrow canoe at sunrise on Munroe Island",
    },
    enquiry:
      "Hello HORIZONS, I would like to ask about a village canoe trip on the backwaters.",
  },
  {
    id: "kayaking",
    title: "Kayaking",
    standfirst: "Your own paddle, at sunrise, on water with nothing on it yet.",
    body: [
      "The difference between this and the canoe is that nobody is doing it for you. Two hours before breakfast, out through the Punnamada canals and onto the open lake, with tea waiting when you come back in.",
      "It suits people who would rather earn the view than be shown it. No experience is needed on flat water, but the monsoon months are not the time — the current through the canals between June and September is a serious thing rather than a picturesque one.",
    ],
    facts: [
      { label: "Where", value: "Punnamada and Vembanad, at Alappuzha" },
      { label: "How long", value: "Two hours, or a half day" },
      { label: "Season", value: "November to May" },
      { label: "Suits", value: "Anyone reasonably fit" },
    ],
    image: {
      src: "/images/experiences/kayaking.webp",
      alt: "A tandem kayak on open water, seen from above",
    },
    enquiry:
      "Hello HORIZONS, I would like to ask about kayaking on the backwaters.",
  },
  {
    id: "ferry",
    title: "The public ferry",
    standfirst: "Not an excursion. Simply how people here cross the water.",
    body: [
      "The state ferries have been running these routes since long before anybody thought to sell a backwater. Alappuzha to Kottayam takes about two and a half hours through canal and open lake; the Kochi boats cross the harbour between Fort Kochi, Vypin and Ernakulam all day long.",
      "You buy a ticket for the price of a cup of tea and sit among people going to work, to school, to the market. It is the cheapest thing on this page by a very long way, and a fair number of our guests come back saying it was the best.",
    ],
    facts: [
      { label: "Where", value: "Alappuzha to Kottayam; Kochi harbour" },
      { label: "How long", value: "Twenty minutes to two and a half hours" },
      { label: "Timetable", value: "Government run, and it changes" },
      { label: "Suits", value: "Travellers rather than sightseers" },
    ],
    image: {
      src: "/images/experiences/ferryboat.webp",
      alt: "A State Water Transport ferry on the backwaters with passengers aboard",
    },
    enquiry:
      "Hello HORIZONS, I would like to ask about taking the public ferries in Kerala.",
  },
];
