import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

function PricingBadge({ priceType }: { priceType: Tool["priceType"] }) {
  const config = {
    free: { className: "bg-green-500/10 text-green-400 border-green-500/20", label: "免费" },
    freemium: { className: "bg-accent/10 text-accent border-accent/20", label: "免费试用" },
    paid: { className: "bg-orange-500/10 text-orange-400 border-orange-500/20", label: "付费" },
  };
  const { className, label } = config[priceType];
  return (
    <span className={cn("text-xs px-2.5 py-0.5 rounded-full border", className)}>
      {label}
    </span>
  );
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={cn("group glass-card rounded-xl p-5 block", className)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xs font-bold">
            {tool.logoText}
          </span>
          <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
            {tool.name}
          </h3>
        </div>
        <PricingBadge priceType={tool.priceType} />
      </div>

      <p className="text-sm text-accent-dim mb-2">{tool.tagline}</p>

      <p className="text-sm text-muted leading-relaxed mb-3 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tool.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-xs bg-surface-high text-muted px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>

      {tool.priceNote && (
        <p className="text-xs text-muted/60">{tool.priceNote}</p>
      )}
    </Link>
  );
}
