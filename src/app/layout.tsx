import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sidetrackmusic.nl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sidetrack",
  description: "Altijd Sfeervol, Altijd Sidetrack! Sidetrack is een coverband uit Limburg. Bekijk onze shows, foto's en meer.",
  keywords: ["Sidetrack", "coverband", "Limburg", "liveband", "feestband", "evenementen", "Nederland"],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Sidetrack",
    title: "Sidetrack",
    description: "Altijd Sfeervol, Altijd Sidetrack!",
    locale: "nl_NL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sidetrack",
    description: "Altijd Sfeervol, Altijd Sidetrack!",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
