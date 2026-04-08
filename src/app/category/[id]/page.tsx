import { notFound } from "next/navigation";
import { categories, getCategoryById } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { Breadcrumb } from "@/components/common";
import { PageHeader } from "@/components/common";
import { CategoryStrip } from "@/components/category";
import { ToolCard } from "@/components/tool";
import { EmptyState } from "@/components/common";

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
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: "分类", href: "/categories" },
          { label: category.name },
        ]}
      />

      <PageHeader
        icon={category.icon}
        title={category.name}
        description={category.description}
      >
        <p className="text-sm text-gray-400 mt-1">
          共 {categoryTools.length} 款工具
        </p>
      </PageHeader>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="暂无工具"
          description="该分类下暂时没有工具，我们正在努力收录中"
        />
      )}

      {/* Other Categories */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          其他分类
        </h2>
        <CategoryStrip
          categories={categories.filter((cat) => cat.id !== id)}
          activeCategoryId={id}
        />
      </div>
    </div>
  );
}
