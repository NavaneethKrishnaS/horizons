import type { Metadata } from "next";

import { pageMeta } from "@/lib/meta";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GALLERY, GALLERY_TOTAL } from "@/data/gallery";

export const metadata: Metadata = pageMeta({
  title: "Gallery | HORIZONS by Scenic Escapes",
  description:
    `${GALLERY_TOTAL} photographs from journeys we planned across Kerala and Tamil Nadu — the backwaters, Munnar, Fort Kochi, Thekkady, Thanjavur, Mahabalipuram, Chettinad and Pondicherry. Taken by us and by the people travelling with us.`,
  path: "/gallery",
});

export default function GalleryPage() {
  /*
    The place list in the form a search engine reads, so the page can be
    matched to the places in it rather than only to the word "gallery".
    Built from the same data the page renders, so the two cannot disagree.
  */
  const structured = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "HORIZONS photographs of Kerala and Tamil Nadu",
    description: `${GALLERY_TOTAL} photographs from journeys arranged by HORIZONS by Scenic Escapes.`,
    url: "https://horizonsindia.com/gallery",
    about: GALLERY.map((place) => ({
      "@type": "Place",
      name: place.name,
      description: place.where,
    })),
  };

  return (
    <main className="overflow-x-clip bg-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />

      <GalleryHero />
      <GalleryGrid />
    </main>
  );
}
