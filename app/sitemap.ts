import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://quota.live",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://quota.live/terms",
      lastModified: new Date("2025-04-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://quota.live/privacy",
      lastModified: new Date("2025-04-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
