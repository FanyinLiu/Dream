import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Nav - 发现最好用的 AI 工具",
  description:
    "精选优质 AI 工具导航，帮你按场景快速找到最适合的 AI 工具。写作、绘画、视频、编程、设计，一站搞定。",
  keywords: [
    "AI工具",
    "AI导航",
    "人工智能",
    "ChatGPT",
    "Midjourney",
    "AI写作",
    "AI绘画",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Nav
              </span>
              <span className="text-sm text-gray-500 hidden sm:inline">
                发现最好用的 AI 工具
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                首页
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                分类
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                关于
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
            <p>AI Nav - 精选 AI 工具导航</p>
            <p className="mt-1">
              帮你在 AI 时代找到最好用的工具，提升效率，释放创造力。
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
