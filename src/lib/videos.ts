// Add videos by pasting the YouTube video ID (the part after ?v= in the URL)
// e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: "dQw4w9WgXcQ"
// TODO: Update with actual video data and titles

export type Video = {
  youtubeId: string;
  title: string;
};

export const videos: Video[] = [
  {
    youtubeId: "oHJZ6F5vEgE",
    title: "Beleef de Smaken - Boshut",
  },
  {
    youtubeId: "v_kOgKuYKXE",
    title: "Acoustic sessions De Spil ",
  },
  {
    youtubeId: "tlwSXghBKIM",
    title: "Gluren bij de Buren (2025)",
  },
  {
    youtubeId: "L39MqKnIHG0",
    title: "Verjaardagsfeest Herten",
  },
];
