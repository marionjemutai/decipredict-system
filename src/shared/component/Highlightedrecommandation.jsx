import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Star, CheckCircle2, TrendingUp, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";


export default function HighlightedRecommendation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="border-2 border-emerald-200 shadow-xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50">
        
        {/* Header */}
        <CardHeader className="pb-4 relative overflow-hidden">
          
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-teal-100/50"></div>

          <div className="relative">
            
            {/* Top Row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              
              <div className="flex items-center gap-2">
                <motion.div
                  className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl shadow-md"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Star className="w-6 h-6 text-white fill-white" />
                </motion.div>

                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm">
                  AI RECOMMENDED
                </span>
              </div>

              {/* Confidence */}
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  92%
                </div>
                <p className="text-xs text-gray-600 font-medium">
                  Confidence
                </p>
              </div>
            </div>

            {/* Title */}
            <CardTitle className="text-xl sm:text-2xl text-gray-800 mb-2">
              Option A: Expand to New Market
            </CardTitle>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              Based on comprehensive analysis of market trends, risk factors, and your decision criteria,
              this option presents the optimal path forward with highest success probability.
            </p>

          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6 relative">

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">

            <div className="bg-white/80 rounded-xl p-4 text-center border border-emerald-100 shadow-sm">
              <TrendingUp className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-emerald-600">85%</p>
              <p className="text-xs text-gray-600 mt-1">Success Rate</p>
            </div>

            <div className="bg-white/80 rounded-xl p-4 text-center border border-amber-100 shadow-sm">
              <Shield className="w-5 h-5 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-amber-600">15%</p>
              <p className="text-xs text-gray-600 mt-1">Regret Risk</p>
            </div>

            <div className="bg-white/80 rounded-xl p-4 text-center border border-blue-100 shadow-sm">
              <Zap className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">$450K</p>
              <p className="text-xs text-gray-600 mt-1">ROI Potential</p>
            </div>

          </div>

          {/* Reasoning */}
          <div className="bg-white/80 rounded-xl p-5 border border-emerald-100 shadow-sm">
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Why This is Recommended
            </h4>

            <ul className="space-y-2.5">
              {[
                "Market analysis shows 87% growth potential in target demographic",
                "Your financial capacity aligns perfectly with required investment",
                "Historical data indicates low regret rate for similar decisions",
                "Time factors favor immediate action for optimal results",
                "Risk assessment shows manageable challenge levels",
              ].map((reason, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-sm text-gray-700"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg py-6">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Accept Recommendation
            </Button>

            <Button
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-50 font-semibold py-6"
            >
              View Detailed Analysis
            </Button>

          </div>

          {/* Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-600">
              This recommendation was generated using advanced AI algorithms analyzing 10,000+ similar decisions
            </p>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}