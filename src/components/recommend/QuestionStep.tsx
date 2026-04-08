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
  question,
  currentStep,
  totalSteps,
  selectedValues,
  onSelect,
  className,
}: QuestionStepProps) {
  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>
            第 {currentStep} / {totalSteps} 步
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {question.question}
      </h2>

      {/* Options */}
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
