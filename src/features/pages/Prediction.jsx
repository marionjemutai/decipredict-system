import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "../../shared/component/Sidebar";
import { DashboardNav } from "../../shared/component/Dashboardnav";
import { Card, CardContent } from "../../shared/ui/card";
import { Sparkles, Brain, ArrowRight } from "lucide-react";
import { usePrediction } from "../../shared/context/PredictionContext";

const OPTION_STYLES = [
  { label: "A", badge: "bg-blue-100 text-blue-600",   ring: "focus:ring-blue-400/30 focus:border-blue-300"   },
  { label: "B", badge: "bg-violet-100 text-violet-600",ring: "focus:ring-violet-400/30 focus:border-violet-300"},
  { label: "C", badge: "bg-emerald-100 text-emerald-600",ring: "focus:ring-emerald-400/30 focus:border-emerald-300"},
];

export function Prediction() {
  const [title, setTitle]     = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const { setPrediction } = usePrediction();
  const navigate = useNavigate();

  const canSubmit = title.trim() && optionA.trim() && optionB.trim() && optionC.trim();

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);

    try {
      // TODO: replace with your real backend URL
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, optionA, optionB, optionC }),
      });

      if (!response.ok) throw new Error("Prediction failed");

      const result = await response.json();
      // Expected: { regretA, regretB, regretC, recommended, explanation,
      //             riskFactors: { financial:{a,b,c}, emotional:{a,b,c}, time:{a,b,c} } }

      setPrediction({ title, optionA, optionB, optionC, result });
      navigate("/regret");
    } catch (err) {
      setError("Backend not connected yet. Connect your API to see the regret analysis.");
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: optionA, setter: setOptionA, style: OPTION_STYLES[0], placeholder: "Describe option A..." },
    { value: optionB, setter: setOptionB, style: OPTION_STYLES[1], placeholder: "Describe option B..." },
    { value: optionC, setter: setOptionC, style: OPTION_STYLES[2], placeholder: "Describe option C..." },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                Decision Prediction
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Enter your decision and three options — AI will predict regret risk for each.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <form onSubmit={handlePredict} className="space-y-5">

                    {/* Title */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700">Decision Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Should I change my career path?"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 transition-all"
                      />
                    </div>

                    {/* Options grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {options.map(({ value, setter, style, placeholder }) => (
                        <div key={style.label} className="space-y-1.5">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${style.badge}`}>
                              {style.label}
                            </span>
                            Option {style.label}
                          </label>
                          <textarea
                            rows={4}
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            placeholder={placeholder}
                            className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 transition-all ${style.ring}`}
                          />
                        </div>
                      ))}
                    </div>

                    {error && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
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
                          Analyzing your decision...
                        </>
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Predict & Analyse <ArrowRight className="w-4 h-4" /></>
                      )}
                    </motion.button>

                  </form>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
