"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import { throttle } from "@/lib/throttle";
import DestinationsMenu from "./navbar/DestinationsMenu";
import MobileMenu from "./navbar/MobileMenu";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  /*
    The Journal is printed on paper rather than shot at night, so the navbar
    has to invert over it — white type on cream is invisible.
  */
  const paperPage = pathname.startsWith("/journal");

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  /*
    While the Destinations panel is down, the bar takes the panel's own
    colour and drops the rule between them, so the two read as one
    sheet of charcoal rather than as a bar with something hanging off
    it. On the Journal that also means the bar stops being cream for
    as long as the panel is open — a dark panel under a cream bar is
    the seam this exists to remove.
  */
  const panelOpen = activeMenu === "Destinations";

  const onPaper = paperPage && !panelOpen;

  const active = (href: string) => {
    const isHere = pathname.startsWith(href);

    if (onPaper) {
      return isHere ? "text-black" : "text-black/70 hover:text-black";
    }

    return isHere ? "text-white" : "text-white/90 hover:text-white";
  };

  const [scrolled, setScrolled] = useState(false);

  /*
    The bar is fixed, so it sits over the page rather than in it, and any
    layout that has to centre something in the part of the screen you can
    actually see needs to know how tall it is. It varies by breakpoint,
    so it is measured rather than guessed, and published for CSS to read.

    Only the compact height is ever published. The bar is at its full
    height for the first forty pixels of the page and nowhere else, and
    anything that centres against it is by definition further down than
    that — publishing the tall height would only make those layouts
    briefly size themselves against a number that no longer applies by
    the time anyone sees them. Until the first scroll the variable is
    simply unset and the stylesheet's own fallback stands.
  */
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = barRef.current;

    if (!node || !scrolled) return;

    const publish = () =>
      document.documentElement.style.setProperty(
        "--horizons-nav",
        `${Math.round(node.getBoundingClientRect().height)}px`,
      );

    publish();

    const observer = new ResizeObserver(publish);

    observer.observe(node);

    return () => observer.disconnect();
  }, [scrolled]);

  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function evaluate() {
      setScrolled(window.scrollY > 40);
    }

    /*
      Scroll fires faster than the screen refreshes, so it is throttled;
      but with a trailing call, because the last event of a flick back
      to the top is exactly the one a plain throttle drops, and dropping
      it leaves the bar blurred and tinted over the top of the page.
    */
    const scroll = throttle(evaluate, 100);

    // Set the correct state on mount, so a page that loads already
    // scrolled (reload, back navigation, anchor link) doesn't render
    // a transparent navbar over a light section.
    evaluate();

    window.addEventListener("scroll", scroll.run, { passive: true });

    return () => {
      window.removeEventListener("scroll", scroll.run);
      scroll.cancel();
    };
  }, []);

  // Close the mobile menu when the route changes (covers browser
  // back/forward). Adjusting state during render is React's documented
  // pattern for this — an effect here would cause a cascading render.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  function openMenu(menu: string) {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }

    setActiveMenu(menu);
  }

  function closeMenu() {
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 120);

    setCloseTimeout(timeout);
  }

  return (
    <>
      <nav
        ref={barRef}
        /*
          One resting height for every page. Home used to sit at py-8 and
          every other page at py-6, so moving between them animated a 16px
          jump in the navbar.
        */
        /*
          The scrolled bar used to be #2F3522, a distinctly olive green.
          Over a photograph that reads as a warm scrim, which is what it
          was for; over a page whose background is flat near-black it
          reads as a green bar someone forgot to remove. It is now dark
          enough to disappear into #111111 and still warm enough to tint
          a hero photograph.
        */
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "py-5" : "py-8"
        } ${
          panelOpen
            ? /* The panel's own colour, and no rule between them. */
              "border-transparent bg-[#0E0E0E]"
            : scrolled
              ? onPaper
                ? "border-black/10 bg-[#F4F2ED]/80 backdrop-blur-xl"
                : "border-white/5 bg-[#16180F]/70 backdrop-blur-3xl"
              : "border-transparent bg-transparent"
        }`}
      >
        <Container>
          <div className="relative flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {/*
                A plain img on purpose, so the lint warning is not noise
                hiding a real one: the mark is an SVG, which the image
                optimiser cannot make smaller, and its height animates
                between two values as the page scrolls — which is exactly
                what next/image objects to.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/horizons-logo.svg"
                alt="HORIZONS"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? "h-11" : "h-14"
                } ${onPaper ? "invert" : ""}`}
              />
            </Link>

            {/*
              Navigation.

              It switches to the menu button at lg, not md. Between about
              850 and 1050 pixels the six centred links and the Check
              Availability link on the right ran into each other — the
              links are centred on the bar, so they grow towards the
              corners as the window narrows and the corners do not move.
            */}
            <div
              className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-[15px] font-light lg:flex xl:gap-16 ${
                onPaper ? "text-black/70" : "text-white/90"
              }`}
            >
              {/* Destinations */}
              <div
                onMouseEnter={() => openMenu("Destinations")}
                onMouseLeave={closeMenu}
              >
                <Link
                  href="/destinations"
                  className={`transition ${active("/destinations")}`}
                >
                  Destinations
                </Link>
              </div>

              <Link
                href="/houseboats"
                className={`transition ${active("/houseboats")}`}
              >
                Houseboats
              </Link>

              <Link href="/stays" className={`transition ${active("/stays")}`}>
                Stays
              </Link>

              <Link
                href="/packages"
                className={`transition ${active("/packages")}`}
              >
                Packages
              </Link>

              <Link
                href="/journal"
                className={`transition ${active("/journal")}`}
              >
                Journal
              </Link>

              <Link href="/about" className={`transition ${active("/about")}`}>
                About
              </Link>
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center">
              {/* CTA — desktop only; on mobile it lives inside the menu */}
              <Link
                href="/houseboats"
                className={`group hidden items-center gap-2 text-[15px] font-light lg:flex ${
                  onPaper ? "text-black" : "text-white"
                }`}
              >
                <span>Check Availability</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              {/* Menu toggle — mobile only */}
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="relative -mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
              >
                <span
                  aria-hidden
                  className={`absolute h-px w-6 bg-white transition-transform duration-300 ${
                    menuOpen ? "rotate-45" : "-translate-y-[3px]"
                  }`}
                />
                <span
                  aria-hidden
                  className={`absolute h-px w-6 bg-white transition-transform duration-300 ${
                    menuOpen ? "-rotate-45" : "translate-y-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </Container>

        {/*
          The Destinations panel, outside the Container so it can run the
          full width of the screen, and flush against the bar so there is
          no gap for the pointer to cross on its way into it. Desktop
          only: the bar's own menu button covers the small screens.
        */}
        <AnimatePresence>
          {activeMenu === "Destinations" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden lg:block"
              onMouseEnter={() => openMenu("Destinations")}
              onMouseLeave={closeMenu}
            >
              <DestinationsMenu onNavigate={() => setActiveMenu(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/*
        Rendered OUTSIDE <nav> on purpose. Once scrolled, the navbar
        has backdrop-blur, and an element with a backdrop-filter becomes
        the containing block for its fixed-position children — which
        would shrink this full-screen overlay to the height of the bar.
      */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
