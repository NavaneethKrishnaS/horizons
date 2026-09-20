"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import MegaMenu from "./navbar/MegaMenu";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    // Set the correct state on mount, so a page that loads already
    // scrolled (reload, back navigation, anchor link) doesn't render
    // a transparent navbar over a light section.
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#2F3522]/55 backdrop-blur-3xl border-b border-white/5 py-5"
          : isHomePage
          ? "bg-transparent py-8"
          : "bg-transparent py-6"
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

            <a href="#" className="transition hover:text-white">
              Journal
            </a>
          </div>

          {/* CTA */}
          <div className="ml-auto">
            <Link
              href="/houseboats"
              className="group flex items-center gap-2 text-[15px] font-light text-white"
            >
              <span>Check Availability</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
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
  );
}