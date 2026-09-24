import { collections, stays } from "@/data/stays";
import { packages, spelled } from "@/data/packages";
import { REPLY } from "@/data/contact";

/*
  The questions people actually ask, answered.

  Two rules held here. Every answer is ours or a fact — nothing is
  lifted from another operator's page, because another operator's
  answers are their commercial terms and not ours. And every number is
  read from the data rather than typed, so the page cannot quietly
  become wrong when a property is added or a journey dropped.

  What is deliberately absent: deposits, cancellation, refunds, payment
  methods, children, dietary requirements, insurance, alcohol, and
  whether we arrange flights. Those are policy, we have not written
  them down yet, and a guessed answer to "what happens if I cancel" is
  worse than no answer at all. They go in when Surjith has settled
  them.
*/

export interface Question {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  questions: Question[];
}

/*
  Numbers are spelled out with the journeys page's own helper rather
  than a second copy of it — a numeral dropped into a line of prose
  reads as a price, and two helpers would eventually disagree.
*/
const keralaStays = stays.filter((stay) => stay.from === 0).length;

const capital = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const faq: FaqGroup[] = [
  {
    id: "planning",
    label: "Planning a journey",
    questions: [
      {
        q: "How do I start?",
        a: "Tell us who is travelling, roughly when, and what you did the week before. That is enough to begin. We come back with a shortlist — including the things we would talk you out of — and it goes from there.",
      },
      {
        q: "How quickly will I hear back?",
        a: `${REPLY.promise} We are in India, on ${REPLY.hours.toLowerCase()}, so a message sent from Europe in the evening is usually answered while you sleep.`,
      },
      {
        q: "Are the journeys on the site fixed?",
        a: `None of them is. They are the ${spelled(packages.length)} routes we know best, and most of what we actually run is one of them adjusted — longer here, shorter there, or two of them joined. Tell us what you had in mind instead.`,
      },
      {
        q: "Why are there no prices on the journeys?",
        a: "Because a journey is quoted rather than priced. The same route costs one thing for two people travelling in February and another for six in July, and publishing a number that is wrong for almost everybody helps nobody. Ask, and you get a real figure for your dates and your party.",
      },
      {
        q: "Who will I be dealing with?",
        a: "One of the people who plans the journeys. There is no enquiry desk and no ticket number — there are not many of us, which is the point, and the company has been arranging travel in South India for the better part of three decades.",
      },
      {
        q: "Can you arrange a journey outside Kerala?",
        a: `Yes. Kerala is home and it is where we are strongest, but the journeys run across ${spelled(collections.length)} regions of India, from the Konkan and Goa up to Rajasthan, the cities, Darjeeling and the Andamans.`,
      },
    ],
  },
  {
    id: "houseboats",
    label: "Houseboats",
    questions: [
      {
        q: "What time is check-in and check-out?",
        a: "Check-in starts at 12:00, and check-out is at 09:00 the next morning. The boat is yours from noon: lunch is served on board not long after you step on.",
      },
      {
        q: "Are meals included?",
        a: "Yes. A welcome drink, lunch, evening tea with snacks, dinner and breakfast the next morning are all included and cooked on board.",
      },
      {
        q: "Does the houseboat cruise through the night?",
        a: "No, and no houseboat in Kerala does. Boats anchor in the evening — local navigation regulations require it — which is the quietest part of the whole trip and, for most guests, the part they remember.",
      },
      {
        q: "Are the bedrooms air-conditioned?",
        a: "Yes, during the scheduled operating hours. The generator does not run all night, which is deliberate: the backwaters at three in the morning are worth hearing.",
      },
      {
        q: "How many people fit on a houseboat?",
        a: "The one-bedroom boat takes two guests comfortably. The two-bedroom boat takes up to seven. Larger parties are arranged as more than one boat travelling together.",
      },
    ],
  },
  {
    id: "stays",
    label: "Where you stay",
    questions: [
      {
        q: "Are these your own hotels?",
        a: `No. Every one of them is independent — family houses, small hotels, camps and houseboats belonging to the people who run them. We book them, and we are answerable to you for them, which is a different thing from owning them.`,
      },
      {
        q: "How many places do you work with?",
        a: `${capital(spelled(stays.length))} at the moment, across ${spelled(collections.length)} regions — and ${spelled(keralaStays)} of those are in Kerala, where we live. None of them is a chain.`,
      },
      {
        q: "How were they chosen?",
        a: "By staying in them, mostly, or by sending people we know and listening carefully afterwards. We have stood in most of them. The ones we would not send our own family to are not on the list.",
      },
      {
        q: "Whose photographs are on the site?",
        a: "Each property's own. We do not put stock photography under the name of a place somebody might sleep in — if a property has not sent us its pictures, its page says so rather than borrowing somebody else's backwater.",
      },
    ],
  },
  {
    id: "when",
    label: "When to come",
    questions: [
      {
        q: "When is the best time to visit Kerala?",
        a: "October to March, and December to February most of all: dry, clear, and warm without being punishing. It is also when everybody else comes, so the good rooms go early.",
      },
      {
        q: "What is it like during the monsoon?",
        a: "The south-west monsoon runs roughly June to September and a second, lighter one comes through in October and November. It rains hard and then stops; the state turns an almost unreasonable green, the light is extraordinary, and there is nobody about. It is not the wrong time to come — it is simply a different trip.",
      },
      {
        q: "And April and May?",
        a: "Hot and humid at sea level. The hill country — Munnar, Wayanad, the tea estates — is the sensible answer in those months, and it is beautiful in a way the coast is not.",
      },
      {
        q: "Will I need English?",
        a: "You will manage in English almost everywhere in Kerala; literacy here is among the highest in India and English is widely spoken. The state's own language is Malayalam, and a word or two of it is received very warmly.",
      },
    ],
  },
];

/* For the structured data, which wants one flat list. */
export const allQuestions = faq.flatMap((group) => group.questions);
