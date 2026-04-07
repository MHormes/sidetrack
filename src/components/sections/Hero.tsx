import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-base min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">

      <div className="absolute inset-0 bg-gradient-to-b from-elevated/60 to-base" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Band logo */}
        <Image
          src="/images/logo/fineline.png"
          alt="Sidetrack"
          width={1024}
          height={1394}
          className="w-56 sm:w-80 h-auto"
          sizes="(max-width: 640px) 224px, 320px"
          priority
          fetchPriority="high"
        />

        <p className="text-lg sm:text-xl text-fg-muted tracking-wide max-w-md">
          Altijd Sfeervol, Altijd Sidetrack!
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <a
            href="#shows"
            className="px-8 py-3 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase rounded hover:bg-accent-hover transition-colors"
          >
            Bekijk shows
          </a>
          <a
            href="#band"
            className="px-8 py-3 border border-edge-mid text-fg-muted font-bold text-sm tracking-widest uppercase rounded hover:border-edge-soft hover:text-fg transition-colors"
          >
            Ontdek de band
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-fg-subtle text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <span className="text-lg">↓</span>
      </div>
    </section>
  );
}
