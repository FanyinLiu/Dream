"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { tools, getToolBySlug, getToolById, getAlternativeTools } from "@/data/tools";
import { getCategoryById } from "@/data/categories";
import { ToolCard } from "@/components/tool";
import { useI18n } from "@/lib/i18n";

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useI18n();
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategoryById(tool.categories[0]);
  const alternatives = getAlternativeTools(tool);

  const skillLabels: Record<string, string> = {
    beginner: t("tool.skillBeginner"),
    intermediate: t("tool.skillIntermediate"),
    advanced: t("tool.skillAdvanced"),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.officialUrl,
    applicationCategory: "AI Tool",
    operatingSystem: tool.platforms.join(", "),
    offers: {
      "@type": "Offer",
      price: tool.priceType === "free" ? "0" : undefined,
      priceCurrency: "USD",
      description: tool.priceNote,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <main className="pt-8 pb-20 px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-on-surface/40 hover:text-white mb-12 transition-colors text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
          </svg>
          {t("tool.backHome")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-atmospheric/10 text-atmospheric text-xs font-medium uppercase tracking-widest">
                {category?.name || tool.categories[0]}
              </span>
              <span className="text-on-surface/20">·</span>
              <span className="text-on-surface/40 text-sm">{tool.priceNote}</span>
            </div>

            <h1 className="text-6xl md:text-7xl text-white mb-8">{tool.name}</h1>
            <p className="text-xl text-on-surface/60 font-light leading-relaxed mb-12">
              {tool.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Key Features */}
              <div className="p-8 rounded-3xl liquid-glass border border-white/5">
                <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-atmospheric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  {t("tool.advantages")}
                </h3>
                <ul className="space-y-4">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-center gap-3 text-on-surface/60 text-sm">
                      <svg className="w-4 h-4 text-atmospheric/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
                      </svg>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info */}
              <div className="p-8 rounded-3xl liquid-glass border border-white/5">
                <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-atmospheric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                  {t("tool.info")}
                </h3>
                <div className="space-y-3 text-sm">
                  <InfoRow label={t("tool.chineseSupport")} value={tool.chineseSupport ? t("tool.supported") : t("tool.notSupported")} />
                  <InfoRow label={t("tool.difficulty")} value={skillLabels[tool.skillLevel]} />
                  <InfoRow label={t("tool.platforms")} value={tool.platforms.join(" / ")} />
                  <InfoRow label={t("tool.rating")} value={`${tool.rating} / 5`} />
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-12">
              <h3 className="text-2xl text-white mb-4">{t("tool.useCases")}</h3>
              <p className="text-on-surface/60 mb-4"><span className="text-atmospheric">{tool.bestFor}</span></p>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map((uc) => (
                  <span key={uc} className="text-sm bg-atmospheric/10 text-atmospheric border border-atmospheric/20 px-3 py-1 rounded-full">
                    {uc}
                  </span>
                ))}
              </div>
            </div>

            {/* Score */}
            <div className="p-8 rounded-3xl liquid-glass border border-white/5 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl text-white">{t("tool.scores")}</h3>
                <span className="text-[10px] text-on-surface/20">{t("tool.scoresNote")}</span>
              </div>
              {tool.lastUpdated && (
                <p className="text-[10px] text-on-surface/20 mb-4">{t("tool.lastUpdated")}: {tool.lastUpdated}</p>
              )}
              <div className="space-y-4">
                {[
                  { label: t("tool.ease"), value: tool.scoreProfile.easeOfUse },
                  { label: t("tool.quality"), value: tool.scoreProfile.outputQuality },
                  { label: t("tool.cost"), value: tool.scoreProfile.costEfficiency },
                  { label: t("tool.chinese"), value: tool.scoreProfile.chineseFriendly },
                  { label: t("tool.features"), value: tool.scoreProfile.featureRichness },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-sm text-on-surface/40 w-24 shrink-0">{item.label}</span>
                    <div className="flex-1 bg-white/5 rounded-full h-2">
                      <div
                        className="bg-atmospheric h-2 rounded-full transition-all"
                        style={{ width: `${item.value * 10}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-atmospheric w-8 text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Talk */}
            {tool.realTalk && (
              <div className="p-6 rounded-3xl liquid-glass border border-white/5 mb-12">
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none text-atmospheric/40 shrink-0">&ldquo;</span>
                  <p className="text-on-surface/70 text-sm italic leading-relaxed pt-1">{tool.realTalk}</p>
                  <span className="text-2xl leading-none text-atmospheric/40 shrink-0">&rdquo;</span>
                </div>
                <p className="text-[10px] text-on-surface/20 mt-2 text-right">{t("tool.editorReview")}</p>
              </div>
            )}
          </div>

          {/* Right Column: CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-3xl liquid-glass-strong border border-white/10">
              <div className="mb-8">
                <div className="text-xs text-on-surface/40 uppercase tracking-widest mb-2">{t("tool.pricing")}</div>
                <div className="text-3xl text-white font-display font-semibold">{tool.priceNote}</div>
              </div>

              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-atmospheric text-surface font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all mb-4"
              >
                {t("tool.visit")} {tool.name}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="m10 14 11-11" />
                </svg>
              </a>

              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                {t("tool.favorite")}
              </button>

              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-on-surface/30 px-2 py-1 rounded-md bg-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Comparison */}
              {tool.alternatives.length > 0 && (() => {
                const alts = tool.alternatives.slice(0, 3).map(getToolById).filter(Boolean);
                if (alts.length === 0) return null;
                const dims = [
                  { key: "easeOfUse" as const, label: t("tool.ease") },
                  { key: "outputQuality" as const, label: t("tool.quality") },
                  { key: "costEfficiency" as const, label: t("tool.cost") },
                  { key: "chineseFriendly" as const, label: t("tool.chinese") },
                ];
                return (
                  <div className="mt-8 pt-8 border-t border-white/5">
                    <h4 className="text-xs font-semibold text-white mb-4">{t("tool.quickCompare")}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="text-on-surface/30">
                            <th className="text-left pb-2 font-medium"></th>
                            <th className="text-center pb-2 font-medium text-atmospheric">{tool.name}</th>
                            {alts.map(a => (
                              <th key={a!.id} className="text-center pb-2 font-medium">{a!.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-on-surface/50">
                          {dims.map(d => (
                            <tr key={d.key} className="border-t border-white/5">
                              <td className="py-2 text-on-surface/30">{d.label}</td>
                              <td className="py-2 text-center text-atmospheric font-medium">{tool.scoreProfile[d.key]}</td>
                              {alts.map(a => (
                                <td key={a!.id} className="py-2 text-center">{a!.scoreProfile[d.key]}</td>
                              ))}
                            </tr>
                          ))}
                          <tr className="border-t border-white/5">
                            <td className="py-2 text-on-surface/30">{t("compare.price")}</td>
                            <td className="py-2 text-center text-atmospheric font-medium text-[10px]">{tool.priceNote.split("，")[0]}</td>
                            {alts.map(a => (
                              <td key={a!.id} className="py-2 text-center text-[10px]">{a!.priceNote.split("，")[0]}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mt-20 pt-16 border-t border-white/5">
            <h2 className="text-4xl text-white mb-8">{t("tool.alternatives")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {alternatives.map((alt) => (
                <ToolCard key={alt.id} tool={alt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-on-surface/40">{label}</span>
      <span className="text-on-surface/80 font-medium">{value}</span>
    </div>
  );
}
