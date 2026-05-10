export type DiamondType = "lab-grown" | "natural";

export type Product = {
  id: string;
  name: string;
  type: DiamondType;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  certification: string;
  origin: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  bestseller?: boolean;
};

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "lg-aurora-round-2ct",
    name: "Aurora Brilliant",
    type: "lab-grown",
    shape: "Round",
    carat: 2.01,
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    certification: "IGI",
    origin: "Lab Grown · India",
    price: 6480,
    image: img("photo-1605100804763-247f67b3557e"),
    gallery: [
      img("photo-1605100804763-247f67b3557e", 1400),
      img("photo-1602173574767-37ac01994b2a", 1400),
      img("photo-1515562141207-7a88fb7ce338", 1400),
    ],
    description:
      "A flawless round brilliant cut, engineered with atomic precision. The Aurora delivers icy white brilliance and exceptional fire — a contemporary heirloom.",
    bestseller: true,
  },
  {
    id: "lg-celeste-oval-1.5ct",
    name: "Celeste Oval",
    type: "lab-grown",
    shape: "Oval",
    carat: 1.52,
    color: "E",
    clarity: "VS1",
    cut: "Excellent",
    certification: "IGI",
    origin: "Lab Grown · India",
    price: 3980,
    image: img("photo-1535632787350-4e68ef0ac584"),
    gallery: [img("photo-1535632787350-4e68ef0ac584", 1400), img("photo-1611591437281-460bfbe1220a", 1400)],
    description:
      "An elongated oval that elongates the finger with a soft, elegant glow. Cut to flatter modern settings.",
  },
  {
    id: "lg-marquise-1ct",
    name: "Lumiere Marquise",
    type: "lab-grown",
    shape: "Marquise",
    carat: 1.01,
    color: "F",
    clarity: "VS2",
    cut: "Very Good",
    certification: "GCAL",
    origin: "Lab Grown · USA",
    price: 2150,
    image: img("photo-1602751584552-8ba73aad10e1"),
    gallery: [img("photo-1602751584552-8ba73aad10e1", 1400)],
    description: "A romantic marquise with vintage sensibility and a striking silhouette.",
  },
  {
    id: "lg-emerald-3ct",
    name: "Solaire Emerald",
    type: "lab-grown",
    shape: "Emerald",
    carat: 3.04,
    color: "D",
    clarity: "VVS2",
    cut: "Excellent",
    certification: "IGI",
    origin: "Lab Grown · India",
    price: 8200,
    image: img("photo-1611591437281-460bfbe1220a"),
    gallery: [img("photo-1611591437281-460bfbe1220a", 1400)],
    description: "Architectural step-cut clarity. Calm, considered, monumental.",
    bestseller: true,
  },
  {
    id: "nat-classic-round-1ct",
    name: "Maison Round",
    type: "natural",
    shape: "Round",
    carat: 1.05,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    certification: "GIA",
    origin: "Natural · Botswana",
    price: 7950,
    image: img("photo-1515562141207-7a88fb7ce338"),
    gallery: [img("photo-1515562141207-7a88fb7ce338", 1400), img("photo-1605100804763-247f67b3557e", 1400)],
    description: "A timeless round brilliant of natural origin — sourced ethically from the heart of Botswana.",
    bestseller: true,
  },
  {
    id: "nat-pear-2ct",
    name: "Maison Pear",
    type: "natural",
    shape: "Pear",
    carat: 2.10,
    color: "E",
    clarity: "VVS2",
    cut: "Excellent",
    certification: "GIA",
    origin: "Natural · South Africa",
    price: 18400,
    image: img("photo-1602173574767-37ac01994b2a"),
    gallery: [img("photo-1602173574767-37ac01994b2a", 1400)],
    description: "Teardrop silhouette, museum-grade clarity. A statement of grace.",
  },
  {
    id: "nat-cushion-3ct",
    name: "Heritage Cushion",
    type: "natural",
    shape: "Cushion",
    carat: 3.21,
    color: "G",
    clarity: "VS2",
    cut: "Excellent",
    certification: "GIA",
    origin: "Natural · Russia",
    price: 26500,
    image: img("photo-1573408301185-9146fe634ad0"),
    gallery: [img("photo-1573408301185-9146fe634ad0", 1400)],
    description: "Pillow-soft corners and antique romance — restored for the modern collector.",
  },
  {
    id: "nat-radiant-2ct",
    name: "Maison Radiant",
    type: "natural",
    shape: "Radiant",
    carat: 2.05,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    certification: "GIA",
    origin: "Natural · Canada",
    price: 21900,
    image: img("photo-1591437803731-c64ba9b94aae"),
    gallery: [img("photo-1591437803731-c64ba9b94aae", 1400)],
    description: "Cropped corners and crushed-ice brilliance — a modern silhouette with extraordinary fire.",
    bestseller: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const byType = (t: DiamondType) => products.filter((p) => p.type === t);
export const bestsellers = () => products.filter((p) => p.bestseller);
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
