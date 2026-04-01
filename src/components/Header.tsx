"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#shows", label: "Shows" },
    { href: "/#fotos", label: "Foto's" },
    { href: "/#band", label: "Band" },
    { href: "/#videos", label: "Video's" },
    { href: "/#contact", label: "Contact" },
  ];

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

        {/* Burger button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-fg-muted transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-fg-muted transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-fg-muted transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="sm:hidden border-t border-edge bg-base px-4 py-4 flex flex-col gap-4 text-sm font-medium text-fg-muted">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-fg transition-colors" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
