import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="bg-base min-h-screen">

      {/* Hero */}
      <section className="relative bg-base overflow-hidden flex items-center justify-center py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-elevated to-base" />
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <Image
            src="/images/logo/fineline.png"
            alt="Sidetrack"
            width={1024}
            height={1394}
            className="w-32 sm:w-44 h-auto"
            priority
          />
          <p className="text-fg-muted tracking-widest uppercase text-xs sm:text-sm font-bold">
            Officiële merchandise
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-5xl mx-auto px-4 py-16">

        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-widest uppercase text-fg mb-1">
              Collectie
            </h2>
            <p className="text-fg-subtle text-sm">{products.length} producten</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col group">

              {/* Image */}
              <div className="relative aspect-square bg-subtle overflow-hidden mb-3">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/logo/fineline.png"
                      alt=""
                      width={200}
                      height={272}
                      className="w-14 sm:w-20 h-auto opacity-10"
                    />
                  </div>
                )}
                {product.soldOut && (
                  <div className="absolute inset-0 bg-base/70 flex items-center justify-center">
                    <span className="text-xs font-bold tracking-widest uppercase text-fg-subtle border border-fg-faint px-3 py-1">
                      Uitverkocht
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-1">
                <span className="text-xs font-mono tracking-widest uppercase text-accent">
                  {product.category}
                </span>
                <p className="font-bold text-fg text-sm sm:text-base leading-snug">
                  {product.name}
                </p>
                <p className="text-xs text-fg-subtle leading-relaxed hidden sm:block">
                  {product.description}
                </p>
              </div>

              {/* Price + button */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-black text-fg text-base sm:text-lg">
                  €{product.price.toFixed(2)}
                </span>
                <Link
                  href={`/shop/${product.id}`}
                  aria-disabled={product.soldOut}
                  className="text-xs font-bold tracking-widest uppercase px-3 py-2 bg-accent text-on-accent hover:bg-accent-hover transition-colors aria-disabled:opacity-40 aria-disabled:pointer-events-none"
                >
                  Bestellen
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 border border-edge p-6 text-fg-muted text-sm leading-relaxed">
          <p>
            <span className="font-bold text-fg">Let op: </span>
            De huidige webshop werkt puur met pre-orders. In plaats van betaling wordt de bestelling afgerond met het invoeren van persoonlijke gegevens. Deze zullen wij gebruiken om contact op te nemen over betaling &amp; levering. Hier kunnen een aantal dagen overheen gaan. Bij vragen, voel je vrij ons te{" "}
            <a href="/#contact" className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors">
              contacteren
            </a>
            !
          </p>
        </div>

      </section>
    </div>
  );
}
