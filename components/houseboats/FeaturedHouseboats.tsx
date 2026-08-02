import { houseboats } from "@/data/houseboats";
import FeaturedHouseboatCard from "./FeaturedHouseboatCard";

export default function FeaturedHouseboats() {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/houseboats/featured-bg.jpg')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-black/60 to-black" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/60">
            Featured Collection
          </p>

          <h2 className="mt-4 text-5xl font-light text-white">
            Featured Houseboats
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Handpicked luxury houseboats offering exceptional comfort,
            authentic Kerala hospitality, and unforgettable backwater
            experiences.
          </p>
        </div>

        <div className="grid gap-10">
          {houseboats.map((houseboat) => (
            <FeaturedHouseboatCard
              key={houseboat.id}
              houseboat={houseboat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}