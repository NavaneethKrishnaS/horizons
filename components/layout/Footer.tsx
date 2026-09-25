import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const navigation = [
  { name: "Houseboats", href: "/houseboats" },
  { name: "Stays", href: "/stays" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "Journal", href: "/journal" },
  { name: "About", href: "/about" },
  /*
    Contact lives here rather than in the navbar. The top of the site is
    for the things people browse; this is the thing they look for once
    they have decided to ask, and the foot of the page is where everyone
    looks for it.
  */
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Main Footer */}
        <div className="flex flex-col items-center py-14">
          {/* Logo */}
          <Link
            href="/"
            className="transition-opacity duration-300 hover:opacity-90"
          >
            <Image
              src="/logo/horizons-logo.svg"
              alt="HORIZONS"
              /* 3743 x 2703 in the file: declare that ratio, or next/image
                 warns on every page that the rendered height disagrees. */
              width={190}
              height={137}
              priority
              className="h-auto w-[190px]"
            />
          </Link>

          {/* Tagline */}
          <p className="mt-4 max-w-xl text-center text-[15px] leading-7 text-white/60">
            Find Your Next Horizon.
          </p>

          {/* Divider */}
          <div className="mt-8 h-px w-28 bg-white/10" />

          {/* Navigation */}
          <nav className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[15px] tracking-[0.08em] text-white/75 transition-colors duration-300 hover:text-[#6B7341]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Icons */}
          <div className="mt-7 flex items-center gap-7">
            <Link
              href="https://instagram.com/scenicescapesindia"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#6B7341]"
            >
              <SiInstagram size={17} />
            </Link>

            <Link
              href="mailto:info@scenicescapesindia.com"
              aria-label="Email"
              className="text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#6B7341]"
            >
              <Mail size={17} strokeWidth={1.8} />
            </Link>

            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#6B7341]"
            >
              <SiWhatsapp size={17} />
            </Link>
          </div>

          {/* Scenic Escapes */}
          <Link
            href="https://scenicescapesindia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 text-[15px] text-white/60 transition-colors duration-300 hover:text-[#6B7341]"
          >
            Visit Scenic Escapes

            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-white/45 lg:flex-row">
          <p>© 2026 HORIZONS by Scenic Escapes. All rights reserved.</p>

          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#6B7341]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[#6B7341]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}