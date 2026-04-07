"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#shows", label: "Shows" },
  { href: "/#fotos", label: "Foto's" },
  { href: "/#band", label: "Band" },
  { href: "/#videos", label: "Video's" },
  { href: "/#contact", label: "Contact" },
];

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span className={`block h-0.5 w-6 bg-fg-muted transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block h-0.5 w-6 bg-fg-muted transition-all duration-200 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-fg-muted transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {open && (
        <nav className="sm:hidden border-t border-edge bg-base px-4 py-4 flex flex-col gap-4 text-sm font-medium text-fg-muted absolute top-full left-0 right-0 z-50">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-fg transition-colors" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
