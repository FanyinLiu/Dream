"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmail() {
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    const { error } = await signInWithEmail(email);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      setSent(true);
    }
  }

  function handleClose() {
    setEmail("");
    setSent(false);
    setError("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-full max-w-sm px-4"
          >
            <div className="liquid-glass-strong rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-atmospheric" />
                  <h2 className="text-lg font-semibold text-white">登录 AI Nav</h2>
                </div>
                <button onClick={handleClose} className="text-on-surface/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sent ? (
                <div className="text-center py-4">
                  <Mail className="w-10 h-10 text-atmospheric mx-auto mb-4" />
                  <p className="text-white mb-2">验证邮件已发送</p>
                  <p className="text-sm text-on-surface/40">请查收 <span className="text-atmospheric">{email}</span> 的邮件，点击链接登录</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={signInWithGoogle}
                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Google 登录
                  </button>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-[10px] text-on-surface/30">或</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleEmail()}
                      placeholder="输入邮箱地址"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/40"
                    />
                  </div>

                  <button
                    onClick={handleEmail}
                    disabled={loading || !email.trim()}
                    className="w-full py-3 rounded-xl bg-atmospheric text-surface text-sm font-bold hover:scale-[1.02] disabled:opacity-40 transition-all"
                  >
                    {loading ? "发送中..." : "邮箱验证码登录"}
                  </button>

                  {error && <p className="text-xs text-red-400 text-center">{error}</p>}

                  <p className="text-[10px] text-on-surface/20 text-center">
                    登录即表示同意我们的服务条款
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
