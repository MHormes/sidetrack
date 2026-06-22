import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sidetracksounds.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SideTrack",
  description:
    "Altijd Sfeervol, Altijd SideTrack! SideTrack is een coverband uit Roermond, Limburg. Bekijk onze shows, foto's en meer.",
  keywords: [
    "SideTrack",
    "coverband",
    "Roermond",
    "Limburg",
    "liveband",
    "feestband",
    "evenementen",
    "Nederland",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "SideTrack",
    title: "SideTrack",
    description: "Altijd Sfeervol, Altijd SideTrack!",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "SideTrack",
    description: "Altijd Sfeervol, Altijd SideTrack!",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "SideTrack",
  url: siteUrl,
  description:
    "Altijd Sfeervol, Altijd SideTrack! Coverband uit Roermond, Limburg.",
  genre: ["Cover", "Pop", "Rock"],
  foundingLocation: {
    "@type": "Place",
    name: "Roermond, Limburg, Nederland",
  },
  member: [
    {
      "@type": "OrganizationRole",
      member: { "@type": "Person", name: "Lisa Joosten" },
      roleName: "Zang / Gitaar",
    },
    {
      "@type": "OrganizationRole",
      member: { "@type": "Person", name: "Sten Ruijten" },
      roleName: "Bas / Zang",
    },
    {
      "@type": "OrganizationRole",
      member: { "@type": "Person", name: "Maarten Hormes" },
      roleName: "Gitaar / Zang",
    },
    {
      "@type": "OrganizationRole",
      member: { "@type": "Person", name: "Max Wolters" },
      roleName: "Drums",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
