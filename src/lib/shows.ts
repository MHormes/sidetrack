export type Show = {
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  possibly?: boolean;
  private?: boolean;
};

export const upcomingShows: Show[] = [
  { date: "30 mei 2026", venue: "Postert Laef", city: "Posterholt", ticketUrl: "https://roerdalelaef.nl/tickets1/" },
  { date: "28 jun 2026", venue: "Gluren bij de Buren 2026", city: "Herten" }
];

export const pastShows: Show[] = [
  { date: "22 mar 2026", venue: "De Boshut", city: "Herkenbosch" },
  { date: "07 nov 2025", venue: "De Spil", city: "Maasbracht" },
  { date: "30 aug 2025", venue: "Verjaardags feest", city: "Herten", private: true },
  { date: "29 jun 2025", venue: "Gluren bij de Buren 2025", city: "Herten" },
];
