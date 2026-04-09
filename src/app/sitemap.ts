import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";

const BASE = "https://www.ainav.my";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, changeFrequency: "daily" as const, priority: 1 },
    { url: `${BASE}/categories`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/recommend`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/create`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/pricing`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${BASE}/category/${cat.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const toolPages = tools.map((tool) => ({
    url: `${BASE}/tool/${tool.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
