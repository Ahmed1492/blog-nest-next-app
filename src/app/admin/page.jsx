'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
  const { backEndUrl, setToken, token, mounted } = useAppContext();
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Already logged in → go to dashboard (same as React: token exists → show Layout)
  useEffect(() => {
    if (mounted && token) router.replace("/admin/dashboard");
  }, [mounted, token]);

  if (mounted && token) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${backEndUrl}/api/admin/login`, userData);
      if (res.data.success) {
        // Exact same as React: save to localStorage then navigate to "/"
        localStorage.setItem("blog-nest-token", res.data.token);
        setToken(res.data.token);
        toast.success("Welcome back!");
        router.push("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] relative flex overflow-hidden">

      {/* ── Left decorative panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary via-indigo-600 to-violet-700 flex-col items-center justify-center p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center"
        >
          <div className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Blog<span className="text-white/60">Nest</span>
          </div>
          <p className="text-white/60 text-sm mb-12">Admin Control Panel</p>

          <div className="space-y-4 text-left max-w-xs mx-auto">
            {[
              { icon: "📝", label: "Write & publish articles" },
              { icon: "💬", label: "Moderate comments" },
              { icon: "✨", label: "AI-powered content generation" },
              { icon: "📊", label: "Track blog performance" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
              >
                <span className="text-xl">{f.icon}</span>
                <span className="text-white/90 text-sm font-medium">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="absolute inset-0 lg:left-1/2 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-400/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Blog<span className="text-primary">Nest</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-glow shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome back</h1>
                <p className="text-gray-400 text-xs mt-0.5">Sign in to your admin account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={userData.email}
                    onChange={(e) => setUserData((p) => ({ ...p, email: e.target.value }))}
                    className="input-field pl-10"
                    placeholder="admin@blognest.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={userData.password}
                    onChange={(e) => setUserData((p) => ({ ...p, password: e.target.value }))}
                    className="input-field pl-10 pr-11"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm shadow-primary/25 mt-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <Link href="/" className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to BlogNest
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secured with JWT authentication
          </p>
        </motion.div>
      </div>
    </div>
  );
}
