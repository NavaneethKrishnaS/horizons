import { notFound } from "next/navigation";

import Breadcrumb from "@/components/common/Breadcrumb";

import HouseboatHero from "@/components/houseboats/details/HouseboatHero";
import HouseboatOverview from "@/components/houseboats/details/HouseboatOverview";
import HouseboatGallery from "@/components/houseboats/details/HouseboatGallery";
import Amenities from "@/components/houseboats/details/Amenities";
import Meals from "@/components/houseboats/details/Meals";
import Itinerary from "@/components/houseboats/details/Itinerary";
import Policies from "@/components/houseboats/details/Policies";
import FAQ from "@/components/houseboats/details/FAQ";
import BookingCard from "@/components/houseboats/details/BookingCard";
import StickyBookingCard from "@/components/houseboats/details/StickyBookingCard";
import MobileBookingBar from "@/components/houseboats/details/MobileBookingBar";

import { houseboats } from "@/data/houseboats";

interface HouseboatPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function HouseboatPage({
  params,
}: HouseboatPageProps) {
  const { slug } = await params;

  const houseboat = houseboats.find((boat) => boat.slug === slug);

  if (!houseboat) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">

      <HouseboatHero houseboat={houseboat} />

      <section className="py-14 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
            {/* Left Column */}
            <div className="space-y-14 md:space-y-24">
              <HouseboatOverview houseboat={houseboat} />
              <HouseboatGallery houseboat={houseboat} />
              <Amenities houseboat={houseboat} />
              <Meals houseboat={houseboat} />
              <Itinerary houseboat={houseboat} />
              <Policies houseboat={houseboat} />
              <FAQ houseboat={houseboat} />
            </div>

            {/* Right Column */}
            <aside className="relative hidden lg:block">
              <StickyBookingCard>
                <BookingCard houseboat={houseboat} />
              </StickyBookingCard>
            </aside>
          </div>
        </div>

        {/*
          Mobile: the card is no longer parked at the foot of the page. A slim
          bar appears once the hero is scrolled past and opens the same card in
          a sheet, so it never sits between the reader and the content.
        */}
        <MobileBookingBar houseboat={houseboat} />
      </section>
    </main>
  );
}