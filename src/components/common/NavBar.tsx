"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useAuth } from "@/lib/AuthContext";
import { AuthDialog } from "./AuthDialog";

export function NavBar() {
  const { user, loading, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
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

          {/* Desktop nav */}
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

          {/* Auth button */}
          <div className="flex items-center gap-3">
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

            {!loading && (
              user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/favorites"
                    className="text-xs text-on-surface/40 hover:text-white transition-colors hidden md:block"
                  >
                    收藏
                  </Link>
                  <button
                    onClick={signOut}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-on-surface/40 hover:text-white transition-colors"
                    title="退出登录"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-on-surface/60 hover:text-white hover:border-atmospheric/30 transition-all"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">登录</span>
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
