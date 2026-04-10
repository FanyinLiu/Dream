"use client";

import { useState } from "react";
import Link from "next/link";
import { Image, PenTool, Music, Video, ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const WRITING_TEMPLATES = [
  { label: "小红书文案", prompt: "帮我写一篇小红书风格的种草文案，主题是：", placeholder: "输入产品或主题，如：夏日防晒霜推荐" },
  { label: "公众号文章", prompt: "帮我写一篇微信公众号文章，主题是：", placeholder: "输入文章主题，如：AI 如何改变设计行业" },
  { label: "工作周报", prompt: "帮我写一份工作周报，本周完成的工作包括：", placeholder: "列出本周完成的主要工作" },
  { label: "产品描述", prompt: "帮我写一段吸引人的产品描述：", placeholder: "输入产品名称和特点" },
  { label: "英文邮件", prompt: "帮我写一封英文商务邮件：", placeholder: "输入邮件目的和关键信息" },
  { label: "自由写作", prompt: "", placeholder: "输入你的写作需求..." },
];

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState("text");
  const { t } = useI18n();

  const tabs = [
    { id: "text", label: t("create.writingTab"), Icon: PenTool },
    { id: "image", label: t("create.imageTab"), Icon: Image },
    { id: "music", label: t("create.musicTab"), Icon: Music },
    { id: "video", label: t("create.videoTab"), Icon: Video },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-white mb-4">{t("create.title")}</h1>
        <p className="text-on-surface/40 font-light">{t("create.subtitle")}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all ${
              activeTab === tab.id
                ? "liquid-glass-strong text-atmospheric font-semibold"
                : "liquid-glass text-on-surface/60 hover:text-white"
            }`}
          >
            <tab.Icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "text" && <TextGenerator />}
      {activeTab === "image" && <ToolGuide category="image" titleKey="create.imageTab" tools={IMAGE_TOOLS} />}
      {activeTab === "music" && <ToolGuide category="music" titleKey="create.musicTab" tools={MUSIC_TOOLS} />}
      {activeTab === "video" && <ToolGuide category="video" titleKey="create.videoTab" tools={VIDEO_TOOLS} />}
    </div>
  );
}

const IMAGE_TOOLS = [
  { name: "Midjourney", slug: "midjourney", desc: "画质天花板，概念设计首选", tag: "最强画质" },
  { name: "Canva", slug: "canva", desc: "零基础出设计图，模板海量", tag: "新手友好" },
  { name: "DALL-E 3", slug: "dall-e", desc: "ChatGPT 内置，自然语言零门槛", tag: "最易上手" },
  { name: "Ideogram", slug: "ideogram", desc: "文字渲染之王，做 Logo 和海报", tag: "文字最强" },
];

const MUSIC_TOOLS = [
  { name: "Suno", slug: "suno", desc: "输入描述生成完整歌曲，含人声", tag: "最火" },
  { name: "Udio", slug: "udio", desc: "音质更细腻，专业音乐人也在用", tag: "音质最好" },
  { name: "ElevenLabs", slug: "elevenlabs", desc: "最逼真的语音合成和声音克隆", tag: "配音首选" },
  { name: "AIVA", slug: "aiva", desc: "影视级配乐作曲，可商用", tag: "专业配乐" },
];

const VIDEO_TOOLS = [
  { name: "Runway", slug: "runway", desc: "AI 视频生成领跑者，质量最高", tag: "最强" },
  { name: "Kling", slug: "kling", desc: "国产高质量视频生成，性价比之王", tag: "性价比" },
  { name: "CapCut", slug: "capcut", desc: "免费 AI 剪辑加字幕，新手必备", tag: "免费" },
  { name: "HeyGen", slug: "heygen", desc: "AI 数字人口播视频，100+ 语言", tag: "数字人" },
];

function ToolGuide({ category, titleKey, tools }: { category: string; titleKey: string; tools: { name: string; slug: string; desc: string; tag: string }[] }) {
  const { t } = useI18n();
  const title = t(titleKey);

  return (
    <div>
      <div className="liquid-glass-strong rounded-3xl p-8 mb-6 text-center">
        <Sparkles className="w-8 h-8 text-atmospheric mx-auto mb-4" />
        <h3 className="text-xl text-white mb-2">{title} {t("create.recommend")}</h3>
        <p className="text-sm text-on-surface/40 mb-1">
          {t("create.curated")}{title}{t("create.curatedSuffix")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tool/${tool.slug}`}
            className="group liquid-glass ghost-border rounded-2xl p-5 block hover:bg-white/[0.08] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg text-white group-hover:text-atmospheric transition-colors">{tool.name}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-atmospheric/10 text-atmospheric">{tool.tag}</span>
            </div>
            <p className="text-sm text-on-surface/50 mb-3">{tool.desc}</p>
            <span className="text-xs text-atmospheric flex items-center gap-1">
              {t("tool.details")} <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href={`/category/${category}`}
          className="inline-flex items-center gap-2 text-sm text-on-surface/40 hover:text-white transition-colors"
        >
          {t("create.viewAllTools")}{title}{t("create.tools")} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function TextGenerator() {
  const { t } = useI18n();
  const [selectedTemplate, setSelectedTemplate] = useState(5); // default to free writing
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const template = WRITING_TEMPLATES[selectedTemplate];

  async function handleGenerate() {
    const content = template.prompt ? `${template.prompt}${userInput}` : userInput;
    if (!content.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: content }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("No response body");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResult((prev) => prev + decoder.decode(value));
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Template selector */}
      <div className="flex flex-wrap gap-2">
        {WRITING_TEMPLATES.map((tmpl, i) => (
          <button
            key={tmpl.label}
            onClick={() => { setSelectedTemplate(i); setUserInput(""); setResult(""); }}
            className={`px-4 py-2 rounded-full text-xs transition-all ${
              selectedTemplate === i
                ? "bg-atmospheric/20 text-atmospheric border border-atmospheric/30"
                : "bg-white/5 text-on-surface/50 border border-white/10 hover:text-white"
            }`}
          >
            {tmpl.label}
          </button>
        ))}
      </div>

      <div className="liquid-glass-strong rounded-3xl p-8">
        {template.prompt && (
          <p className="text-sm text-atmospheric/60 mb-3">{template.prompt}</p>
        )}
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={template.placeholder}
          rows={3}
          className="w-full bg-white/5 text-white rounded-xl border border-white/10 px-4 py-3 text-sm placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/50 resize-none"
        />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !userInput.trim()}
            className="px-6 py-3 rounded-2xl bg-atmospheric text-surface text-sm font-bold hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? t("create.generating") : t("create.generate")}
          </button>
        </div>
      </div>

      {error && (
        <div className="liquid-glass rounded-xl p-4">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="liquid-glass rounded-2xl p-6">
          <div className="text-sm text-on-surface/70 leading-relaxed whitespace-pre-wrap">{result}</div>
          <button
            type="button"
            onClick={handleCopy}
            className="mt-4 flex items-center gap-1.5 text-sm text-atmospheric hover:text-white transition-colors"
          >
            {copied ? <><Check className="w-3.5 h-3.5" /> {t("create.copied")}</> : <><Copy className="w-3.5 h-3.5" /> {t("create.copy")}</>}
          </button>
        </div>
      )}
    </div>
  );
}
