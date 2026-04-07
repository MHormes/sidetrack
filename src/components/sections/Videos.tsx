"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { videos } from "@/lib/videos";

// Triple the array so we always have content in both directions for infinite scroll
const allItems = [...videos, ...videos, ...videos];

export default function Videos() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll to the middle copy without animation so the user starts there
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3;
  }, []);

  // After each scroll settles, silently reset to the equivalent position in the
  // middle copy. The content at that position looks identical, so there's no jump.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScrollEnd = () => {
      const sectionWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= sectionWidth * 2) {
        el.scrollLeft -= sectionWidth;
      } else if (el.scrollLeft < sectionWidth) {
        el.scrollLeft += sectionWidth;
      }
    };

    el.addEventListener("scrollend", onScrollEnd, { passive: true });
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const firstItem = el.firstElementChild as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (firstItem.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section id="videos" className="bg-inverse py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-widest uppercase text-fg-inverse mb-2">
              Video&apos;s
            </h2>
            <p className="text-fg-inverse-muted">Bekijk ons spelen.</p>
          </div>

          {/* Arrow buttons — always visible as a hint that navigation is possible */}
          <div className="flex gap-2" aria-label="Carousel navigatie">
            <button
              onClick={() => scroll(-1)}
              aria-label="Vorige video"
              className="w-10 h-10 flex items-center justify-center border border-fg-inverse/30 text-fg-inverse hover:border-fg-inverse hover:bg-fg-inverse/10 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Volgende video"
              className="w-10 h-10 flex items-center justify-center border border-fg-inverse/30 text-fg-inverse hover:border-fg-inverse hover:bg-fg-inverse/10 transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Left gradient — hints there's content behind */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-inverse to-transparent pointer-events-none z-10" />
          {/* Right gradient — hints there's content ahead */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-inverse to-transparent pointer-events-none z-10" />

          <div
            ref={trackRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {allItems.map((video, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-start w-full md:w-[calc((100%-48px)/3)] flex flex-col gap-3"
              >
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

      </div>
    </section>
  );
}
