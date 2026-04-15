import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star, TrendingUp, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";


/* =========================
   Data
========================= */
const recommendations = [
  {
    id: 1,
    title: "Expand to New Market - Asia Pacific",
    description:
      "Based on current market trends and your risk profile, this option shows the highest potential for success.",
    confidence: 92,
    successRate: 85,
    regretScore: 15,
    reasoning: [
      "Strong market demand detected",
      "Competitive analysis favorable",
      "Resource availability confirmed",
    ],
    action: "Review Details",
    priority: "high",
    icon: Star,
    gradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
  },
  {
    id: 2,
    title: "Consider Gradual Market Entry",
    description:
      "Alternative approach with lower risk profile. Recommended if you prefer conservative expansion strategy.",
    confidence: 78,
    successRate: 72,
    regretScore: 28,
    reasoning: [
      "Lower initial investment required",
      "Flexible scaling options",
      "Proven strategy in similar markets",
    ],
    action: "Compare Options",
    priority: "medium",
    icon: TrendingUp,
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
  },
];

/* =========================
   Component
========================= */
export default function RecommendationCards() {
  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            AI Recommendations
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Top suggestions based on your decision criteria
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-violet-50 px-3 py-1.5 rounded-lg">
          <Star className="w-4 h-4 text-violet-500" />
          <span className="hidden sm:inline">AI Powered</span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {recommendations.map((rec, index) => {
          const Icon = rec.icon;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card
                className={`border-2 ${rec.borderColor} shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full bg-gradient-to-br ${rec.gradient}`}
              >
                <CardHeader className="pb-4">

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">

                      {/* Icon + Badge */}
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            rec.priority === "high"
                              ? "bg-emerald-100"
                              : "bg-blue-100"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              rec.priority === "high"
                                ? "text-emerald-600"
                                : "text-blue-600"
                            }`}
                          />
                        </div>

                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            rec.priority === "high"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {rec.priority === "high"
                            ? "Highly Recommended"
                            : "Alternative Option"}
                        </span>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-base sm:text-lg text-gray-800 mb-2">
                        {rec.title}
                      </CardTitle>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </div>

                </CardHeader>

                <CardContent className="space-y-4">

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/70 rounded-lg p-3 text-center border border-gray-200/50">
                      <p className="text-xs text-gray-600 mb-1">Confidence</p>
                      <p className="text-lg sm:text-xl font-bold text-violet-600">
                        {rec.confidence}%
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-3 text-center border border-gray-200/50">
                      <p className="text-xs text-gray-600 mb-1">Success</p>
                      <p className="text-lg sm:text-xl font-bold text-emerald-600">
                        {rec.successRate}%
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-3 text-center border border-gray-200/50">
                      <p className="text-xs text-gray-600 mb-1">Regret</p>
                      <p className="text-lg sm:text-xl font-bold text-amber-600">
                        {rec.regretScore}%
                      </p>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <div className="bg-white/70 rounded-lg p-4 border border-gray-200/50">
                    <p className="text-xs font-semibold text-gray-700 mb-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Key Insights
                    </p>

                    <ul className="space-y-2">
                      {rec.reasoning.map((reason, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5"></div>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Button
                    className={`w-full ${
                      rec.priority === "high"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                    } text-white shadow-md`}
                  >
                    {rec.action}
                  </Button>

                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}