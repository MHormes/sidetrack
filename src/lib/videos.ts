// Add videos by pasting the YouTube video ID (the part after ?v= in the URL)
// e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: "dQw4w9WgXcQ"
// TODO: Update with actual video data and titles

export type Video = {
  youtubeId: string;
  title: string;
};

export const videos: Video[] = [
  {
    youtubeId: "tlwSXghBKIM",
    title: "Gluren bij de Buren (2025)",
  },
  {
    youtubeId: "rRwR1d2oXfo",
    title: "Acoustic sessions De Spil ",
  },
  {
    youtubeId: "dQw4w9WgXcQ",
    title: "Beleef de Smaken - Boshut",
  },
];
