/*
  The booking conditions.

  Written from what Surjith actually decided rather than from a template
  found on another operator's site — the advance, the cancellation
  ladder, who carries the supplier's failure and which court hears a
  dispute were all answered before a word of this was written, and
  nothing here has been invented to fill a gap. Where there is no answer
  yet the clause says so rather than guessing.

  Two things in here are commitments the company has to be able to keep:
  the refund ladder and the promise that HORIZONS answers for the whole
  journey. Neither should be edited without meaning it.
*/

import type { LegalSection } from "@/data/legal.types";

export const LAST_UPDATED = "25 September 2026";

export const SUMMARY = [
  { label: "Your contract is with", value: "One company" },
  { label: "Cancel more than 30 days out", value: "Full refund" },
  { label: "Governed by", value: "Indian law" },
];

export const SECTIONS: LegalSection[] = [
  {
    id: "who",
    heading: "Who you are dealing with",
    body: [
      "HORIZONS is the travel name of Scenic Escapes India Private Limited, a company registered in Kerala, India. When you book a journey with us, your contract is with that company.",
      "These conditions apply to using this website and to any journey we arrange for you. The registered office, the company number and the tax registration are on the company details page, with both certificates to read.",
    ],
    links: [{ label: "Company details", href: "/company" }],
  },
  {
    id: "booking",
    heading: "How a booking is made",
    body: [
      "You write to us and we ask questions — where, when, how many of you, what you care about. We then send a written quotation: the journey set out day by day, what it costs, and what the cost includes.",
      "Nothing is held and nothing is payable until you accept that quotation in writing and we send you a confirmation. The confirmation, together with these conditions, is the contract between us. Until it exists, a quotation is an offer subject to the rooms and the boats still being free, and to prices we are quoted by the properties themselves.",
      "Please read the confirmation when it arrives. Names must match passports, and a date or a spelling corrected on the day it is issued costs nothing while the same correction a month later may not.",
    ],
  },
  {
    id: "paying",
    heading: "Paying for it",
    body: [
      "We ask for payment in full before you travel. That is not a preference for our own convenience: by the time you arrive we have already paid the hotels, the houseboat owners, the drivers and the guides, and small properties in Kerala are paid in advance or they do not hold the room.",
      "Where you would rather not send the whole amount at once, we accept 50% to confirm the journey, with the balance 45 days before you arrive. For a houseboat booked on its own, the same applies.",
      "An international transfer usually carries a fee from the sending bank; please ask your bank to send the invoiced amount in full, so the figure that reaches us is the figure on the invoice.",
    ],
    list: [
      "Bank transfer in Indian rupees",
      "Bank transfer in euros or pounds sterling",
      "Card payment, through a secure link we send you",
      "UPI, for anyone with an Indian bank account",
    ],
  },
  {
    id: "cancelling",
    heading: "If you cancel",
    body: [
      "Tell us as soon as you know, in writing. What comes back depends on how much notice we have, because it depends on how much of your money has already left us.",
      "More than 30 days before you arrive: everything is refunded, less anything a hotel or a boat owner has already kept and will not return — and if there is any such amount we will show you what it was and who kept it.",
      "Between 15 and 30 days: half of what you have paid is refunded. Less than 15 days before arrival, or once the journey has begun: nothing is refunded, because by then it has been bought on your behalf.",
      "Refunds are sent back by the route the money arrived, within two weeks of the cancellation. Unused services on a journey already under way — a night you chose not to take, a car you sent away — are not refundable.",
    ],
  },
  {
    id: "changes",
    heading: "Changes, yours and ours",
    body: [
      "If you want to move a date, add a night or change a hotel, tell us and we will do what can be done. Some suppliers allow it freely and some charge for it; where there is a charge we pass it on at cost and show you the invoice. In December and January, a late change may simply be impossible, which is a matter of there being no rooms rather than unwillingness.",
      "Occasionally we have to change something ourselves: a hotel closes, a boat is taken out of service, a road goes under water in the monsoon. We will tell you as soon as we know and put you somewhere of the same standard or better at our expense. If what we can offer is materially worse, you may take it with the difference refunded, or cancel that part and have it refunded in full.",
    ],
  },
  {
    id: "price",
    heading: "What the price includes",
    body: [
      "Your quotation lists it item by item, and what is not listed is not included. Unless your quotation says otherwise, a price does not include international or domestic flights, visas, travel insurance, tips, laundry, telephone calls, drinks beyond those named, or anything of a personal nature.",
      "On the houseboats, the fare covers the cruise, the cabin and the meals named on the boat's page. It does not cover getting to and from the boarding point, drinks beyond those included, or anything not in the published itinerary.",
    ],
  },
  {
    id: "responsibility",
    heading: "What we answer for",
    body: [
      "You are dealing with one company. We arrange the journey and we answer for it: if a room is not what was promised, a driver does not arrive or a boat is not ready, that is ours to put right and ours to answer for. You should not have to argue with a supplier in a language you do not speak, and with us you do not have to.",
      "That responsibility has an edge to it, and it is fair to say where. Our liability for a journey is limited to what you paid us for it, and we are not liable for things genuinely outside our control or for a loss we could not reasonably have foreseen. Nothing in these conditions limits our liability for death or personal injury caused by our negligence, or for fraud — no set of terms can do that, and we would not want to.",
    ],
  },
  {
    id: "force-majeure",
    heading: "Things nobody controls",
    body: [
      "Flood, cyclone, an epidemic, a strike, a waterway closed by order, an airport shut: where something of that kind prevents a journey, we will re-arrange what can be re-arranged and refund what we are able to recover.",
      "Where money has already gone to a hotel or a boat owner who will not return it, we cannot refund what we have not got back. We will tell you exactly what was paid and to whom, and we will press them on your behalf. This is the clause travel insurance exists for.",
    ],
  },
  {
    id: "insurance",
    heading: "Travel insurance",
    body: [
      "We strongly recommend it and we do not sell it. A policy should cover medical treatment and repatriation, cancellation and curtailment, and your baggage.",
      "We will not refuse to take you without one. But a hill road in Munnar at midnight is a long way from a hospital, and insurance is what pays for the ambulance and the flight home.",
    ],
  },
  {
    id: "documents",
    heading: "Passports, visas and health",
    body: [
      "These are yours to arrange. Entry requirements are set by the Government of India, they differ by nationality and they change; check them against your own passport rather than against what a friend was told last year. We will point you at the right page and answer what we can, but we cannot apply on your behalf and we are not responsible for a visa refused or a passport that expires too soon.",
      "A journey cancelled because a visa did not arrive is treated like any other cancellation, which is another reason to insure.",
    ],
    links: [{ label: "How to get to Kerala", href: "/how-to-get-to-kerala" }],
  },
  {
    id: "aboard",
    heading: "On the journey",
    body: [
      "The houseboats have a few rules of their own, all of them published on each boat's page: check-in at noon and check-out at nine the following morning, a valid photo ID at check-in, no smoking in the bedrooms, no pets aboard, and the boat anchored overnight as the navigation regulations require rather than as a matter of choice.",
      "Damage caused to a boat or a room may be charged for. Very rarely, a crew or a hotel may end a stay early where behaviour puts other people at risk; in that case the journey ends there and nothing is refunded.",
    ],
  },
  {
    id: "complaints",
    heading: "If something goes wrong",
    body: [
      "Tell us while you are still here. Almost anything can be fixed the same day — a room changed, a driver replaced, a meal put right — and almost nothing can be fixed after you have flown home. Our number is on your itinerary and somebody answers it.",
      "If it was not resolved and you are still unhappy, write to us within 28 days of getting back and you will get a considered answer rather than an acknowledgement.",
    ],
  },
  {
    id: "website",
    heading: "This website",
    body: [
      "The photographs, the words and the maps here are ours or licensed to us; please do not copy them. Photographs and descriptions of hotels come from the properties or from our own visits, and a property can change its furniture, its chef or its swimming pool without telling us.",
      "What this site does with your information — which is almost nothing — is set out on the privacy page.",
    ],
    links: [{ label: "Privacy", href: "/privacy" }],
  },
  {
    id: "law",
    heading: "Law and jurisdiction",
    body: [
      "These conditions are governed by the law of India, and any dispute arising from them is for the courts at Kollam, Kerala, where the company has its registered office.",
    ],
  },
  {
    id: "changes-to-terms",
    heading: "If these conditions change",
    body: [
      "The date at the top of this page is the date they last changed. The version that applies to your journey is the one in force on the day your booking was confirmed, and if you ask us for a copy of it we will send it.",
    ],
  },
];
