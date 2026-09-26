export interface Destination {
  id: number;
  label: string;
  title: string;
  description: string;
  image: string;
  preview: string;
  href: string;
}

/*
  Three places on the home page. The hrefs are district pages, because
  that is how the destination pages are filed — these used to point at
  /destinations/munnar and friends, which have 404'd since the pages
  were rebuilt district by district.
*/
export const destinations: Destination[] = [
    {
      id: 1,
      label: "TEA COUNTRY",
      title: "Munnar",
      description:
        "Wake up among rolling tea estates, crisp mountain air and mist-covered valleys where every morning begins above the clouds.",
      image: "/images/retreats/munnar.png",
      preview: "/images/retreats/kumarakom.png",
      href: "/destinations/idukki",
    },
    {
      id: 2,
      label: "BACKWATERS",
      title: "Kumarakom",
      description:
        "Private villas and tranquil backwaters designed for slow, meaningful escapes surrounded by nature.",
      image: "/images/retreats/kumarakom.png",
      preview: "/images/retreats/varkala.png",
      href: "/destinations/kottayam",
    },
    {
      id: 3,
      label: "CLIFFSIDE",
      title: "Varkala",
      description:
        "Ocean cliffs, hidden beaches and unforgettable sunsets overlooking the Arabian Sea.",
      image: "/images/retreats/varkala.png",
      preview: "/images/retreats/munnar.png",
      href: "/destinations/thiruvananthapuram",
    },
  ];