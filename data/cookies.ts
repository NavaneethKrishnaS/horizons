/*
  The cookie policy, as data.

  The honest question is why this page exists at all, when the privacy
  policy already says there are no cookies and says it at length. It
  exists because people and compliance checks look for /cookies by name,
  and finding nothing there reads as having something to hide rather than
  as having nothing to declare. A short page that says "none, and here is
  what we do instead" is worth more than a missing one.

  So this is deliberately brief and points at the privacy policy for the
  detail rather than restating it. Every claim was checked against the
  code on 22 November 2026: no document.cookie anywhere, no iframes, no
  embedded video or map, no advertising pixel, no tag manager, and the
  typefaces served from our own domain.

  The one thing the browser is asked to keep is named rather than glossed
  over, for the same reason it is named in the privacy policy: a page
  claiming perfect innocence is the kind nobody believes.

  If the site ever gains an embedded map, a video, a payment page or a
  tag manager, this file and data/privacy.ts are what change first — and
  on that day a consent banner stops being unnecessary.
*/

import type { LegalSection } from "@/data/legal.types";

export const LAST_UPDATED = "22 November 2026";

export const SUMMARY = [
  { label: "Cookies we set", value: "None" },
  { label: "Advertising or tracking", value: "None" },
  { label: "Third parties", value: "One, on the forms" },
];

export const SECTIONS: LegalSection[] = [
  {
    id: "none",
    heading: "Almost none, and the exception is named",
    body: [
      "This website sets no cookies of its own. Not one — not for analytics, not for advertising, not for remembering who you are between visits.",
      "There is one exception, named here rather than buried: the pages carrying an enquiry form run a robot check by Cloudflare, which may set a cookie of its own while it runs. Everywhere else the cookie jar is empty and stays empty however long you read.",
      "That is why you have not been shown a banner. The banners exist because most sites place advertising and tracking cookies before you have agreed to them. We place none, and the one check that does run is part of sending a form rather than something watching you read.",
    ],
  },
  {
    id: "stored",
    heading: "One thing is kept, and it is not a cookie",
    body: [
      "When the opening animation has played, your browser is asked to make a note of it so that it does not play again every time you open another page. It is kept in what browsers call session storage, which is a different thing from a cookie in one way that matters: it is never sent to us. It sits in your browser, it holds no name, no number and nothing that could identify you, and it is thrown away the moment you close the tab.",
      "We name it here rather than leave it out, because the point of a page like this is that it can be checked.",
    ],
  },
  {
    id: "counting",
    heading: "How we count visits without one",
    body: [
      "We do count page views, and it would be dishonest to put that in small print. Vercel host this website and therefore already answer every page you open, and they count those answers for us: which page, which site you came from, roughly which country, and what kind of device. No cookie is involved, nothing is written to your browser, and there is no identifier that follows you to any other website.",
      "What it tells us is which journeys people are actually reading about. What it cannot tell us is who you are, and we could not ask it to.",
    ],
    links: [{ label: "The longer version, in the privacy policy", href: "/privacy" }],
  },
  {
    id: "others",
    heading: "Nobody else is watching either",
    body: [
      "Plenty of sites set no cookies of their own and still leak a visit to half a dozen other companies, through an embedded video, a map, a social button or a font. This one reaches exactly one other company, on the pages with a form, and it is there to keep robots out rather than to watch anybody.",
      "There is no embedded video and no embedded map. There are no social buttons that load anything. The typefaces come from this website rather than from Google, so opening a page here does not tell Google you did. The photographs that sit on another company's servers are fetched by our server and served to you from ours.",
    ],
    list: [
      "No Google Analytics, and no tag manager",
      "No advertising or remarketing pixel",
      "No Facebook, Instagram or other social tracking",
      "No embedded video, map or social button",
      "No session recording or heatmaps",
      "No fonts loaded from another company",
    ],
  },
  {
    id: "the-robot-check",
    heading: "The one thing that does reach out",
    body: [
      "The enquiry forms run a check by Cloudflare called Turnstile, which tells us whether a form was filled in by a person or by a script. It is here because the forms were found by a robot within a day of going up, and the four checks we wrote ourselves did not hold.",
      "While a form is on your screen, Cloudflare receives your IP address, your browser type and a technical fingerprint of the connection, for that purpose and under Cloudflare's own Turnstile privacy addendum. It may set a cookie of its own while the check runs. Most people see a small box tick itself and are asked nothing at all.",
      "It runs on the contact page and on the houseboat availability form, and nowhere else. Reading a journey, a stay or the journal reaches nobody but us.",
    ],
  },
  {
    id: "control",
    heading: "What you can do about it",
    body: [
      "Very little is needed, which is the point. Blocking cookies on this site blocks nothing, because there is nothing to block, and the site works exactly the same with every privacy setting your browser has turned up to its strictest.",
      "If you would rather the animation note was not kept either, closing the tab removes it, and a private window never keeps it in the first place. Nothing on this site breaks when storage is refused — the animation simply plays again.",
    ],
  },
];
