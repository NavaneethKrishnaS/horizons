import HouseboatHero from "@/components/houseboats/HouseboatHero";
import FeaturedHouseboats from "@/components/houseboats/FeaturedHouseboats";
import HouseboatExplorer from "@/components/houseboats/HouseboatExplorer";
import WhyChooseHorizons from "@/components/houseboats/WhyChooseHorizons";
import GuestStory from "@/components/houseboats/GuestStory";
import BookingCTA from "@/components/houseboats/BookingCTA";

export default function HouseboatsPage() {
  return (
    <main className="overflow-x-hidden">
      <HouseboatHero />
      <FeaturedHouseboats />
      <HouseboatExplorer />
      <WhyChooseHorizons />
      <GuestStory />
      <BookingCTA />
    </main>
  );
}