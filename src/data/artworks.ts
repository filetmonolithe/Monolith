export type Artwork = {
  id: string;

  title: string;
  subtitle: string;
  role: string;
  year: string;

  ratio: "16:9" | "9:16" | "4:3" | "1:1";

  image: string;

  position: [number, number, number];
  rotation: [number, number, number];

  enabled: boolean;
};

export const artworks: Artwork[] = [
  {
    id: "gucci",
    title: "GUCCI",
    subtitle: "G-Timeless",
    role: "Creative Direction • Filming • Edit",
    year: "2025",
    ratio: "16:9",
    image: "/projects/gucci/cover.png",
    position: [-14, 8, -18],
    rotation: [0, 0.45, 0],
    enabled: true,
  },

  {
    id: "kfc",
    title: "KFC",
    subtitle: "Tenders Room",
    role: "Direction • Edit",
    year: "2025",
    ratio: "9:16",
    image: "/projects/kfc/cover.png",
    position: [18, -8, -28],
    rotation: [0, -0.5, 0],
    enabled: true,
  },

  {
    id: "maar",
    title: "MAAR",
    subtitle: "Maison Louis",
    role: "Creative Direction",
    year: "2025",
    ratio: "4:3",
    image: "/projects/maison-louis/cover.png",
    position: [-24, -4, -46],
    rotation: [0, 0.55, 0],
    enabled: true,
  },

  {
    id: "quechua",
    title: "QUECHUA",
    subtitle: "Fictive Project",
    role: "Creative Direction",
    year: "2025",
    ratio: "9:16",
    image: "/projects/quechua/cover.png",
    position: [24, 12, -64],
    rotation: [0, -0.6, 0],
    enabled: true,
  },

  {
    id: "lor-01",
    title: "L'OR",
    subtitle: "Campaign 01",
    role: "Creative Direction",
    year: "2025",
    ratio: "9:16",
    image: "/projects/l'or-01/cover.png",
    position: [-18, 16, -82],
    rotation: [0, 0.4, 0],
    enabled: true,
  },

  {
    id: "lor-02",
    title: "L'OR",
    subtitle: "Campaign 02",
    role: "Creative Direction",
    year: "2025",
    ratio: "9:16",
    image: "/projects/l'or-02/cover.png",
    position: [28, 2, -100],
    rotation: [0, -0.5, 0],
    enabled: true,
  },

  {
    id: "lor-03",
    title: "L'OR",
    subtitle: "Campaign 03",
    role: "Creative Direction",
    year: "2025",
    ratio: "9:16",
    image: "/projects/l'or-03/cover.png",
    position: [-26, -14, -118],
    rotation: [0, 0.5, 0],
    enabled: true,
  },

  {
    id: "lor-04",
    title: "L'OR",
    subtitle: "Campaign 04",
    role: "Creative Direction",
    year: "2025",
    ratio: "9:16",
    image: "/projects/l'or-04/cover.png",
    position: [18, 14, -136],
    rotation: [0, -0.35, 0],
    enabled: true,
  },
];
