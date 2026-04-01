'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart";

export default function CartDrawer() {
  const { items, removeItem, totalCount, isOpen, closeCart } = useCart();

  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-96 bg-elevated border-l border-edge z-50
          flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-edge">
          <h2 className="font-black tracking-widest uppercase text-fg text-sm">
            Winkelmandje
            {totalCount > 0 && (
              <span className="ml-2 text-accent">({totalCount})</span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="text-fg-subtle hover:text-fg transition-colors text-xl leading-none"
            aria-label="Sluit winkelmandje"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-fg-subtle text-sm mt-8 text-center">
              Je winkelmandje is leeg.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-edge">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 py-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 bg-subtle shrink-0 overflow-hidden">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                          src="/images/logo/fineline.png"
                          alt=""
                          width={40}
                          height={54}
                          className="w-6 h-auto opacity-10"
                        />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-fg text-sm leading-snug truncate">
                      {item.product.name}
                    </p>
                    {item.size && (
                      <p className="text-xs text-fg-subtle mt-0.5">
                        Maat: {item.size}
                      </p>
                    )}
                    <p className="text-xs text-fg-muted mt-1">
                      {item.quantity} × €{item.product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="text-fg-faint hover:text-fg transition-colors text-sm shrink-0 self-start mt-1"
                    aria-label="Verwijder"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-edge flex flex-col gap-4">
            <div className="flex items-center justify-between text-fg">
              <span className="text-sm font-bold tracking-widest uppercase">Totaal</span>
              <span className="font-black text-lg">€{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/shop/checkout"
              onClick={closeCart}
              className="w-full py-3 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase hover:bg-accent-hover transition-colors text-center block"
            >
              Bestelling afronden
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
