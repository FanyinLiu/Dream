import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryById } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { ToolFilter } from "@/components/category";

export function generateStaticParams() {
  return categories.map((cat) => ({ id: cat.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) return {};
  return {
    title: `${category.name} - AI 工具推荐`,
    description: `精选${category.name}类 AI 工具：${category.description}。免费、付费、中文友好，按需筛选。`,
    openGraph: { title: `${category.name} - AI 工具推荐`, description: category.description },
    alternates: { canonical: `https://www.ainav.my/category/${id}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategoryById(id);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(id);
  const otherCategories = categories.filter((cat) => cat.id !== id);

  return (
    <main className="pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-on-surface/40 hover:text-white mb-12 transition-colors text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
          </svg>
          返回分类
        </Link>

        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl text-white mb-4">{category.name}</h1>
          <p className="text-xl text-on-surface/60 font-light">{category.description}</p>
          <p className="text-sm text-atmospheric mt-2">共 {categoryTools.length} 款工具</p>
        </div>

        <ToolFilter tools={categoryTools} categoryId={id} />

        {/* Other categories */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <h2 className="text-3xl text-white mb-8">其他分类</h2>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="px-5 py-2.5 rounded-full liquid-glass ghost-border text-sm text-on-surface/60 hover:text-white transition-all"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
