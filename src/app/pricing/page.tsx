"use client";

import { Check, Sparkles, Crown } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useMembership } from "@/lib/useMembership";
import { useState } from "react";
import { AuthDialog } from "@/components/common/AuthDialog";

const CHECKOUT_URL = process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL ?? "";

const FREE_FEATURES = [
  "4 个免费 AI 模型",
  "GPT-4o mini / Qwen3 / GLM / Gemini",
  "工具推荐和对比",
  "智能推荐问卷",
  "无限次对话",
];

const PRO_FEATURES = [
  "全部 12 个 AI 模型",
  "GPT-4.1 / Claude Sonnet 4.6 / Gemini 2.5 Pro",
  "DeepSeek R1 深度推理",
  "优先响应速度",
  "收藏和历史记录同步",
  "未来新模型第一时间解锁",
];

export default function PricingPage() {
  const { user } = useAuth();
  const { isPro } = useMembership();
  const [authOpen, setAuthOpen] = useState(false);

  function handleUpgrade() {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    if (!CHECKOUT_URL) {
      alert("支付功能即将上线");
      return;
    }
    // Append user email to checkout URL for Lemonsqueezy
    const url = `${CHECKOUT_URL}?checkout[email]=${encodeURIComponent(user.email ?? "")}&checkout[custom][user_id]=${user.id}`;
    window.open(url, "_blank");
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl text-white mb-4">选择你的计划</h1>
        <p className="text-on-surface/40 font-light">解锁全部 AI 模型，获得更强大的 AI 助手</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free */}
        <div className="rounded-3xl liquid-glass p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-on-surface/40" />
            <h2 className="text-xl text-white">免费版</h2>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">¥0</span>
            <span className="text-on-surface/30 ml-2">永久免费</span>
          </div>
          <ul className="space-y-3 mb-8">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-on-surface/60">
                <Check className="w-4 h-4 text-on-surface/30 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="py-3 rounded-2xl bg-white/5 border border-white/10 text-center text-sm text-on-surface/40">
            当前方案
          </div>
        </div>

        {/* Pro */}
        <div className="rounded-3xl liquid-glass-strong p-8 border border-atmospheric/20">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-atmospheric" />
            <h2 className="text-xl text-white">Pro 会员</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-atmospheric/20 text-atmospheric ml-auto">推荐</span>
          </div>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">¥19.9</span>
            <span className="text-on-surface/30 ml-2">/月</span>
            <p className="text-xs text-atmospheric mt-1">年付 ¥199（省 ¥40）</p>
          </div>
          <ul className="space-y-3 mb-8">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-on-surface/80">
                <Check className="w-4 h-4 text-atmospheric shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          {isPro ? (
            <div className="py-3 rounded-2xl bg-atmospheric/20 text-center text-sm text-atmospheric font-medium">
              当前方案
            </div>
          ) : (
            <button
              onClick={handleUpgrade}
              className="w-full py-3 rounded-2xl bg-atmospheric text-surface font-bold text-sm hover:scale-[1.02] transition-all"
            >
              升级 Pro
            </button>
          )}
        </div>
      </div>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
