"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send, X, Sparkles, ChevronDown, Check, Lock,
  PenTool, Compass, Lightbulb, GitCompareArrows, MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface ToolResult {
  type: "image" | "text" | "recommend";
  data: Record<string, unknown>;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  toolResults?: ToolResult[];
}

const categoryLabels: Record<string, string> = {
  image: "AI 绘画", video: "AI 视频", writing: "AI 写作",
  coding: "AI 编程", music: "AI 音乐", webdev: "AI 建站", prompt: "提示词",
};

interface Model {
  id: string;
  name: string;
  icon: string;
  free?: boolean;
}

const MODELS: { tier: string; models: Model[] }[] = [
  {
    tier: "免费模型",
    models: [
      { id: "openai/gpt-4o-mini", name: "GPT-4o mini", icon: "◎", free: true },
      { id: "qwen/qwen3-235b-a22b-2507", name: "Qwen3 235B", icon: "◈", free: true },
      { id: "z-ai/glm-4.5-air:free", name: "GLM-4.5 Air", icon: "◆", free: true },
      { id: "google/gemini-2.0-flash-001", name: "Gemini 2.0 Flash", icon: "◆", free: true },
    ],
  },
  {
    tier: "进阶模型",
    models: [
      { id: "deepseek/deepseek-chat", name: "DeepSeek V3", icon: "◈" },
      { id: "openai/gpt-4.1-mini", name: "GPT-4.1 mini", icon: "◎" },
      { id: "google/gemini-2.5-flash", name: "Gemini 2.5 Flash", icon: "◆" },
      { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku", icon: "Ⓐ" },
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1", icon: "◈" },
    ],
  },
  {
    tier: "旗舰模型",
    models: [
      { id: "openai/gpt-4.1", name: "GPT-4.1", icon: "◎" },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro", icon: "◆" },
      { id: "anthropic/claude-sonnet-4-6", name: "Claude Sonnet 4.6", icon: "Ⓐ" },
    ],
  },
];

const QUICK_ACTIONS = [
  { label: "工具推荐", Icon: Compass, prompt: "根据我的需求推荐合适的AI工具" },
  { label: "工具对比", Icon: GitCompareArrows, prompt: "帮我对比几款热门的AI工具，分析各自优缺点" },
  { label: "AI 写作", Icon: PenTool, prompt: "帮我写一段文案" },
  { label: "创意灵感", Icon: Lightbulb, prompt: "给我一些AI创作的灵感和点子" },
];

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODELS[0].models[0]);
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (modelMenuOpen) {
          setModelMenuOpen(false);
        } else {
          onClose();
        }
      }
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose, modelMenuOpen]);

  // Close model menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target as Node)) {
        setModelMenuOpen(false);
      }
    }
    if (modelMenuOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [modelMenuOpen]);

  async function handleSend(text?: string) {
    const content = text || input.trim();
    if (!content || loading) return;

    setInput("");
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const apiMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, model: selectedModel.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, toolResults: data.toolResults },
      ]);
    } catch (e: unknown) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `抱歉，出错了：${e instanceof Error ? e.message : "请重试"}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const hasMessages = messages.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[8%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl px-4"
          >
            <div className="liquid-glass-strong rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">

              {/* Empty state / Copilot header */}
              {!hasMessages && (
                <div className="pt-10 pb-4 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-atmospheric/10 border border-atmospheric/20 flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7 text-atmospheric" />
                  </div>
                </div>
              )}

              {/* Messages area */}
              {hasMessages && (
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-atmospheric" />
                    <span className="text-sm font-medium text-white">AI Nav Copilot</span>
                  </div>
                  <button onClick={onClose} className="text-on-surface/30 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {hasMessages && (
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 min-h-0">
                  {messages.map((msg, i) => (
                    <div key={i}>
                      <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "assistant" && (
                          <div className="w-6 h-6 rounded-full bg-atmospheric/20 flex items-center justify-center mr-2 mt-1 shrink-0">
                            <Sparkles className="w-3 h-3 text-atmospheric" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                            msg.role === "user"
                              ? "bg-atmospheric text-surface font-medium"
                              : "bg-white/5 text-on-surface/80 border border-white/10"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{msg.content}</div>
                        </div>
                      </div>
                      {msg.toolResults?.map((result, j) => (
                        <div key={j} className="mt-2 ml-8">
                          <InlineToolResult result={result} onClose={onClose} />
                        </div>
                      ))}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-atmospheric/20 flex items-center justify-center mr-2 shrink-0">
                        <Sparkles className="w-3 h-3 text-atmospheric" />
                      </div>
                      <div className="bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-atmospheric/40 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-atmospheric/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-atmospheric/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Input area */}
              <div className={`p-5 ${hasMessages ? "border-t border-white/10 bg-white/[0.02]" : ""}`}>
                <div className="relative bg-white/5 border border-white/10 rounded-2xl focus-within:border-atmospheric/40 transition-colors">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="问我任何问题..."
                    className="w-full bg-transparent py-4 pl-5 pr-12 text-sm text-white placeholder:text-on-surface/30 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-atmospheric/20 flex items-center justify-center text-atmospheric hover:bg-atmospheric/30 transition-colors disabled:opacity-30"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom bar: actions + model selector */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-on-surface/50 hover:text-white hover:border-atmospheric/30 transition-all">
                      <MessageSquare className="w-3 h-3" />
                      对话
                    </button>
                    {QUICK_ACTIONS.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleSend(action.prompt)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-on-surface/50 hover:text-white hover:border-atmospheric/30 transition-all"
                      >
                        <action.Icon className="w-3 h-3" />
                        {action.label}
                      </button>
                    ))}
                  </div>

                  {/* Model selector */}
                  <div ref={modelMenuRef}>
                    <button
                      onClick={() => setModelMenuOpen(!modelMenuOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-on-surface/40 hover:text-white transition-colors"
                    >
                      {selectedModel.name}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {modelMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-full right-0 mb-2 w-80 bg-surface/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl border border-white/15 z-[200]"
                        >
                          <div className="px-4 pt-4 pb-2">
                            <h3 className="text-xs font-semibold text-white">选择模型</h3>
                          </div>
                          <div className="max-h-96 overflow-y-auto px-2 pb-2">
                            {MODELS.map((group) => (
                              <div key={group.tier} className="mb-1">
                                <p className="text-[10px] text-on-surface/30 font-medium px-2 pt-2 pb-1">
                                  {group.tier}
                                </p>
                                {group.models.map((model) => {
                                  const isPaid = !model.free;
                                  return (
                                    <button
                                      key={model.id}
                                      onClick={() => {
                                        setSelectedModel(model);
                                        setModelMenuOpen(false);
                                      }}
                                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
                                    >
                                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[11px] text-on-surface/60 shrink-0">
                                        {model.icon}
                                      </span>
                                      <span className="text-sm text-on-surface/80 group-hover:text-white transition-colors flex-1">
                                        {model.name}
                                      </span>
                                      {isPaid && <Lock className="w-3 h-3 text-on-surface/20 shrink-0" />}
                                      {selectedModel.id === model.id && (
                                        <Check className="w-4 h-4 text-atmospheric shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                          <div className="px-4 py-3 border-t border-white/5">
                            <p className="text-[10px] text-on-surface/30">
                              <Lock className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />
                              标记的模型需要开通会员使用
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InlineToolResult({ result, onClose }: { result: ToolResult; onClose: () => void }) {
  if (result.type === "image" && result.data.success) {
    return (
      <div className="rounded-2xl overflow-hidden inline-block max-w-[280px]">
        <img src={result.data.url as string} alt="AI generated" className="w-full rounded-xl" />
        <a href={result.data.url as string} target="_blank" rel="noopener noreferrer"
          className="block mt-2 text-xs text-atmospheric hover:text-white transition-colors">
          下载原图 ↗
        </a>
      </div>
    );
  }

  if (result.type === "text" && result.data.success) {
    return (
      <div className="bg-white/5 rounded-2xl p-4 border border-white/10 max-w-[90%]">
        <div className="text-sm text-on-surface/60 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
          {result.data.text as string}
        </div>
        <button type="button" onClick={() => navigator.clipboard.writeText(result.data.text as string)}
          className="mt-2 text-xs text-atmospheric hover:text-white transition-colors">
          复制全文
        </button>
      </div>
    );
  }

  if (result.type === "recommend" && result.data.success) {
    return (
      <Link
        href={`/category/${result.data.category}`}
        onClick={onClose}
        className="inline-flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10 text-sm text-atmospheric hover:bg-atmospheric/10 hover:border-atmospheric/30 transition-all"
      >
        查看 {categoryLabels[result.data.category as string] ?? "工具"} →
      </Link>
    );
  }

  return null;
}
