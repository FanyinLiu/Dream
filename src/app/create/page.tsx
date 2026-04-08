"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "image", label: "AI 绘画", icon: "🎨", description: "输入描述，AI 帮你生成图片" },
  { id: "text", label: "AI 写作", icon: "✍️", description: "输入主题或要求，AI 帮你写内容" },
  { id: "music", label: "AI 音乐", icon: "🎵", description: "描述风格和心情，AI 帮你作曲（即将上线）" },
  { id: "video", label: "AI 视频", icon: "🎬", description: "描述画面，AI 帮你生成视频（即将上线）" },
];

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="font-serif italic text-4xl text-foreground glow-text">AI 创作工坊</h1>
        <p className="text-muted mt-2">选择创作类型，输入描述，AI 帮你生成</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm transition-all",
              activeTab === tab.id
                ? "glass-strong text-accent font-semibold"
                : "glass text-muted hover:text-accent",
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "image" && <ImageGenerator />}
      {activeTab === "text" && <TextGenerator />}
      {activeTab === "music" && <ComingSoon icon="🎵" title="AI 音乐生成" description="正在接入 Suno / Udio API，即将上线" />}
      {activeTab === "video" && <ComingSoon icon="🎬" title="AI 视频生成" description="正在接入 Runway / Kling API，即将上线" />}
    </div>
  );
}

// ─── Image Generator ───

function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("1024x1024");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; revisedPrompt?: string } | null>(null);
  const [error, setError] = useState("");

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, size }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "生成失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <label className="block text-xs uppercase tracking-widest text-accent mb-3 font-semibold">
          描述你想生成的图片
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：一只赛博朋克风格的猫坐在霓虹灯下的东京街头，细节丰富，电影质感"
          rows={3}
          className="w-full bg-surface text-foreground rounded-lg border border-border px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/50 resize-none"
        />

        <div className="flex items-center gap-4 mt-4">
          <div>
            <label className="text-xs text-muted mr-2">尺寸</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-surface-high text-foreground text-sm rounded-lg border border-border px-3 py-1.5 focus:outline-none focus:border-accent/50"
            >
              <option value="1024x1024">1:1 方形</option>
              <option value="1792x1024">16:9 横版</option>
              <option value="1024x1792">9:16 竖版</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="ml-auto glass-strong px-6 py-2.5 rounded-full text-sm font-semibold text-accent hover:bg-accent/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "生成中..." : "生成图片"}
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-card rounded-xl p-4 border-red-500/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="glass-card rounded-xl p-6">
          <img
            src={result.url}
            alt={prompt}
            className="w-full rounded-lg mb-4"
          />
          {result.revisedPrompt && (
            <p className="text-xs text-muted">
              <strong className="text-accent">AI 优化后的提示词：</strong>
              {result.revisedPrompt}
            </p>
          )}
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-accent hover:text-foreground transition-colors"
          >
            下载原图 ↗
          </a>
        </div>
      )}
    </div>
  );
}

// ─── Text Generator ───

function TextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("general");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const systemPrompts: Record<string, string> = {
    general: "你是一个专业的写作助手，擅长各种风格的中英文写作。",
    marketing: "你是一个资深营销文案专家，擅长写吸引眼球的广告文案和营销内容。",
    academic: "你是一个学术写作专家，擅长严谨、规范的学术论文和报告写作。",
    creative: "你是一个创意写作大师，擅长故事、诗歌、散文等文学创作。",
    translate: "你是一个专业翻译，请将用户的内容翻译成对应的语言，保持原意和风格。",
  };

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/generate/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemPrompt: systemPrompts[style] }),
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
      setError(e instanceof Error ? e.message : "生成失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <label className="block text-xs uppercase tracking-widest text-accent mb-3 font-semibold">
          输入写作要求
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：帮我写一篇关于 AI 如何改变设计行业的博客文章，800字左右"
          rows={3}
          className="w-full bg-surface text-foreground rounded-lg border border-border px-4 py-3 text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/50 resize-none"
        />

        <div className="flex items-center gap-4 mt-4">
          <div>
            <label className="text-xs text-muted mr-2">风格</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="bg-surface-high text-foreground text-sm rounded-lg border border-border px-3 py-1.5 focus:outline-none focus:border-accent/50"
            >
              <option value="general">通用写作</option>
              <option value="marketing">营销文案</option>
              <option value="academic">学术写作</option>
              <option value="creative">创意文学</option>
              <option value="translate">翻译</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="ml-auto glass-strong px-6 py-2.5 rounded-full text-sm font-semibold text-accent hover:bg-accent/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "生成中..." : "开始写作"}
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-card rounded-xl p-4 border-red-500/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="glass-card rounded-xl p-6">
          <div className="prose prose-invert max-w-none">
            <div className="text-sm text-muted leading-relaxed whitespace-pre-wrap">{result}</div>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-4 text-sm text-accent hover:text-foreground transition-colors"
          >
            复制全文
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Coming Soon ───

function ComingSoon({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center py-20">
      <span className="text-6xl block mb-4">{icon}</span>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted">{description}</p>
      <div className="mt-6 glass-strong inline-block px-6 py-2 rounded-full text-sm text-accent">
        敬请期待
      </div>
    </div>
  );
}
