import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

/* =========================
   Data
========================= */
const summaryData = [
  {
    title: "Success Rate",
    value: "87%",
    change: "+5%",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    gradient: "from-green-500 to-emerald-500",
    progress: "87%",
  },
  {
    title: "Regret Rate",
    value: "13%",
    change: "-3%",
    icon: AlertTriangle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    gradient: "from-orange-500 to-red-500",
    progress: "13%",
  },
  {
    title: "Total Decisions",
    value: "1,247",
    change: "+124",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    gradient: "from-blue-500 to-indigo-500",
    progress: "70%",
  },
  {
    title: "Pending Review",
    value: "23",
    change: "+8",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    gradient: "from-purple-500 to-pink-500",
    progress: "40%",
  },
];

/* =========================
   Component
========================= */
export function DecisionSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {summaryData.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
              
              {/* Header */}
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                    {item.title}
                  </CardTitle>

                  <motion.div
                    className={`p-2 sm:p-2.5 ${item.bgColor} rounded-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                  </motion.div>
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {item.value}
                  </h3>

                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      item.change.startsWith("+")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.change}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 sm:mt-4 w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: item.progress }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + index * 0.1,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}