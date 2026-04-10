"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Tool } from "@/types/tool";
import { useI18n } from "@/lib/i18n";

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

function PricingBadge({ priceType }: { priceType: Tool["priceType"] }) {
  return (
    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-on-surface/40">
      {priceType === "free" ? "Free" : priceType === "freemium" ? "Freemium" : "Paid"}
    </div>
  );
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative rounded-2xl p-6 flex flex-col h-full liquid-glass ghost-border hover:shadow-[0_0_30px_-6px_rgba(172,202,233,0.12)] transition-all duration-500 ${className || ""}`}
    >
      {/* Hover gradient glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-atmospheric/0 to-atmospheric/0 group-hover:from-atmospheric/[0.08] group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-atmospheric/10 transition-colors">
          <span className="text-on-surface/60 group-hover:text-atmospheric transition-colors text-lg font-bold">
            {tool.logoText}
          </span>
        </div>
        <PricingBadge priceType={tool.priceType} />
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-2xl text-white">{tool.name}</h3>
        </div>
        <p className="text-sm text-atmospheric/80 mb-1">{tool.tagline}</p>
        <p className="text-sm text-on-surface/60 font-light leading-relaxed mb-6 line-clamp-2">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {tool.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[10px] text-on-surface/30 px-2 py-1 rounded-md bg-white/5">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-3 relative z-10">
        <Link
          href={`/tool/${tool.slug}`}
          className="w-full py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-white/10 transition-all"
        >
          {t("toolcard.details")} <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href={tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-atmospheric text-surface flex items-center justify-center gap-2 text-sm font-bold hover:scale-[1.02] transition-all"
        >
          {t("toolcard.visitSite")} <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}
