"use client";

import { cn } from "@/lib/utils";
import type { RecommendQuestion } from "@/types/tool";
import { QuestionOption } from "./QuestionOption";

interface QuestionStepProps {
  question: RecommendQuestion;
  currentStep: number;
  totalSteps: number;
  selectedValues: string[];
  onSelect: (value: string) => void;
  className?: string;
}

export function QuestionStep({
  question, currentStep, totalSteps, selectedValues, onSelect, className,
}: QuestionStepProps) {
  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted mb-2">
          <span>第 {currentStep} / {totalSteps} 步</span>
          <span className="text-accent">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-surface-high rounded-full h-1.5">
          <div
            className="bg-accent h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="font-serif italic text-3xl text-foreground mb-8">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <QuestionOption
            key={option.value}
            option={option}
            selected={selectedValues.includes(option.value)}
            onSelect={() => onSelect(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
