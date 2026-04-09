import Link from "next/link";
import { categories } from "@/data/categories";
import { getFeaturedTools } from "@/data/tools";
import { ToolCard } from "@/components/tool";
import { CategoryGrid } from "@/components/category";
import { Hero } from "@/components/common";

export default function Home() {
  const featuredTools = getFeaturedTools().slice(0, 8);

  return (
    <div>
      {/* 1. Hero — 对话 + 场景入口 */}
      <Hero />

      {/* 2. 分类入口 */}
      <CategoryGrid categories={categories} />

      {/* 3. 热门工具 */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl text-white mb-3">热门工具</h2>
            <p className="text-on-surface/40 font-light">编辑精选，用户最爱的 AI 工具</p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:flex items-center gap-2 text-atmospheric hover:gap-3 transition-all text-sm"
          >
            查看全部
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* 4. 智能推荐入口 */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="liquid-glass-strong rounded-3xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">不知道用哪个？</h2>
          <p className="text-on-surface/40 font-light mb-8 max-w-lg mx-auto">
            回答 5 个问题，AI 帮你从 45 款工具中找到最适合你的
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recommend"
              className="px-8 py-4 rounded-2xl bg-atmospheric text-surface font-bold hover:scale-[1.02] transition-all text-sm"
            >
              开始智能推荐
            </Link>
            <Link
              href="/categories"
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all text-sm"
            >
              按分类浏览
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
