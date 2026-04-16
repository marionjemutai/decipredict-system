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
import { useState } from "react";

/* =========================
   Hooks
========================= */
function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return {
    collapsed,
    toggleSidebar,
  };
}

/* =========================
   Data
========================= */
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

/* =========================
   Component
========================= */
export function Sidebar() {
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-16 sm:w-20" : "w-64 sm:w-72"
      }`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-3 sm:p-4">
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 sm:px-4">
        <div className="space-y-1">
          {menuItems.map(({ icon: Icon, label, href, active }) => (
            <motion.a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
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
                  {label}
                </span>
              )}
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700" />

        {/* Bottom Items */}
        <div className="space-y-1">
          {bottomItems.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
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
                  {label}
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Stats */}
      {!collapsed && (
        <motion.div
          className="p-4 sm:p-6 bg-gray-800 m-3 sm:m-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs sm:text-sm text-gray-400 mb-2">
            Monthly Decisions
          </p>
          <p className="text-xl sm:text-2xl font-bold text-white mb-1">
            127
          </p>

          <div className="flex items-center gap-1 text-xs text-green-400">
            <TrendingUp className="w-3 h-3" />
            <span>+12% from last month</span>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}