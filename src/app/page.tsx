import Link from "next/link";
import { categories } from "@/data/categories";
import { tools, getFeaturedTools, getToolsByCategory } from "@/data/tools";
import { siteConfig } from "@/data/site";
import { SectionHeader } from "@/components/common";
import { CategoryCard } from "@/components/category";
import { ToolCard } from "@/components/tool";

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            找到最适合你的 AI 工具
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            精选 {tools.length}+ 款优质 AI 工具，按场景分类，帮你快速上手 AI
            时代
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white/15 hover:bg-white/25 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
            <Link
              href="/recommend"
              className="bg-white/25 hover:bg-white/35 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/30"
            >
              🎯 智能推荐
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeader title="精选推荐" description="编辑精选的优质 AI 工具" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* All Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <SectionHeader title="按场景找工具" description="选择你的使用场景，找到最合适的 AI 工具" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              toolCount={getToolsByCategory(cat.id).length}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
