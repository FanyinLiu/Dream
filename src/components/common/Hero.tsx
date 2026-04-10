"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Send, Sparkles, ChevronDown, Check, Lock,
  PenTool, Compass, MessageSquare, GitCompareArrows, Lightbulb,
  FileText, ImageIcon, Video, Code, Music,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { MODELS, DEFAULT_MODEL } from "@/lib/models";
import { useMembership } from "@/lib/useMembership";
import { useI18n } from "@/lib/i18n";

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

const SCENE_TEMPLATES = [
  { icon: FileText, labelKey: "hero.scene.report", prompt: "Recommend an AI tool for writing weekly work reports", color: "from-blue-500/20 to-blue-600/5" },
  { icon: ImageIcon, labelKey: "hero.scene.poster", prompt: "I want to make a poster, recommend a good AI design tool", color: "from-pink-500/20 to-pink-600/5" },
  { icon: Video, labelKey: "hero.scene.video", prompt: "I want to auto-edit long videos into short clips, which AI tool should I use?", color: "from-purple-500/20 to-purple-600/5" },
  { icon: Code, labelKey: "hero.scene.code", prompt: "Recommend an AI coding assistant for me", color: "from-green-500/20 to-green-600/5" },
  { icon: Music, labelKey: "hero.scene.music", prompt: "I want to generate a song with AI, what tools are good?", color: "from-orange-500/20 to-orange-600/5" },
  { icon: Compass, labelKey: "hero.scene.website", prompt: "I want to quickly build a website, recommend AI website builders", color: "from-cyan-500/20 to-cyan-600/5" },
];

const QUICK_ACTIONS = [
  { labelKey: "action.recommend", Icon: Compass, prompt: "Recommend AI tools based on my needs" },
  { labelKey: "action.compare", Icon: GitCompareArrows, prompt: "Compare popular AI tools and analyze their pros and cons" },
  { labelKey: "action.writing", Icon: PenTool, prompt: "Help me write some content" },
  { labelKey: "action.ideas", Icon: Lightbulb, prompt: "Give me some creative AI ideas and inspiration" },
];

export function Hero() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const { isPro } = useMembership();
  const { t } = useI18n();
  const [modelMenuOpen, setModelMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modelMenuRef = useRef<HTMLDivElement>(null);
  const modelBtnRef = useRef<HTMLButtonElement>(null);
  const modelPanelRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  const updateMenuPosition = useCallback(() => {
    if (!modelBtnRef.current) return;
    const rect = modelBtnRef.current.getBoundingClientRect();
    const menuWidth = 320;
    const menuHeight = 420;
    const isMobile = window.innerWidth < 640;
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const rightPos = isMobile
      ? Math.max(8, (window.innerWidth - menuWidth) / 2)
      : Math.max(8, window.innerWidth - rect.right);
    if (spaceAbove >= menuHeight || spaceAbove > spaceBelow) {
      setMenuStyle({
        position: "fixed",
        bottom: window.innerHeight - rect.top + 8,
        right: rightPos,
        maxHeight: Math.min(spaceAbove - 16, menuHeight),
      });
    } else {
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 8,
        right: rightPos,
        maxHeight: Math.min(spaceBelow - 16, menuHeight),
      });
    }
  }, []);

  const handleModelToggle = useCallback(() => {
    if (!modelMenuOpen) updateMenuPosition();
    setModelMenuOpen((v) => !v);
  }, [modelMenuOpen, updateMenuPosition]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        modelMenuRef.current && !modelMenuRef.current.contains(target) &&
        modelPanelRef.current && !modelPanelRef.current.contains(target)
      ) {
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
    <section className="relative pt-8 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Copilot header */}
        {!hasMessages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="w-14 h-14 rounded-full bg-atmospheric/10 border border-atmospheric/20 flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7 text-atmospheric" />
            </div>
            <h1 className="text-3xl md:text-4xl text-white text-center mb-2">
              {t("hero.title.1")} <span className="text-atmospheric">{t("hero.title.2")}</span>
            </h1>
            <p className="text-on-surface/40 text-center font-light">
              {t("hero.subtitle")}
            </p>

            {/* Scene template cards */}
            <div className="grid grid-cols-3 gap-2 mt-8 w-full max-w-md mx-auto">
              {SCENE_TEMPLATES.map((scene, i) => (
                <motion.button
                  key={scene.labelKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  onClick={() => handleSend(scene.prompt)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-b ${scene.color} border border-white/5 hover:border-atmospheric/30 transition-all group`}
                >
                  <scene.icon className="w-5 h-5 text-on-surface/40 group-hover:text-atmospheric transition-colors" />
                  <span className="text-[11px] text-on-surface/50 group-hover:text-white transition-colors">{t(scene.labelKey)}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages */}
        {hasMessages && (
          <div ref={scrollRef} className="mb-4 max-h-[40vh] overflow-y-auto space-y-4 px-1">
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
                    {msg.role === "user" ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div className="prose-sm prose-invert prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-white max-w-none">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
                {msg.toolResults?.map((result, j) => (
                  <div key={j} className="mt-2 ml-8">
                    <InlineToolResult result={result} />
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

        {/* Input card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="group/card relative liquid-glass-strong rounded-3xl p-5 overflow-visible"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl focus-within:border-atmospheric/40 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t("hero.placeholder")}
              rows={3}
              className="w-full bg-transparent py-4 pl-5 pr-5 text-sm text-white placeholder:text-on-surface/30 focus:outline-none resize-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            />
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-3 gap-2">
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-on-surface/50 hover:text-white hover:border-atmospheric/30 transition-all shrink-0">
                <MessageSquare className="w-3 h-3" />
                {t("action.chat")}
              </button>
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.labelKey}
                  onClick={() => handleSend(action.prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-on-surface/50 hover:text-white hover:border-atmospheric/30 transition-all shrink-0"
                >
                  <action.Icon className="w-3 h-3" />
                  {t(action.labelKey)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-2">
              {/* Model selector */}
              <div ref={modelMenuRef}>
                <button
                  ref={modelBtnRef}
                  onClick={handleModelToggle}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-on-surface/40 hover:text-white transition-colors"
                >
                  {selectedModel.name}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* Send button */}
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-atmospheric/20 flex items-center justify-center text-atmospheric hover:bg-atmospheric/30 transition-colors disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Model menu rendered via portal to escape all overflow/stacking */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {modelMenuOpen && (
            <motion.div
              ref={modelPanelRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={menuStyle}
              className="w-80 overflow-y-auto bg-surface/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 z-[9999]"
            >
              <div className="px-4 pt-4 pb-2">
                <h3 className="text-xs font-semibold text-white">{t("model.title")}</h3>
              </div>
              <div className="px-2 pb-2">
                {MODELS.map((group) => (
                  <div key={group.tier} className="mb-1">
                    <p className="text-[10px] text-on-surface/30 font-medium px-2 pt-2 pb-1">{group.tier}</p>
                    {group.models.map((model) => {
                      const isPaid = !model.free;
                      const locked = isPaid && !isPro;
                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            if (locked) {
                              // Coming soon — no payment yet
                            } else {
                              setSelectedModel(model);
                              setModelMenuOpen(false);
                            }
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left group"
                        >
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[11px] text-on-surface/60 shrink-0">{model.icon}</span>
                          <span className={`text-sm transition-colors flex-1 ${locked ? "text-on-surface/30" : "text-on-surface/80 group-hover:text-white"}`}>{model.name}</span>
                          {locked && <Lock className="w-3 h-3 text-on-surface/20 shrink-0" />}
                          {!locked && selectedModel.id === model.id && <Check className="w-4 h-4 text-atmospheric shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              {!isPro && (
                <div className="px-4 py-3 border-t border-white/5 text-[10px] text-on-surface/20">
                  <Lock className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />
                  {t("model.comingSoon")}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}

function InlineToolResult({ result }: { result: ToolResult }) {
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
        className="inline-flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10 text-sm text-atmospheric hover:bg-atmospheric/10 hover:border-atmospheric/30 transition-all"
      >
        查看 {categoryLabels[result.data.category as string] ?? "工具"} →
      </Link>
    );
  }

  return null;
}
