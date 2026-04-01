const upcomingShows = [
  { date: "30 mei 2026", venue: "Postert Laef", city: "Posterholt", ticketUrl: "https://roerdalelaef.nl/tickets1/" },
  { date: "28 jun 2026", venue: "Gluren bij de Buren 2026", city: "Herten" },
  { date: "8 aug 2026", venue: "HEIJ", city: "St. Odilienberg", ticketUrl: "https://www.heijfestival.nl/#tickets", possibly: true },
];

const pastShows = [
  { date: "22 mar 2026", venue: "De Boshut", city: "Herkenbosch"   },
  { date: "07 nov 2025", venue: "De Spil",  city: "Maasbracht"  },
  { date: "30 aug 2025", venue: "Verjaardags feest", city: "Herten", private: true},
  { date: "29 jun 2025", venue: "Gluren bij de Buren 2025", city: "Herten" },
];

export default function GigDates() {
  return (
    <section id="shows" className="bg-inverse py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-black tracking-widest uppercase text-fg-inverse mb-2">
          Shows
        </h2>
        <p className="text-fg-inverse-muted mb-12">Kom ons live zien.</p>

        {/* Upcoming */}
        <div className="flex flex-col divide-y divide-seam">
          {upcomingShows.map((show) => (
            <div
              key={show.date}
              className="flex flex-col items-center sm:flex-row sm:items-center justify-between py-5 gap-3"
            >
              <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-8">
                <span className="text-sm font-mono text-fg-inverse-muted w-28 shrink-0 text-center sm:text-left">
                  {show.date}
                </span>
                <span className="font-bold text-fg-inverse">{show.venue}</span>
                <span className="text-fg-inverse-muted">{show.city}</span>
              </div>
              {show.ticketUrl && !show.possibly && (
                <a
                  href={show.ticketUrl}
                  className="px-5 py-2 bg-accent text-on-accent text-xs font-bold tracking-widest uppercase rounded hover:bg-accent-hover transition-colors"
                >
                  Tickets
                </a>
              )}
              {show.possibly && (
                <a
                  className="px-5 py-2 bg-fg-muted text-on-accent text-xs font-bold tracking-widest uppercase rounded disabled"
                >
                  Aanvraag
                </a>
              )}
              {show.private && (
                <a
                  className="px-5 py-2 bg-fg text-on-accent text-xs font-bold tracking-widest uppercase rounded disabled"
                >
                  Besloten show
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Past shows */}
        <div className="mt-16">
          <h3 className="text-xs font-bold tracking-widest uppercase text-fg-inverse-subtle mb-4">
            Eerder gespeeld
          </h3>
          <div className="flex flex-col divide-y divide-seam">
            {pastShows.map((show) => (
              <div
                key={show.date}
                className="flex items-center gap-6 sm:gap-8 py-3 text-fg-inverse-subtle"
              >
                <span className="text-xs font-mono w-28 shrink-0">{show.date}</span>
                <span className="text-sm">{show.venue}</span>
                <span className="text-sm">{show.city}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
