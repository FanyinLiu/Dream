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
        "w-full text-left p-4 rounded-xl border-2 transition-all",
        selected
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
            selected ? "border-blue-600" : "border-gray-300",
          )}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
        </div>
        <div>
          <p className={cn("font-medium", selected ? "text-blue-900" : "text-gray-900")}>
            {option.label}
          </p>
          {option.description && (
            <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
          )}
        </div>
      </div>
    </button>
  );
}
