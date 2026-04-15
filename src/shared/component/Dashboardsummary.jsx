import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const summaryData = [
  {
    title: "Success Rate",
    value: "87%",
    change: "+5%",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    gradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "Regret Rate",
    value: "13%",
    change: "-3%",
    icon: AlertTriangle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    title: "Total Decisions",
    value: "1,247",
    change: "+124",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    gradient: "from-blue-400 to-indigo-400",
  },
  {
    title: "Pending Review",
    value: "23",
    change: "+8",
    icon: Clock,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100",
    gradient: "from-violet-400 to-purple-400",
  },
];

export default function DecisionSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {summaryData.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className={`border ${item.borderColor} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group bg-white`}>
              
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">
                    {item.title}
                  </CardTitle>

                  <motion.div
                    className={`p-2.5 ${item.bgColor} rounded-xl`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                  </motion.div>

                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-baseline justify-between mb-3">
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {item.value}
                  </h3>

                  <span
                    className={`text-xs sm:text-sm font-semibold ${
                      item.change.startsWith("+")
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {item.change}
                  </span>

                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        item.title === "Success Rate"
                          ? "87%"
                          : item.title === "Regret Rate"
                          ? "13%"
                          : "70%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + index * 0.1,
                      ease: "easeOut",
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