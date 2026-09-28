import { NextResponse } from "next/server";
import { Resend } from "resend";

import { CONTACT_EMAIL } from "@/lib/whatsapp";

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
      subject: subject
        ? `${subject} — ${name}`
        : `Enquiry from ${name}${where ? ` — ${where}` : ""}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("enquiry: resend refused", error);

      return NextResponse.json({ error: "send-failed" }, { status: 502 });
    }
  } catch (cause) {
    console.error("enquiry: send threw", cause);

    return NextResponse.json({ error: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
