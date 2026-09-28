/*
  The privacy policy, as data.

  Written against what the site actually does rather than against a
  template: every claim in here was checked in the browser before it was
  written down. No cookies are set — the cookie jar is empty on every
  page. No advertising pixels, no embeds, no iframes. The typefaces are
  served from our own domain, so opening a page does not tell Google you
  did. The photographs that sit on Unsplash's servers are fetched by our
  server and re-served from ours.

  Two things changed on 28 September 2026 and are written down here
  because they had to be. The site now counts page views through Vercel,
  who already serves every page: no cookie, no identifier that follows
  anybody to another website, nothing joined to a name. And the enquiry
  form now sends to our mailbox itself, through Resend, instead of
  handing the message to the visitor's own email program and hoping.

  The line about the mailbox said Google Workspace. The live MX records
  for scenicescapesindia.com point at secureserver.net, which is GoDaddy,
  so it said the wrong thing and now says the right one. If the mailbox
  ever moves, this is the line that moves with it.

  The one thing the site does put in your browser is the note that the
  opening animation has played, and it is named here rather than glossed
  over. A policy that claims perfect innocence is the kind nobody checks.

  If the site gains analytics, a newsletter, a payment page or an embedded
  map, this file is what has to change first.
*/

import type { LegalSection } from "@/data/legal.types";

export const LAST_UPDATED = "28 September 2026";

export const SUMMARY = [
  { label: "Cookies", value: "None" },
  { label: "Analytics", value: "Page counts, no cookies" },
  { label: "Sold or shared for advertising", value: "Never" },
];

export const SECTIONS: LegalSection[] = [
  {
    id: "who",
    heading: "Who this is",
    body: [
      "HORIZONS is the travel name of Scenic Escapes India Private Limited, a company registered in Kerala, India. We decide what happens to the information on this page, which in data protection law makes us the controller of it.",
      "The registered office, the company number and the tax registration are all on the company details page, and both certificates are there to read. Anything in this policy, including a request to delete what we hold, goes to info@scenicescapesindia.com and reaches a person rather than a queue.",
    ],
    links: [{ label: "Company details", href: "/company" }],
  },
  {
    id: "website",
    heading: "What the website collects",
    body: [
      "Almost nothing, and no cookies at all — not analytics cookies, not advertising cookies, not the consent banner that usually comes with them, because there is nothing to consent to. There is no Google Analytics, no advertising pixel, no session recording and no embedded video or map quietly reporting your visit to somebody else.",
      "We do count visits, and it would be wrong to leave that out. Vercel, who host this site and therefore already answer every page you open, count them for us: which page it was, which website you arrived from, roughly where in the world you are, and what kind of device and browser you used. No cookie is set, nothing is stored in your browser, there is no identifier that follows you to any other website, and none of it is joined to your IP address or your name. We look at it to learn which journeys people are actually reading about. It cannot tell us who you are, and we could not ask it to.",
      "The typefaces are served from this website rather than from Google, and the photographs are fetched by our server and re-served from ours. Apart from that count, which goes to the company already serving you the page, opening a page here does not tell another company that you did.",
      "One small thing is put in your browser, and it is only fair to name it: when the opening animation has played, your browser is asked to remember that for as long as the tab stays open, so it does not play again on every page. It is not a cookie, it holds nothing about you, it never leaves your computer, and it disappears when you close the tab.",
    ],
  },
  {
    id: "logs",
    heading: "The server that serves it",
    body: [
      "The site is hosted by Vercel Inc., on servers outside India. Like every web server in the world, theirs writes down each request it answers: the IP address it came from, the time, the page asked for and the browser that asked. That is how a website is kept running and how abuse is stopped, and it happens before we are involved at all.",
      "We do not read those logs to work out who anybody is, and there is nothing in them that we can join to your name.",
    ],
    links: [
      {
        label: "Vercel's privacy policy",
        href: "https://vercel.com/legal/privacy-policy",
        external: true,
      },
    ],
  },
  {
    id: "writing",
    heading: "When you write to us",
    body: [
      "The enquiry form sends what you wrote to our own mailbox, and that is the whole of it: there is no database behind this website, no account being made for you, and nothing kept anywhere but the mail itself. If you use the WhatsApp button, it opens WhatsApp with the same message so you can carry the conversation on there. If the sending fails for any reason, the form falls back to opening your own email program with the message already written, and tells you on the page that it has done so.",
      "So what we hold is what you chose to write: your name, your email address, your telephone number if you gave one, and whatever you told us about the journey you are thinking about — dates, how many of you, a knee that does not like stairs, a child who will not eat chilli.",
      "What you send from the form is carried to us by Resend, an American company, over its servers in Ireland, and it lands in our mailbox at info@scenicescapesindia.com, which is hosted by GoDaddy. Resend holds a copy of the message in its log for a short while, as any postal service holds a letter while carrying it; we do not use it for anything else. Messages sent on WhatsApp are carried and stored by WhatsApp, which belongs to Meta, under their terms rather than ours. If you would rather none of them held the conversation, telephone us.",
    ],
  },
  {
    id: "use",
    heading: "What we do with it",
    body: [
      "We answer you, we plan and quote the journey, and — once you have decided — we pass on what a booking actually needs. That is usually the guest name, the dates and the number of people, and it goes to the hotel, the houseboat owner, the driver or the guide who is holding the room, the boat or the car. It is the only way a booking can exist.",
      "We invoice you, and we keep the invoice, because a company has to.",
      "We do not sell what you send us. We do not rent it, trade it or hand it to anyone who wants to advertise at you. There is no newsletter and no mailing list to be added to: if we write to you, it is about your journey.",
    ],
  },
  {
    id: "keeping",
    heading: "How long we keep it",
    body: [
      "An enquiry that never became a journey stays in the mailbox while the conversation is alive, and is deleted whenever you ask us to delete it. You do not have to give a reason.",
      "A journey that happened is kept for eight years. Indian company and tax law requires a company to keep its books, invoices and the records behind them for that long, and your booking is part of those books. We cannot delete those earlier, and we would be breaking the law if we said otherwise.",
    ],
  },
  {
    id: "rights",
    heading: "What you can ask for",
    body: [
      "Ask us what we hold about you. Ask for a copy of it. Ask us to correct something. Ask us to delete it, or to stop using it. One email does all of those. We do not charge for it and we do not ask why.",
      "If you are in the United Kingdom or the European Union, the GDPR gives you those rights directly. Our lawful basis for holding an enquiry and arranging a journey is that you asked us to take steps before entering into a contract and then to carry it out; our basis for keeping the invoices afterwards is a legal obligation. You are entitled to complain to your national data protection authority, though we would much rather you complained to us first and gave us the chance to put it right.",
      "One thing worth saying plainly: we are in India and you may not be. Arranging your journey means your name and your dates travel to India, and on to the hotel or the boat that is hosting you. That is the entire purpose of sending them to us, but you should know it is happening.",
    ],
  },
  {
    id: "children",
    heading: "Children",
    body: [
      "This site is not aimed at children and we do not knowingly collect anything from one. Where a child is travelling, we hold the name and the age the hotel needs in order to put a bed in the room, given to us by the adult making the booking.",
    ],
  },
  {
    id: "changes",
    heading: "If this changes",
    body: [
      "The date at the top of this page is the date it last changed. If the site ever gains analytics, a newsletter, a payment page or anything else that collects something, this page changes before that does — not afterwards.",
    ],
  },
];
