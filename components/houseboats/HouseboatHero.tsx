import Image from "next/image";

/*
  The masthead, kept as it was written.

  One phrase had to go. "From trusted local operators" describes a
  marketplace booking somebody else's boats, which is what every
  aggregator in Alleppey is, and is not what this is — the home page
  says six kettuvallam of our own and the About page says where they
  are from. A visitor who reads both finds a contradiction, and the
  one that costs us is the one on this page.
*/
export default function HouseboatHero() {
  return (
    <section className="relative flex min-h-lvh items-center justify-center overflow-hidden bg-[#111111]">
      <Image
        src="/images/houseboats/hero.png"
        alt="A kettuvallam on the Alleppey backwaters"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-[#F7F4EE]">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/65">
          Alleppey · The backwaters
        </p>

        <h1 className="mt-7 font-cormorant text-[44px] font-light leading-[1.05] sm:text-[62px] md:text-[86px] lg:text-[104px]">
          Six boats of our own
        </h1>

        <p className="mx-auto mt-8 max-w-xl font-cormorant text-[21px] font-light leading-snug text-white/85 sm:text-[25px] md:text-[29px]">
          One bedroom to six, crewed and cooked for, and moored somewhere quiet
          for the night.
        </p>
      </div>
    </section>
  );
}
