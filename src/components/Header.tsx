import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-base border-b border-edge">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-widest uppercase text-fg">
          <Image
            src="/images/logo/logo.png"
            alt=""
            width={32}
            height={32}
          />
          Sidetrack
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-fg-muted">
          <Link href="/#shows" className="hover:text-fg transition-colors">Shows</Link>
          <Link href="/#fotos" className="hover:text-fg transition-colors">Foto&apos;s</Link>
          <Link href="/#band" className="hover:text-fg transition-colors">Band</Link>
          <Link href="/#videos" className="hover:text-fg transition-colors">Video&apos;s</Link>
          <Link href="/shop" className="text-accent hover:text-accent transition-colors">Shop</Link>
        </nav>
      </div>
    </header>
  );
}
