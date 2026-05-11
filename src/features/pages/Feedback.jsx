import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "../../shared/component/Sidebar";
import { DashboardNav } from "../../shared/component/Dashboardnav";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { MessageSquarePlus, Star, Send, CheckCircle2, ThumbsUp, Lightbulb } from "lucide-react";

const CATEGORIES = ["General", "Prediction Accuracy", "UI/UX", "Feature Request", "Bug Report"];

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`w-7 h-7 transition-colors ${
              star <= (hovered || value) ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function Feedback() {
  const [category, setCategory]   = useState("General");
  const [message, setMessage]     = useState("");
  const [rating, setRating]       = useState(0);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const stored = localStorage.getItem("feedbackList");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const canSubmit = message.trim() && rating > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    const newEntry = {
      id: Date.now(),
      category,
      rating,
      message,
      date: "Just now",
    };

    setFeedbackList((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem("feedbackList", JSON.stringify(updated));
      return updated;
    });
    setLoading(false);
    setSubmitted(true);
    setMessage("");
    setRating(0);
    setCategory("General");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-4xl mx-auto space-y-6">

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                  <MessageSquarePlus className="w-5 h-5 text-white" />
                </div>
                Feedback
              </h1>
              <p className="text-gray-500 text-sm mt-1">Share your experience and help us improve RegretPredict.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

              {/* Form */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              >
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-800">Submit Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-5"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <p className="text-sm font-medium text-emerald-700">Thank you! Your feedback has been submitted.</p>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Category</label>
                        <div className="flex flex-wrap gap-2">
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCategory(cat)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                category === cat
                                  ? "bg-violet-600 text-white shadow-sm"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Your Rating</label>
                        <StarRating value={rating} onChange={setRating} />
                        {rating > 0 && (
                          <p className="text-xs text-gray-400">
                            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Your Message</label>
                        <textarea
                          rows={5}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us what you think — what's working well, what could be better, or any features you'd love to see..."
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-300 transition-all"
                        />
                        <p className="text-xs text-gray-400 text-right">{message.length} characters</p>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading || !canSubmit}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <><Send className="w-4 h-4" /> Submit Feedback</>
                        )}
                      </motion.button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Stats sidebar */}
              <motion.div
                className="lg:col-span-2 space-y-4"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              >
                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    {[
                      { label: "Total Submitted",  value: feedbackList.length, icon: MessageSquarePlus, color: "text-violet-600", bg: "bg-violet-50" },
                      { label: "Positive Reviews", value: feedbackList.filter(f => f.rating >= 4).length, icon: ThumbsUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                      { label: "Feature Requests", value: feedbackList.filter(f => f.category === "Feature Request").length, icon: Lightbulb, color: "text-amber-600", bg: "bg-amber-50" },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg}`}>
                            <Icon className={`w-4 h-4 ${stat.color}`} />
                          </div>
                          <div>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4">
                  <p className="text-xs font-semibold text-violet-700 mb-1">💡 Tip</p>
                  <p className="text-xs text-violet-600 leading-relaxed">
                    Detailed feedback helps us prioritize the right improvements. The more specific you are, the better we can help.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Submitted feedback list */}
            {feedbackList.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-800">Your Submitted Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2 space-y-3">
                    <AnimatePresence>
                      {feedbackList.map((fb) => (
                        <motion.div
                          key={fb.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            You
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">{fb.category}</span>
                              <span className="text-xs text-gray-400">{fb.date}</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed mt-1">{fb.message}</p>
                            <div className="flex items-center gap-1 mt-2">
                              {[...Array(5)].map((_, s) => (
                                <Star key={s} className={`w-3.5 h-3.5 ${s < fb.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
