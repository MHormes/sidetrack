// Add videos by pasting the YouTube video ID (the part after ?v= in the URL)
// e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: "dQw4w9WgXcQ"
// TODO: Update with actual video data and titles
const videos = [
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Sidetrack – Naam Nummer (live)",
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Sidetrack – Naam Nummer (clip)",
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Sidetrack – Naam Nummer (sessie)",
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
            <div key={video.youtubeId + video.title} className="flex flex-col gap-3">
              <div className="relative aspect-video rounded overflow-hidden bg-inverse-subtle">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <p className="text-sm font-medium text-fg-inverse-muted">{video.title}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
