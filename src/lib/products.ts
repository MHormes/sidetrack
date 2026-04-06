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
  images?: string[];
  soldOut?: boolean;
  sizes?: ProductSize[];
  sizeNote?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "SDTRCK Trui",
    price: 30.00,
    category: "Kleding",
    description: "Trui met het SDTRCK logo op de borst en de lineart op de rug.",
    image: "/images/merch/trui.jpg",
    images: ["/images/merch/trui.jpg", "/images/gallery/photo-00.jpg", "/images/gallery/photo-01.jpg"],
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
    id: 2,
    name: "SDTRCK T-Shirt",
    price: 20.00,
    category: "Kleding",
    description: "T-shirt met SDTRCK logo op de borst en de lineart op de rug.",
    image: "/images/merch/trui.jpg",
    images: ["/images/merch/trui.jpg", "/images/gallery/photo-02.jpg", "/images/gallery/photo-03.jpg"],
    sizes: [
      { size: "XS", enabled: true },
      { size: "S",  enabled: true },
      { size: "M",  enabled: true },
      { size: "L",  enabled: true },
      { size: "XL", enabled: true },
      { size: "XXL",enabled: true },
    ],
  },
  // {
  //   id: 3,
  //   name: "SDTRCK Cap",
  //   price: 20.00,
  //   category: "Accessoires",
  //   description: "Snapback cap met geborduurd logo. Verstelbare sluiting aan de achterkant.",
  //   image: "/images/merch/trui.jpg",
  //   images: ["/images/merch/trui.jpg", "/images/gallery/photo-04.jpg", "/images/gallery/photo-05.jpg"],
  //   sizeNote: "One size fits all",
  // },
  {
    id: 4,
    name: "Sidetrack Stickers",
    price: 5.00,
    category: "Accessoires",
    description: "Set van 5 stickers met sidetrack logo.",
    image: "/images/merch/trui.jpg",
    images: ["/images/merch/trui.jpg", "/images/gallery/photo-08.jpg", "/images/gallery/photo-09.jpg"],
    sizeNote: "Geen maatkeuze nodig",
    soldOut: true,
  }
];

export function getProduct(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
