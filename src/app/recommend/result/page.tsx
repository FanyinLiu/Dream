"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "motion/react";
import { RotateCcw, Sparkles, ExternalLink } from "lucide-react";
import { getRecommendations, type RecommendAnswers } from "@/lib/recommendationEngine";
import { getToolById } from "@/data/tools";

function ResultContent() {
  const searchParams = useSearchParams();

  const answers: RecommendAnswers = {
    category: searchParams.get("category") ?? undefined,
    userType: searchParams.get("userType") ?? undefined,
    budget: searchParams.get("budget") ?? undefined,
    priority: searchParams.get("priority") ?? undefined,
    requirements: searchParams.get("requirements")?.split(",").filter(Boolean),
  };

  const results = getRecommendations(answers);
  const topResults = results.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-atmospheric/10 text-atmospheric text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> 推荐结果
        </div>
        <h1 className="text-4xl md:text-5xl text-white mb-4">为你精选的工具</h1>
        <p className="text-on-surface/40 font-light">根据你的需求，为你推荐以下 AI 工具</p>
      </div>

      {topResults.length > 0 ? (
        <div className="space-y-4">
          {topResults.map((result, index) => {
            const tool = getToolById(result.toolId);
            if (!tool) return null;
            return (
              <motion.div
                key={result.toolId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl liquid-glass ghost-border"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-atmospheric/20 flex items-center justify-center text-atmospheric font-bold shrink-0">
                    {tool.logoText}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl text-white">{tool.name}</h3>
                      <span className="text-[10px] text-atmospheric uppercase tracking-widest">{tool.categories[0]}</span>
                      <span className="text-xs text-on-surface/30 ml-auto">匹配度 {result.score}%</span>
                    </div>
                    <p className="text-sm text-on-surface/60 mb-3 line-clamp-2">{tool.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {result.matchReasons.map((reason) => (
                        <span key={reason} className="text-[10px] text-atmospheric/80 bg-atmospheric/10 px-2 py-0.5 rounded">
                          {reason}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/tool/${tool.slug}`}
                        className="text-sm text-white hover:text-atmospheric transition-colors"
                      >
                        查看详情 →
                      </Link>
                      <a
                        href={tool.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-on-surface/40 hover:text-white transition-colors"
                      >
                        访问官网 <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-on-surface/40">暂无匹配结果</p>
          <p className="text-sm text-on-surface/20 mt-2">抱歉，没有找到完全匹配的工具。试试调整你的选择条件。</p>
        </div>
      )}

      <div className="text-center mt-12 flex gap-6 justify-center">
        <Link
          href="/recommend"
          className="flex items-center gap-2 text-on-surface/40 hover:text-white transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" /> 重新选择
        </Link>
        <Link
          href="/categories"
          className="text-sm text-atmospheric hover:text-white transition-colors"
        >
          浏览全部分类
        </Link>
      </div>
    </div>
  );
}

export default function RecommendResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-on-surface/40">加载中...</div>}>
      <ResultContent />
    </Suspense>
  );
}
