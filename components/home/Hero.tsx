import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/hero/hero.png')",
      }}
    >
      {/* Softer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

      {/* Hero Content */}
      <div className="relative z-10 -translate-y-16 flex flex-col items-center px-6 text-center text-[#F7F4EE]">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.55em] text-white/70">
          BY SCENIC ESCAPES
        </p>

        <h1 className="font-serif text-[72px] font-medium leading-none tracking-[-0.05em] md:text-[118px] lg:text-[150px]">
          HORIZONS
        </h1>

        <p className="mt-8 max-w-xl text-[22px] font-light leading-relaxed text-white/85 md:text-[28px]">
          Find Your Next Horizon.
        </p>

        <Link
          href="/houseboats"
          className="group mt-12 flex items-center gap-2 text-[17px] font-normal tracking-wide text-white/90 transition-colors duration-300 hover:text-white"
        >
          <span>Begin Journey</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      <SearchBar />
    </section>
  );
}