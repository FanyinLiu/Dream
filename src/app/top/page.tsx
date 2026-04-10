"use client";

import Link from "next/link";
import { tools } from "@/data/tools";
import { ToolCard } from "@/components/tool";
import { useI18n } from "@/lib/i18n";

export default function TopPage() {
  const { t } = useI18n();

  const LISTS = [
    {
      id: "beginner",
      title: t("top.beginner"),
      desc: t("top.beginnerDesc"),
      filter: () => tools.filter((tool) => tool.skillLevel === "beginner").sort((a, b) => b.scoreProfile.easeOfUse - a.scoreProfile.easeOfUse).slice(0, 6),
    },
    {
      id: "chinese",
      title: t("top.chinese"),
      desc: t("top.chineseDesc"),
      filter: () => tools.filter((tool) => tool.scoreProfile.chineseFriendly >= 7).sort((a, b) => b.scoreProfile.chineseFriendly - a.scoreProfile.chineseFriendly).slice(0, 6),
    },
    {
      id: "free",
      title: t("top.free"),
      desc: t("top.freeDesc"),
      filter: () => tools.filter((tool) => tool.priceType === "free" || tool.priceType === "freemium").sort((a, b) => b.scoreProfile.costEfficiency - a.scoreProfile.costEfficiency).slice(0, 6),
    },
    {
      id: "featured",
      title: t("top.featured"),
      desc: t("top.featuredDesc"),
      filter: () => tools.filter((tool) => tool.featured).sort((a, b) => b.rating - a.rating).slice(0, 8),
    },
  ];

  return (
    <main className="pt-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white mb-4">{t("top.title")}</h1>
          <p className="text-on-surface/40 font-light">{t("top.subtitle")}</p>
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
            {t("cat.viewAll")} &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}
