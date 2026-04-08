import type { Tool } from "@/types/tool";
import { imageTools } from "./tools/image";
import { videoTools } from "./tools/video";
import { writingTools } from "./tools/writing";
import { codingTools } from "./tools/coding";
import { musicTools } from "./tools/music";
import { webdevTools } from "./tools/webdev";
import { promptTools } from "./tools/prompt";

export const tools: Tool[] = [
  ...imageTools,
  ...videoTools,
  ...writingTools,
  ...codingTools,
  ...musicTools,
  ...webdevTools,
  ...promptTools,
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter((tool) => tool.categories.includes(categoryId as Tool["categories"][number]));
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getAlternativeTools(tool: Tool): Tool[] {
  return tool.alternatives
    .map((id) => getToolById(id))
    .filter((t): t is Tool => t !== undefined);
}
