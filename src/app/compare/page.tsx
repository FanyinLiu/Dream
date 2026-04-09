"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Plus, ArrowRight } from "lucide-react";
import { tools } from "@/data/tools";
import type { Tool } from "@/types/tool";

const COMPARE_DIMS = [
  { key: "easeOfUse" as const, label: "易用性" },
  { key: "outputQuality" as const, label: "输出质量" },
  { key: "costEfficiency" as const, label: "性价比" },
  { key: "chineseFriendly" as const, label: "中文友好" },
  { key: "featureRichness" as const, label: "功能丰富度" },
];

const POPULAR_COMPARISONS = [
  { a: "chatgpt", b: "claude", label: "ChatGPT vs Claude" },
  { a: "midjourney", b: "dall-e", label: "Midjourney vs DALL-E 3" },
  { a: "cursor", b: "github-copilot", label: "Cursor vs GitHub Copilot" },
  { a: "suno", b: "udio", label: "Suno vs Udio" },
  { a: "runway", b: "kling", label: "Runway vs Kling" },
  { a: "v0", b: "bolt", label: "v0 vs Bolt.new" },
];

export default function ComparePage() {
  const [selected, setSelected] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? tools.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tagline.includes(search)
      ).slice(0, 8)
    : [];

  function addTool(tool: Tool) {
    if (selected.length >= 3 || selected.find((t) => t.id === tool.id)) return;
    setSelected([...selected, tool]);
    setSearch("");
  }

  function removeTool(id: string) {
    setSelected(selected.filter((t) => t.id !== id));
  }

  function loadComparison(aSlug: string, bSlug: string) {
    const a = tools.find((t) => t.slug === aSlug);
    const b = tools.find((t) => t.slug === bSlug);
    if (a && b) setSelected([a, b]);
  }

  return (
    <main className="pt-8 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl text-white mb-4">工具对比</h1>
          <p className="text-on-surface/40 font-light">最多选 3 款工具，直观对比差异</p>
        </div>

        {/* Search to add */}
        <div className="max-w-md mx-auto mb-8 relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索工具名称..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/40"
          />
          {filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden z-10">
              {filtered.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => addTool(tool)}
                  disabled={!!selected.find((t) => t.id === tool.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left disabled:opacity-30"
                >
                  <Plus className="w-4 h-4 text-atmospheric shrink-0" />
                  <span className="text-sm text-white">{tool.name}</span>
                  <span className="text-xs text-on-surface/30 ml-auto">{tool.tagline}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular comparisons */}
        {selected.length === 0 && (
          <div className="mb-12">
            <p className="text-xs text-on-surface/30 text-center mb-4">热门对比</p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_COMPARISONS.map((c) => (
                <button
                  key={c.label}
                  onClick={() => loadComparison(c.a, c.b)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-on-surface/60 hover:text-white hover:border-atmospheric/30 transition-all"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected tools */}
        {selected.length > 0 && (
          <div className="mb-8 flex justify-center gap-3">
            {selected.map((tool) => (
              <div key={tool.id} className="flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-sm text-white">
                {tool.name}
                <button onClick={() => removeTool(tool.id)} className="text-on-surface/30 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {selected.length < 3 && (
              <button
                onClick={() => document.querySelector("input")?.focus()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-dashed border-white/20 text-xs text-on-surface/30 hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> 添加
              </button>
            )}
          </div>
        )}

        {/* Comparison table */}
        {selected.length >= 2 && (
          <div className="liquid-glass rounded-3xl p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-on-surface/30 font-medium w-32"></th>
                  {selected.map((tool) => (
                    <th key={tool.id} className="text-center py-3 px-4">
                      <div className="text-lg text-white font-semibold">{tool.name}</div>
                      <div className="text-xs text-on-surface/40 mt-1">{tool.tagline}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4 text-on-surface/40">价格</td>
                  {selected.map((t) => <td key={t.id} className="py-3 px-4 text-center text-on-surface/70">{t.priceNote}</td>)}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4 text-on-surface/40">评分</td>
                  {selected.map((t) => <td key={t.id} className="py-3 px-4 text-center text-atmospheric font-bold">{t.rating}/5</td>)}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4 text-on-surface/40">中文支持</td>
                  {selected.map((t) => <td key={t.id} className="py-3 px-4 text-center">{t.chineseSupport ? "✓" : "✗"}</td>)}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4 text-on-surface/40">难度</td>
                  {selected.map((t) => <td key={t.id} className="py-3 px-4 text-center text-on-surface/70">{{ beginner: "新手", intermediate: "进阶", advanced: "高阶" }[t.skillLevel]}</td>)}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4 text-on-surface/40">平台</td>
                  {selected.map((t) => <td key={t.id} className="py-3 px-4 text-center text-on-surface/70 text-xs">{t.platforms.join(" / ")}</td>)}
                </tr>
                {COMPARE_DIMS.map((dim) => (
                  <tr key={dim.key} className="border-t border-white/5">
                    <td className="py-3 px-4 text-on-surface/40">{dim.label}</td>
                    {selected.map((t) => {
                      const val = t.scoreProfile[dim.key];
                      const isMax = val === Math.max(...selected.map((s) => s.scoreProfile[dim.key]));
                      return (
                        <td key={t.id} className="py-3 px-4 text-center">
                          <span className={isMax ? "text-atmospheric font-bold" : "text-on-surface/50"}>{val}/10</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4 text-on-surface/40">编辑点评</td>
                  {selected.map((t) => <td key={t.id} className="py-3 px-4 text-center text-xs text-on-surface/50 italic">{t.realTalk ?? "-"}</td>)}
                </tr>
                <tr className="border-t border-white/5">
                  <td className="py-3 px-4"></td>
                  {selected.map((t) => (
                    <td key={t.id} className="py-3 px-4 text-center">
                      <Link href={`/tool/${t.slug}`} className="text-xs text-atmospheric hover:text-white transition-colors inline-flex items-center gap-1">
                        查看详情 <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
