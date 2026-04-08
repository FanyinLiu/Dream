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

export function RecommendationCard({ tool, score, matchReasons, rank, className }: RecommendationCardProps) {
  return (
    <div className={cn(
      "glass-card rounded-xl p-6",
      rank === 1 && "glass-strong",
      className,
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
            rank === 1 ? "bg-accent text-background" : "bg-surface-high text-muted",
          )}>
            {rank}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
            <p className="text-sm text-muted">{tool.tagline}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent glow-text">{score}</div>
          <div className="text-xs text-muted">匹配分</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {matchReasons.map((reason) => (
            <span key={reason} className="text-xs bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 rounded-full">
              {reason}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={`/tool/${tool.slug}`}
        className="text-sm font-medium text-accent hover:text-foreground transition-colors"
      >
        查看详情 →
      </Link>
    </div>
  );
}
