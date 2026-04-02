import { videos } from "@/lib/videos";

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
