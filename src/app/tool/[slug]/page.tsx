import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getToolBySlug, getAlternativeTools } from "@/data/tools";
import { getCategoryById } from "@/data/categories";
import { Breadcrumb } from "@/components/common";
import { ToolMeta } from "@/components/tool";
import { ToolFeatureList } from "@/components/tool";
import { ToolCard } from "@/components/tool";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - ${tool.tagline} | AI Nav`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryById(tool.categories[0]);
  const alternatives = getAlternativeTools(tool);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          ...(category
            ? [{ label: category.name, href: `/category/${category.id}` }]
            : []),
          { label: tool.name },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {tool.logoText}
          </span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
            <p className="text-gray-500">{tool.tagline}</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{tool.description}</p>
      </div>

      {/* Meta Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h2>
        <ToolMeta tool={tool} />
      </div>

      {/* Best For & Use Cases */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">适用场景</h2>
        <p className="text-sm text-gray-700 mb-4">
          <strong>最适合：</strong>
          {tool.bestFor}
        </p>
        <div className="flex flex-wrap gap-2">
          {tool.useCases.map((uc) => (
            <span
              key={uc}
              className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
            >
              {uc}
            </span>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">优势与不足</h2>
        <ToolFeatureList pros={tool.pros} cons={tool.cons} />
      </div>

      {/* Score Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">评分维度</h2>
        <div className="space-y-3">
          {[
            { label: "易用性", value: tool.scoreProfile.easeOfUse },
            { label: "输出质量", value: tool.scoreProfile.outputQuality },
            { label: "性价比", value: tool.scoreProfile.costEfficiency },
            { label: "中文友好度", value: tool.scoreProfile.chineseFriendly },
            { label: "功能丰富度", value: tool.scoreProfile.featureRichness },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-24 shrink-0">
                {item.label}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all"
                  style={{ width: `${item.value * 10}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 w-8 text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mb-12">
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          访问 {tool.name} 官网 ↗
        </a>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            相似工具推荐
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {alternatives.map((alt) => (
              <ToolCard key={alt.id} tool={alt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
