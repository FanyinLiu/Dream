"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  "帮我画一张赛博朋克风格的城市夜景",
  "帮我写一段产品介绍文案",
  "我想做一个短视频，用什么工具好？",
  "帮我设计一个简约风格的 Logo",
  "把这段话翻译成英文：人工智能正在改变世界",
  "帮我写一首关于夏天的诗",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-3xl mx-auto px-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <h1 className="font-serif italic text-4xl text-foreground glow-text mb-3">
              AI 创作助手
            </h1>
            <p className="text-muted mb-8">
              告诉我你想做什么，我来帮你完成
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSend(s)}
                  className="glass px-4 py-2 rounded-full text-sm text-muted hover:text-accent hover:border-accent/30 transition-all text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            {/* Message bubble */}
            <div
              className={cn(
                "flex",
                msg.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                  msg.role === "user"
                    ? "glass-strong text-accent"
                    : "glass text-foreground",
                )}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>

            {/* Tool results */}
            {msg.toolResults?.map((result, j) => (
              <div key={j} className="mt-3 ml-0">
                <ToolResultView result={result} />
              </div>
            ))}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl px-4 py-3 text-sm text-muted">
              <span className="inline-flex gap-1">
                <span className="animate-bounce">·</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>·</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>·</span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="py-4 border-t border-border">
        <div className="glass-strong rounded-2xl flex items-end p-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="描述你想创作的内容..."
            rows={1}
            className="flex-1 bg-transparent text-foreground text-sm px-3 py-2 placeholder:text-muted/40 focus:outline-none resize-none max-h-32"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="shrink-0 bg-accent/20 hover:bg-accent/30 text-accent px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            发送
          </button>
        </div>
        <p className="text-xs text-muted/40 text-center mt-2">
          Enter 发送 · Shift+Enter 换行 · 支持生图、写作、工具推荐
        </p>
      </div>
    </div>
  );
}

const categoryLabels: Record<string, string> = {
  image: "AI 绘画", video: "AI 视频", writing: "AI 写作",
  coding: "AI 编程", music: "AI 音乐", webdev: "AI 建站", prompt: "提示词",
};

function ToolResultView({ result }: { result: ToolResult }) {
  if (result.type === "image" && result.data.success) {
    return (
      <div className="glass-card rounded-xl p-4 max-w-md">
        <img src={result.data.url as string} alt="AI generated" className="w-full rounded-lg" />
        {result.data.revisedPrompt ? (
          <p className="text-xs text-muted mt-2 line-clamp-2">{result.data.revisedPrompt as string}</p>
        ) : null}
        <a href={result.data.url as string} target="_blank" rel="noopener noreferrer"
          className="inline-block mt-2 text-xs text-accent hover:text-foreground transition-colors">
          下载原图 ↗
        </a>
      </div>
    );
  }

  if (result.type === "text" && result.data.success) {
    return (
      <div className="glass-card rounded-xl p-4 max-w-lg">
        <div className="text-sm text-muted leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
          {result.data.text as string}
        </div>
        <button type="button" onClick={() => navigator.clipboard.writeText(result.data.text as string)}
          className="mt-2 text-xs text-accent hover:text-foreground transition-colors">
          复制全文
        </button>
      </div>
    );
  }

  if (result.type === "recommend" && result.data.success) {
    return (
      <div className="glass-card rounded-xl p-4 max-w-sm">
        <p className="text-xs text-accent mb-2">推荐工具</p>
        <Link href={`/category/${result.data.category}`}
          className="text-sm text-foreground hover:text-accent transition-colors">
          查看 {categoryLabels[result.data.category as string] ?? "工具"} →
        </Link>
      </div>
    );
  }

  return null;
}
