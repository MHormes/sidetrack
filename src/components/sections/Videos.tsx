// TODO: replace placeholder data with real YouTube/Vimeo embed IDs
// Use YouTube embed: https://www.youtube.com/embed/VIDEO_ID
// Example: { id: "dQw4w9WgXcQ", title: "Sidetrack – Naam Nummer (live)" }
const videos = [
  {
    id: "placeholder-1",
    title: "Sidetrack – Naam Nummer (live)",
    // embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
  },
  {
    id: "placeholder-2",
    title: "Sidetrack – Naam Nummer (clip)",
    // embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
  },
  {
    id: "placeholder-3",
    title: "Sidetrack – Naam Nummer (sessie)",
    // embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
  },
];

export default function Videos() {
  return (
    <section id="videos" className="bg-inverse py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-black tracking-widest uppercase text-fg-inverse mb-2">
          Video&apos;s
        </h2>
        <p className="text-fg-inverse-muted mb-12">Bekijk ons spelen.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col gap-3">
              {/* TODO: replace with <iframe> embed */}
              <div className="aspect-video bg-inverse-subtle rounded overflow-hidden flex items-center justify-center">
                <span className="text-fg-inverse-subtle text-xs tracking-widest uppercase">
                  video
                </span>
              </div>
              <p className="text-sm font-medium text-fg-inverse-muted">{video.title}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
