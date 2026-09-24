"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { CONTACT_EMAIL, emailLink, whatsappLink } from "@/lib/whatsapp";

/*
  The same enquiry flow the houseboat pages use: the form checks itself,
  writes the message out, and hands it to WhatsApp. Nothing is posted
  anywhere — there is no server behind this site yet, and a form that
  quietly swallowed an enquiry would be worse than no form. The page says
  so above the button, because a visitor should never be surprised by
  which app opens.

  The email link beside it carries the same text, so the people who do not
  use WhatsApp — a good share of our British and American guests — are not
  sent away to write the whole thing again.
*/

const LABEL = "block text-[10px] uppercase tracking-[0.3em] text-white/35";

/*
  field-dark is not decoration: it is what tells the autofill rule in
  globals.css that this field is on a dark page, so Chrome does not
  paint a white block over it.
*/
const FIELD =
  "field-dark mt-3 w-full border-b bg-transparent pb-2.5 text-[15px] text-white transition-colors duration-300 placeholder:text-white/30 focus:outline-none";

const OK = "border-white/15 focus:border-[#6B7341]";
const BAD = "border-[#C08457]/70 focus:border-[#C08457]";

type Errors = { name?: string; email?: string };

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [where, setWhere] = useState("");
  const [when, setWhen] = useState("");
  const [party, setParty] = useState("");
  const [note, setNote] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [handedOver, setHandedOver] = useState(false);

  /*
    Built on every render rather than on submit, so the email link beside
    the button is always carrying whatever has been typed so far.
  */
  const lines = [
    "*HORIZONS by Scenic Escapes*",
    "Enquiry from the website",
    "",
    `Name: ${name.trim() || "—"}`,
    `Email: ${email.trim() || "—"}`,
    ...(phone.trim() ? [`Phone: ${phone.trim()}`] : []),
    ...(where.trim() ? [`Where: ${where.trim()}`] : []),
    ...(when.trim() ? [`When: ${when.trim()}`] : []),
    ...(party.trim() ? [`Travelling: ${party.trim()}`] : []),
    ...(note.trim() ? ["", note.trim()] : []),
  ];

  const message = lines.join("\n");

  /* Returns the id of the first field that needs attention, or null. */
  const check = () => {
    const found: Errors = {};

    if (!name.trim()) {
      found.name = "Please tell us your name.";
    }

    if (!email.trim()) {
      found.email = "We need somewhere to write back to.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      found.email = "That address does not look right.";
    }

    setErrors(found);

    if (found.name) return "contact-name";
    if (found.email) return "contact-email";

    return null;
  };

  /*
    A complaint under a field the visitor has since corrected is just
    nagging, so it goes the moment they touch that field rather than
    waiting for the next press of the button.
  */
  const clear = (field: keyof Errors) =>
    setErrors((current) =>
      current[field] ? { ...current, [field]: undefined } : current
    );

  const send = (event: React.FormEvent) => {
    event.preventDefault();

    const found = check();

    if (found) {
      /*
        Straight to the field by name. Looking the element up by
        aria-invalid ran before React had committed the attribute, so it
        found nothing and the cursor stayed on the button.
      */
      document.getElementById(found)?.focus();

      return;
    }

    const url = whatsappLink(message);

    /*
      On a phone WhatsApp takes over the tab it opens in, so a new tab
      would leave the visitor on a blank page with no way back. Navigate
      the current one and let Back return them here; on a laptop the new
      tab sits alongside the site, which is what you want.
    */
    if (window.matchMedia("(max-width: 1023px)").matches) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener");
    }

    setHandedOver(true);
  };

  return (
    <section className="border-b border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Tell us about it
            </p>

            <h2 className="mt-7 max-w-md font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[46px]">
              The more you tell us, the less we have to guess.
            </h2>

            <p className="mt-8 max-w-md text-[15px] leading-8 text-white/55 md:text-[16px] md:leading-9">
              Only your name and an address are needed. Everything else just
              saves a round of questions — and if you do not know the dates
              yet, that is the normal way to start.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <form onSubmit={send} noValidate>
              <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="contact-name">
                    Your name
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      clear("name");
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`${FIELD} ${errors.name ? BAD : OK}`}
                  />

                  {errors.name ? (
                    <p id="contact-name-error" className="mt-2.5 text-[12px] text-[#C08457]">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className={LABEL} htmlFor="contact-email">
                    Email
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clear("email");
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`${FIELD} ${errors.email ? BAD : OK}`}
                  />

                  {errors.email ? (
                    <p id="contact-email-error" className="mt-2.5 text-[12px] text-[#C08457]">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className={LABEL} htmlFor="contact-phone">
                    Phone <span className="text-white/20">— optional</span>
                  </label>

                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={`${FIELD} ${OK}`}
                  />
                </div>

                <div>
                  <label className={LABEL} htmlFor="contact-where">
                    Where you have in mind
                  </label>

                  <input
                    id="contact-where"
                    name="where"
                    value={where}
                    onChange={(event) => setWhere(event.target.value)}
                    placeholder="Kerala, or somewhere you have not decided"
                    className={`${FIELD} ${OK}`}
                  />
                </div>

                <div>
                  <label className={LABEL} htmlFor="contact-when">
                    Roughly when
                  </label>

                  <input
                    id="contact-when"
                    name="when"
                    value={when}
                    onChange={(event) => setWhen(event.target.value)}
                    placeholder="February, or two weeks in the winter"
                    className={`${FIELD} ${OK}`}
                  />
                </div>

                <div>
                  <label className={LABEL} htmlFor="contact-party">
                    How many of you
                  </label>

                  <input
                    id="contact-party"
                    name="party"
                    value={party}
                    onChange={(event) => setParty(event.target.value)}
                    placeholder="Two adults, one child"
                    className={`${FIELD} ${OK}`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={LABEL} htmlFor="contact-note">
                    Anything else
                  </label>

                  <textarea
                    id="contact-note"
                    name="note"
                    rows={4}
                    maxLength={1200}
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="What you like the sound of, what you would rather avoid, anything we should know."
                    className={`${FIELD} ${OK} resize-y leading-8`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-12 inline-flex items-center gap-4 border border-white/25 px-10 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-[#6B7341] hover:bg-[#6B7341]"
              >
                Send on WhatsApp
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </button>

              {/*
                Said before the button is pressed, not after. Being handed
                to another app unannounced is the part people dislike.
              */}
              <p className="mt-6 max-w-md text-[13px] leading-7 text-white/40">
                This opens WhatsApp with the message already written out.
                Nothing leaves your phone until you press send there.
              </p>

              <p className="mt-4 max-w-md text-[13px] leading-7 text-white/40">
                No WhatsApp? Send the same thing to{" "}
                <a
                  href={emailLink("Enquiry from the HORIZONS website", message)}
                  className="text-white/60 transition-colors hover:text-[#A8B473]"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>

              <p
                aria-live="polite"
                className={`mt-6 max-w-md text-[13px] leading-7 text-[#A8B473] transition-opacity duration-500 ${
                  handedOver ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                {handedOver
                  ? "WhatsApp should have opened with your message in it. If it did not, the email link above carries the same words."
                  : " "}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
