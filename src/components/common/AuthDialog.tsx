"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { signUpWithPassword, signInWithPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    if (!email.trim() || !password.trim()) return;
    if (password.length < 6) {
      setError("密码至少 6 位");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "register") {
      const { error } = await signUpWithPassword(email, password);
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setSuccess("注册成功，已自动登录");
        setTimeout(() => handleClose(), 1000);
      }
    } else {
      const { error } = await signInWithPassword(email, password);
      setLoading(false);
      if (error) {
        setError(error === "Invalid login credentials" ? "邮箱或密码错误" : error);
      } else {
        handleClose();
      }
    }
  }

  function handleClose() {
    setEmail("");
    setPassword("");
    setError("");
    setSuccess("");
    setShowPwd(false);
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
                  <h2 className="text-lg font-semibold text-white">
                    {mode === "login" ? "登录" : "注册"} AI Nav
                  </h2>
                </div>
                <button onClick={handleClose} className="text-on-surface/30 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="邮箱地址"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/40"
                />

                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="密码（至少 6 位）"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-sm text-white placeholder:text-on-surface/30 focus:outline-none focus:border-atmospheric/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/30 hover:text-white transition-colors"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !email.trim() || !password.trim()}
                  className="w-full py-3 rounded-xl bg-atmospheric text-surface text-sm font-bold hover:scale-[1.02] disabled:opacity-40 transition-all"
                >
                  {loading ? "处理中..." : mode === "login" ? "登录" : "注册"}
                </button>

                {error && <p className="text-xs text-red-400 text-center">{error}</p>}
                {success && <p className="text-xs text-green-400 text-center">{success}</p>}

                <p className="text-xs text-on-surface/40 text-center">
                  {mode === "login" ? (
                    <>还没有账号？<button onClick={() => { setMode("register"); setError(""); }} className="text-atmospheric hover:text-white transition-colors">注册</button></>
                  ) : (
                    <>已有账号？<button onClick={() => { setMode("login"); setError(""); }} className="text-atmospheric hover:text-white transition-colors">登录</button></>
                  )}
                </p>

                <p className="text-[10px] text-on-surface/20 text-center">
                  登录即表示同意我们的服务条款
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
