import { Brain, Bell, Search, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

/* =========================
   Component
========================= */
export function DashboardNav() {
  return (
    <motion.nav
      className="bg-white border-b border-gray-200 sticky top-0 z-40"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900 hidden sm:block">
              RegretPredict
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search decisions..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="hidden sm:flex p-2">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>

            {/* Profile */}
            <motion.div
              className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-gray-900">
                  kiprotih Marion
                </p>
                <p className="text-xs text-gray-500">
                  Premium User
                </p>
              </div>

              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                KM
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}