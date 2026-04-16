export type Show = {
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  infoUrl?: string;
  possibly?: boolean;
  private?: boolean;
};

export const upcomingShows: Show[] = [
  { date: "10 mei 2026 13u-15u", venue: "Venhof", city: "Herkenbosch", infoUrl: "https://www.instagram.com/p/DXH67I_CGOF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { date: "30 mei 2026 15.30-16.15", venue: "Postert Laef", city: "Posterholt", ticketUrl: "https://roerdalelaef.nl/tickets1/", infoUrl: "https://roerdalelaef.nl" },
  { date: "28 jun 2026 n.t.b.", venue: "Gluren bij de Buren 2026", city: "Herten", infoUrl: "https://www.glurenbijdeburen.nl/" },
 ];

export const pastShows: Show[] = [
  { date: "22 mar 2026", venue: "De Boshut", city: "Herkenbosch" },
  { date: "07 nov 2025", venue: "De Spil", city: "Maasbracht" },
  { date: "30 aug 2025", venue: "Verjaardags feest", city: "Herten", private: true },
  { date: "29 jun 2025", venue: "Gluren bij de Buren 2025", city: "Herten" },
];

// Test data
// export const upcomingShows: Show[] = [
//   { date: "10 mei 2026", venue: "Venhof", city: "Herkenbosch", private: true },
//   { date: "11 mei 2026", venue: "Venhof", city: "Herkenbosch", possibly: true },
//   { date: "12 mei 2026", venue: "Venhof", city: "Herkenbosch", possibly: true, private: true },
//   { date: "30 mei 2026", venue: "Postert Laef", city: "Posterholt", ticketUrl: "https://roerdalelaef.nl/tickets1/" },
//   { date: "28 jun 2026", venue: "Gluren bij de Buren 2026", city: "Herten", infoUrl: "https://www.glurenbijdeburen.nl/" },
//   { date: "29 jun 2026", venue: "Gluren bij de Buren 2026", city: "Herten", infoUrl: "https://www.glurenbijdeburen.nl/", ticketUrl: "https://www.glurenbijdeburen.nl/" },
//  ];