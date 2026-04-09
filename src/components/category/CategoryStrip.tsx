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
    <div className={cn("flex flex-wrap gap-3", className)}>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className={cn(
            "px-5 py-2.5 rounded-full text-sm transition-all",
            cat.id === activeCategoryId
              ? "liquid-glass-strong text-atmospheric font-semibold"
              : "liquid-glass text-on-surface/60 hover:text-white ghost-border",
          )}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}
