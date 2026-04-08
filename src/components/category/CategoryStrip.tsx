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
            "px-4 py-2 rounded-full text-sm transition-all",
            cat.id === activeCategoryId
              ? "glass-strong text-accent font-semibold"
              : "glass text-muted hover:text-accent",
          )}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}
