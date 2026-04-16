import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";

/* =========================
   Data
========================= */
const options = [
  {
    id: 1,
    name: "Option A: Expand to New Market",
    successRate: 85,
    regretScore: 15,
    timeframe: "6 months",
    investment: "$250K",
    pros: ["High growth potential", "Market demand verified", "Low competition"],
    cons: ["High initial investment", "Regulatory challenges"],
    status: "recommended",
  },
  {
    id: 2,
    name: "Option B: Optimize Current Operations",
    successRate: 72,
    regretScore: 28,
    timeframe: "3 months",
    investment: "$80K",
    pros: ["Lower risk", "Quick implementation", "Cost effective"],
    cons: ["Limited growth potential", "Temporary solution"],
    status: "neutral",
  },
  {
    id: 3,
    name: "Option C: Develop New Product Line",
    successRate: 65,
    regretScore: 35,
    timeframe: "12 months",
    investment: "$500K",
    pros: ["Innovation opportunity", "Long-term value"],
    cons: ["High risk", "Long development time", "Uncertain market"],
    status: "caution",
  },
];

/* =========================
   Helper
========================= */
const getStatusBadge = (status) => {
  const styles = {
    recommended: "bg-green-100 text-green-800",
    neutral: "bg-blue-100 text-blue-800",
    caution: "bg-orange-100 text-orange-800",
  };

  const labels = {
    recommended: "Recommended",
    neutral: "Consider",
    caution: "Caution",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
};

/* =========================
   Component
========================= */
export function ComparisonTable() {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-lg sm:text-xl text-gray-900">
          Decision Options Comparison
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Compare predicted outcomes and regret scores
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {[
                  "Option",
                  "Success Rate",
                  "Regret Score",
                  "Timeframe",
                  "Investment",
                  "Key Insights",
                  "Status",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {options.map((option, index) => (
                <motion.tr
                  key={option.id}
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {option.name}
                  </td>

                  {/* Success */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-lg font-bold text-green-600">
                        {option.successRate}%
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                  </td>

                  {/* Regret */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <span className="text-lg font-bold text-orange-600">
                        {option.regretScore}%
                      </span>
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center text-sm">
                    {option.timeframe}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold">
                    {option.investment}
                  </td>

                  {/* Insights */}
                  <td className="px-6 py-4 text-xs">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {option.pros[0]}
                    </div>
                    <div className="flex items-start gap-2 mt-1">
                      <XCircle className="w-4 h-4 text-red-600" />
                      {option.cons[0]}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(option.status)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="lg:hidden p-4 space-y-4">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              className="border rounded-lg p-4 bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-sm">{option.name}</h3>
                {getStatusBadge(option.status)}
              </div>

              <p className="text-xs text-gray-500">
                Success: {option.successRate}% | Regret: {option.regretScore}%
              </p>

              <p className="text-xs mt-1">
                {option.timeframe} • {option.investment}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}