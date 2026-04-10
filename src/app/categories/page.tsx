"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { CategoryGrid } from "@/components/category";
import { ToolCard } from "@/components/tool";
import { useI18n } from "@/lib/i18n";

export default function CategoriesPage() {
  const { t } = useI18n();

  return (
    <div>
      <div className="text-center pt-8 pb-4 px-6">
        <h1 className="text-4xl md:text-5xl text-white mb-4">{t("cat.all")}</h1>
        <p className="text-on-surface/40 font-light">{t("cat.browseDesc")}</p>
      </div>

      <CategoryGrid categories={categories} />

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
                {t("cat.viewAll")}
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

      {/* Smart Recommend Entry */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="liquid-glass-strong rounded-3xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">{t("common.notSure")}</h2>
          <p className="text-on-surface/40 font-light mb-8 max-w-lg mx-auto">
            {t("common.notSureDesc")}
          </p>
          <Link
            href="/recommend"
            className="inline-block px-8 py-4 rounded-2xl bg-atmospheric text-surface font-bold hover:scale-[1.02] transition-all text-sm"
          >
            {t("rec.start")}
          </Link>
        </div>
      </section>

      <div className="text-center py-12">
        <a href="#" className="text-sm text-on-surface/40 hover:text-white transition-colors">
          {t("common.backToTop")}
        </a>
      </div>
    </div>
  );
}
