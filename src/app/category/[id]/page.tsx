import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categories,
  getCategoryById,
  getToolsByCategory,
} from "@/data/tools";

export function generateStaticParams() {
  return categories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return {};
  return {
    title: `${category.name} - AI 工具推荐 | AI Nav`,
    description: `精选${category.name}类 AI 工具：${category.description}。找到最适合你的 AI 工具。`,
  };
}

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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          首页
        </Link>
        <span className="mx-2">/</span>
        <Link href="/categories" className="hover:text-blue-600">
          分类
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        </div>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-400 mt-1">
          共 {categoryTools.length} 款工具
        </p>
      </div>

      {/* Tool List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryTools.map((tool) => (
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
              <p className="text-xs text-gray-400 mt-3">{tool.pricingNote}</p>
            )}
          </a>
        ))}
      </div>

      {/* Other Categories */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          其他分类
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((cat) => cat.id !== id)
            .map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white border border-gray-200 hover:border-blue-300 px-4 py-2 rounded-full text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                {cat.icon} {cat.name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
