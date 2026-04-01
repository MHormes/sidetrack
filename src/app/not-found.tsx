import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center text-center px-6">
      <Image
        src="/images/logo/fineline.png"
        alt="Sidetrack"
        width={1024}
        height={1394}
        className="w-36 sm:w-48 h-auto mb-10 opacity-80"
      />

      <p className="text-sm font-bold tracking-widest uppercase text-fg-subtle mb-4">404</p>
      <h1 className="text-3xl sm:text-4xl font-black text-fg mb-4">
        Deze pagina bestaat niet
      </h1>
      <p className="text-fg-muted text-lg max-w-sm mb-10 leading-relaxed">
        Waarschijnlijk op dezelfde plek als de setlist na een optreden — nergens te vinden.
      </p>

      <Link
        href="/"
        className="px-8 py-3 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase rounded hover:bg-accent-hover transition-colors"
      >
        Terug naar huis
      </Link>
    </div>
  );
}
