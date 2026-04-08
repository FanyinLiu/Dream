"use client";

import { cn } from "@/lib/utils";
import type { RecommendOption } from "@/types/tool";

interface QuestionOptionProps {
  option: RecommendOption;
  selected: boolean;
  onSelect: () => void;
}

export function QuestionOption({ option, selected, onSelect }: QuestionOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left p-4 rounded-xl transition-all",
        selected
          ? "glass-strong text-accent"
          : "glass-card text-foreground",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
            selected ? "border-accent" : "border-muted/40",
          )}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
        </div>
        <div>
          <p className={cn("font-medium", selected ? "text-accent" : "text-foreground")}>
            {option.label}
          </p>
          {option.description && (
            <p className="text-sm text-muted mt-0.5">{option.description}</p>
          )}
        </div>
      </div>
    </button>
  );
}
