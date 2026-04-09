"use client";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
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
        "group w-full text-left p-5 rounded-2xl transition-all",
        selected
          ? "bg-atmospheric/10 border border-atmospheric/30"
          : "bg-white/5 border border-white/10 hover:bg-atmospheric/10 hover:border-atmospheric/30",
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={cn("font-medium text-lg", selected ? "text-white" : "text-on-surface/80 group-hover:text-white")}>
            {option.label}
          </p>
          {option.description && (
            <p className="text-sm text-on-surface/40 mt-0.5">{option.description}</p>
          )}
        </div>
        <ArrowRight className={cn(
          "w-5 h-5 transition-all",
          selected
            ? "text-atmospheric translate-x-0 opacity-100"
            : "text-on-surface/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-atmospheric",
        )} />
      </div>
    </button>
  );
}
