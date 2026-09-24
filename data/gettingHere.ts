/*
  How you actually reach Kerala, as data.

  Distances are road distances and the times are what a driver will
  really take, not what a mapping app promises with an empty road. Where
  the two disagree the honest number is the slower one, and saying so is
  worth more to somebody planning a first trip than optimism is.
*/

export interface Airport {
  code: string;
  name: string;
  /* The town an airport is actually in, which is rarely its name. */
  city: string;
  /* What a traveller calls it. Nobody says "Nedumbassery". */
  short: string;
  lat: number;
  lon: number;
  /* What this one is the right answer for. */
  serves: string;
  note: string;
}

export interface Place {
  name: string;
  lat: number;
  lon: number;
  /* Drawn smaller, and only labelled on a wide screen. */
  minor?: boolean;
}

export interface Leg {
  /*
    Which airport this leg starts from, so the list can be filtered on a
    key rather than by matching the words in "from" — the first version
    tested three different substrings and happened to work, which is not
    the same as working.
  */
  airport: string;
  from: string;
  to: string;
  km: number;
  hours: string;
  by: string;
}

export const airports: Airport[] = [
  {
    code: "COK",
    short: "Cochin",
    name: "Cochin International",
    city: "Nedumbassery, Kochi",
    lat: 10.152,
    lon: 76.4019,
    serves: "The backwaters, Fort Kochi, the tea country",
    note: "The one to aim for. Busiest in the state, best connected to the Gulf, and closest to the water — which is where most journeys begin.",
  },
  {
    code: "TRV",
    short: "Trivandrum",
    name: "Thiruvananthapuram International",
    city: "Thiruvananthapuram",
    lat: 8.4821,
    lon: 76.92,
    serves: "The far south, Kovalam, Varkala",
    note: "Right for a journey that starts in the south, and for the Maldives and Sri Lanka connections. Three hours from Alappuzha by road.",
  },
  {
    code: "CCJ",
    short: "Kozhikode",
    name: "Kozhikode International",
    city: "Karipur, Kozhikode",
    lat: 11.1362,
    lon: 75.9553,
    serves: "Wayanad, the northern Malabar coast",
    note: "The sensible arrival for Wayanad and the north. Fewer long-haul connections, so usually reached through Bengaluru or a Gulf hub.",
  },
  {
    code: "CNN",
    short: "Kannur",
    name: "Kannur International",
    city: "Mattanur, Kannur",
    lat: 11.9186,
    lon: 75.547,
    serves: "The far north, Neeleshwar, Bekal",
    note: "Newest of the four and the quietest. Worth it if you are going straight to the northern beaches rather than through them.",
  },
];

export const places: Place[] = [
  { name: "Fort Kochi", lat: 9.9658, lon: 76.2421 },
  { name: "Alappuzha", lat: 9.4981, lon: 76.3388 },
  { name: "Kumarakom", lat: 9.6178, lon: 76.43 },
  { name: "Munnar", lat: 10.0889, lon: 77.0595 },
  { name: "Thekkady", lat: 9.5939, lon: 77.1592 },
  { name: "Kollam", lat: 8.8932, lon: 76.6141, minor: true },
  { name: "Varkala", lat: 8.7379, lon: 76.7163, minor: true },
  { name: "Kovalam", lat: 8.4004, lon: 76.9787, minor: true },
  { name: "Wayanad", lat: 11.6054, lon: 76.0862 },
  { name: "Bekal", lat: 12.3925, lon: 75.0353, minor: true },
];

/*
  The legs people actually ask about. Times allow for the fact that most
  of these roads are single carriageway and go through towns.
*/
export const legs: Leg[] = [
  { airport: "COK", from: "Cochin airport", to: "Alappuzha", km: 85, hours: "2 hours", by: "Road" },
  { airport: "COK", from: "Cochin airport", to: "Kumarakom", km: 75, hours: "2 hours", by: "Road" },
  { airport: "COK", from: "Cochin airport", to: "Fort Kochi", km: 40, hours: "1 hour 15", by: "Road" },
  { airport: "COK", from: "Cochin airport", to: "Munnar", km: 110, hours: "3 hours 30", by: "Road" },
  { airport: "COK", from: "Ernakulam", to: "Alappuzha", km: 55, hours: "40 minutes", by: "Train" },
  { airport: "TRV", from: "Trivandrum airport", to: "Alappuzha", km: 150, hours: "3 hours", by: "Road" },
  { airport: "TRV", from: "Trivandrum airport", to: "Kovalam", km: 15, hours: "30 minutes", by: "Road" },
  { airport: "CCJ", from: "Kozhikode airport", to: "Wayanad", km: 95, hours: "2 hours 30", by: "Road" },
  { airport: "CNN", from: "Kannur airport", to: "Bekal", km: 75, hours: "2 hours", by: "Road" },
];
