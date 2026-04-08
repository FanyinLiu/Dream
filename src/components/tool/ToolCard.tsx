import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

function PricingBadge({ priceType }: { priceType: Tool["priceType"] }) {
  const config = {
    free: { className: "bg-green-100 text-green-700", label: "免费" },
    freemium: { className: "bg-blue-100 text-blue-700", label: "免费试用" },
    paid: { className: "bg-orange-100 text-orange-700", label: "付费" },
  };
  const { className, label } = config[priceType];
  return (
    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", className)}>
      {label}
    </span>
  );
}

export function ToolCard({ tool, className }: ToolCardProps) {
  return (
    <Link
      href={`/tool/${tool.slug}`}
      className={cn(
        "group bg-white rounded-xl border border-gray-200 p-5",
        "hover:shadow-lg hover:border-blue-300 transition-all block",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {tool.logoText}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {tool.name}
          </h3>
        </div>
        <PricingBadge priceType={tool.priceType} />
      </div>

      <p className="text-sm text-gray-500 mb-2">{tool.tagline}</p>

      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {tool.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {tool.priceNote && (
        <p className="text-xs text-gray-400">{tool.priceNote}</p>
      )}
    </Link>
  );
}
