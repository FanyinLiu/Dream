"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface ToolResult {
  type: "image" | "text" | "recommend";
  data: Record<string, unknown>;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  toolResults?: ToolResult[];
}

const SUGGESTIONS = [
  "帮我画一张赛博朋克城市",
  "推荐一个 AI 视频工具",
  "帮我写一段产品文案",
];

const categoryLabels: Record<string, string> = {
  image: "AI 绘画", video: "AI 视频", writing: "AI 写作",
  coding: "AI 编程", music: "AI 音乐", webdev: "AI 建站", prompt: "提示词",
};

export function Chatbox() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide on homepage (Hero already has chat) and chat page
  if (pathname === "/" || pathname === "/chat") return null;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

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
        {
          role: "assistant",
          content: data.reply,
          toolResults: data.toolResults,
        },
      ]);
    } catch (e: unknown) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `抱歉，出错了：${e instanceof Error ? e.message : "请重试"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-96 h-[540px] liquid-glass-strong rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-atmospheric/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-atmospheric" />
                </div>
                <span className="font-medium text-white text-sm">AI 助手</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/chat"
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] text-on-surface/30 hover:text-atmospheric transition-colors px-2 py-1 rounded-full border border-white/10 hover:border-atmospheric/30"
                >
                  全屏
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-on-surface/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
              {messages.length === 0 && (
                <div className="text-center pt-8">
                  <div className="w-12 h-12 rounded-full bg-atmospheric/10 flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-6 h-6 text-atmospheric" />
                  </div>
                  <p className="text-sm text-on-surface/40 mb-4">你好！我是 AI 助手，可以帮你生图、写作、推荐工具。</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSend(s)}
                        className="text-left px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-on-surface/60 hover:bg-atmospheric/10 hover:border-atmospheric/30 hover:text-white transition-all"
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
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-atmospheric text-surface font-medium"
                        : "bg-white/5 text-on-surface/80 border border-white/10"
                    }`}>
                      {msg.role === "user" ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <div className="prose-sm prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.toolResults?.map((result, j) => (
                    <div key={j} className="mt-2">
                      <MiniToolResult result={result} />
                    </div>
                  ))}
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 px-4 py-2.5 rounded-2xl border border-white/10">
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
            <div className="p-3 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="输入你的问题..."
                  className="w-full bg-surface/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/50 transition-colors"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-atmospheric/20 flex items-center justify-center text-atmospheric hover:bg-atmospheric/30 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-atmospheric text-surface flex items-center justify-center shadow-lg shadow-atmospheric/20 hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}

function MiniToolResult({ result }: { result: ToolResult }) {
  if (result.type === "image" && result.data.success) {
    return (
      <div className="rounded-xl overflow-hidden max-w-[200px]">
        <img src={result.data.url as string} alt="AI generated" className="w-full rounded-lg" />
        <a href={result.data.url as string} target="_blank" rel="noopener noreferrer"
          className="block mt-1 text-[10px] text-atmospheric hover:text-white transition-colors">
          查看大图 ↗
        </a>
      </div>
    );
  }

  if (result.type === "text" && result.data.success) {
    return (
      <div className="bg-white/5 rounded-xl p-3 border border-white/10 max-w-[80%]">
        <div className="text-xs text-on-surface/60 leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto">
          {result.data.text as string}
        </div>
      </div>
    );
  }

  if (result.type === "recommend" && result.data.success) {
    return (
      <div className="bg-white/5 rounded-xl p-3 border border-white/10 inline-block">
        <Link href={`/category/${result.data.category}`}
          className="text-xs text-atmospheric hover:text-white transition-colors">
          查看 {categoryLabels[result.data.category as string] ?? "工具"} →
        </Link>
      </div>
    );
  }

  return null;
}
