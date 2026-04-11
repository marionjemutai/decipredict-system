// Footer.jsx
import { Brain, Mail } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"; 
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500 rounded-full blur-3xl" animate={{ y: [0, 50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500 rounded-full blur-3xl" animate={{ y: [0, -50, 0], scale: [1.2, 1, 1.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}/>
      </div>
       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.div className="py-8 sm:py-10 md:py-12 border-b border-white/10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}  viewport={{ once: true }}  transition={{ duration: 0.6 }}>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 px-4">
              Get Regret Prediction Insights
            </h3>
            <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6 px-4">
              Subscribe to receive weekly tips on avoiding regret and making better decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input type="email" placeholder="Enter your email"  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50" />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="py-8 sm:py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">RegretPredict</span>
            </div>

            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                <FaGithub />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-50 py-4">
            <motion.div className="flex flex-col items-center md:items-start text-center md:text-left px-4" initial={{ opacity: 0, y: 20 }}  whileInView={{ opacity: 1, y: 0 }}  viewport={{ once: true }}  transition={{ duration: 0.6, delay: 0.1 }}>
              <h3 className="font-semibold mb-4 text-white text-base tracking-wide">
                 Navigation
              </h3>
               <ul className="space-y-3">
                 {["Home", "Dashboard", "Decisions", "About", "Features"].map((item) => (
                  <li key={item}>
                   <a href="#" className="text-sm text-blue-100 hover:text-white transition-all duration-300 inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                       </span>
                  </a>
                   </li>
                    ))}
               </ul>
            </motion.div>
            <motion.div className="flex flex-col items-center md:items-start text-center md:text-left px-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} >
              <h3 className="font-semibold mb-4 text-white text-base tracking-wide">
                Features
              </h3>
               <ul className="space-y-3">
                 {[
                   "Decision Prediction",
                   "Regret Analysis",
                   "Decision Feedback",
                   "AI Insights",
                   "Analytics Dashboard"
                    ].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-blue-100 hover:text-white transition-all duration-300 inline-flex items-center group">
                        <span className="group-hover:translate-x-1 transition-transform">
                          {item}
                        </span>
                      </a>
                   </li>
                    ))}
                </ul>
            </motion.div>
            <motion.div className="flex flex-col items-center md:items-start text-center md:text-left px-4"  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} >
              <h3 className="font-semibold mb-4 text-white text-base tracking-wide">
                  Resources
              </h3>
              <ul className="space-y-3">
                {["Documentation", "Support", "Blog", "Privacy Policy", "Terms"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-blue-100 hover:text-white transition-all duration-300 inline-flex items-center group" >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item}
                      </span>
                     </a>
                  </li>
                 ))}
               </ul>
                  </motion.div>
                  
            </div>
            </div> 
                <div className="py-4 sm:py-6 border-t border-white/10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-blue-100 text-xs sm:text-sm text-center md:text-left">
                      © {currentYear} RegretPredict. All rights reserved.
                      </p>
                      <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
                        <a href="#" className="text-blue-100 hover:text-white transition-colors">Privacy
                           </a>
                           <a href="#" className="text-blue-100 hover:text-white transition-colors"> Terms</a>
                            <a href="#" className="text-blue-100 hover:text-white transition-colors"> Cookies </a>
                       </div>
                    </div>
                 </div>

      </div>
    </footer>
  );
}