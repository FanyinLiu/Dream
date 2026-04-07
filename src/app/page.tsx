import Link from "next/link";
import { categories, getFeaturedTools, tools } from "@/data/tools";

function PricingBadge({ pricing }: { pricing: string }) {
  const styles = {
    free: "bg-green-100 text-green-700",
    freemium: "bg-blue-100 text-blue-700",
    paid: "bg-orange-100 text-orange-700",
  };
  const labels = {
    free: "免费",
    freemium: "免费试用",
    paid: "付费",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[pricing as keyof typeof styles]}`}
    >
      {labels[pricing as keyof typeof labels]}
    </span>
  );
}

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
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          精选推荐
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <PricingBadge pricing={tool.pricing} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {tool.pricingNote && (
                <p className="text-xs text-gray-400 mt-3">
                  {tool.pricingNote}
                </p>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* All Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          按场景找工具
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
