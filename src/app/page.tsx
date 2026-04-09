import Link from "next/link";
import { categories } from "@/data/categories";
import { tools, getToolsByCategory } from "@/data/tools";
import { ToolCard } from "@/components/tool";
import { CategoryGrid } from "@/components/category";
import { Hero } from "@/components/common";

export default function Home() {
  return (
    <div>
      <Hero />

      <CategoryGrid categories={categories} />

      {/* All Categories with Tools */}
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

      {/* Back to top */}
      <div className="text-center py-12">
        <a href="#" className="text-sm text-on-surface/40 hover:text-white transition-colors">
          ↑ 回到顶部
        </a>
      </div>
    </div>
  );
}
