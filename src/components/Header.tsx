import Link from "next/link";
import Image from "next/image";
import BurgerMenu from "./BurgerMenu";

const links = [
  { href: "/#shows", label: "Shows" },
  { href: "/#fotos", label: "Foto's" },
  { href: "/#band", label: "Band" },
  { href: "/#videos", label: "Video's" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-base border-b border-edge relative z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-widest uppercase text-fg">
          <Image src="/images/logo/logo.png" alt="" width={32} height={32} />
          Sidetrack
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6 text-sm font-medium text-fg-muted">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-fg transition-colors">{label}</Link>
          ))}
        </nav>

        <BurgerMenu />
      </div>
    </header>
  );
}
