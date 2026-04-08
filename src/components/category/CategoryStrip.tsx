import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/tool";

interface CategoryStripProps {
  categories: Category[];
  activeCategoryId?: string;
  className?: string;
}

export function CategoryStrip({ categories, activeCategoryId, className }: CategoryStripProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
            cat.id === activeCategoryId
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600",
          )}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}
