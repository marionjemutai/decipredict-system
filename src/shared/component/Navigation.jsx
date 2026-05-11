// Navigation.jsx
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <motion.nav
      className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 5 }}
            >
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            <span className="text-lg sm:text-xl font-semibold text-gray-900">
              RegretPredict
            </span>
          </motion.div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}