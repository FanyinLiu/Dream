import Link from "next/link";
import { categories } from "@/data/categories";
import { tools, getFeaturedTools, getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/tool";

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <h1 className="font-serif italic text-5xl sm:text-7xl text-foreground glow-text relative">
          AI 工具聚合导航
        </h1>
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto relative">
          {tools.length}+ 款精选 AI 工具，一站直达，点击即跳转官网
        </p>
      </section>

      {/* Category Navigation */}
      <section className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="glass px-5 py-2.5 rounded-full text-sm text-accent-dim hover:text-accent hover:border-accent/30 transition-all"
            >
              {cat.icon} {cat.name}
              <span className="ml-1 text-muted/50 text-xs">{getToolsByCategory(cat.id).length}</span>
            </a>
          ))}
        </div>
      </section>

      {/* All Categories with Tools */}
      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat.id);
        if (catTools.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="max-w-6xl mx-auto px-6 py-10 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h2 className="font-serif italic text-2xl text-foreground">{cat.name}</h2>
                <p className="text-sm text-muted">{cat.description}</p>
              </div>
              <span className="ml-auto glass px-3 py-1 rounded-full text-xs text-accent-dim">
                {catTools.length} 款
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {catTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Back to top */}
      <div className="text-center py-12">
        <a href="#" className="text-sm text-muted hover:text-accent transition-colors">
          ↑ 回到顶部
        </a>
      </div>
    </div>
  );
}
