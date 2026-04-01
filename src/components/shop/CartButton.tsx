'use client';

import { useCart } from "@/context/cart";

export default function CartButton() {
  const { totalCount, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 bg-accent text-on-accent font-bold text-xs tracking-widest uppercase px-4 py-3 shadow-lg hover:bg-accent-hover transition-colors"
      aria-label="Open winkelmandje"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      Mandje
      {totalCount > 0 && (
        <span className="bg-on-accent text-accent font-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalCount}
        </span>
      )}
    </button>
  );
}
