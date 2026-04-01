"use client";

import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export default function GlobalError({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <html lang="nl" className={geist.variable}>
      <body className="min-h-screen bg-base flex flex-col items-center justify-center text-center px-6">
        <img
          src="/images/logo/fineline.png"
          alt="Sidetrack"
          className="w-36 sm:w-48 h-auto mb-10 opacity-80"
        />

        <p className="text-sm font-bold tracking-widest uppercase text-fg-subtle mb-4">500</p>
        <h1 className="text-3xl sm:text-4xl font-black text-fg mb-4">
          Er ging iets mis
        </h1>
        <p className="text-fg-muted text-lg max-w-sm mb-10 leading-relaxed">
          Geen paniek — waarschijnlijk is er alleen iemand op de verkeerde knop gedrukt.
          We zijn er mee bezig.
        </p>

        <button
          onClick={unstable_retry}
          className="px-8 py-3 bg-accent text-on-accent font-bold text-sm tracking-widest uppercase rounded hover:bg-accent-hover transition-colors"
        >
          Probeer opnieuw
        </button>
      </body>
    </html>
  );
}
