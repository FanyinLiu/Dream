"use client";

import { Check, Sparkles, Crown } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useMembership } from "@/lib/useMembership";
import { useState } from "react";
import { AuthDialog } from "@/components/common/AuthDialog";
import { useI18n } from "@/lib/i18n";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL ?? "";

const FREE_FEATURE_KEYS = [
  "pricing.freeFeature1",
  "pricing.freeFeature2",
  "pricing.freeFeature3",
  "pricing.freeFeature4",
  "pricing.freeFeature5",
];

const PRO_FEATURE_KEYS = [
  "pricing.proFeature1",
  "pricing.proFeature2",
  "pricing.proFeature3",
  "pricing.proFeature4",
  "pricing.proFeature5",
  "pricing.proFeature6",
];

export default function PricingPage() {
  const { user } = useAuth();
  const { isPro } = useMembership();
  const [authOpen, setAuthOpen] = useState(false);
  const { t } = useI18n();

  function handleUpgrade() {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    if (!CHECKOUT_URL) {
      alert(t("pricing.paymentSoon"));
      return;
    }
    const url = `${CHECKOUT_URL}?checkout[email]=${encodeURIComponent(user.email ?? "")}&checkout[custom][user_id]=${user.id}`;
    window.open(url, "_blank");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl text-white mb-4">{t("pricing.title")}</h1>
        <p className="text-on-surface/40 font-light">{t("pricing.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free */}
        <div className="rounded-3xl liquid-glass p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-on-surface/40" />
            <h2 className="text-xl text-white">{t("pricing.free")}</h2>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">{t("pricing.freePrice")}</span>
            <span className="text-on-surface/30 ml-2">{t("pricing.freeLabel")}</span>
          </div>
          <ul className="space-y-3 mb-8">
            {FREE_FEATURE_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-3 text-sm text-on-surface/60">
                <Check className="w-4 h-4 text-on-surface/30 shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>
          <div className="py-3 rounded-2xl bg-white/5 border border-white/10 text-center text-sm text-on-surface/40">
            {t("pricing.currentPlan")}
          </div>
        </div>

        {/* Pro */}
        <div className="rounded-3xl liquid-glass-strong p-8 border border-atmospheric/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-atmospheric" />
            <h2 className="text-xl text-white">{t("pricing.pro")}</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-atmospheric/20 text-atmospheric ml-auto">{t("pricing.recommended")}</span>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">{t("pricing.proPrice")}</span>
            <span className="text-on-surface/30 ml-2">{t("pricing.proLabel")}</span>
            <p className="text-xs text-atmospheric mt-1">{t("pricing.proYearly")}</p>
          </div>
          <ul className="space-y-3 mb-8">
            {PRO_FEATURE_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-3 text-sm text-on-surface/80">
                <Check className="w-4 h-4 text-atmospheric shrink-0" />
                {t(key)}
              </li>
            ))}
          </ul>
          {isPro ? (
            <div className="py-3 rounded-2xl bg-atmospheric/20 text-center text-sm text-atmospheric font-medium">
              {t("pricing.currentPlan")}
            </div>
          ) : (
            <button
              onClick={handleUpgrade}
              className="w-full py-3 rounded-2xl bg-atmospheric text-surface font-bold text-sm hover:scale-[1.02] transition-all"
            >
              {t("pricing.upgrade")}
            </button>
          )}
        </div>
      </div>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
