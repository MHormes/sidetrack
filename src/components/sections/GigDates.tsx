import { upcomingShows, pastShows } from "@/lib/shows";

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
              <div>
              {show.possibly && (
                <a
                  className="px-5 py-2 mx-2 bg-fg-muted text-on-accent text-xs font-bold tracking-widest uppercase rounded disabled"
                >
                  Aanvraag
                </a>
              )}
              {show.private && (
                <a
                  className="px-5 py-2 mx-2 bg-fg-muted/30 text-on-accent text-xs font-bold tracking-widest uppercase rounded disabled"
                >
                  Besloten show
                </a>
              )}
              {show.ticketUrl && !show.possibly && !show.private && (
                <a
                  href={show.ticketUrl}
                  className="px-5 py-2 mx-2 bg-accent text-on-accent text-xs font-bold tracking-widest uppercase rounded hover:bg-accent-hover transition-colors"
                >
                  Tickets
                </a>
              )}
              {show.infoUrl && !show.possibly && !show.private && (
                <a
                  href={show.infoUrl}
                  className="px-5 py-2 mx-2 bg-accent/50 text-on-accent text-xs font-bold tracking-widest uppercase rounded hover:bg-accent-hover transition-colors"
                >
                  Informatie
                </a>
              )}
              </div>
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
