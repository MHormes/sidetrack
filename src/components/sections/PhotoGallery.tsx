import Image from "next/image";

const photos = [
  { id: 1, src: "/images/gallery/photo-01.jpg", span: "col-span-2 row-span-2" },
  { id: 2, src: "/images/gallery/photo-02.jpg", span: "" },
  { id: 3, src: "/images/gallery/photo-03.jpg", span: "" },
  { id: 4, src: "/images/gallery/photo-04.jpg", span: "" },
  { id: 5, src: "/images/gallery/photo-05.jpg", span: "" },
  { id: 6, src: "/images/gallery/photo-06.jpg", span: "" },
  { id: 7, src: "/images/gallery/photo-07.jpg", span: "" },
  { id: 8, src: "/images/gallery/photo-08.jpg", span: "col-span-2 row-span-2" },
  { id: 9, src: "/images/gallery/photo-09.jpg", span: "" }
];

export default function PhotoGallery() {
  return (
    <section id="fotos" className="bg-base pb-24 px-4">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
          Foto&apos;s
        </h2>
        <p className="text-fg-subtle mb-12">
          Fotografie: By-Jolie.nl
        </p>

        {/* Grid — 3 columns, mix of sizes */}
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`relative aspect-square bg-subtle rounded overflow-hidden ${photo.span}`}
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
