import Image from "next/image";

import Reveal from "./Reveal";

import { journalIntro } from "@/data/journal";

export default function JournalHero() {
  return (
    <section className="relative flex min-h-lvh items-end overflow-hidden bg-[#111111]">
      <Image
        src="/images/about/backwaters.jpg"
        alt="Dawn over the Kerala backwaters"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#111111]" />

      <div className="relative mx-auto w-full max-w-5xl px-6 pb-20 md:pb-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
            {journalIntro.label}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-6 max-w-3xl font-cormorant text-[38px] font-light leading-[1.05] text-white sm:text-6xl md:text-7xl">
            {journalIntro.heading}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-white/70 md:text-lg md:leading-9">
            {journalIntro.standfirst}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
