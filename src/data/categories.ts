import type { Category } from "@/types/tool";

export const categories: Category[] = [
  {
    id: "image",
    slug: "image",
    name: "AI 绘画",
    icon: "🎨",
    description: "图片生成、图片编辑、风格转换，用 AI 释放你的视觉创造力",
    featured: true,
    sort: 1,
    useCases: ["海报设计", "产品图生成", "艺术创作", "照片编辑", "Logo 设计"],
  },
  {
    id: "video",
    slug: "video",
    name: "AI 视频",
    icon: "🎬",
    description: "视频生成、数字人口播、智能剪辑，让视频制作不再复杂",
    featured: true,
    sort: 2,
    useCases: ["短视频制作", "数字人口播", "广告视频", "教程录制", "字幕生成"],
  },
  {
    id: "writing",
    slug: "writing",
    name: "AI 写作",
    icon: "✍️",
    description: "文案生成、文章润色、翻译改写，AI 帮你高效完成写作任务",
    featured: true,
    sort: 3,
    useCases: ["营销文案", "博客写作", "论文润色", "翻译", "社交媒体"],
  },
  {
    id: "coding",
    slug: "coding",
    name: "AI 编程",
    icon: "💻",
    description: "代码生成、智能补全、代码审查，开发者的 AI 效率利器",
    featured: true,
    sort: 4,
    useCases: ["代码补全", "Bug 修复", "代码重构", "全栈开发", "代码审查"],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getCategoriesSorted(): Category[] {
  return [...categories].sort((a, b) => a.sort - b.sort);
}
