import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Chatbox } from "@/components/common";
import { NavBar } from "@/components/common/NavBar";
import { AuthProvider } from "@/lib/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        <AuthProvider>
          {/* Cinematic Smoke Background — GPU accelerated */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(45,212,191,0.30) 0%, transparent 70%)" }} />
            <div className="absolute top-[5%] right-[-15%] w-[70%] h-[65%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.30) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-20%] left-[0%] w-[65%] h-[60%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(52,211,153,0.20) 0%, transparent 70%)" }} />
            <div className="absolute top-[25%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(217,70,239,0.20) 0%, transparent 70%)" }} />
            <div className="absolute top-[-5%] left-[35%] w-[40%] h-[55%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(103,232,249,0.25) 0%, transparent 70%)" }} />
            <div className="absolute bottom-[5%] right-[0%] w-[50%] h-[50%] rounded-full mix-blend-screen" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)" }} />
          </div>

          <NavBar />

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
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
