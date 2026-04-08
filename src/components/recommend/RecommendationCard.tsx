import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

interface RecommendationCardProps {
  tool: Tool;
  score: number;
  matchReasons: string[];
  rank: number;
  className?: string;
}

export function RecommendationCard({
  tool,
  score,
  matchReasons,
  rank,
  className,
}: RecommendationCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-200 p-6",
        rank === 1 && "ring-2 ring-blue-500 border-blue-200",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
              rank === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600",
            )}
          >
            {rank}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
            <p className="text-sm text-gray-500">{tool.tagline}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{score}</div>
          <div className="text-xs text-gray-400">匹配分</div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-400 mb-2">推荐理由</p>
        <div className="flex flex-wrap gap-1.5">
          {matchReasons.map((reason) => (
            <span
              key={reason}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
            >
              {reason}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/tool/${tool.slug}`}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        查看详情 →
      </Link>
    </div>
  );
}
