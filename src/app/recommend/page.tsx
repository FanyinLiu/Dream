"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { recommendQuestions } from "@/data/recommendQuestions";
import { QuestionStep } from "@/components/recommend";

export default function RecommendPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const question = recommendQuestions[currentStep];
  const isLastStep = currentStep === recommendQuestions.length - 1;

  const currentValue = answers[question.id];
  const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];

  function handleSelect(value: string) {
    if (question.type === "multi") {
      const current = (answers[question.id] as string[]) ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setAnswers({ ...answers, [question.id]: next });
    } else {
      setAnswers({ ...answers, [question.id]: value });
      if (!isLastStep) {
        setTimeout(() => setCurrentStep((s) => s + 1), 300);
      }
    }
  }

  function handleNext() {
    if (isLastStep) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(answers)) {
        params.set(key, Array.isArray(value) ? value.join(",") : value);
      }
      router.push(`/recommend/result?${params.toString()}`);
    } else {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  }

  const canProceed = question.type === "multi" ? true : !!answers[question.id];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="font-serif italic text-4xl text-foreground glow-text">智能推荐</h1>
        <p className="text-muted mt-2">回答几个简单问题，帮你找到最合适的 AI 工具</p>
      </div>

      <QuestionStep
        question={question}
        currentStep={currentStep + 1}
        totalSteps={recommendQuestions.length}
        selectedValues={selectedValues}
        onSelect={handleSelect}
      />

      <div className="max-w-2xl mx-auto mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="text-sm text-muted hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          ← 上一步
        </button>

        {(question.type === "multi" || isLastStep) && (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className="glass-strong px-6 py-2 rounded-full text-sm font-semibold text-accent hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLastStep ? "查看推荐结果" : "下一步 →"}
          </button>
        )}
      </div>
    </div>
  );
}
