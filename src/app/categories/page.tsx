import type { Metadata } from "next";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { PageHeader } from "@/components/common";
import { CategoryCard } from "@/components/category";

export const metadata: Metadata = {
  title: "AI 工具分类 | AI Nav",
  description: "按场景分类浏览 AI 工具：绘画、视频、写作、编程、音乐、建站、提示词。",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <PageHeader title="AI 工具分类" description="按使用场景浏览，找到最适合你的 AI 工具" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} toolCount={getToolsByCategory(cat.id).length} />
        ))}
      </div>
    </div>
  );
}
