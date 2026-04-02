import Image from "next/image";
import { photos } from "@/lib/photos";

export default function PhotoGallery() {
  return (
    <section id="fotos" className="bg-base pb-24 px-4">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
          Foto&apos;s
        </h2>
        <p className="text-fg-subtle mb-12">
          Fotografie: <a href="https://by-jolie.nl" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">By-Jolie.nl</a>
        </p>

        {/* Grid — 3 columns, mix of sizes */}
        <div className="grid grid-cols-3 gap-2" style={{ gridAutoRows: "calc((min(100vw, 64rem) - 2rem) / 3)" }}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`relative bg-subtle rounded overflow-hidden ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={`Sidetrack foto ${photo.id}`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
