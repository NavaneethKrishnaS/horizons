import type { MetadataRoute } from "next";

import { houseboats } from "@/data/houseboats";
import { packages } from "@/data/packages";
import { stays } from "@/data/stays";

const SITE = "https://horizonsindia.com";

/*
  There was no sitemap at all, which mattered less when the site was six
  pages and matters now that it is well over a hundred: thirty-nine
  journeys and sixty-five stays, none of them linked from anywhere a
  crawler reaches without working through a filter control first.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/about",
    "/journal",
    "/houseboats",
    "/packages",
    "/stays",
    "/contact",
    "/faq",
    "/company",
    "/privacy",
    "/how-to-get-to-kerala",
  ];

  return [
    ...pages.map((path) => ({
      url: `${SITE}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...houseboats.map((boat) => ({
      url: `${SITE}/houseboats/${boat.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...packages.map((tour) => ({
      url: `${SITE}/packages/${tour.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...stays.map((stay) => ({
      url: `${SITE}/stays/${stay.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
