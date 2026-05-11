import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useSignup } from "../hooks/useSignup";

export function Signup() {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirm, setConfirm,
    showPass, setShowPass,
    showConfirm, setShowConfirm,
    loading, error, canSubmit, passwordMatch,
    handleSubmit,
  } = useSignup();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200 mb-4">
            <Brain className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Start making smarter, regret-free decisions</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Kiprotich Marion"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
                />
                <button type="button" onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full pl-10 pr-11 py-3 rounded-xl border bg-gray-50 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                    confirm && !passwordMatch
                      ? "border-rose-300 focus:ring-rose-400/30"
                      : "border-gray-200 focus:ring-blue-400/30 focus:border-blue-300"
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirm && !passwordMatch && (
                <p className="text-xs text-rose-500 mt-1">Passwords do not match</p>
              )}
            </div>
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}
            <motion.button
              type="submit"
              disabled={loading || !canSubmit}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Login
            </Link>
          </p>
        </motion.div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} RegretPredict. All rights reserved.
        </p>
      </div>
    </div>
  );
}
