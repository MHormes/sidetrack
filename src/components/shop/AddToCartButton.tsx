'use client';

import { useCart } from "@/context/cart";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      disabled={product.soldOut}
      onClick={() => addItem(product, null)}
      className="w-full py-3 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {product.soldOut ? "Uitverkocht" : "Toevoegen aan winkelmandje"}
    </button>
  );
}
