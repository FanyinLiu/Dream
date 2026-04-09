import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { CategoryGrid } from "@/components/category";

export const metadata: Metadata = {
  title: "AI 工具分类 | AI Nav",
  description: "按场景分类浏览 AI 工具：绘画、视频、写作、编程、音乐、建站、提示词。",
};

export default function CategoriesPage() {
  return (
    <div>
      <div className="text-center pt-8 pb-4 px-6">
        <h1 className="text-4xl md:text-5xl text-white mb-4">AI 工具分类</h1>
        <p className="text-on-surface/40 font-light">按使用场景浏览，找到最适合你的 AI 工具</p>
      </div>
      <CategoryGrid categories={categories} />
    </div>
  );
}
