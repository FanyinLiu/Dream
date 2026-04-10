"use client";

import { useI18n, type Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LangSwitch() {
  const { locale, setLocale } = useI18n();

  const next: Locale = locale === "en" ? "zh" : "en";
  const label = locale === "en" ? "中文" : "EN";

  return (
    <button
      onClick={() => setLocale(next)}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] text-on-surface/40 hover:text-white transition-colors"
      title={locale === "en" ? "切换到中文" : "Switch to English"}
    >
      <Globe className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
