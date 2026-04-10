"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "motion/react";
import { RotateCcw, Sparkles, ExternalLink, Workflow, Crown, ArrowRight, MessageSquare } from "lucide-react";
import { getRecommendations, type RecommendAnswers } from "@/lib/recommendationEngine";
import { getToolById } from "@/data/tools";
import { useI18n } from "@/lib/i18n";

const ANSWER_LABELS: Record<string, Record<string, string>> = {
  category: { image: "AI 绘画", video: "AI 视频", writing: "AI 写作", coding: "AI 编程", music: "AI 音乐", webdev: "AI 建站", prompt: "提示词" },
  userType: { creator: "内容创作者", marketer: "营销人员", developer: "开发者", designer: "设计师", student: "学生", business: "企业用户" },
  budget: { free: "只用免费", low: "少量付费", medium: "中等预算", high: "不差钱" },
  priority: { ease: "简单易用", quality: "输出质量", chinese: "中文支持", cost: "性价比" },
};

const WORKFLOWS: Record<string, { title: string; steps: string[] }> = {
  image: { title: "AI 绘画创作流程", steps: ["用 Midjourney / Leonardo 生成初稿", "用 Canva 排版加文字", "用 Remove.bg 抠图合成"] },
  video: { title: "AI 视频创作流程", steps: ["用 Runway / Kling 生成素材", "用 CapCut 剪辑加字幕", "用 ElevenLabs 配音旁白"] },
  writing: { title: "AI 写作工作流", steps: ["用 ChatGPT / Claude 生成初稿", "用 DeepL 翻译多语言版本", "用 Grammarly 润色英文"] },
  coding: { title: "AI 编程工作流", steps: ["用 Cursor 编写核心代码", "用 GitHub Copilot 补全细节", "用 v0 生成前端 UI"] },
  music: { title: "AI 音乐创作流程", steps: ["用 Suno / Udio 生成歌曲", "用 AIVA 制作配乐", "用 ElevenLabs 生成配音"] },
  webdev: { title: "AI 建站工作流", steps: ["用 v0 / Bolt 搭建原型", "用 Framer 设计页面", "用 Webflow 发布上线"] },
  prompt: { title: "提示词优化流程", steps: ["在 PromptHero 找灵感参考", "用 PromptPerfect 自动优化", "在 FlowGPT 分享迭代"] },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const answers: RecommendAnswers = {
    category: searchParams.get("category") ?? undefined,
    userType: searchParams.get("userType") ?? undefined,
    budget: searchParams.get("budget") ?? undefined,
    priority: searchParams.get("priority") ?? undefined,
    requirements: searchParams.get("requirements")?.split(",").filter(Boolean),
  };

  const results = getRecommendations(answers);
  const topResults = results.slice(0, 5);
  const firstPick = topResults[0];
  const firstTool = firstPick ? getToolById(firstPick.toolId) : null;
  const restResults = topResults.slice(1);

  // Build user summary
  const summaryParts: string[] = [];
  if (answers.category) summaryParts.push(ANSWER_LABELS.category[answers.category] ?? answers.category);
  if (answers.userType) summaryParts.push(ANSWER_LABELS.userType[answers.userType] ?? answers.userType);
  if (answers.budget) summaryParts.push(ANSWER_LABELS.budget[answers.budget] ?? answers.budget);
  if (answers.priority) summaryParts.push(ANSWER_LABELS.priority[answers.priority] ?? answers.priority);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-atmospheric/10 text-atmospheric text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> {t("rec.result")}
        </div>
        <h1 className="text-4xl md:text-5xl text-white mb-4">{t("rec.resultTitle")}</h1>
      </div>

      {/* User needs summary */}
      {summaryParts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <span className="text-sm text-on-surface/30">{t("rec.yourNeeds")}</span>
          {summaryParts.map((part) => (
            <span key={part} className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-on-surface/60">{part}</span>
          ))}
        </motion.div>
      )}

      {topResults.length > 0 ? (
        <div className="space-y-6">
          {/* First pick — hero card */}
          {firstTool && firstPick && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl liquid-glass-strong border border-atmospheric/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-atmospheric" />
                <span className="text-sm font-semibold text-atmospheric">{t("rec.bestPick")}</span>
                <span className="text-xs text-on-surface/30 ml-auto">{t("rec.match")} {firstPick.score}%</span>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-atmospheric/20 flex items-center justify-center text-atmospheric font-bold text-xl shrink-0">
                  {firstTool.logoText}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl text-white mb-1">{firstTool.name}</h2>
                  <p className="text-sm text-on-surface/50 mb-4">{firstTool.tagline}</p>

                  {/* Structured reasons */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {firstPick.matchReasons.slice(0, 6).map((reason) => (
                      <span key={reason} className="text-xs text-atmospheric bg-atmospheric/10 border border-atmospheric/20 px-2.5 py-1 rounded-full">
                        {reason}
                      </span>
                    ))}
                  </div>

                  {/* Suitable / not suitable */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-sm">
                    <div>
                      <p className="text-on-surface/30 text-xs mb-1">{t("rec.suitable")}</p>
                      <p className="text-on-surface/60">{firstTool.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-on-surface/30 text-xs mb-1">{t("rec.limitation")}</p>
                      <p className="text-on-surface/60">{firstTool.cons[0]}</p>
                    </div>
                  </div>

                  {firstTool.realTalk && (
                    <p className="text-xs text-on-surface/40 italic mb-5">&ldquo;{firstTool.realTalk}&rdquo;</p>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/tool/${firstTool.slug}`}
                      className="px-5 py-2.5 rounded-xl bg-atmospheric text-surface text-sm font-bold hover:scale-[1.02] transition-all"
                    >
                      {t("tool.details")}
                    </Link>
                    <a
                      href={firstTool.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-all"
                    >
                      {t("rec.visitSite")} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Rest of top 5 */}
          {restResults.length > 0 && (
            <div>
              <h3 className="text-lg text-on-surface/40 mb-4">{t("rec.others")}</h3>
              <div className="space-y-3">
                {restResults.map((result, index) => {
                  const tool = getToolById(result.toolId);
                  if (!tool) return null;
                  return (
                    <motion.div
                      key={result.toolId}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                      className="p-5 rounded-2xl liquid-glass ghost-border"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-on-surface/50 font-bold shrink-0">
                          {tool.logoText}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="text-lg text-white">{tool.name}</h4>
                            <span className="text-xs text-on-surface/30">{result.score}%</span>
                          </div>
                          <p className="text-sm text-on-surface/50 mb-2">{tool.tagline}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {result.matchReasons.slice(0, 4).map((reason) => (
                              <span key={reason} className="text-[10px] text-atmospheric/80 bg-atmospheric/10 px-2 py-0.5 rounded">
                                {reason}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <Link href={`/tool/${tool.slug}`} className="text-sm text-white hover:text-atmospheric transition-colors flex items-center gap-1">
                              {t("tool.details")} <ArrowRight className="w-3 h-3" />
                            </Link>
                            <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-on-surface/40 hover:text-white transition-colors">
                              {t("rec.site")} <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Workflow */}
          {answers.category && WORKFLOWS[answers.category] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl liquid-glass border border-white/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Workflow className="w-4 h-4 text-atmospheric" />
                <h3 className="text-sm font-semibold text-white">{WORKFLOWS[answers.category].title}</h3>
              </div>
              <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-3">
                {WORKFLOWS[answers.category].steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="hidden sm:inline text-atmospheric/30">&rarr;</span>}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="w-5 h-5 rounded-full bg-atmospheric/20 flex items-center justify-center text-[10px] text-atmospheric font-bold shrink-0">{i + 1}</span>
                      <span className="text-xs text-on-surface/60">{step}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-on-surface/40">{t("rec.noResults")}</p>
          <p className="text-sm text-on-surface/20 mt-2">{t("rec.adjustFilters")}</p>
        </div>
      )}

      {/* Bottom actions */}
      <div className="flex flex-wrap gap-6 justify-center mt-12">
        <Link href="/recommend" className="flex items-center gap-2 text-on-surface/40 hover:text-white transition-colors text-sm">
          <RotateCcw className="w-4 h-4" /> {t("rec.retry")}
        </Link>
        <Link href="/categories" className="text-sm text-atmospheric hover:text-white transition-colors">
          {t("rec.browseAll")}
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-on-surface/40 hover:text-white transition-colors">
          <MessageSquare className="w-4 h-4" /> {t("rec.askAI")}
        </Link>
      </div>
    </div>
  );
}

export default function RecommendResultPage() {
  const { t } = useI18n();
  return (
    <Suspense fallback={<div className="text-center py-20 text-on-surface/40">{t("fav.loading")}</div>}>
      <ResultContent />
    </Suspense>
  );
}
