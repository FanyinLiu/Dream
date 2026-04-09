import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { CategoryGrid } from "@/components/category";
import { ToolCard } from "@/components/tool";

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

      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat.id);
        if (catTools.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="px-6 py-16 max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl md:text-5xl text-white mb-3">{cat.name}</h2>
                <p className="text-on-surface/40 font-light">{cat.description}</p>
              </div>
              <Link
                href={`/category/${cat.id}`}
                className="hidden sm:flex items-center gap-2 text-atmospheric hover:gap-3 transition-all text-sm"
              >
                查看全部
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {catTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="text-center py-12">
        <a href="#" className="text-sm text-on-surface/40 hover:text-white transition-colors">
          ↑ 回到顶部
        </a>
      </div>
    </div>
  );
}
