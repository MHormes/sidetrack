import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sidetracksounds.nl",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://sidetracksounds.nl/shop",
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
