import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sidetrackmusic.nl",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://sidetrackmusic.nl/shop",
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
