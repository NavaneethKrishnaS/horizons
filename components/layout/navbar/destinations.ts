/*
  What the Destinations menu shows.

  Six places a traveller already has a name for, each leading to the
  district page that covers it — the pages are filed by district, and a
  menu that said "Idukki" where a visitor is looking for Munnar would be
  filing convenience dressed up as navigation. The whole set of fourteen
  is one click further, at the foot of the panel.
*/
export type MenuPlace = {
  label: string;
  note: string;
  image: string;
  href: string;
};

export const MENU_PLACES: MenuPlace[] = [
  {
    label: "Alleppey",
    note: "Backwaters and houseboats",
    image: "/images/menu/destinations/alleppey.png",
    href: "/destinations/alappuzha",
  },
  {
    label: "Kumarakom",
    note: "The quiet side of the lake",
    image: "/images/menu/destinations/kumarakom.png",
    href: "/destinations/kottayam",
  },
  {
    label: "Munnar",
    note: "Tea, and Thekkady beyond it",
    image: "/images/menu/destinations/munnar.png",
    href: "/destinations/idukki",
  },
  {
    label: "Varkala",
    note: "Cliffs above the Arabian Sea",
    image: "/images/menu/destinations/varkala.png",
    href: "/destinations/thiruvananthapuram",
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
