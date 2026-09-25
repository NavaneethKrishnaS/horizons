export const navigation = [
  {
    label: "Destinations",
    /*
      Each row leads to the district page that actually covers it. Two
      rows carry two place names because one district holds both — the
      high range is Munnar and Thekkady, and the southern coast is
      Kovalam and Varkala — which is better than two rows landing on
      the same page.
    */
    items: [
      {
        label: "Alleppey",
        description: "Backwaters & houseboats",
        image: "/images/menu/destinations/alleppey.png",
        href: "/destinations/alappuzha",
      },
      {
        label: "Kumarakom",
        description: "Lakeside escapes",
        image: "/images/menu/destinations/kumarakom.png",
        href: "/destinations/kottayam",
      },
      {
        label: "Munnar & Thekkady",
        description: "Tea gardens, spice hills & the lake",
        image: "/images/menu/destinations/munnar.png",
        href: "/destinations/idukki",
      },
      {
        label: "Kovalam & Varkala",
        description: "Cliffs & the Arabian Sea",
        image: "/images/menu/destinations/varkala.png",
        href: "/destinations/thiruvananthapuram",
      },
      {
        label: "Wayanad",
        description: "Hills & waterfalls",
        image: "/images/menu/destinations/wayanad.png",
        href: "/destinations/wayanad",
      },
      {
        label: "Athirappilly",
        description: "Waterfalls & rainforest",
        image: "/images/menu/destinations/athirappilly.png",
        href: "/destinations/thrissur",
      },
    ],
  },

  {
    label: "Houseboats",
    items: [
      {
        label: "Luxury Houseboats",
        description: "Premium houseboat experiences",
        image: "/images/menu/houseboats.png",
        href: "/houseboats/luxury",
      },
      {
        label: "Premium Houseboats",
        description: "Elegant stays for families & couples",
        image: "/images/menu/houseboats.png",
        href: "/houseboats/premium",
      },
      {
        label: "Honeymoon Houseboats",
        description: "Private romantic escapes on the backwaters",
        image: "/images/menu/houseboats.png",
        href: "/houseboats/honeymoon",
      },
      {
        label: "Family Houseboats",
        description: "Spacious houseboats for memorable family trips",
        image: "/images/menu/houseboats.png",
        href: "/houseboats/family",
      },
      {
        label: "Day Cruises",
        description: "Luxury daytime cruises through the backwaters",
        image: "/images/menu/houseboats.png",
        href: "/houseboats/day-cruises",
      },
    ],
  },

  {
    label: "Stays",
    items: [
      {
        label: "The backwaters",
        description: "Farm islands, teak houses and boats to sleep on",
        image: "/images/menu/stays.png",
        href: "/stays?region=backwaters",
      },
      {
        label: "Fort Kochi",
        description: "The houses in the old port that were done properly",
        image: "/images/menu/stays.png",
        href: "/stays?region=kochi",
      },
      {
        label: "The Kerala coast",
        description: "Marari, Varkala and the Malabar shore",
        image: "/images/menu/stays.png",
        href: "/stays?region=coast",
      },
      {
        label: "The hill country",
        description: "Cardamom, tea and the Periyar",
        image: "/images/menu/stays.png",
        href: "/stays?region=hills",
      },
      {
        label: "Everywhere else",
        description: "Goa, Rajasthan, the cities and the islands",
        image: "/images/menu/stays.png",
        href: "/stays",
      },
    ],
  },

  {
    label: "Packages",
    items: [
      {
        label: "2 Day Escapes",
        description: "Short luxury getaways",
        image: "/images/menu/packages.png",
        href: "/packages/2-day-escapes",
      },
      {
        label: "3 Day Journeys",
        description: "Perfect long weekend itineraries",
        image: "/images/menu/packages.png",
        href: "/packages/3-day-journeys",
      },
      {
        label: "5 Day Luxury Tours",
        description: "Signature Kerala experiences",
        image: "/images/menu/packages.png",
        href: "/packages/5-day-luxury-tours",
      },
      {
        label: "Honeymoon Packages",
        description: "Romantic escapes crafted for couples",
        image: "/images/menu/packages.png",
        href: "/packages/honeymoon-packages",
      },
      {
        label: "Family Holidays",
        description: "Memorable vacations for families",
        image: "/images/menu/packages.png",
        href: "/packages/family-holidays",
      },
    ],
  },

  {
    label: "Journal",
    items: [
      {
        label: "Travel Guides",
        description: "Expert guides to Kerala",
        image: "/images/menu/journal.png",
        href: "/journal/travel-guides",
      },
      {
        label: "Hidden Gems",
        description: "Places beyond the usual itinerary",
        image: "/images/menu/journal.png",
        href: "/journal/hidden-gems",
      },
      {
        label: "Luxury Travel Tips",
        description: "Travel smarter and experience more",
        image: "/images/menu/journal.png",
        href: "/journal/luxury-travel-tips",
      },
      {
        label: "Seasonal Stories",
        description: "Kerala through every season",
        image: "/images/menu/journal.png",
        href: "/journal/seasonal-stories",
      },
      {
        label: "Local Culture",
        description: "People, traditions and heritage",
        image: "/images/menu/journal.png",
        href: "/journal/local-culture",
      },
    ],
  },
];
