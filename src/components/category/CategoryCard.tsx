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
      className={cn("group glass-card rounded-xl p-6 block", className)}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{category.icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-muted mt-0.5">{category.description}</p>
          {toolCount !== undefined && (
            <p className="text-xs text-accent-dim mt-1">{toolCount} 款工具</p>
          )}
        </div>
      </div>
    </Link>
  );
}
