import React from "react";
import { motion } from "framer-motion";
import { Users, BarChart2 } from "lucide-react";
import { AgentInfo } from "./AgentInfo";

interface AgentCardProps {
  riskLevel: string;
  currentAgent: AgentInfo;
  marketData: string | null;
  showPredictButton: boolean;
  output: string | null;
  recommendation: string;
  onPredictClick: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  riskLevel,
  currentAgent,
  marketData,
  showPredictButton,
  output,
  recommendation,
  onPredictClick,
  onSubmit,
}) => {
  return (
    <motion.div
      className={`w-1/4 ${currentAgent.cardStyle} p-6 rounded-lg shadow-lg text-white h-[70vh] flex flex-col justify-between overflow-hidden relative`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center z-0"
        style={{ backgroundImage: currentAgent.backgroundImage }}
      />

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-4">Risk Level: {riskLevel}</h2>

        <div className="flex items-center justify-between mb-4">
          <div className="flex-shrink-0">{currentAgent.icon}</div>
          <h3 className={`text-2xl ${currentAgent.nameStyle} text-right`}>
            {currentAgent.name}
          </h3>
        </div>

        <div className="mt-6">
          <h4 className="text-lg font-bold border-b border-white/30 pb-2 mb-3">
            About the Agent
          </h4>
          <ul className="space-y-2">
            {currentAgent.description.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          {marketData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-3 rounded-md ${
                riskLevel === "High"
                  ? "text-red-500 font-bold italic"
                  : "bg-black/30 text-white font-mono text-sm whitespace-pre-line"
              }`}
            >
              {riskLevel === "High" ? (
                <>The Brave ones do not fear Volatility</>
              ) : (
                <div>
                  Risk Level: {riskLevel}
                  <br />
                  Volatility: {output}
                  <br />
                  {recommendation}
                </div>
              )}
            </motion.div>
          ) : (
            showPredictButton && (
              <button
                onClick={onPredictClick}
                className={`px-4 py-2 ${currentAgent.buttonStyle} font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300`}
              >
                <BarChart2 className="w-8 h-8" />
                <span>Predict Market Volatility</span>
              </button>
            )
          )}
        </div>
      </div>

      <button
        onClick={onSubmit}
        className={`w-full ${currentAgent.buttonStyle} font-medium py-3 mt-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 relative z-10`}
      >
        <Users className="w-5 h-5" /> Join Vault
      </button>
    </motion.div>
  );
};
