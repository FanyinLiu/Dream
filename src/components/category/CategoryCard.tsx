import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/tool";

interface CategoryCardProps {
  category: Category;
  toolCount?: number;
  className?: string;
}

export function CategoryCard({ category, toolCount, className }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.id}`}
      className={cn("group rounded-2xl p-6 block liquid-glass ghost-border", className)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-atmospheric/10 transition-colors text-2xl">
          {category.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-atmospheric transition-colors not-italic">
            {category.name}
          </h3>
          <p className="text-sm text-on-surface/40 mt-0.5">{category.description}</p>
          {toolCount !== undefined && (
            <p className="text-xs text-atmospheric/80 mt-1">{toolCount} 款工具</p>
          )}
        </div>
      </div>
    </Link>
  );
}
