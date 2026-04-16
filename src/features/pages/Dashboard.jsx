import { motion } from "framer-motion";
import { DashboardNav } from "../../shared/component/Dashboardnav";
import { Sidebar } from "../../shared/component/Sidebar";
import { DecisionSummary } from "../../shared/component/Dashboardsummary";
import { ComparisonTable } from "../../shared/component/Comparisontable";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

const HISTORY = [
  { title: "Market Expansion Strategy", date: "2 hours ago",  status: "success" },
  { title: "Product Launch Timeline",   date: "5 hours ago",  status: "pending" },
  { title: "Budget Allocation Q2",      date: "1 day ago",    status: "success" },
  { title: "Team Restructuring Plan",   date: "2 days ago",   status: "regret"  },
];

const RECOMMENDATIONS = [
  { text: "Consider reviewing your high-risk decisions from last month", priority: "high"   },
  { text: "Your regret rate has decreased by 3% — great progress!",     priority: "low"    },
  { text: "New market data available for pending decisions",             priority: "medium" },
  { text: "Schedule a feedback review for Decision #1247",              priority: "medium" },
];

const statusStyle = {
  success: { label: "Success", cls: "bg-green-100 text-green-700",  icon: CheckCircle2, iconCls: "text-green-500" },
  pending: { label: "Pending", cls: "bg-blue-100 text-blue-700",    icon: Clock,        iconCls: "text-blue-500"  },
  regret:  { label: "Regret",  cls: "bg-orange-100 text-orange-700",icon: XCircle,      iconCls: "text-orange-500"},
};

const priorityDot = { high: "bg-red-500", medium: "bg-yellow-500", low: "bg-green-500" };
export function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardNav />

        <main className="flex-1 overflow-y-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Track your decision predictions and regret analysis insights
            </p>
          </motion.div>

          <DecisionSummary />

          <div className="mt-8">
            <ComparisonTable />
          </div>

          {/* Recent History + AI Recommendations */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Recent Decision History */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              <h3 className="text-base font-bold text-gray-900 mb-4">Recent Decision History</h3>
              <div className="space-y-3">
                {HISTORY.map((item, i) => {
                  const s = statusStyle[item.status];
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${s.iconCls}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-500" /> AI Recommendations
              </h3>
              <div className="space-y-3">
                {RECOMMENDATIONS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${priorityDot[item.priority]}`} />
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </main>
      </div>
    </div>
  );
}
