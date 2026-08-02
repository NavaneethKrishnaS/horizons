import { Houseboat } from "./houseboat.types";
import {
    commonMeals,
    commonItinerary,
    commonExclusions,
    commonPolicies,
  } from "./houseboat.shared";

export const experienceCategories = [
  {
    id: "families",
    title: "For Families",
    subtitle: "Shared moments on the backwaters",
    description:
      "Spacious private houseboats designed for memorable family holidays with comfort, local cuisine and serene cruising.",
    image: "/images/houseboats/experiences/families.png",
    highlights: [],
  },
  {
    id: "honeymoon",
    title: "For Couples",
    subtitle: "Romantic escapes",
    description:
      "Private cruises with peaceful sunsets, candlelit dinners and intimate experiences.",
    image: "/images/houseboats/experiences/couples.png",
    highlights: [
      "Private cruise",
      "Sunset views",
      "Candlelight dinner",
    ],
  },
  {
    id: "friends",
    title: "For Friends",
    subtitle: "Celebrate together",
    description:
      "Luxury houseboats perfect for groups looking to relax, celebrate and explore Alleppey's backwaters.",
    image: "/images/houseboats/experiences/groups.png",
    highlights: [
      "Large deck",
      "Music system",
      "Group dining",
    ],
  },
  {
    id: "luxury",
    title: "Luxury",
    subtitle: "The finest stays",
    description:
      "Handpicked premium and luxury houseboats with elevated interiors and curated hospitality.",
    image: "/images/houseboats/experiences/luxury.png",
    highlights: [
      "Premium interiors",
      "Private chef",
      "Upper deck",
    ],
  },
  {
    id: "daycruise",
    title: "Celebrations",
    subtitle: "Moments worth celebrating",
    description:
      "Celebrate birthdays, anniversaries and special occasions with curated private cruises across Kerala's backwaters.",
    image: "/images/houseboats/experiences/celebrations.png",
    highlights: [
      "Private celebrations",
      "Decor options",
      "Curated dining",
    ],
  },
];

export const houseboats: Houseboat[] = [
  {
    id: "/houseboats/1-bedroom",

    slug: "1-bedroom",

    name: "1 Bedroom Houseboat",


    featured: true,

    bedrooms: 1,

    bathrooms: 1,

    maxGuests: 2,

    crew: 2,

    yearBuilt: 2021,

    defaultCategory: "Deluxe",

   

categories: [
  {
    id: "deluxe",
    name: "Deluxe",
    price: 10000,
  },
  {
    id: "premium",
    name: "Premium",
    price: 15000,
  },
  {
    id: "luxury",
    name: "Luxury",
    price: 20000,
  },
],

    shortDescription:
      "Private one-bedroom houseboat designed for couples seeking a peaceful backwater cruise.",

    longDescription:
      "Traditional one-bedroom houseboat with a private air-conditioned bedroom, attached bathroom, dining area and a scenic cruise through the Alleppey backwaters.",

    gallery: [
      {
        src: "/images/houseboats/1-bedroom/cover.jpeg",
        alt: "Exterior view of the houseboat",
      },
      {
        src: "/images/houseboats/1-bedroom/gallery-1.jpg",
        alt: "Luxury living area",
      },
      {
        src: "/images/houseboats/1-bedroom/gallery-2.jpg",
        alt: "Interior workspace and seating",
      },
      {
        src: "/images/houseboats/1-bedroom/gallery-3.jpg",
        alt: "Private bedroom",
      },
      {
        src: "/images/houseboats/1-bedroom/gallery-4.jpg",
        alt: "Modern attached bathroom",
      },
    ],

    amenities: [
      "Air-conditioned bedroom",
      "Private bathroom",
      "Lake view",
      "Outdoor dining area",
      "Outdoor furniture",
      "Living area",
      "Wardrobe",
      "Clothes rack",
      "All meals onboard",
      "2 crew members",
      "Shower",
    ],

    meals: commonMeals,

    itinerary: commonItinerary,

    inclusions: [
      "Welcome drink on arrival",
      "Accommodation in a private air-conditioned bedroom",
      "Traditional Kerala lunch",
      "Evening tea & snacks",
      "Dinner",
      "Breakfast",
      "Backwater cruise as per itinerary",
      "Services of experienced crew",
      "Private attached bathroom",
      "Parking for the houseboat",
    ],

    exclusions: commonExclusions,

    policies: commonPolicies,
    faqs: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in starts at 12:00 PM and check-out is at 9:00 AM the next morning.",
      },
      {
        question: "Are all meals included?",
        answer:
          "Yes. Welcome drink, lunch, evening tea & snacks, dinner and breakfast are included.",
      },
      {
        question: "Is the bedroom air-conditioned?",
        answer:
          "Yes. The bedroom is air-conditioned during the scheduled operating hours.",
      },
      {
        question: "Can the houseboat cruise throughout the night?",
        answer:
          "No. Houseboats anchor in the evening as required by local navigation regulations.",
      },
      {
        question: "How many guests can stay?",
        answer:
          "This one-bedroom houseboat comfortably accommodates up to two guests.",
      },
    ],
  },
  {
    id: "/houseboats/2-bedroom",
  
    slug: "2-bedroom",
  
    name: "2 Bedroom Houseboat",
  
    featured: true,
  
    bedrooms: 2,
  
    bathrooms: 2,
  
    maxGuests: 7,
  
    crew: 3,
  
    yearBuilt: 2022,
  
    defaultCategory: "Deluxe",
  
    categories: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: 18500,
      },
      {
        id: "premium",
        name: "Premium",
        price: 22500,
      },
    ],
  
    shortDescription:
      "Spacious two-bedroom private houseboat designed for families and small groups exploring Kerala's tranquil backwaters.",
  
    longDescription:
      "A beautifully designed two-bedroom houseboat featuring two air-conditioned bedrooms with attached bathrooms, a spacious living area, elegant dining space and an open upper deck for a memorable cruise through Alleppey's backwaters.",
  
    gallery: [
      {
        src: "/images/houseboats/2-bedroom/cover.jpeg",
        alt: "Exterior view of the houseboat",
      },
      {
        src: "/images/houseboats/2-bedroom/gallery-1.jpg",
        alt: "Living area",
      },
      {
        src: "/images/houseboats/2-bedroom/gallery-2.jpg",
        alt: "Dining area",
      },
      {
        src: "/images/houseboats/2-bedroom/gallery-3.jpg",
        alt: "Master bedroom",
      },
      {
        src: "/images/houseboats/2-bedroom/gallery-4.jpg",
        alt: "Second bedroom",
      },
      {
        src: "/images/houseboats/2-bedroom/gallery-5.jpg",
        alt: "Attached bathroom",
      },
      {
        src: "/images/houseboats/2-bedroom/gallery-6.jpg",
        alt: "Upper deck",
      },
    ],
  
    amenities: [
      "2 Air-conditioned bedrooms",
      "2 Private bathrooms",
      "Lake view",
      "Outdoor dining area",
      "Outdoor furniture",
      "Living area",
      "Upper deck",
      "Wardrobe",
      "All meals onboard",
      "3 crew members",
      "Shower",
    ],
  
    meals: commonMeals,
  
    itinerary: commonItinerary,
  
    inclusions: [
      "Welcome drink on arrival",
      "Accommodation in a private houseboat",
      "Traditional Kerala lunch",
      "Evening tea & snacks",
      "Dinner",
      "Breakfast",
      "Backwater cruise as per itinerary",
      "Services of experienced crew",
      "Parking for the houseboat",
    ],
  
    exclusions: commonExclusions,
  
    policies: commonPolicies,
  
    faqs: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in starts at 12:00 PM and check-out is at 9:00 AM the next morning.",
      },
      {
        question: "Are all meals included?",
        answer:
          "Yes. Welcome drink, lunch, evening tea & snacks, dinner and breakfast are included.",
      },
      {
        question: "Are both bedrooms air-conditioned?",
        answer:
          "Yes. Both bedrooms are air-conditioned during the scheduled operating hours.",
      },
      {
        question: "Can the houseboat cruise throughout the night?",
        answer:
          "No. Houseboats anchor in the evening as required by local navigation regulations.",
      },
      {
        question: "How many guests can stay?",
        answer:
          "This two-bedroom houseboat comfortably accommodates up to seven guests.",
      },
    ],
  },
  {
    id: "/houseboats/3-bedroom",
  
    slug: "3-bedroom",
  
    name: "3 Bedroom Houseboat",
  
    featured: true,
  
    bedrooms: 3,
  
    bathrooms: 3,
  
    maxGuests: 9,
  
    crew: 3,
  
    yearBuilt: 2022,
  
    defaultCategory: "Deluxe",
  
    categories: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: 18000,
      },
      {
        id: "premium",
        name: "Premium",
        price: 26000,
      },
      {
        id: "luxury",
        name: "Luxury",
        price: 36000,
      },
    ],
  
    shortDescription:
      "Elegant three-bedroom private houseboat designed for families and larger groups seeking an unforgettable luxury backwater experience.",
  
    longDescription:
      "Experience Alleppey's serene backwaters aboard a spacious three-bedroom private houseboat featuring air-conditioned bedrooms with attached bathrooms, a stylish living lounge, traditional dining area, open upper deck and warm Kerala hospitality. Perfect for family vacations, celebrations and group getaways.",
  
    gallery: [
      {
        src: "/images/houseboats/3-bedroom/cover.jpeg",
        alt: "Exterior view of the houseboat",
      },
      {
        src: "/images/houseboats/3-bedroom/gallery-1.jpg",
        alt: "Living area",
      },
      {
        src: "/images/houseboats/3-bedroom/gallery-2.jpg",
        alt: "Dining area",
      },
      {
        src: "/images/houseboats/3-bedroom/gallery-3.jpg",
        alt: "Master bedroom",
      },
      {
        src: "/images/houseboats/3-bedroom/gallery-4.jpg",
        alt: "Second bedroom",
      },
      {
        src: "/images/houseboats/3-bedroom/gallery-5.jpg",
        alt: "Attached bathroom",
      },
      {
        src: "/images/houseboats/3-bedroom/gallery-6.jpg",
        alt: "Upper deck",
      },
    ],
  
    amenities: [
      "3 Air-conditioned bedrooms",
      "3 Private bathrooms",
      "Lake view",
      "Outdoor dining area",
      "Outdoor furniture",
      "Spacious living area",
      "Upper deck",
      "Wardrobe",
      "Television",
      "Music system",
      "Refrigerator",
      "All meals onboard",
      "3 crew members",
      "Fishing equipment",
      "Board games",
      "Shower",
    ],
  
    meals: commonMeals,
  
    itinerary: commonItinerary,
  
    inclusions: [
      "Welcome drink on arrival",
      "Accommodation in a private houseboat",
      "Traditional Kerala lunch",
      "Evening tea & snacks",
      "Dinner",
      "Breakfast",
      "Backwater cruise as per itinerary",
      "Services of experienced crew",
      "Parking for the houseboat",
    ],
  
    exclusions: commonExclusions,
  
    policies: commonPolicies,
  
    faqs: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in starts at 12:00 PM and check-out is at 9:00 AM the next morning.",
      },
      {
        question: "Are all meals included?",
        answer:
          "Yes. Welcome drink, lunch, evening tea & snacks, dinner and breakfast are included.",
      },
      {
        question: "Are all bedrooms air-conditioned?",
        answer:
          "Yes. All three bedrooms are air-conditioned during the scheduled operating hours.",
      },
      {
        question: "Can the houseboat cruise throughout the night?",
        answer:
          "No. Houseboats anchor in the evening as required by local navigation regulations.",
      },
      {
        question: "How many guests can stay?",
        answer:
          "This three-bedroom houseboat comfortably accommodates up to nine guests.",
      },
    ],
  },

  {
    id: "/houseboats/4-bedroom",
  
    slug: "4-bedroom",
  
    name: "4 Bedroom Houseboat",
  
    featured: true,
  
    bedrooms: 4,
  
    bathrooms: 4,
  
    maxGuests: 12,
  
    crew: 4,
  
    yearBuilt: 2022,
  
    defaultCategory: "Deluxe",
  
    categories: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: 24000,
      },
      {
        id: "premium",
        name: "Premium",
        price: 36000,
      },
      {
        id: "luxury",
        name: "Luxury",
        price: 55000,
      },
    ],
  
    shortDescription:
      "Spacious four-bedroom private houseboat crafted for large families and groups seeking a premium backwater experience in Alleppey.",
  
    longDescription:
      "Cruise through the enchanting backwaters of Alleppey aboard a beautifully designed four-bedroom private houseboat. Featuring four air-conditioned bedrooms with attached bathrooms, a generous living lounge, elegant dining area, panoramic lake views and a spacious upper deck, it offers the perfect setting for family holidays, reunions and celebrations with authentic Kerala hospitality.",
  
    gallery: [
      {
        src: "/images/houseboats/4-bedroom/cover.jpeg",
        alt: "Exterior view of the houseboat",
      },
      {
        src: "/images/houseboats/4-bedroom/gallery-1.jpg",
        alt: "Luxury living area",
      },
      {
        src: "/images/houseboats/4-bedroom/gallery-2.jpg",
        alt: "Dining area",
      },
      {
        src: "/images/houseboats/4-bedroom/gallery-3.jpg",
        alt: "Master bedroom",
      },
      {
        src: "/images/houseboats/4-bedroom/gallery-4.jpg",
        alt: "Guest bedroom",
      },
      {
        src: "/images/houseboats/4-bedroom/gallery-5.jpg",
        alt: "Attached bathroom",
      },
      {
        src: "/images/houseboats/4-bedroom/gallery-6.jpg",
        alt: "Upper deck",
      },
    ],
  
    amenities: [
      "4 Air-conditioned bedrooms",
      "4 Private bathrooms",
      "Lake view",
      "Outdoor dining area",
      "Outdoor furniture",
      "Spacious living area",
      "Large upper deck",
      "Wardrobe",
      "Television",
      "Music system",
      "Refrigerator",
      "All meals onboard",
      "4 crew members",
      "Fishing equipment",
      "Board games",
      "Private cruise",
      "Shower",
    ],
  
    meals: commonMeals,
  
    itinerary: commonItinerary,
  
    inclusions: [
      "Welcome drink on arrival",
      "Accommodation in a private houseboat",
      "Traditional Kerala lunch",
      "Evening tea & snacks",
      "Dinner",
      "Breakfast",
      "Backwater cruise as per itinerary",
      "Services of experienced crew",
      "Parking for the houseboat",
    ],
  
    exclusions: commonExclusions,
  
    policies: commonPolicies,
  
    faqs: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in starts at 12:00 PM and check-out is at 9:00 AM the next morning.",
      },
      {
        question: "Are all meals included?",
        answer:
          "Yes. Welcome drink, lunch, evening tea & snacks, dinner and breakfast are included.",
      },
      {
        question: "Are all bedrooms air-conditioned?",
        answer:
          "Yes. All four bedrooms are air-conditioned during the scheduled operating hours.",
      },
      {
        question: "Can the houseboat cruise throughout the night?",
        answer:
          "No. Houseboats anchor in the evening as required by local navigation regulations.",
      },
      {
        question: "How many guests can stay?",
        answer:
          "This four-bedroom houseboat comfortably accommodates up to twelve guests.",
      },
    ],
  },

  {
    id: "/houseboats/5-bedroom",
  
    slug: "5-bedroom",
  
    name: "5 Bedroom Houseboat",
  
    featured: true,
  
    bedrooms: 5,
  
    bathrooms: 5,
  
    maxGuests: 10,
  
    crew: 4,
  
    yearBuilt: 2022,
  
    defaultCategory: "Deluxe",
  
    categories: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: 30000,
      },
      {
        id: "premium",
        name: "Premium",
        price: 45000,
      },
      {
        id: "luxury",
        name: "Luxury",
        price: 70000,
      },
    ],
  
    shortDescription:
      "An ultra-luxury five-bedroom private houseboat designed for large families, celebrations and corporate groups seeking an unforgettable backwater experience.",
  
    longDescription:
      "Discover the finest way to experience Kerala's backwaters aboard this luxurious five-bedroom private houseboat. Featuring five spacious air-conditioned cabins with attached bathrooms, elegant interiors, a modern kitchenette, a large fully air-conditioned upper deck and authentic Kerala hospitality, it offers the perfect setting for family reunions, celebrations and premium group vacations.",
  
    gallery: [
      {
        src: "/images/houseboats/5-bedroom/cover.jpg",
        alt: "Exterior view of the houseboat",
      },
      {
        src: "/images/houseboats/5-bedroom/gallery-1.jpg",
        alt: "Luxury living area",
      },
      {
        src: "/images/houseboats/5-bedroom/gallery-2.jpg",
        alt: "Dining area",
      },
      {
        src: "/images/houseboats/5-bedroom/gallery-3.jpg",
        alt: "Master bedroom",
      },
      {
        src: "/images/houseboats/5-bedroom/gallery-4.jpg",
        alt: "Guest bedroom",
      },
      {
        src: "/images/houseboats/5-bedroom/gallery-5.jpg",
        alt: "Attached bathroom",
      },
      {
        src: "/images/houseboats/5-bedroom/gallery-6.jpg",
        alt: "Upper deck",
      },
    ],
  
    amenities: [
      "5 Air-conditioned bedrooms",
      "5 Private bathrooms",
      "Wide window lake view",
      "Outdoor dining area",
      "Outdoor furniture",
      "Spacious living area",
      "Fully air-conditioned upper deck",
      "Modern kitchenette",
      "Television",
      "Music system",
      "Refrigerator",
      "Wardrobe",
      "Fishing equipment",
      "Board games",
      "Private cruise",
      "All meals onboard",
      "4 crew members",
      "Wheelchair accessible dining area",
      "Shower",
    ],
  
    meals: commonMeals,
  
    itinerary: commonItinerary,
  
    inclusions: [
      "Welcome drink on arrival",
      "Accommodation in a private luxury houseboat",
      "Traditional Kerala lunch",
      "Evening tea & snacks",
      "Dinner",
      "Breakfast",
      "Backwater cruise as per itinerary",
      "Services of experienced crew",
      "Parking for the houseboat",
    ],
  
    exclusions: commonExclusions,
  
    policies: commonPolicies,
  
    faqs: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in starts at 12:00 PM and check-out is at 9:00 AM the next morning.",
      },
      {
        question: "Are all meals included?",
        answer:
          "Yes. Welcome drink, lunch, evening tea & snacks, dinner and breakfast are included.",
      },
      {
        question: "Are all five bedrooms air-conditioned?",
        answer:
          "Yes. All five bedrooms are fully air-conditioned during the scheduled operating hours.",
      },
      {
        question: "Can the houseboat cruise throughout the night?",
        answer:
          "No. Houseboats anchor in the evening as required by local navigation regulations.",
      },
      {
        question: "How many guests can stay?",
        answer:
          "This five-bedroom houseboat comfortably accommodates up to ten guests.",
      },
    ],
  },

  {
    id: "/houseboats/6-bedroom",
  
    slug: "6-bedroom",
  
    name: "6 Bedroom Houseboat",
  
    featured: true,
  
    bedrooms: 6,
  
    bathrooms: 6,
  
    maxGuests: 18,
  
    crew: 4,
  
    yearBuilt: 2016,
  
    defaultCategory: "Deluxe",
  
    categories: [
      {
        id: "deluxe",
        name: "Deluxe",
        price: 36000,
      },
      {
        id: "premium",
        name: "Premium",
        price: 60000,
      },
      {
        id: "luxury",
        name: "Luxury",
        price: 72000,
      },
    ],
  
    shortDescription:
      "A spectacular six-bedroom luxury houseboat crafted for weddings, corporate retreats and large family gatherings on the serene backwaters of Alleppey.",
  
    longDescription:
      "Experience Kerala's backwaters aboard an exceptional six-bedroom private houseboat featuring six luxurious air-conditioned bedrooms with attached bathrooms, elegant interiors, a spacious lounge, panoramic upper deck, modern kitchenette and authentic Kerala hospitality. Perfect for destination celebrations, corporate events and unforgettable group vacations.",
  
    gallery: [
      {
        src: "/images/houseboats/6-bedroom/cover.jpeg",
        alt: "Exterior view of the houseboat",
      },
      {
        src: "/images/houseboats/6-bedroom/gallery-1.jpg",
        alt: "Luxury living area",
      },
      {
        src: "/images/houseboats/6-bedroom/gallery-2.jpg",
        alt: "Dining area",
      },
      {
        src: "/images/houseboats/6-bedroom/gallery-3.jpg",
        alt: "Master bedroom",
      },
      {
        src: "/images/houseboats/6-bedroom/gallery-4.jpg",
        alt: "Guest bedroom",
      },
      {
        src: "/images/houseboats/6-bedroom/gallery-5.jpg",
        alt: "Attached bathroom",
      },
      {
        src: "/images/houseboats/6-bedroom/gallery-6.jpg",
        alt: "Upper deck",
      },
    ],
  
    amenities: [
      "6 Air-conditioned bedrooms",
      "6 Private bathrooms",
      "Wide lake views",
      "Modern interiors",
      "Fully air-conditioned upper deck",
      "Large living lounge",
      "Outdoor dining area",
      "Wheelchair accessible dining",
      "Modern kitchenette",
      "Television",
      "Music system",
      "Refrigerator",
      "Fishing equipment",
      "Board games",
      "Water activities on request",
      "Spa on request",
      "Private cruise",
      "All meals onboard",
      "4 professional crew members",
      "Shower",
    ],
  
    meals: commonMeals,
  
    itinerary: commonItinerary,
  
    inclusions: [
      "Welcome drink on arrival",
      "Accommodation in a private luxury houseboat",
      "Traditional Kerala lunch",
      "Evening tea & snacks",
      "Dinner",
      "Breakfast",
      "Backwater cruise as per itinerary",
      "Services of experienced crew",
      "Parking for the houseboat",
    ],
  
    exclusions: commonExclusions,
  
    policies: commonPolicies,
  
    faqs: [
      {
        question: "What time is check-in and check-out?",
        answer:
          "Check-in starts at 12:00 PM and check-out is at 9:00 AM the next morning.",
      },
      {
        question: "Are all meals included?",
        answer:
          "Yes. Welcome drink, lunch, evening tea & snacks, dinner and breakfast are included.",
      },
      {
        question: "Are all six bedrooms air-conditioned?",
        answer:
          "Yes. All six bedrooms are air-conditioned during the scheduled operating hours, with 24×7 AC available on selected luxury boats.",
      },
      {
        question: "How many guests can stay?",
        answer:
          "The six-bedroom houseboat comfortably accommodates 12 guests and can host up to 18 guests with extra beds.",
      },
      {
        question: "Is this houseboat suitable for large events?",
        answer:
          "Yes. This houseboat is ideal for weddings, family reunions, corporate outings and other large group celebrations.",
      },
    ],
  },
];