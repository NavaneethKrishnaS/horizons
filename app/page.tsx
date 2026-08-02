import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedRetreats from "@/components/home/featured/FeaturedRetreats";
import Experiences from "@/components/home/experiences/Experiences";
import SignatureStays from "@/components/home/stays/SignatureStays";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedRetreats />
      <Experiences />
      <SignatureStays />
    </>
  );
}