import Link from "next/link";
import type { Metadata } from "next";
import { categories, getToolsByCategory } from "@/data/tools";

export const metadata: Metadata = {
  title: "AI 工具分类 | AI Nav",
  description: "按场景分类浏览 AI 工具：写作、绘画、视频、音频、编程、效率、对话、设计。",
};

export default function CategoriesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 工具分类</h1>
      <p className="text-gray-600 mb-8">按使用场景浏览，找到最适合你的 AI 工具</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {categories.map((cat) => {
          const toolCount = getToolsByCategory(cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{cat.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {cat.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {toolCount} 款工具
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
