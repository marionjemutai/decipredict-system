import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../shared/component/Sidebar";
import { DashboardNav } from "../../shared/component/Dashboardnav";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/card";
import { usePrediction } from "../../shared/context/PredictionContext";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle, TrendingDown, Lightbulb,
  DollarSign, Heart, Clock, CheckCircle2, ArrowLeft,
} from "lucide-react";

function RegretBar({ label, value, colorClass, trackClass }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${colorClass}`}>{value}%</span>
      </div>
      <div className={`w-full h-3 rounded-full ${trackClass}`}>
        <motion.div
          className={`h-full rounded-full ${colorClass.replace("text-", "bg-")}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">
        {value < 30 ? "Low risk" : value < 55 ? "Moderate risk" : "High risk"}
      </p>
    </div>
  );
}

function RiskRow({ label, icon: Icon, iconBg, iconColor, a, b }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <span className="text-sm font-semibold text-gray-700">{label}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[{ lbl: "Option A", val: a, color: "bg-blue-500",   track: "bg-blue-100"   },
          { lbl: "Option B", val: b, color: "bg-violet-500", track: "bg-violet-100" }].map((o) => (
          <div key={o.lbl}>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{o.lbl}</span><span className="font-semibold">{o.val}%</span>
            </div>
            <div className={`w-full h-2 rounded-full ${o.track}`}>
              <motion.div
                className={`h-full rounded-full ${o.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${o.val}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegretAnalysis() {
  const { prediction } = usePrediction();
  const navigate = useNavigate();

  // No prediction yet — prompt user to go back
  if (!prediction) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardNav />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
                <TrendingDown className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">No prediction yet</h2>
              <p className="text-gray-500 text-sm max-w-xs">
                Go to the Predictions page, fill in your decision and options, then submit to see the regret analysis here.
              </p>
              <button
                onClick={() => navigate("/predict")}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Make a Prediction
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const { title, optionA, optionB, result } = prediction;
  const { regretA, regretB, recommended, explanation, riskFactors } = result;

  const highRegretValue  = Math.max(regretA, regretB);
  const highRegretOption = regretA > regretB ? "A" : "B";

  const barData = [
    { name: "Option A", regret: regretA, success: 100 - regretA },
    { name: "Option B", regret: regretB, success: 100 - regretB },
  ];

  const rf = riskFactors ?? { financial: { a: 0, b: 0 }, emotional: { a: 0, b: 0 }, time: { a: 0, b: 0 } };

  const radarData = [
    { factor: "Financial", A: rf.financial.a, B: rf.financial.b },
    { factor: "Emotional", A: rf.emotional.a, B: rf.emotional.b },
    { factor: "Time",      A: rf.time.a,      B: rf.time.b      },
    { factor: "Regret",    A: regretA,         B: regretB        },
    { factor: "Success",   A: 100 - regretA,   B: 100 - regretB  },
  ];

  const riskRows = [
    { label: "Financial Impact", icon: DollarSign, iconBg: "bg-red-50",   iconColor: "text-red-500",   a: rf.financial.a, b: rf.financial.b },
    { label: "Emotional Impact", icon: Heart,      iconBg: "bg-pink-50",  iconColor: "text-pink-500",  a: rf.emotional.a, b: rf.emotional.b },
    { label: "Time Impact",      icon: Clock,      iconBg: "bg-amber-50", iconColor: "text-amber-500", a: rf.time.a,      b: rf.time.b      },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-3 mb-1">
                <button onClick={() => navigate("/predict")} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-md">
                    <TrendingDown className="w-5 h-5 text-white" />
                  </div>
                  Regret Analysis
                </h1>
              </div>
              <p className="text-gray-500 text-sm ml-8">Based on your submitted decision and options.</p>
            </motion.div>

            {/* Decision summary */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border border-gray-100 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Your Decision</p>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">{title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[{ label: "Option A", text: optionA, bg: "bg-blue-50",   border: "border-blue-200",   badge: "bg-blue-100 text-blue-700"   },
                      { label: "Option B", text: optionB, bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-700" }].map((o) => (
                      <div key={o.label} className={`rounded-xl p-4 border ${o.bg} ${o.border}`}>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${o.badge}`}>{o.label}</span>
                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">{o.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* High regret warning */}
            {highRegretValue >= 55 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-rose-800">High Regret Risk — Option {highRegretOption}</p>
                    <p className="text-sm text-rose-700 mt-0.5">
                      Option {highRegretOption} carries a <strong>{highRegretValue}%</strong> regret score — above the safe threshold. Review the risk factors carefully.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Regret bars + Bar chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border border-gray-100 shadow-sm h-full">
                  <CardHeader className="pb-2"><CardTitle className="text-base text-gray-800">Regret Percentage</CardTitle></CardHeader>
                  <CardContent className="p-6 pt-2 space-y-5">
                    <RegretBar label="Option A" value={regretA} colorClass="text-blue-600"   trackClass="bg-blue-100"   />
                    <RegretBar label="Option B" value={regretB} colorClass="text-violet-600" trackClass="bg-violet-100" />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <Card className="border border-gray-100 shadow-sm h-full">
                  <CardHeader className="pb-2"><CardTitle className="text-base text-gray-800">Regret vs Success</CardTitle></CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                          <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} domain={[0, 100]} />
                          <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
                          <Bar dataKey="regret"  name="Regret %"  fill="#f43f5e" radius={[6,6,0,0]} />
                          <Bar dataKey="success" name="Success %" fill="#10b981" radius={[6,6,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Radar + Risk factors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border border-gray-100 shadow-sm h-full">
                  <CardHeader className="pb-2"><CardTitle className="text-base text-gray-800">Multi-Factor Comparison</CardTitle></CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="factor" tick={{ fontSize: 11, fill: "#6b7280" }} />
                          <Radar name="Option A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                          <Radar name="Option B" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
                          <Tooltip contentStyle={{ borderRadius: "10px", fontSize: "12px" }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />Option A</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />Option B</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <Card className="border border-gray-100 shadow-sm h-full">
                  <CardHeader className="pb-2"><CardTitle className="text-base text-gray-800">Risk Factor Breakdown</CardTitle></CardHeader>
                  <CardContent className="p-6 pt-2 space-y-5">
                    {riskRows.map((r) => <RiskRow key={r.label} {...r} />)}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recommendation card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">AI RECOMMENDED</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2">Go with Option {recommended}</h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{explanation}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-3xl font-bold text-emerald-600">
                        {100 - (recommended === "A" ? regretA : regretB)}%
                      </p>
                      <p className="text-xs text-gray-500">Success score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Insights */}
            {result.insights?.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <Card className="border border-gray-100 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-gray-800 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" /> Advice & Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.insights.map((tip, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                        </motion.div>
                      ))}
                    </div>
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
