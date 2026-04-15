// Sidebar.jsx
import {
  LayoutDashboard,
  TrendingUp,
  AlertCircle,
  MessageSquarePlus,
  History,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useSidebar } from "../hooks/useSlideBar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#", active: true },
  { icon: TrendingUp, label: "Predictions", href: "#", active: false },
  { icon: AlertCircle, label: "Regret Analysis", href: "#", active: false },
  { icon: MessageSquarePlus, label: "Feedback", href: "#", active: false },
  { icon: History, label: "History", href: "#", active: false },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
];

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      className={`bg-gradient-to-b from-slate-50 to-gray-50 border-r border-gray-100 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16 sm:w-20" : "w-64 sm:w-72"
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-3 sm:p-4 pt-5">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-white/60 rounded-xl transition-all text-gray-600 hover:text-gray-900"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 px-3 sm:px-4">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? "bg-gradient-to-r from-blue-400/90 to-indigo-400/90 text-white shadow-md shadow-blue-200/50"
                    : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
                }`}
                whileHover={{ x: item.active ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  className={`${
                    collapsed ? "w-5 h-5 sm:w-6 sm:h-6" : "w-5 h-5"
                  } flex-shrink-0`}
                />

                {!collapsed && (
                  <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />

        {/* Bottom Items */}
        <div className="space-y-1.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 sm:px-4 py-3 rounded-xl text-gray-600 hover:bg-white/60 hover:text-gray-900 transition-all"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  className={`${
                    collapsed ? "w-5 h-5 sm:w-6 sm:h-6" : "w-5 h-5"
                  } flex-shrink-0`}
                />

                {!collapsed && (
                  <span className="text-sm sm:text-base font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </motion.a>
            );
          })}
        </div>
      </nav>

      {/* User Stats */}
      {!collapsed && (
        <motion.div
          className="p-4 sm:p-5 bg-gradient-to-br from-violet-50 to-purple-50 m-3 sm:m-4 rounded-xl border border-violet-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Monthly Decisions
          </p>

          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
            127
          </p>

          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="w-3 h-3" />
            <span>+12% from last month</span>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}