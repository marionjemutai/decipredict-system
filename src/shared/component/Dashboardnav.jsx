import { Brain, Bell, Search, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";


export function DashboardNav() {
  return (
    <motion.nav
      className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg sm:text-xl font-semibold text-gray-800">RegretPredict</span>
              <p className="text-xs text-gray-500">Decision Intelligence</p>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search decisions, predictions..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300 bg-gray-50/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">

            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 rounded-xl">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-400 rounded-full"></span>
            </Button>

            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-xl hidden sm:flex">
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>

            <div className="w-px h-8 bg-gray-200 mx-1"></div>

            <motion.div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 rounded-xl p-1.5 sm:p-2 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="hidden lg:block text-right">
                <p className="text-sm font-semibold text-gray-800">Guest User</p>
                <p className="text-xs text-gray-500">Free Plan</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                GU
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.nav>
  );
}