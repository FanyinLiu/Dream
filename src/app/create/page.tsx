"use client";

import { useState } from "react";
import { Image, PenTool, Music, Video } from "lucide-react";

const tabs = [
  { id: "image", label: "AI 绘画", Icon: Image, description: "输入描述，AI 帮你生成图片" },
  { id: "text", label: "AI 写作", Icon: PenTool, description: "输入主题或要求，AI 帮你写内容" },
  { id: "music", label: "AI 音乐", Icon: Music, description: "描述风格和心情，AI 帮你作曲（即将上线）" },
  { id: "video", label: "AI 视频", Icon: Video, description: "描述画面，AI 帮你生成视频（即将上线）" },
];

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState("image");

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-white mb-4">AI 创作工坊</h1>
        <p className="text-on-surface/40 font-light">选择创作类型，输入描述，AI 帮你生成</p>
      </div>

      {/* Tabs */}
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

      {/* Content */}
      {activeTab === "image" && <ImageGenerator />}
      {activeTab === "text" && <TextGenerator />}
      {activeTab === "music" && <ComingSoon Icon={Music} title="AI 音乐生成" description="正在接入 Suno / Udio API，即将上线" />}
      {activeTab === "video" && <ComingSoon Icon={Video} title="AI 视频生成" description="正在接入 Runway / Kling API，即将上线" />}
    </div>
  );
}

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
      <div className="liquid-glass-strong rounded-3xl p-8">
        <label className="block text-xs uppercase tracking-widest text-atmospheric mb-3 font-semibold">
          描述你想生成的图片
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：一只赛博朋克风格的猫坐在霓虹灯下的东京街头，细节丰富，电影质感"
          rows={3}
          className="w-full bg-white/5 text-white rounded-xl border border-white/10 px-4 py-3 text-sm placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/50 resize-none"
        />
        <div className="flex items-center gap-4 mt-4">
          <div>
            <label className="text-xs text-on-surface/40 mr-2">尺寸</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="bg-white/5 text-white text-sm rounded-lg border border-white/10 px-3 py-1.5 focus:outline-none focus:border-atmospheric/50"
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
            className="ml-auto px-6 py-3 rounded-2xl bg-atmospheric text-surface text-sm font-bold hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "生成中..." : "生成图片"}
          </button>
        </div>
      </div>

      {error && (
        <div className="liquid-glass rounded-xl p-4 border-red-500/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="liquid-glass rounded-2xl p-6 border border-white/5">
          <img src={result.url} alt={prompt} className="w-full rounded-xl mb-4" />
          {result.revisedPrompt && (
            <p className="text-xs text-on-surface/40">
              <strong className="text-atmospheric">AI 优化后的提示词：</strong>
              {result.revisedPrompt}
            </p>
          )}
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-sm text-atmospheric hover:text-white transition-colors"
          >
            下载原图 ↗
          </a>
        </div>
      )}
    </div>
  );
}

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
      <div className="liquid-glass-strong rounded-3xl p-8">
        <label className="block text-xs uppercase tracking-widest text-atmospheric mb-3 font-semibold">
          输入写作要求
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="例如：帮我写一篇关于 AI 如何改变设计行业的博客文章，800字左右"
          rows={3}
          className="w-full bg-white/5 text-white rounded-xl border border-white/10 px-4 py-3 text-sm placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/50 resize-none"
        />
        <div className="flex items-center gap-4 mt-4">
          <div>
            <label className="text-xs text-on-surface/40 mr-2">风格</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="bg-white/5 text-white text-sm rounded-lg border border-white/10 px-3 py-1.5 focus:outline-none focus:border-atmospheric/50"
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
            className="ml-auto px-6 py-3 rounded-2xl bg-atmospheric text-surface text-sm font-bold hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "生成中..." : "开始写作"}
          </button>
        </div>
      </div>

      {error && (
        <div className="liquid-glass rounded-xl p-4 border-red-500/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="liquid-glass rounded-2xl p-6 border border-white/5">
          <div className="text-sm text-on-surface/60 leading-relaxed whitespace-pre-wrap">{result}</div>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(result)}
            className="mt-4 text-sm text-atmospheric hover:text-white transition-colors"
          >
            复制全文
          </button>
        </div>
      )}
    </div>
  );
}

function ComingSoon({ Icon, title, description }: { Icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-atmospheric/10 flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-atmospheric" />
      </div>
      <h3 className="text-2xl text-white mb-2">{title}</h3>
      <p className="text-on-surface/40 font-light">{description}</p>
      <div className="mt-6 inline-block px-6 py-2 rounded-full liquid-glass-strong text-sm text-atmospheric">
        敬请期待
      </div>
    </div>
  );
}
