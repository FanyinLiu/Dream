"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, X, Sparkles, ExternalLink } from "lucide-react";
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

const SUGGESTIONS = [
  "帮我画一张赛博朋克风格的城市",
  "推荐一个 AI 视频生成工具",
  "帮我写一段产品介绍文案",
  "哪个编程工具最适合新手？",
];

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

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
        body: JSON.stringify({ messages: apiMessages }),
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

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl px-4"
          >
            <div className="liquid-glass-strong rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[70vh] max-h-[600px]">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-atmospheric/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-atmospheric" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">AI Nav Copilot</span>
                    <p className="text-[10px] text-on-surface/30">生图 · 写作 · 工具推荐</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-on-surface/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.length === 0 && (
                  <div className="pt-6">
                    <p className="text-on-surface/40 text-sm mb-6 text-center">
                      你好！我可以帮你生成图片、写作内容，或推荐最适合你的 AI 工具。
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSend(s)}
                          className="text-left px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-on-surface/60 hover:bg-atmospheric/10 hover:border-atmospheric/30 hover:text-white transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i}>
                    <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-atmospheric/20 flex items-center justify-center mr-2 mt-1 shrink-0">
                          <Sparkles className="w-3.5 h-3.5 text-atmospheric" />
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
                      <div key={j} className="mt-2 ml-9">
                        <InlineToolResult result={result} onClose={onClose} />
                      </div>
                    ))}
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start">
                    <div className="w-7 h-7 rounded-full bg-atmospheric/20 flex items-center justify-center mr-2 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-atmospheric" />
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

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="问我任何关于 AI 工具的问题..."
                    className="w-full bg-surface/50 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/50 transition-colors"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-atmospheric/20 flex items-center justify-center text-atmospheric hover:bg-atmospheric/30 transition-colors disabled:opacity-30"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-on-surface/20 text-center mt-2">
                  Enter 发送 · ESC 关闭 · 支持生图、写作、工具推荐
                </p>
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
        <div className="flex items-center gap-3 mt-2">
          <a href={result.data.url as string} target="_blank" rel="noopener noreferrer"
            className="text-xs text-atmospheric hover:text-white transition-colors">
            下载原图 ↗
          </a>
        </div>
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
