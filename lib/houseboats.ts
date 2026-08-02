import { houseboats } from "@/data/houseboats";

export function getHouseboatBySlug(slug: string) {
  return houseboats.find((houseboat) => houseboat.slug === slug);
}

export function getRelatedHouseboats(
  currentSlug: string,
  limit = 3
) {
  return houseboats
    .filter((houseboat) => houseboat.slug !== currentSlug)
    .slice(0, limit);
}