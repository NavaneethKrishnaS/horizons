import Image from "next/image";
import Link from "next/link";

import {
  ADDRESS,
  ORGANISATION,
  PHONE_DISPLAY,
  PHONE_HREF,
  REGISTRATION,
} from "@/data/contact";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/whatsapp";

/*
  The masthead at the foot of the page.

  It used to be a narrow centred stack on a page 1440 wide: the mark,
  one flat row of eight links at identical weight — so FAQ read as
  loudly as Houseboats — and three unlabelled icons where the contact
  details should be. Nothing said who the company is or where it is,
  which is the one thing an agent in Paris looks down here to find.

  So: the same left-margin grid the rest of the site uses, the links
  grouped by what they are for, and the company written out. Every
  figure comes from data/contact.ts, which is copied from the
  certificates — nothing here is retyped by hand.
*/

const TRAVEL = [
  { name: "Houseboats", href: "/houseboats" },
  { name: "Stays", href: "/stays" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
];

const HORIZONS = [
  { name: "About", href: "/about" },
  { name: "Journal", href: "/journal" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

const columnHeading = "text-[10px] uppercase tracking-[0.3em] text-white/30";

const columnLink =
  "text-[14px] text-white/60 transition-colors duration-300 hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-3 md:py-20 lg:grid-cols-12 lg:gap-x-8">
          {/* Who, and where */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <Link
              href="/"
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/logo/horizons-logo.svg"
                alt="HORIZONS"
                /* 3743 x 2703 in the file: declare that ratio, or
                   next/image warns that the rendered height disagrees. */
                width={132}
                height={95}
                /* No priority: the footer is below every fold there is,
                   and the navbar has already cached this file. */
                className="h-auto w-[132px]"
              />
            </Link>

            <p className="mt-6 font-cormorant text-[21px] font-light text-white/70">
              Find Your Next Horizon.
            </p>

            <address className="mt-7 text-[13px] not-italic leading-6 text-white/35">
              <span className="block text-white/50">{ORGANISATION}</span>

              {ADDRESS.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {/* Travel */}
          <nav className="lg:col-span-2 lg:col-start-6">
            <p className={columnHeading}>Travel</p>

            <ul className="mt-6 space-y-3.5">
              {TRAVEL.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={columnLink}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* HORIZONS */}
          <nav className="lg:col-span-2 lg:col-start-8">
            <p className={columnHeading}>Horizons</p>

            <ul className="mt-6 space-y-3.5">
              {HORIZONS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={columnLink}>
                    {item.name}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="https://scenicescapesindia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-1.5 ${columnLink}`}
                >
                  Scenic Escapes
                  <span
                    aria-hidden
                    className="text-white/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/*
            Written out rather than drawn as icons. Somebody deciding
            whether to trust a company on the other side of the world
            wants to see the address they would be writing to.
          */}
          <div className="col-span-2 md:col-span-1 lg:col-span-3 lg:col-start-10">
            <p className={columnHeading}>Talk to us</p>

            <ul className="mt-6 space-y-3.5">
              <li>
                <a href={PHONE_HREF} className={columnLink}>
                  {PHONE_DISPLAY}
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className={`break-words ${columnLink}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </li>

              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={columnLink}
                >
                  WhatsApp
                </a>
              </li>

              <li>
                <a
                  href="https://instagram.com/scenicescapesindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={columnLink}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* The small print */}
        <div className="flex flex-col gap-5 border-t border-white/[0.07] py-7 text-[12px] text-white/35 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
            <p>© {new Date().getFullYear()} HORIZONS by Scenic Escapes</p>

            <p className="text-white/25">
              {REGISTRATION.map((entry) => `${entry.term} ${entry.value}`).join(
                " · ",
              )}
            </p>
          </div>

          {/*
            In the order people look for it: who the company is, then
            how it handles their data, then what they are agreeing to.
          */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <Link
              href="/company"
              className="transition-colors duration-300 hover:text-white"
            >
              Company details
            </Link>

            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
