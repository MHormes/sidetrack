export type ProductSize = {
  size: string;
  enabled: boolean;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string | null;
  soldOut?: boolean;
  sizes?: ProductSize[];
  sizeNote?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Sidetrack T-Shirt",
    price: 25.00,
    category: "Kleding",
    description: "Klassiek zwart T-shirt met het Sidetrack logo op de rug.",
    image: "/images/merch/trui.jpg",
    sizes: [
      { size: "XS", enabled: false },
      { size: "S",  enabled: true },
      { size: "M",  enabled: true },
      { size: "L",  enabled: false },
      { size: "XL", enabled: true },
      { size: "XXL",enabled: true },
    ],
  },
  {
    id: 2,
    name: "Sidetrack Trui",
    price: 45.00,
    category: "Kleding",
    description: "Warme trui met Sidetrack logo op de rug.",
    image: "/images/merch/trui.jpg",
    sizes: [
      { size: "XS", enabled: true },
      { size: "S",  enabled: true },
      { size: "M",  enabled: true },
      { size: "L",  enabled: true },
      { size: "XL", enabled: true },
      { size: "XXL",enabled: true },
    ],
  },
  {
    id: 3,
    name: "Sidetrack Cap",
    price: 20.00,
    category: "Accessoires",
    description: "Snapback cap met geborduurd logo. Verstelbare sluiting aan de achterkant.",
    image: "/images/merch/trui.jpg",
    sizeNote: "One size fits all",
  },
  {
    id: 4,
    name: "Sidetrack Tote Bag",
    price: 15.00,
    category: "Accessoires",
    description: "Katoenen tas met groot Sidetrack opdruk. Ideaal voor op de markt.",
    image: "/images/merch/trui.jpg",
    sizeNote: "Geen maatkeuze nodig",
  },
  {
    id: 5,
    name: "Sticker Pack",
    price: 5.00,
    category: "Accessoires",
    description: "Set van 5 stickers in verschillende groottes.",
    image: "/images/merch/trui.jpg",
    sizeNote: "Geen maatkeuze nodig",
  },
  {
    id: 6,
    name: "Sidetrack Polo",
    price: 35.00,
    category: "Kleding",
    description: "Stijlvolle polo met subtiel geborduurd logo op de borst.",
    image: "/images/merch/trui.jpg",
    sizes: [
      { size: "XS", enabled: true },
      { size: "S",  enabled: true },
      { size: "M",  enabled: true },
      { size: "L",  enabled: true },
      { size: "XL", enabled: true },
      { size: "XXL",enabled: true },
    ],
    soldOut: true,
  },
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
