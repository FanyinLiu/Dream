"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { categories, getCategoryById } from "@/data/categories";
import { getToolsByCategory } from "@/data/tools";
import { ToolFilter } from "@/components/category";
import { useI18n } from "@/lib/i18n";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useI18n();
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
          {t("cat.backToCategories")}
        </Link>

        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl text-white mb-4">{category.name}</h1>
          <p className="text-xl text-on-surface/60 font-light">{category.description}</p>
          <p className="text-sm text-atmospheric mt-2">{t("cat.total")} {categoryTools.length} {t("cat.toolsCount")}</p>
        </div>

        <ToolFilter tools={categoryTools} categoryId={id} />

        {/* Other categories */}
        <div className="mt-20 pt-16 border-t border-white/5">
          <h2 className="text-3xl text-white mb-8">{t("cat.otherCats")}</h2>
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
