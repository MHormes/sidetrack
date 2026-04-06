"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  name: string;
  soldOut?: boolean;
};

export default function ProductCarousel({ images, name, soldOut }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="relative bg-subtle overflow-hidden w-full aspect-square flex items-center justify-center group">
      <Image
        src={images[current]}
        alt={`${name} — afbeelding ${current + 1}`}
        width={800}
        height={800}
        className="w-full h-full object-cover"
        priority
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Vorige afbeelding"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-base/70 hover:bg-base text-fg w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ←
          </button>
          <button
            onClick={next}
            aria-label="Volgende afbeelding"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-base/70 hover:bg-base text-fg w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            →
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Afbeelding ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-fg" : "bg-fg/30"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {soldOut && (
        <div className="absolute inset-0 bg-base/70 flex items-center justify-center">
          <span className="text-sm font-bold tracking-widest uppercase text-fg-subtle border border-fg-faint px-4 py-2">
            Uitverkocht
          </span>
        </div>
      )}
    </div>
  );
}
