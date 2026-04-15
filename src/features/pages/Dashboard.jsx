import { DashboardNav } from "../../shared/component/Dashboardnav";
import Sidebar from "../../shared/component/Slidebar";
import DecisionSummary from "../../shared/component/Dashboardsummary";
import ResultsCharts from "../../shared/component/Resultcharts";
import HighlightedRecommendation from "../../shared/component/Highlightedrecommandation";
import ComparisonTable from "../../shared/component/Comparisontable";
import { motion } from "framer-motion";
import { Clock, Sparkles, BarChart3 } from "lucide-react";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-[1600px] mx-auto">
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    Dashboard Overview
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600">
                    AI-powered decision intelligence and regret prediction insights
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-gray-100">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Last updated: 5 min ago</span>
                </div>
              </div>
            </motion.div>
            <div className="mb-6 sm:mb-8">
              <DecisionSummary />
            </div>
            <div className="mb-6 sm:mb-8">
              <motion.div
                className="flex items-center gap-3 mb-5"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Analytics & Insights
                  </h2>
                  <p className="text-sm text-gray-600">Performance metrics and predictions</p>
                </div>
              </motion.div>
              <ResultsCharts />
            </div>
            <div className="mb-6 sm:mb-8">
              <HighlightedRecommendation />
            </div>
            <div className="mb-6 sm:mb-8">
              <ComparisonTable />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}