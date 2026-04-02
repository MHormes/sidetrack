// Add videos by pasting the YouTube video ID (the part after ?v= in the URL)
// e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: "dQw4w9WgXcQ"
// TODO: Update with actual video data and titles

export type Video = {
  youtubeId: string;
  title: string;
};

export const videos: Video[] = [
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
