'use client';

import { useState } from "react";
import { useCart } from "@/context/cart";
import type { Product, ProductSize } from "@/lib/products";

type Props = {
  product: Product;
  sizes: ProductSize[];
  soldOut?: boolean;
};

export default function SizeSelector({ product, sizes, soldOut }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const { addItem } = useCart();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {sizes.map(({ size, enabled }) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            disabled={soldOut || !enabled}
            className={`
              px-4 py-2 text-xs font-bold tracking-widest uppercase border transition-colors
              ${selected === size
                ? "bg-accent border-accent text-on-accent"
                : "border-edge-mid text-fg-muted hover:border-edge-soft hover:text-fg"
              }
              disabled:opacity-40 disabled:cursor-not-allowed disabled:line-through
            `}
          >
            {size}
          </button>
        ))}
      </div>

      <button
        disabled={soldOut || !selected}
        onClick={() => selected && addItem(product, selected)}
        className="w-full py-3 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase hover:bg-accent-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {soldOut ? "Uitverkocht" : selected ? "Toevoegen aan winkelmandje" : "Kies een maat"}
      </button>
    </div>
  );
}
