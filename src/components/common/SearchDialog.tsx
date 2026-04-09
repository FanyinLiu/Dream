"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import type { Tool } from "@/types/tool";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, onClose]);

  const q = query.trim().toLowerCase();

  const filteredTools: Tool[] = q
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      ).slice(0, 8)
    : [];

  const filteredCategories = q
    ? categories.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
    : categories;

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
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-2xl px-4"
          >
            <div className="liquid-glass-strong rounded-3xl overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                <Search className="w-5 h-5 text-on-surface/40 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="搜索 AI 工具、分类..."
                  className="flex-1 bg-transparent text-white text-lg placeholder:text-on-surface/30 focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="text-on-surface/30 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-4">
                {!q && (
                  <>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface/30 px-2 mb-3">分类</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-atmospheric/10 border border-white/5 hover:border-atmospheric/30 transition-all"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <span className="text-sm text-on-surface/80">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface/30 px-2 mb-3">快捷入口</p>
                    <div className="space-y-1">
                      <QuickLink href="/create" label="AI 创作工坊" desc="生成图片、写作" onClose={onClose} />
                      <QuickLink href="/recommend" label="智能推荐" desc="找到最适合你的工具" onClose={onClose} />
                    </div>
                  </>
                )}

                {q && filteredCategories.length > 0 && (
                  <>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface/30 px-2 mb-2">分类</p>
                    <div className="space-y-1 mb-4">
                      {filteredCategories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <span className="text-lg">{cat.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white">{cat.name}</p>
                            <p className="text-xs text-on-surface/30 truncate">{cat.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-on-surface/20 group-hover:text-atmospheric transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {q && filteredTools.length > 0 && (
                  <>
                    <p className="text-[10px] uppercase tracking-widest text-on-surface/30 px-2 mb-2">工具</p>
                    <div className="space-y-1">
                      {filteredTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={`/tool/${tool.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-atmospheric text-xs font-bold shrink-0">
                            {tool.logoText}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white">{tool.name}</p>
                            <p className="text-xs text-on-surface/30 truncate">{tool.tagline}</p>
                          </div>
                          <a
                            href={tool.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-on-surface/20 hover:text-atmospheric transition-colors shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {q && filteredTools.length === 0 && filteredCategories.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-on-surface/30 text-sm">没有找到相关结果</p>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] text-on-surface/20">
                <span>ESC 关闭</span>
                <span>↑↓ 导航 · Enter 选择</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function QuickLink({ href, label, desc, onClose }: { href: string; label: string; desc: string; onClose: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all group"
    >
      <div>
        <p className="text-sm text-white">{label}</p>
        <p className="text-xs text-on-surface/30">{desc}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-on-surface/20 group-hover:text-atmospheric transition-colors" />
    </Link>
  );
}
