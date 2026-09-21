"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import MegaMenu from "./navbar/MegaMenu";
import MobileMenu from "./navbar/MobileMenu";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastRun = 0;

    function evaluate() {
      setScrolled(window.scrollY > 40);
    }

    // Scroll fires faster than the screen refreshes; a few times a second is
    // plenty for a bar that only changes once, at 40px.
    function handleScroll() {
      const now = performance.now();

      if (now - lastRun < 100) return;

      lastRun = now;
      evaluate();
    }

    // Set the correct state on mount, so a page that loads already
    // scrolled (reload, back navigation, anchor link) doesn't render
    // a transparent navbar over a light section.
    evaluate();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
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
        /*
          One resting height for every page. Home used to sit at py-8 and
          every other page at py-6, so moving between them animated a 16px
          jump in the navbar.
        */
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-white/5 bg-[#2F3522]/55 py-5 backdrop-blur-3xl"
            : "border-transparent bg-transparent py-8"
        }`}
      >
        <Container>
          <div className="relative flex items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo/horizons-logo.svg"
                alt="HORIZONS"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? "h-11" : "h-14"
                }`}
              />
            </Link>

            {/* Navigation */}
            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-16 text-[15px] font-light text-white/90 md:flex">
              {/* Destinations */}
              <div
                onMouseEnter={() => openMenu("Destinations")}
                onMouseLeave={closeMenu}
              >
                <button className="transition hover:text-white">
                  Destinations
                </button>
              </div>

              <Link
                href="/houseboats"
                className={`transition ${
                  pathname.startsWith("/houseboats")
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Houseboats
              </Link>

              <a href="#" className="transition hover:text-white">
                Stays
              </a>

              <a href="#" className="transition hover:text-white">
                Packages
              </a>

              <Link
                href="/journal"
                className={`transition ${
                  pathname.startsWith("/journal")
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Journal
              </Link>

              <Link
                href="/about"
                className={`transition ${
                  pathname.startsWith("/about")
                    ? "text-white"
                    : "text-white/90 hover:text-white"
                }`}
              >
                About
              </Link>
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center">
              {/* CTA — desktop only; on mobile it lives inside the menu */}
              <Link
                href="/houseboats"
                className="group hidden items-center gap-2 text-[15px] font-light text-white md:flex"
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
                className="relative -mr-2 flex h-10 w-10 items-center justify-center md:hidden"
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

            {/* Mega Menu */}
            <AnimatePresence>
              {activeMenu === "Destinations" && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="absolute left-1/2 top-full mt-6 -translate-x-1/2"
                  onMouseEnter={() => openMenu("Destinations")}
                  onMouseLeave={closeMenu}
                >
                  <MegaMenu menu="Destinations" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
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