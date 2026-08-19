export type Show = {
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  infoUrl?: string;
  possibly?: boolean;
  private?: boolean;
};

const DUTCH_MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mrt: 2, mar: 2, apr: 3, mei: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, okt: 9, oct: 9, nov: 10, dec: 11,
};

const DATE_RE = /^(\d{1,2})\s+(jan|feb|mrt|mar|apr|mei|jun|jul|aug|sep|okt|oct|nov|dec)\s+(\d{4})/i;

export function parseShowDate(dateStr: string): Date | null {
  const m = DATE_RE.exec(dateStr);
  if (!m) return null;
  return new Date(Number(m[3]), DUTCH_MONTHS[m[2].toLowerCase()], Number(m[1]));
}

export function stripTime(dateStr: string): string {
  const m = DATE_RE.exec(dateStr);
  return m ? m[0] : dateStr;
}

// Add all shows here. upcoming/past split is automatic based on date.
// Shows become "past" starting the day after the show date.
export const allShows: Show[] = [
  { date: "12 sep 2026", venue: "Scouting", city: "Roermond", private: true },
  { date: "22 aug 2026", venue: "Fuckin Band in de Tuin feestje", city: "Herkenbosch", private: true },
  { date: "29 jul 2026 18.00 & 19.00", venue: "Sjoemelmert Remunj (Aeve Choppe)", city: "Roermond"},
  { date: "28 jun 2026 13.45, 15.15 & 16.45", venue: "Gluren bij de Buren 2026", city: "Herten", infoUrl: "https://glurenbijdeburen.nl/nl/programma/roermond#1416" },
  { date: "20 jun 2026", venue: "Munsterplein (Cultuurnacht)", city: "Roermond", infoUrl: "https://www.instagram.com/p/DZLE8lYIJQR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { date: "30 mei 2026", venue: "Postert Laef", city: "Posterholt", ticketUrl: "https://roerdalelaef.nl/tickets1/", infoUrl: "https://roerdalelaef.nl" },
  { date: "10 mei 2026", venue: "Venhof", city: "Herkenbosch", infoUrl: "https://www.instagram.com/p/DXH67I_CGOF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { date: "22 mar 2026", venue: "De Boshut", city: "Herkenbosch" },
  { date: "07 nov 2025", venue: "De Spil", city: "Maasbracht" },
  { date: "30 aug 2025", venue: "Verjaardags feest", city: "Herten", private: true },
  { date: "29 jun 2025", venue: "Gluren bij de Buren 2025", city: "Herten" },
];