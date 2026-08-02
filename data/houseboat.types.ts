export type HouseboatCategory = "Deluxe" | "Premium" | "Luxury";

export interface HouseboatCategoryOption {
  id: string;
  name: string;
  price: number;
}

export interface HouseboatImage {
  src: string;
  alt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ItineraryItem {
  day: number;
  time: string;
  title: string;
  description: string;
}

export interface Houseboat {
  id: string;
  slug: string;

  name: string;

  featured: boolean;

  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  crew: number;

  yearBuilt: number;

  /**
 * Pricing
 */
defaultCategory: HouseboatCategory;
categories: HouseboatCategoryOption[];

  shortDescription: string;
  longDescription: string;

  gallery: HouseboatImage[];

  amenities: string[];

  meals: string[];

  itinerary: ItineraryItem[];

  inclusions: string[];

  exclusions: string[];

  policies: string[];

  faqs: FAQ[];
}