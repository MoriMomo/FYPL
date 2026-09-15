import type { MetadataRoute } from "next";

// Single-page site: one canonical entry plus the in-page section anchors are
// covered by the root URL. Keep the base in sync with metadataBase in layout.
const BASE_URL = "https://fypl-b2030.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
