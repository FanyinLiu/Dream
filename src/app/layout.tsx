import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Chatbox } from "@/components/common";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name + " - " + siteConfig.tagline,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen flex flex-col selection:bg-atmospheric/30 selection:text-white">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-atmospheric/10 flex items-center justify-center group-hover:bg-atmospheric/20 transition-colors">
                <svg className="w-6 h-6 text-atmospheric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <span className="text-2xl font-serif italic text-white tracking-tight">AI Nav</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-on-surface/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile nav */}
            <div className="md:hidden flex items-center gap-4">
              {siteConfig.navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-on-surface/60 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div className="h-20" />

        <main className="flex-1">{children}</main>

        <Chatbox />

        {/* Footer */}
        <footer className="px-6 py-20 border-t border-white/5 text-center">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl text-white mb-8 font-serif italic">AI Nav</h2>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-on-surface/40 mb-12">
              {siteConfig.footerLinks.map((group) =>
                group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>
            <p className="text-xs text-on-surface/20">
              © 2026 AI Nav. {siteConfig.tagline}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
