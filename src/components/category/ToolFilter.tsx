"use client";

import { useState, useMemo } from "react";
import { ToolCard } from "@/components/tool";
import Link from "next/link";
import type { Tool } from "@/types/tool";
import { useI18n } from "@/lib/i18n";

interface ToolFilterProps {
  tools: Tool[];
  categoryId: string;
}

export function ToolFilter({ tools, categoryId }: ToolFilterProps) {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState("recommend");

  const FILTERS = [
    { key: "all", label: t("cat.filter.all") },
    { key: "free", label: t("cat.filter.free") },
    { key: "freemium", label: t("cat.filter.freemium") },
    { key: "chinese", label: t("cat.filter.chinese") },
    { key: "beginner", label: t("cat.filter.beginner") },
    { key: "api", label: t("cat.filter.api") },
    { key: "mobile", label: t("cat.filter.mobile") },
  ];

  const SORTS = [
    { key: "recommend", label: t("cat.sort.recommend") },
    { key: "rating", label: t("cat.sort.rating") },
    { key: "free", label: t("cat.sort.free") },
    { key: "easy", label: t("cat.sort.easy") },
  ];

  const filtered = useMemo(() => {
    let result = [...tools];

    // Filter
    switch (activeFilter) {
      case "free":
        result = result.filter((item) => item.priceType === "free");
        break;
      case "freemium":
        result = result.filter((item) => item.priceType === "free" || item.priceType === "freemium");
        break;
      case "chinese":
        result = result.filter((item) => item.scoreProfile.chineseFriendly >= 7);
        break;
      case "beginner":
        result = result.filter((item) => item.skillLevel === "beginner");
        break;
      case "api":
        result = result.filter((item) => item.platforms.includes("api"));
        break;
      case "mobile":
        result = result.filter((item) => item.platforms.includes("mobile"));
        break;
    }

    // Sort
    switch (activeSort) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "free":
        result.sort((a, b) => {
          const order = { free: 0, freemium: 1, paid: 2 };
          return order[a.priceType] - order[b.priceType];
        });
        break;
      case "easy":
        result.sort((a, b) => b.scoreProfile.easeOfUse - a.scoreProfile.easeOfUse);
        break;
      default: // recommend — featured first, then rating
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [tools, activeFilter, activeSort]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              activeFilter === f.key
                ? "bg-atmospheric/20 text-atmospheric border border-atmospheric/30"
                : "bg-white/5 text-on-surface/50 border border-white/10 hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] text-on-surface/30">{t("cat.sort")}</span>
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSort(s.key)}
              className={`px-2.5 py-1 rounded-full text-[10px] transition-all ${
                activeSort === s.key
                  ? "text-atmospheric"
                  : "text-on-surface/30 hover:text-on-surface/60"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recommend link */}
      <div className="mb-6">
        <Link
          href={`/recommend?category=${categoryId}`}
          className="inline-flex items-center gap-2 text-xs text-atmospheric/60 hover:text-atmospheric transition-colors"
        >
          {t("cat.smartRecommend")}
        </Link>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-on-surface/40">{t("cat.noresult")}</p>
          <button onClick={() => setActiveFilter("all")} className="text-sm text-atmospheric mt-2 hover:text-white transition-colors">
            {t("cat.clearFilter")}
          </button>
        </div>
      )}
    </div>
  );
}
