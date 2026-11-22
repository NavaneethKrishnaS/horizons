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
  { label: "Cookies set", value: "None" },
  { label: "Consent banner", value: "Not needed" },
  { label: "Third-party trackers", value: "None" },
];

export const SECTIONS: LegalSection[] = [
  {
    id: "none",
    heading: "There are none",
    body: [
      "This website sets no cookies. Not one — not for analytics, not for advertising, not for remembering who you are between visits. If you open your browser's developer tools on any page here and look at the cookie jar, it is empty, and it stays empty however long you read.",
      "That is why you have not been shown a banner asking you to accept anything. The banners exist because most sites place cookies before you have agreed to them and the law requires them to ask first. We have nothing to ask about, so we do not interrupt you to ask it.",
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
      "Plenty of sites set no cookies of their own and still leak a visit to half a dozen other companies, through an embedded video, a map, a social button or a font. This one does none of that.",
      "There is no embedded video and no embedded map. There are no social buttons that load anything. The typefaces come from this website rather than from Google, so opening a page here does not tell Google you did. The photographs that sit on another company's servers are fetched by our server and served to you from ours.",
    ],
    list: [
      "No Google Analytics, and no tag manager",
      "No advertising or remarketing pixel",
      "No Facebook, Instagram or other social tracking",
      "No embedded video, map or iframe",
      "No session recording or heatmaps",
      "No fonts loaded from another company",
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
