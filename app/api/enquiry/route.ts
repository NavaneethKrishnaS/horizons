import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_EMAIL } from "@/lib/whatsapp";
import { PHONE_DISPLAY } from "@/data/contact";
import { PRICE_NOTE } from "@/data/houseboat.shared";

/*
  Where an enquiry actually arrives.

  Until this existed, the contact form wrote the message and handed it
  to WhatsApp or to a mail client, and whether it ever reached us was
  the visitor's problem: a `mailto:` does nothing at all on a machine
  with no mail app configured, which is most people reading webmail in
  a browser, and somebody who filled the form and then closed the tab
  left no trace of having been here.

  So the page posts here first, every time, whichever button was
  pressed. The WhatsApp hand-off still happens afterwards — the
  enquiry is simply recorded before it does, so a conversation that
  never gets sent in WhatsApp is not a conversation we never knew
  about.

  There is no database behind this yet. The mail in the inbox is the
  record, and Reply goes to the sender because reply_to is set to
  their address.

  RESEND_API_KEY is set in the Vercel project. Without it this route
  answers 503 and the page falls back to opening the visitor's own
  mail app, which is what it did before — so a missing key is a
  degraded form, never a broken one.
*/

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  where?: string;
  when?: string;
  party?: string;
  note?: string;
  route?: string;

  /*
    The availability enquiry on a houseboat page carries particulars the
    contact form has no notion of — a boat, a category, dates, a price.
    Rather than a second route that would drift out of step with this
    one, it sends its own subject and its own label/value rows, and the
    letter is built round them.
  */
  subject?: string;
  details?: Record<string, unknown>;

  /*
    The two the page adds and a person never sees. `company` is the
    honeypot: it is in the markup, hidden, and left empty by anybody
    with eyes. `startedAt` is when the form was drawn.
  */
  company?: string;
  startedAt?: number;

  /* Cloudflare's proof that a browser, not a script, filled this in. */
  turnstileToken?: string;
};

/* Generous, but enough that nobody pastes a book through it. */
const LIMITS: Record<string, number> = {
  name: 120,
  email: 160,
  phone: 60,
  where: 200,
  when: 200,
  party: 200,
  note: 4000,
  route: 20,
  subject: 140,
};

/* A detail row is a label and a short value, and there are not many. */
const DETAIL_ROWS = 12;
const DETAIL_LABEL = 40;
const DETAIL_VALUE = 200;

/*
  Keeping the machines out, without a captcha.

  A form with a public address on it gets found. Ours did, within a day,
  by the usual kind of script: every field filled with random characters
  and posted straight through.

  The obvious answer is a captcha, and we are not using one. It would
  mean a third-party script on every page carrying the form, on a site
  whose privacy page says plainly that there is no such thing, and we
  would rather keep that sentence true than save ourselves this file.

  So there are five checks instead, in order of how certain each is:

  1. Origin. A browser sends it on every POST; a script usually does
     not bother, and cannot claim ours from somewhere else.
  2. The honeypot. A hidden field. A person leaves it empty because a
     person cannot see it. A script fills everything.
  3. The clock. Nothing human fills seven fields in three seconds.
  4. Cloudflare Turnstile, checked on the server. Added because the
     first three were not enough on their own.
  5. Gibberish. Random strings alternate upper and lower case in a way
     that written language does not.

  The first four are near enough certain, so those are dropped without
  a word — answered 200 so the script learns nothing and does not go
  looking for a way round. The fifth is a judgement rather than a
  fact, so it does not drop anything: it marks the subject line and the
  mail still arrives. A rule in the mailbox can file those, and nothing
  a real guest wrote is ever silently thrown away on a hunch.
*/

const ALLOWED_HOSTS = [
  "horizonsindia.com",
  "www.horizonsindia.com",
  "localhost:3000",
  "localhost:3001",
];

/* True when the request did not come from one of our own pages. */
function foreignOrigin(request: Request) {
  const origin =
    request.headers.get("origin") ?? request.headers.get("referer");

  /* No header at all is a script, or a browser too old to matter. */
  if (!origin) return true;

  try {
    const { host } = new URL(origin);

    return !ALLOWED_HOSTS.includes(host) && !host.endsWith(".vercel.app");
  } catch {
    return true;
  }
}

/*
  How many times a single word changes case inside itself. "STtxLVNaRRs"
  does it nine times; "McDonald" does it twice; an ordinary word does it
  once or none. Five is well clear of any name or place we might
  actually be sent, including the German and Malayalam ones.
*/
function looksMachineMade(value: string) {
  return value.split(/\s+/).some((word) => {
    if (word.length < 10) return false;

    let flips = 0;

    for (let i = 1; i < word.length; i += 1) {
      const before = word[i - 1];
      const here = word[i];

      if (!/[a-z]/i.test(before) || !/[a-z]/i.test(here)) continue;

      if ((before === before.toUpperCase()) !== (here === here.toUpperCase())) {
        flips += 1;
      }
    }

    return flips >= 5;
  });
}

/*
  Layer five: Cloudflare Turnstile, checked here rather than trusted
  from the browser. The widget hands the page a token; only this call
  says whether it is real.

  Two deliberate ways of letting an enquiry through. Until
  TURNSTILE_SECRET_KEY is set in Vercel the check is skipped, so adding
  the widget never silently swallows enquiries before the key is in
  place. And if Cloudflare itself cannot be reached, the other four
  layers decide — an outage at Cloudflare must not cost us a real guest.

  A missing token when the secret IS set is a different matter: the
  widget was there and nothing came back, which is what a script looks
  like. That one is refused.
*/
async function passedRobotCheck(token: string, request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });

    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    if (ip) body.set("remoteip", ip);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );

    const data = (await response.json()) as { success?: boolean };

    return data.success === true;
  } catch (error) {
    console.error("Turnstile could not be reached", error);
    return true;
  }
}

/*
  The note back to the person who wrote in.

  It exists because the only confirmation until now was a line on a page
  they may already have closed, and a form that answers with silence is
  one people assume is broken. Somebody writing from Europe at midnight
  should have something in their inbox before we are awake.

  Three rules it keeps. It promises only what the FAQ already promises:
  a reply within a day, usually the same one. It repeats their own words
  back, so they can see the message arrived whole rather than take our
  word for it. And it sells nothing — no offers, no attachments, no
  links to click. It is a receipt, not a campaign.

  Sent after the enquiry itself, and only if that one succeeded: an
  acknowledgement for a message sitting in nobody's inbox would be a
  lie. If the acknowledgement alone fails, the enquiry is still ours and
  the visitor is told nothing went wrong, because for them nothing did.
*/
function acknowledgement(name: string, said: string[]) {
  const first = name.trim().split(/\s+/)[0] || "there";

  return [
    `Dear ${first},`,
    "",
    "Thank you for writing to us. Your enquiry has reached HORIZONS and",
    "one of the people who plans the journeys will answer it personally,",
    "within a day and usually the same one.",
    "",
    "There is no ticket number and no queue. Whoever replies to you is",
    "whoever would design the journey.",
    "",
    "This is what reached us:",
    "",
    ...said.map((line) => (line ? `    ${line}` : "")),
    "",
    "If anything there is wrong, or you would rather talk than type,",
    `WhatsApp is the quickest way to reach us: ${PHONE_DISPLAY}`,
    "",
    "Warm regards,",
    "",
    "HORIZONS by Scenic Escapes",
    "Alumkadavu, Kerala",
    "horizonsindia.com",
    "",
    "— This note was sent automatically because you used the form on",
    "our website. You do not need to reply to it; a person will write to",
    "you shortly.",
  ].join("\n");
}

const clean = (value: unknown, field: string) =>
  typeof value === "string" ? value.trim().slice(0, LIMITS[field] ?? 200) : "";

/* Deliberately loose: the job is to catch a typo, not to police addresses. */
const looksLikeEmail = (value: string) =>
  /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(value);

export async function POST(request: Request) {
  let body: Body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad-request" }, { status: 400 });
  }

  /*
    Silently accepted and silently dropped. The script gets its 200 and
    goes away; the inbox never hears about it.
  */
  const started = typeof body.startedAt === "number" ? body.startedAt : 0;
  const tooQuick = !started || Date.now() - started < 3000;

  if (foreignOrigin(request) || clean(body.company, "name") || tooQuick) {
    return NextResponse.json({ ok: true });
  }

  /*
    Dropped the same silent way as the other three. A script that is told
    its token failed learns where the wall is; one that is told "thank
    you" goes away.
  */
  if (!(await passedRobotCheck(body.turnstileToken ?? "", request))) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, "name");
  const email = clean(body.email, "email");
  const phone = clean(body.phone, "phone");
  const where = clean(body.where, "where");
  const when = clean(body.when, "when");
  const party = clean(body.party, "party");
  const note = clean(body.note, "note");
  const route = clean(body.route, "route");
  const subject = clean(body.subject, "subject");

  /*
    Only strings and numbers, only what is filled in, and only as many
    rows as a letter can sensibly carry.
  */
  const details =
    body.details && typeof body.details === "object"
      ? Object.entries(body.details)
          .filter(
            ([, value]) =>
              (typeof value === "string" && value.trim()) ||
              typeof value === "number",
          )
          .slice(0, DETAIL_ROWS)
          .map(
            ([label, value]) =>
              `${label.trim().slice(0, DETAIL_LABEL)}: ${String(value)
                .trim()
                .slice(0, DETAIL_VALUE)}`,
          )
      : [];

  if (!name || !looksLikeEmail(email)) {
    return NextResponse.json({ error: "incomplete" }, { status: 422 });
  }

  /* Marked rather than dropped, for the reason set out above. */
  const suspect = [name, where, when, party, note].some(looksMachineMade);

  const key = process.env.RESEND_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "not-configured" }, { status: 503 });
  }

  /*
    The same letter the visitor sees in their WhatsApp or mail
    window, so what lands in the inbox and what they think they sent
    are the same words.
  */
  const lines = [
    `${name} has written from the website.`,
    "",
    ...(details.length
      ? details
      : [
          where ? `Where: ${where}` : null,
          when ? `When: ${when}` : null,
          party ? `Party: ${party}` : null,
        ]),
    "",
    note || "(No message was written.)",
    "",
    "—",
    `Email: ${email}`,
    phone ? `Telephone: ${phone}` : null,
    route === "whatsapp"
      ? "They then continued on WhatsApp."
      : "They sent this from the website.",
  ].filter((line) => line !== null);

  try {
    const resend = new Resend(key);

    const { error } = await resend.emails.send({
      /*
        The from-address has to be on a domain verified with Resend.
        The reply-to is the visitor, so hitting Reply in the inbox
        writes to them rather than to the website.
      */
      from:
        process.env.ENQUIRY_FROM ??
        `HORIZONS <enquiries@${CONTACT_EMAIL.split("@")[1]}>`,
      to: [process.env.ENQUIRY_TO ?? CONTACT_EMAIL],
      replyTo: email,
      subject: `${suspect ? "[Check] " : ""}${
        subject
          ? `${subject} — ${name}`
          : `Enquiry from ${name}${where ? ` — ${where}` : ""}`
      }`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("enquiry: resend refused", error);

      return NextResponse.json({ error: "send-failed" }, { status: 502 });
    }

    /*
      The receipt, after the enquiry and never instead of it. A failure
      here is logged and swallowed: the enquiry is already in our inbox,
      and telling the visitor something went wrong would be false.

      Not sent to an address the gibberish test flagged. If the message
      was invented the address probably was too, and mail bouncing off
      invented addresses is how a sending domain's reputation is lost.
    */
    if (!suspect) {
      /*
        Their own answers, not the note we wrote to ourselves. The inbox
        copy opens "<name> has written from the website" and closes with
        "They sent this from the website", which reads as someone talking
        about you the moment it lands in your own inbox.
      */
      const theirs = [
        ...(details.length
          ? details
          : [
              where ? `Where: ${where}` : null,
              when ? `When: ${when}` : null,
              party ? `Party: ${party}` : null,
            ]),
        "",
        note || "(You did not write a message.)",
      ].filter((line): line is string => line !== null);

      /*
        A figure quoted back in an email is a figure in writing. The site
        says a price is a guide and not an offer in three places; a
        receipt that repeats the total without saying so would be the one
        place it does not, and it is the one the visitor keeps.
      */
      if (theirs.some((line) => line.startsWith("Estimated total"))) {
        theirs.push("", PRICE_NOTE);
      }

      const receipt = await resend.emails.send({
        from:
          process.env.ENQUIRY_FROM ??
          `HORIZONS <enquiries@${CONTACT_EMAIL.split("@")[1]}>`,
        to: [email],
        replyTo: process.env.ENQUIRY_TO ?? CONTACT_EMAIL,
        subject: "We have your enquiry — HORIZONS by Scenic Escapes",
        text: acknowledgement(name, theirs),
      });

      if (receipt.error) {
        console.error("enquiry: acknowledgement not sent", receipt.error);
      }
    }
  } catch (cause) {
    console.error("enquiry: send threw", cause);

    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
