"use client";

import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-4xl md:text-5xl text-white mb-8">{t("about.title")}</h1>

      <div className="space-y-6">
        <div className="p-8 rounded-3xl liquid-glass border border-white/5">
          <h2 className="text-xs uppercase tracking-widest text-atmospheric mb-4 font-semibold">
            {t("about.whoTitle")}
          </h2>
          <p className="text-on-surface/60 leading-relaxed">
            {t("about.whoP1")}
          </p>
          <p className="text-on-surface/60 leading-relaxed mt-3">
            {t("about.whoP2")}
          </p>
        </div>

        <div className="p-8 rounded-3xl liquid-glass border border-white/5">
          <h2 className="text-xs uppercase tracking-widest text-atmospheric mb-4 font-semibold">
            {t("about.howTitle")}
          </h2>
          <ul className="space-y-3 text-on-surface/60">
            <li><strong className="text-white">{t("about.howHands")}</strong>{t("about.howHandsDesc")}</li>
            <li><strong className="text-white">{t("about.howHonest")}</strong>{t("about.howHonestDesc")}</li>
            <li><strong className="text-white">{t("about.howUpdated")}</strong>{t("about.howUpdatedDesc")}</li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl liquid-glass border border-white/5">
          <h2 className="text-xs uppercase tracking-widest text-atmospheric mb-4 font-semibold">
            {t("about.contactTitle")}
          </h2>
          <p className="text-on-surface/60 leading-relaxed">
            {t("about.contactP1")}
          </p>
          <p className="text-on-surface/60 leading-relaxed mt-2">
            {t("about.contactP2")}
          </p>
        </div>
      </div>
    </div>
  );
}
