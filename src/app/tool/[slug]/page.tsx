import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, getToolBySlug, getAlternativeTools } from "@/data/tools";
import { getCategoryById } from "@/data/categories";
import { Breadcrumb } from "@/components/common";
import { ToolMeta, ToolFeatureList, ToolCard } from "@/components/tool";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return { title: `${tool.name} - ${tool.tagline} | AI Nav`, description: tool.description };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryById(tool.categories[0]);
  const alternatives = getAlternativeTools(tool);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Breadcrumb items={[
        { label: "首页", href: "/" },
        ...(category ? [{ label: category.name, href: `/category/${category.id}` }] : []),
        { label: tool.name },
      ]} />

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-xl">
            {tool.logoText}
          </span>
          <div>
            <h1 className="font-serif italic text-4xl text-foreground glow-text">{tool.name}</h1>
            <p className="text-accent-dim">{tool.tagline}</p>
          </div>
        </div>
        <p className="text-muted leading-relaxed">{tool.description}</p>
      </div>

      {/* Meta */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h2 className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">基本信息</h2>
        <ToolMeta tool={tool} />
      </div>

      {/* Use Cases */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h2 className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">适用场景</h2>
        <p className="text-sm text-foreground mb-3"><strong className="text-accent">最适合：</strong>{tool.bestFor}</p>
        <div className="flex flex-wrap gap-2">
          {tool.useCases.map((uc) => (
            <span key={uc} className="text-sm bg-accent/10 text-accent border border-accent/20 px-3 py-1 rounded-full">{uc}</span>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h2 className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">优势与不足</h2>
        <ToolFeatureList pros={tool.pros} cons={tool.cons} />
      </div>

      {/* Score */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-xs uppercase tracking-widest text-accent mb-4 font-semibold">评分维度</h2>
        <div className="space-y-3">
          {[
            { label: "易用性", value: tool.scoreProfile.easeOfUse },
            { label: "输出质量", value: tool.scoreProfile.outputQuality },
            { label: "性价比", value: tool.scoreProfile.costEfficiency },
            { label: "中文友好度", value: tool.scoreProfile.chineseFriendly },
            { label: "功能丰富度", value: tool.scoreProfile.featureRichness },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sm text-muted w-24 shrink-0">{item.label}</span>
              <div className="flex-1 bg-surface-high rounded-full h-2">
                <div className="bg-accent h-2 rounded-full transition-all" style={{ width: `${item.value * 10}%` }} />
              </div>
              <span className="text-sm font-medium text-accent w-8 text-right">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mb-14">
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 glass-strong px-8 py-3 rounded-full text-accent font-semibold hover:bg-accent/20 transition-all"
        >
          访问 {tool.name} 官网 ↗
        </a>
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div>
          <h2 className="font-serif italic text-xl text-foreground mb-4">相似工具推荐</h2>
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
