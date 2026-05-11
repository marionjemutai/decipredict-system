import {
  LayoutDashboard, TrendingUp, AlertCircle,
  MessageSquarePlus, History, Settings, HelpCircle,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard,  label: "Dashboard",       href: "/dashboard" },
  { icon: TrendingUp,       label: "Predictions",     href: "/predict"   },
  { icon: AlertCircle,      label: "Regret Analysis", href: "/regret"    },
  { icon: MessageSquarePlus,label: "Feedback",        href: "/feedback"  },
  { icon: History,          label: "History",         href: "#"          },
];

const bottomItems = [
  { icon: Settings,   label: "Settings",      href: "/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <motion.aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16 sm:w-20" : "w-64 sm:w-72"
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Collapse button */}
      <div className="flex justify-end p-3 sm:p-4">
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 sm:px-4">
        <div className="space-y-1">
          {menuItems.map(({ icon: Icon, label, href }) => {
            const active = pathname === href;
            return (
              <motion.div key={label} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to={href}
                  className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="my-6 border-t border-gray-700" />

        <div className="space-y-1">
          {bottomItems.map(({ icon: Icon, label, href }) => (
            <motion.div key={label} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
              <Link
                to={href}
                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">{label}</span>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Stats */}
      {!collapsed && (
        <motion.div
          className="p-4 bg-gray-800 m-3 rounded-lg"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        >
          <p className="text-xs text-gray-400 mb-1">Monthly Decisions</p>
          <p className="text-2xl font-bold text-white">127</p>
          <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
            <TrendingUp className="w-3 h-3" />
            <span>+12% from last month</span>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
