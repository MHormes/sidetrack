import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import SizeSelector from "@/components/shop/SizeSelector";
import AddToCartButton from "@/components/shop/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(Number(id));

  if (!product) notFound();

  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-fg-subtle hover:text-fg transition-colors mb-10"
        >
          ← Terug naar shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

          {/* Image */}
          <div className="relative bg-subtle overflow-hidden w-full aspect-square flex items-center justify-center">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <Image
                src="/images/logo/fineline.png"
                alt=""
                width={200}
                height={272}
                className="w-24 h-auto opacity-10"
              />
            )}
            {product.soldOut && (
              <div className="absolute inset-0 bg-base/70 flex items-center justify-center">
                <span className="text-sm font-bold tracking-widest uppercase text-fg-subtle border border-fg-faint px-4 py-2">
                  Uitverkocht
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">

            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-accent">
                {product.category}
              </span>
              <h1 className="text-3xl font-black tracking-wide text-fg mt-1">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl font-black text-fg">
              €{product.price.toFixed(2)}
            </p>

            <p className="text-fg-muted leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-edge pt-6">
              {product.sizes ? (
                <SizeSelector product={product} sizes={product.sizes} soldOut={product.soldOut} />
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold tracking-widest uppercase text-fg-subtle border border-edge px-4 py-2 inline-block self-start">
                    {product.sizeNote}
                  </p>
                  <AddToCartButton product={product} />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
