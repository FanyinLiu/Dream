import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Chatbox } from "@/components/common";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

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
        {/* Cinematic Smoke Background — GPU accelerated */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.30) 0%, transparent 70%)" }} />
          <div className="absolute top-[5%] right-[-15%] w-[70%] h-[65%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.30) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-20%] left-[0%] w-[65%] h-[60%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.20) 0%, transparent 70%)" }} />
          <div className="absolute top-[25%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(217,70,239,0.20) 0%, transparent 70%)" }} />
          <div className="absolute top-[-5%] left-[35%] w-[40%] h-[55%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(103,232,249,0.25) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[5%] right-[0%] w-[50%] h-[50%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)" }} />
        </div>

        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-atmospheric/10 flex items-center justify-center group-hover:bg-atmospheric/20 transition-colors">
                <svg className="w-6 h-6 text-atmospheric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <span className="text-2xl brand-serif text-white tracking-tight">AI Nav</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 px-8 py-3 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.12] shadow-[0_4px_24px_-4px_rgba(172,202,233,0.06)]">
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
            <div className="md:hidden flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[11px] text-on-surface/60 hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Spacer for fixed nav */}
        <div className="h-20" />

        <main className="flex-1 relative z-10">{children}</main>

        <Chatbox />

        {/* Footer */}
        <footer className="px-6 py-20 border-t border-white/5 text-center relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl text-white mb-8 brand-serif">AI Nav</h2>
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
