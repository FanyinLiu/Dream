"use client";

import { motion } from "motion/react";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-atmospheric/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl mb-6 text-white leading-[1.1]">
            发现最好用的
            <br />
            <span className="text-atmospheric">AI 工具</span>
          </h1>
          <p className="text-xl text-on-surface/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            精选 45+ 款优质 AI 工具，帮你按场景快速找到最合适的 AI 工具。
            <br />
            写作、绘画、视频、编程，一站搞定。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-on-surface/40" />
          </div>
          <a href="#image">
            <div className="w-full h-16 pl-14 pr-6 rounded-full bg-white/5 border border-white/10 text-on-surface/30 flex items-center backdrop-blur-xl hover:border-atmospheric/30 transition-all cursor-pointer">
              搜索绘画、视频、写作、编程工具...
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
