"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getRecommendations, type RecommendAnswers } from "@/lib/recommendationEngine";
import { getToolById } from "@/data/tools";
import { RecommendationCard, RecommendationSummary } from "@/components/recommend";
import { EmptyState } from "@/components/common";

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

  const summaryAnswers: Record<string, string | string[]> = {};
  if (answers.category) summaryAnswers.category = answers.category;
  if (answers.userType) summaryAnswers.userType = answers.userType;
  if (answers.budget) summaryAnswers.budget = answers.budget;
  if (answers.priority) summaryAnswers.priority = answers.priority;
  if (answers.requirements?.length) summaryAnswers.requirements = answers.requirements;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="font-serif italic text-4xl text-foreground glow-text">推荐结果</h1>
        <p className="text-muted mt-2">根据你的需求，为你精选了以下 AI 工具</p>
      </div>

      <RecommendationSummary answers={summaryAnswers} />

      {topResults.length > 0 ? (
        <div className="space-y-4">
          {topResults.map((result, index) => {
            const tool = getToolById(result.toolId);
            if (!tool) return null;
            return (
              <RecommendationCard key={result.toolId} tool={tool} score={result.score} matchReasons={result.matchReasons} rank={index + 1} />
            );
          })}
        </div>
      ) : (
        <EmptyState title="暂无匹配结果" description="抱歉，没有找到完全匹配的工具。试试调整你的选择条件。" />
      )}

      <div className="text-center mt-10 flex gap-6 justify-center">
        <Link href="/recommend" className="text-sm text-accent hover:text-foreground font-medium transition-colors">← 重新选择</Link>
        <Link href="/categories" className="text-sm text-muted hover:text-foreground transition-colors">浏览全部分类</Link>
      </div>
    </div>
  );
}

export default function RecommendResultPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-muted">加载中...</div>}>
      <ResultContent />
    </Suspense>
  );
}
