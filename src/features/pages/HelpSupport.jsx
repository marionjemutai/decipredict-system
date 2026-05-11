import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../../shared/component/Sidebar";
import { DashboardNav } from "../../shared/component/Dashboardnav";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import {
  HelpCircle, ChevronDown, ChevronUp, Search,
  Mail, MessageCircle, BookOpen, Zap,
  Brain, TrendingDown, BarChart3, Settings, Send, CheckCircle2,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How does the AI predict regret?",
    a: "Our AI analyzes your decision description and options using pattern recognition trained on thousands of similar decisions. It evaluates financial, emotional, and time-based risk factors to generate a regret probability score for each option.",
  },
  {
    q: "Is my decision data private?",
    a: "Yes. Your decisions are stored securely and are never shared with third parties. Only you can view your prediction history. We use industry-standard encryption to protect all data.",
  },
  {
    q: "Why does the regret analysis require all three options?",
    a: "Comparing three options gives the AI a broader context to evaluate trade-offs. With only one or two options, the model has less data to determine relative risk, which reduces accuracy.",
  },
  {
    q: "Can I edit a decision after submitting?",
    a: "Currently, submitted decisions cannot be edited. You can submit a new prediction with updated information at any time from the Predictions page.",
  },
  {
    q: "What does the success score mean?",
    a: "The success score is the inverse of the regret score (100% - regret%). It represents the estimated probability that you will be satisfied with the outcome of that option over time.",
  },
  {
    q: "How do I reset my password?",
    a: "Go to Settings → Security tab and use the Change Password form. If you've forgotten your current password, use the 'Forgot password?' link on the Login page.",
  },
];

const GUIDES = [
  { icon: Brain,       title: "Making Your First Prediction", desc: "Step-by-step guide to submitting a decision and reading the results."  },
  { icon: TrendingDown,title: "Understanding Regret Analysis", desc: "Learn how to interpret regret scores, risk factors, and radar charts."  },
  { icon: BarChart3,   title: "Reading the Dashboard",        desc: "Overview of KPI cards, comparison table, and decision history."         },
  { icon: Settings,    title: "Customising Your Settings",    desc: "Profile, notifications, security, and appearance explained."            },
];

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="border border-gray-100 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-gray-800 pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [subject, setSubject]   = useState("");
  const [message, setMessage]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);

  const canSend = subject.trim() && message.trim();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!canSend) return;
    setLoading(true);
    // TODO: POST /api/support/contact
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
    setSubject(""); setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <form onSubmit={handleSend} className="space-y-4">
      {sent && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <p className="text-sm font-medium text-emerald-700">Message sent! We'll get back to you within 24 hours.</p>
        </motion.div>
      )}

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Issue with regret analysis results"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700">Message</label>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue or question in detail..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all" />
      </div>

      <motion.button type="submit" disabled={loading || !canSend}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? (
          <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg> Sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </motion.button>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function HelpSupport() {
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                Help & Support
              </h1>
              <p className="text-gray-500 text-sm mt-1">Find answers, read guides, or contact our support team.</p>
            </motion.div>

            {/* Quick contact cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              {[
                { icon: Mail,          label: "Email Support",  desc: "support@regretpredict.com",  color: "from-blue-500 to-indigo-500"   },
                { icon: MessageCircle, label: "Live Chat",      desc: "Available 9am – 6pm WAT",    color: "from-emerald-500 to-teal-500"  },
                { icon: BookOpen,      label: "Documentation",  desc: "Browse full docs",            color: "from-violet-500 to-purple-500" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{c.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Guides */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Quick Start Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GUIDES.map((g, i) => {
                  const Icon = g.icon;
                  return (
                    <motion.div key={g.title}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{g.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{g.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all shadow-sm" />
              </div>

              <div className="space-y-2">
                {filtered.length > 0
                  ? filtered.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)
                  : <p className="text-sm text-gray-400 text-center py-6">No results found for "{search}"</p>
                }
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-gray-800 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" /> Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-sm text-gray-500 mb-4">Can't find what you're looking for? Send us a message and we'll respond within 24 hours.</p>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
