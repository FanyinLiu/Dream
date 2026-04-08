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
      className={cn(
        "group bg-white rounded-xl border border-gray-200 p-6",
        "hover:shadow-lg hover:border-blue-300 transition-all",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{category.icon}</span>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{category.description}</p>
          {toolCount !== undefined && (
            <p className="text-xs text-gray-400 mt-1">{toolCount} 款工具</p>
          )}
        </div>
      </div>
    </Link>
  );
}
