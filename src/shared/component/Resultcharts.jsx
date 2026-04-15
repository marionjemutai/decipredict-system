import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertCircle,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";

/* =========================
   Data
========================= */
const successRegretData = [
  { name: "Success", value: 87, color: "#10b981" },
  { name: "Regret", value: 13, color: "#f59e0b" },
];

const optionsComparisonData = [
  { name: "Option A", success: 85, regret: 15 },
  { name: "Option B", success: 72, regret: 28 },
];

const COLORS = {
  success: "#10b981",
  regret: "#f59e0b",
};

/* =========================
   Component
========================= */
export default function ResultsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="border border-gray-100 shadow-sm h-full">

          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-emerald-600" />
              Success vs Regret Analysis
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <div className="h-64 sm:h-72">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={successRegretData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {successRegretData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-700 font-medium">
                  Success (87%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-700 font-medium">
                  Regret (13%)
                </span>
              </div>
            </div>

            {/* Insight */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    High Success Probability
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    This decision shows an 87% likelihood of success based on historical patterns
                  </p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="border border-gray-100 shadow-sm h-full">

          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-base sm:text-lg text-gray-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Options Comparison
            </CardTitle>
          </CardHeader>

          <CardContent className="p-4 sm:p-6">
            <div className="h-64 sm:h-72">

              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={optionsComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />

                  <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />

                  <Bar
                    dataKey="success"
                    fill={COLORS.success}
                    radius={[8, 8, 0, 0]}
                    name="Success Rate %"
                  />

                  <Bar
                    dataKey="regret"
                    fill={COLORS.regret}
                    radius={[8, 8, 0, 0]}
                    name="Regret Rate %"
                  />
                </BarChart>
              </ResponsiveContainer>

            </div>

            {/* Insight */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">
                    Option A Recommended
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Option A shows a 13% higher success rate and 13% lower regret potential
                  </p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}