"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { recommendQuestions } from "@/data/recommendQuestions";
import { useI18n } from "@/lib/i18n";

export default function RecommendPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const question = recommendQuestions[currentStep];
  const isLastStep = currentStep === recommendQuestions.length - 1;

  function handleSelect(value: string) {
    if (question.type === "multi") {
      const current = (answers[question.id] as string[]) ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setAnswers({ ...answers, [question.id]: next });
    } else {
      const newAnswers = { ...answers, [question.id]: value };
      setAnswers(newAnswers);
      if (!isLastStep) {
        setTimeout(() => setCurrentStep((s) => s + 1), 300);
      } else {
        const params = new URLSearchParams();
        for (const [key, val] of Object.entries(newAnswers)) {
          params.set(key, Array.isArray(val) ? val.join(",") : val);
        }
        router.push(`/recommend/result?${params.toString()}`);
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

  const selectedValues = (() => {
    const val = answers[question.id];
    return Array.isArray(val) ? val : val ? [val] : [];
  })();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-atmospheric/10 text-atmospheric text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> {t("rec.title")}
        </div>
        <h1 className="text-4xl md:text-5xl text-white mb-4">{t("rec.dontKnow")}</h1>
        <p className="text-on-surface/40 font-light">{t("rec.dontKnowDesc")}</p>
      </div>

      <div className="liquid-glass-strong rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-atmospheric brand-serif text-2xl">
                0{currentStep + 1}
              </span>
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-on-surface/30 text-sm uppercase tracking-widest">
                {t("rec.step")} {currentStep + 1} / {recommendQuestions.length}
              </span>
            </div>

            <h2 className="text-3xl text-white">{question.question}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`group p-6 rounded-2xl text-left transition-all ${
                      isSelected
                        ? "bg-atmospheric/10 border border-atmospheric/30"
                        : "bg-white/5 border border-white/10 hover:bg-atmospheric/10 hover:border-atmospheric/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`text-lg transition-colors ${isSelected ? "text-white" : "text-on-surface/80 group-hover:text-white"}`}>
                          {opt.label}
                        </span>
                        {opt.description && (
                          <p className="text-sm text-on-surface/40 mt-1">{opt.description}</p>
                        )}
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-all ${
                        isSelected
                          ? "text-atmospheric translate-x-0 opacity-100"
                          : "text-on-surface/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-atmospheric"
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="text-sm text-on-surface/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          {t("rec.prev")}
        </button>

        {question.type === "multi" && (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2 rounded-full liquid-glass-strong text-sm font-semibold text-atmospheric hover:bg-white/20 transition-all"
          >
            {isLastStep ? t("rec.viewResults") : t("rec.next")}
          </button>
        )}
      </div>
    </div>
  );
}
