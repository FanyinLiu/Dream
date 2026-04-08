import Link from "next/link";
import { categories } from "@/data/categories";
import { tools, getFeaturedTools, getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/tool";
import { CategoryCard } from "@/components/category";

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-28 text-center overflow-hidden">
        {/* Glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <h1 className="font-serif italic text-5xl sm:text-7xl text-foreground glow-text relative">
          发现最好用的 AI 工具
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto relative">
          精选 {tools.length}+ 款优质 AI 工具，按场景分类，帮你快速上手 AI 时代
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3 relative">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="glass px-5 py-2.5 rounded-full text-sm text-accent-dim hover:text-accent hover:border-accent/30 transition-all"
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          <Link
            href="/recommend"
            className="glass-strong px-5 py-2.5 rounded-full text-sm text-accent font-semibold"
          >
            🎯 智能推荐
          </Link>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="font-serif italic text-3xl text-foreground">精选推荐</h2>
          <p className="text-muted text-sm mt-1">编辑精选的优质 AI 工具</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* All Categories */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-8">
          <h2 className="font-serif italic text-3xl text-foreground">按场景找工具</h2>
          <p className="text-muted text-sm mt-1">选择你的使用场景</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
