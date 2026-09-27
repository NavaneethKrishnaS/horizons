/*
  What the Destinations menu shows.

  Six places a traveller already has a name for, each leading to the
  district page that covers it — the pages are filed by district, and a
  menu that said "Idukki" where a visitor is looking for Munnar would be
  filing convenience dressed up as navigation. Munnar and Thekkady are
  both in Idukki and both arrive at the same page, which is the page
  that covers them. The whole set of fourteen is one click further, at
  the foot of the panel.
*/
export type MenuPlace = {
  label: string;
  note: string;
  image: string;
  href: string;
};

export const MENU_PLACES: MenuPlace[] = [
  {
    label: "Kochi",
    note: "Chinese nets and the old harbour",
    /*
      The only one of the six without a picture of its own yet, so it
      borrows the photograph the Ernakulam page already uses — the
      right subject, and remote rather than a file we hold.
    */
    image:
      "https://images.unsplash.com/photo-1590123732197-e7079d2ceb89?auto=format&fit=crop&w=1200&q=80",
    href: "/destinations/ernakulam",
  },
  {
    label: "Munnar",
    note: "Tea, and the high range",
    image: "/images/menu/destinations/munnar.png",
    href: "/destinations/idukki",
  },
  {
    label: "Thekkady",
    note: "Periyar, and the spice hills",
    image: "/images/menu/destinations/thekkady.png",
    href: "/destinations/idukki",
  },
  {
    label: "Alleppey",
    note: "Backwaters and houseboats",
    image: "/images/menu/destinations/alleppey.png",
    href: "/destinations/alappuzha",
  },
  {
    label: "Wayanad",
    note: "The plateau and its forests",
    image: "/images/menu/destinations/wayanad.png",
    href: "/destinations/wayanad",
  },
  {
    label: "Athirappilly",
    note: "Waterfalls and rainforest",
    image: "/images/menu/destinations/athirappilly.png",
    href: "/destinations/thrissur",
  },
];
