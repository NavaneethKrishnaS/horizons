import Image from "next/image";
import Link from "next/link";

import { Bath, BedDouble, Users } from "lucide-react";

import { Houseboat } from "@/data/houseboat.types";

interface FeaturedHouseboatCardProps {
  houseboat: Houseboat;
}

export default function FeaturedHouseboatCard({
  houseboat,
}: FeaturedHouseboatCardProps) {
  return (
    <div className="group overflow-hidden rounded-[32px] bg-neutral-100">
      <div className="grid items-stretch lg:grid-cols-[1.35fr_1fr]">
        {/* Image */}
        <div className="relative h-[520px] overflow-hidden">
          <Image
            src={houseboat.gallery[0].src}
            alt={houseboat.gallery[0].alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Featured Badge */}
          <div className="absolute bottom-6 left-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#6B7341]/90 px-4 py-2 backdrop-blur-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.256L12 19.897 4.584 23.852 6 15.596 0 9.748l8.332-1.73z" />
              </svg>

              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white">
                Featured
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col bg-gradient-to-br from-[#FCFBF8] to-[#F7F5EF] p-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.35em] text-[#7A8250]">
          {houseboat.defaultCategory ?? houseboat.category}
          </p>

          <h3 className="mt-3 font-serif text-[30px] leading-tight text-neutral-900">
            {houseboat.name}
          </h3>

          <p className="mt-5 text-[15px] leading-8 text-neutral-700">
            {houseboat.shortDescription}
          </p>

          {/* Specs */}
          <div className="mt-7 flex items-center justify-between border-y border-neutral-200 py-6">
            <div className="flex items-center gap-3">
              <BedDouble
                size={20}
                strokeWidth={1.8}
                className="text-[#6B7341]"
              />

              <div>
                <p className="text-[26px] font-semibold leading-none text-neutral-900">
                  {houseboat.bedrooms}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Bedroom
                </p>
              </div>
            </div>

            <div className="h-12 w-px bg-neutral-200" />

            <div className="flex items-center gap-3">
              <Users
                size={20}
                strokeWidth={1.8}
                className="text-[#6B7341]"
              />

              <div>
                <p className="text-[26px] font-semibold leading-none text-neutral-900">
                  {houseboat.maxGuests}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Guests
                </p>
              </div>
            </div>

            <div className="h-12 w-px bg-neutral-200" />

            <div className="flex items-center gap-3">
              <Bath
                size={20}
                strokeWidth={1.8}
                className="text-[#6B7341]"
              />

              <div>
                <p className="text-[26px] font-semibold leading-none text-neutral-900">
                  {houseboat.bathrooms}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Bathroom
                </p>
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="mt-auto flex items-end justify-between gap-6 pt-8">
            <div>
              <p className="text-[15px] text-neutral-500">
                Starting from
              </p>

              <div className="mt-1 flex items-end">
                <p className="text-[42px] font-semibold leading-none text-neutral-900">
                ₹
                {
  houseboat.categories
    .find((c) => c.name === houseboat.defaultCategory)!
    .price
    .toLocaleString()
}
                </p>

                <span className="mb-[6px] ml-2 text-[16px] text-neutral-500">
                  / per night
                </span>
              </div>
            </div>

            <Link
              href={`/houseboats/${houseboat.slug}`}
              className="group/button inline-flex h-14 items-center justify-center gap-3 rounded-[18px] bg-[#6B7341] px-7 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#5F673A]"
            >
              <span>Explore</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover/button:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}