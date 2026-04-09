import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/tool";

export const metadata: Metadata = {
  title: "AI 工具排行榜",
  description: "精选 AI 工具排行榜：最适合新手、最适合中文用户、最佳性价比、编辑精选。",
};

const LISTS = [
  {
    id: "beginner",
    title: "最适合新手的 AI 工具",
    desc: "零基础也能上手，学习成本最低",
    filter: () => tools.filter((t) => t.skillLevel === "beginner").sort((a, b) => b.scoreProfile.easeOfUse - a.scoreProfile.easeOfUse).slice(0, 6),
  },
  {
    id: "chinese",
    title: "最适合中文用户的 AI 工具",
    desc: "中文界面、中文支持好、国内可用",
    filter: () => tools.filter((t) => t.scoreProfile.chineseFriendly >= 7).sort((a, b) => b.scoreProfile.chineseFriendly - a.scoreProfile.chineseFriendly).slice(0, 6),
  },
  {
    id: "free",
    title: "最佳免费 AI 工具",
    desc: "完全免费或免费额度慷慨，不花钱也能用好",
    filter: () => tools.filter((t) => t.priceType === "free" || t.priceType === "freemium").sort((a, b) => b.scoreProfile.costEfficiency - a.scoreProfile.costEfficiency).slice(0, 6),
  },
  {
    id: "featured",
    title: "编辑精选",
    desc: "编辑团队亲测推荐，各领域最值得一试的工具",
    filter: () => tools.filter((t) => t.featured).sort((a, b) => b.rating - a.rating).slice(0, 8),
  },
];

export default function TopPage() {
  return (
    <main className="pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white mb-4">AI 工具排行榜</h1>
          <p className="text-on-surface/40 font-light">按场景精选，帮你快速找到最合适的</p>
        </div>

        {LISTS.map((list) => {
          const listTools = list.filter();
          return (
            <section key={list.id} id={list.id} className="mb-20">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl text-white mb-2">{list.title}</h2>
                <p className="text-on-surface/40 font-light">{list.desc}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </section>
          );
        })}

        <div className="text-center mt-8">
          <Link href="/categories" className="text-sm text-atmospheric hover:text-white transition-colors">
            查看全部工具 →
          </Link>
        </div>
      </div>
    </main>
  );
}
