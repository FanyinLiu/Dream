"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Image, Video, PenTool, Code2, Music, Globe, Lightbulb, ArrowRight } from "lucide-react";
import type { Category } from "@/types/tool";

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  image:  { icon: Image,     color: "from-purple-500/20 to-pink-500/20" },
  video:  { icon: Video,     color: "from-blue-500/20 to-cyan-500/20" },
  writing:{ icon: PenTool,   color: "from-orange-500/20 to-yellow-500/20" },
  coding: { icon: Code2,     color: "from-green-500/20 to-emerald-500/20" },
  music:  { icon: Music,     color: "from-rose-500/20 to-fuchsia-500/20" },
  webdev: { icon: Globe,     color: "from-sky-500/20 to-indigo-500/20" },
  prompt: { icon: Lightbulb, color: "from-amber-500/20 to-lime-500/20" },
};

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">按分类浏览</h2>
          <p className="text-on-surface/40 font-light">找到适合你场景的专属 AI 工具。</p>
        </div>
        <Link
          href="/categories"
          className="hidden sm:flex items-center gap-2 text-atmospheric hover:gap-3 transition-all text-sm"
        >
          全部分类 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, i) => {
          const config = CATEGORY_CONFIG[cat.id] || { icon: Lightbulb, color: "from-gray-500/20 to-gray-500/20" };
          const Icon = config.icon;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={`/category/${cat.id}`}
                className="group relative h-56 rounded-xl overflow-hidden ghost-border bg-white/5 p-8 flex flex-col justify-between cursor-pointer block"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-on-surface/40 group-hover:text-on-surface/60 transition-colors line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
