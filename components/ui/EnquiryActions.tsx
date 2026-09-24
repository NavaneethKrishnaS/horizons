import { CONTACT_EMAIL, emailLink, whatsappLink } from "@/lib/whatsapp";

/*
  The two ways of starting a conversation, weighted the same.

  Every enquiry point on the site used to be one WhatsApp button with an
  address offered underneath it in small grey text. That is a hierarchy
  however politely it is worded, and it is the wrong one for this
  business: WhatsApp is close to universal for our Indian and European
  guests and close to absent for some of the British and American ones.
  Whichever a visitor reaches for should look like the thing they were
  meant to reach for.

  One component so the pair cannot drift apart as the pages change, and
  so a change of mind about either is a change in one file.
*/
type Props = {
  /* The message both routes carry. Plain text: asterisks are bold in
     WhatsApp and literal asterisks in an email. */
  message: string;
  subject: string;
  /* Centred under a centred section. */
  align?: "left" | "center";
  whatsapp?: string;
  email?: string;
  className?: string;
};

/*
  Content centred rather than pushed to the two ends.

  justify-between pinned the label left and the arrow right, so the gap
  between them was a different size in each button — "ENQUIRE BY EMAIL"
  is shorter than "ENQUIRE ON WHATSAPP" and the equal widths made the
  difference obvious. Centred, each button is symmetrical about its own
  middle and the pair reads as one thing.
*/
const ACTION =
  "group flex w-full items-center justify-center gap-4 whitespace-nowrap border border-white/25 px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-[#6B7341] hover:bg-[#6B7341]";

export default function EnquiryActions({
  message,
  subject,
  align = "left",
  /*
    "Enquire" rather than "Ask": it is the word this end of the trade
    uses, and it was already the site's own — the package detail page
    said "Enquire on WhatsApp" before these two were paired up. The
    contact page and the houseboat sheet still say "Send", because
    there the message is already written and the button sends it.
  */
  whatsapp = "Enquire on WhatsApp",
  email = "Enquire by email",
  className = "",
}: Props) {
  return (
    /*
      Side by side only when there is genuinely room for two, measured
      against this container rather than against the window.

      A viewport breakpoint cannot know that the stays CTA puts these in
      a 390px column at 1024px wide. It laid them out two across anyway,
      squeezed each to 187px, and because the labels must not wrap the
      text and the arrow spilled 70px past their own borders. A
      container query asks the only question that matters — is there
      room here — so the same component is right in a full-width section
      and in the 340px enquiry rail on a stay, with nothing passed in to
      say which.
    */
    <div className={`@container ${className}`}>
      <div
        /*
          Two caps, because the two arrangements want different ones.
          Stacked, a 500px-wide button holding eleven-point type reads
          as an empty bar; side by side, the pair needs the full 576 or
          the columns fall below the width of their own labels.
        */
        className={`grid max-w-md gap-3 @[34rem]:max-w-xl @[34rem]:grid-cols-2 @[34rem]:gap-4 ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className={ACTION}
        >
          {whatsapp}
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </a>

        <a href={emailLink(subject, message)} className={ACTION}>
          {email}
          <span
            aria-hidden
            className="transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
}

/* The address itself, for anyone who would rather write it out. */
export function EnquiryAddress({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-7 text-white/40 ${className}`}>
      Or write to us at{" "}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="text-white/60 transition-colors hover:text-[#A8B473]"
      >
        {CONTACT_EMAIL}
      </a>
    </p>
  );
}
