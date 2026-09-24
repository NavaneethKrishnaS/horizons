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
  /*
    Side by side where there is room, one above the other in a narrow
    column such as the enquiry rail on a stay.
  */
  layout?: "row" | "stack";
  /* Centred under a centred section. */
  align?: "left" | "center";
  whatsapp?: string;
  email?: string;
  className?: string;
};

const ACTION =
  "group flex items-center justify-between gap-5 whitespace-nowrap border border-white/25 px-8 py-4 text-[11px] uppercase tracking-[0.3em] text-white transition-colors duration-500 hover:border-[#6B7341] hover:bg-[#6B7341]";

export default function EnquiryActions({
  message,
  subject,
  layout = "row",
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
  /*
    A grid sized to its content rather than a flex row, so the two come
    out exactly the same width even though the labels are not the same
    length — and neither has to wrap to manage it.
  */
  const shape =
    layout === "stack"
      ? "grid gap-3"
      : `grid w-full gap-4 sm:w-fit sm:grid-cols-2 ${
          align === "center" ? "sm:mx-auto" : ""
        }`;

  return (
    <div className={`${shape} ${className}`}>
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
