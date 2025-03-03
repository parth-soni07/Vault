import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Skull, Bird, BarChart2 } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { AlloraTopic } from "../utils/alloraTopics";
import { TopicSelection } from "../components/TopicSelection/TopicSelection";
import { getContract } from "../contract";
import { Loading } from "../components/Loading/Loading";

interface JoinFriendsProps {
  options: AlloraTopic[];
  setRiskLevel: (level: string) => void;
}

interface TopicState {
  id: number | null;
  name: string;
}

interface AgentInfo {
  name: string;
  icon: React.ReactNode;
  description: string[];
  cardStyle: string;
  buttonStyle: string;
  nameStyle: string;
  backgroundImage: string;
}

export const JoinFriends: React.FC<JoinFriendsProps> = ({
  options,
  setRiskLevel,
}) => {
  const [selectedTopics, setSelectedTopics] = useState<TopicState[]>([
    { id: null, name: "" },
  ]);
  const [vaultHash, setVaultHash] = useState("");
  const [riskLevel, setRisk] = useState("Low");
  const [showPredictButton, setShowPredictButton] = useState(true);
  const [marketData, setMarketData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outputETH, setOutputETH] = useState<string | null>(null);
  const [outputBTC, setOutputBTC] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  const agentInfo: Record<string, AgentInfo> = {
    High: {
      name: "Abra Kadabra",
      icon: <Skull className="w-8 h-8 text-red-600" />,
      description: [
        "Specializes in high-risk operations",
        "Known for aggressive tactics",
        "Leaves no trace behind",
        "Success rate: 92%",
      ],
      cardStyle:
        "bg-gradient-to-br from-[#3a0000] to-[#1a0000] border-2 border-red-900",
      buttonStyle: "bg-red-700 hover:bg-red-800 text-white",
      nameStyle: "font-serif text-red-500",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
    },
    Moderate: {
      name: "The Crutio",
      icon: (
        <svg
          className="w-8 h-8 text-green-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9 5C19.3 4.4 18.4 4.5 17.8 5.1L16 7.3L14.2 5.1C13.6 4.5 12.7 4.4 12.1 5C11.5 5.6 11.4 6.5 12 7.1L13.8 9.3L7.3 16.8C6.7 17.4 6.7 18.4 7.3 19C7.9 19.6 8.9 19.6 9.5 19L16 12.2L17.8 14.4C18.4 15 19.3 15.1 19.9 14.5C20.5 13.9 20.6 13 20 12.4L18.2 10.2L20 8C20.6 7.4 20.5 6.5 19.9 5Z"
            fill="currentColor"
          />
          <path
            d="M7.3 5C6.7 5.6 6.7 6.6 7.3 7.2L9.5 9.4L8.3 10.6L6.1 8.4C5.5 7.8 4.6 7.7 4 8.3C3.4 8.9 3.3 9.8 3.9 10.4L6.1 12.6L4.9 13.8L2.7 11.6C2.1 11 1.2 10.9 0.6 11.5C0 12.1 -0.1 13 0.5 13.6L4.5 17.6C5.1 18.2 6.1 18.2 6.7 17.6C7.3 17 7.3 16 6.7 15.4L5.5 14.2L6.7 13L7.9 14.2C8.5 14.8 9.5 14.8 10.1 14.2C10.7 13.6 10.7 12.6 10.1 12L8.9 10.8L10.1 9.6L11.3 10.8C11.9 11.4 12.9 11.4 13.5 10.8C14.1 10.2 14.1 9.2 13.5 8.6L12.3 7.4L13.5 6.2L14.7 7.4C15.3 8 16.3 8 16.9 7.4C17.5 6.8 17.5 5.8 16.9 5.2L12.9 1.2C12.3 0.6 11.3 0.6 10.7 1.2C10.1 1.8 10.1 2.8 10.7 3.4L12.9 5.6L11.7 6.8L9.5 4.6C8.9 4 7.9 4.4 7.3 5Z"
            fill="currentColor"
          />
        </svg>
      ),
      description: [
        "Balanced approach to risk management",
        "Tactical and methodical",
        "Adapts to changing situations",
        "Success rate: 87%",
      ],
      cardStyle:
        "bg-gradient-to-br from-[#1a2a1a] to-[#0a1a0a] border-2 border-green-900",
      buttonStyle: "bg-green-800 hover:bg-green-900 text-white",
      nameStyle: "font-mono text-green-500",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1581852017103-68ac65514cf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
    },
    Low: {
      name: "The Ascendio",
      icon: <Bird className="w-8 h-8 text-blue-100" />,
      description: [
        "Specializes in safe, low-risk operations",
        "Cautious and thorough",
        "Prioritizes safety above all",
        "Success rate: 99%",
      ],
      cardStyle:
        "bg-gradient-to-br from-[#1a2a3a] to-[#0a1a2a] border-2 border-blue-900",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      nameStyle: "font-sans text-blue-300",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1548266652-99cf27701ced?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
    },
  };

  const currentAgent = agentInfo[riskLevel];

  const handleRiskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRisk = e.target.value;
    setRisk(newRisk);
    setRiskLevel(newRisk);
    setShowPredictButton(true);
    setMarketData(null);
    setSelectedTopics(
      newRisk === "High"
        ? Array(3).fill({ id: null, name: "" })
        : [{ id: null, name: "" }]
    );
  };

  const updateTopicSelection = (
    index: number,
    topicId: number | null,
    topicName: string
  ) => {
    setSelectedTopics((prev) => {
      const newTopics = [...prev];
      newTopics[index] = { id: topicId, name: topicName };
      return newTopics;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Selected Topics:",
      selectedTopics.filter((topic) => topic.id !== null)
    );
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.joinVault(vaultHash, riskLevel);
      const receipt = await tx.wait();
      console.log("Transaction Receipt: ", receipt);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Transaction failed!");
    }
  };

  const handlePredictClick = async () => {
    if (riskLevel === "High") {
      setShowPredictButton(false);
      setMarketData(
        "Brave Investors Don't Look at Volatilities of the market."
      );
    } else {
      try {
        setIsLoading(true);

        // Fetch ETH and BTC predictions concurrently
        const [responseETH, responseBTC] = await Promise.all([
          fetch("http://localhost:5000/run-script", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_id: 19 }),
          }),
          fetch("http://localhost:5000/run-script", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_id: 20 }),
          }),
        ]);

        const dataETH = await responseETH.json();
        const dataBTC = await responseBTC.json();

        if (responseETH.ok && responseBTC.ok) {
          // Store results in local variables
          const ethInference = dataETH.inference;
          const btcInference = dataBTC.inference;

          // Update output states
          setOutputETH(ethInference);
          setOutputBTC(btcInference);

          // Get the topic name from state
          const topicName = selectedTopics[0]?.name;

          // Set output based on selected topic
          if (topicName === "ETH 24h") {
            setOutput(ethInference);
          } else if (topicName === "BTC 24h") {
            setOutput(btcInference);
          }

          // Determine recommendation
          if (ethInference != null && btcInference != null) {
            if (btcInference > ethInference) {
              setRecommendation(
                "Ascendio recommends: ETH due to its low volatility predictions"
              );
            } else {
              setRecommendation(
                "Ascendio recommends: BTC due to its low volatility predictions"
              );
            }
          }
        } else {
          setOutputETH(`Error: ${dataETH.error}`);
          setOutputBTC(`Error: ${dataBTC.error}`);
        }

        // Generate and set market data
        const dummyData = generateMarketData(riskLevel);
        setMarketData(dummyData);
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const generateMarketData = (risk: string) => {
    const volatility = risk === "Moderate" ? "Medium" : "Low";
    const trend = Math.random() > 0.5 ? "Upward" : "Downward";
    const percentage = (Math.random() * (risk === "Moderate" ? 5 : 2)).toFixed(
      2
    );

    return `Market Volatility: ${volatility}
Trend: ${trend}
Absolute Volatility: ${output}
Expected Change: ${percentage}%
Confidence: ${risk === "Moderate" ? "75%" : "92%"}`;
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6 gap-8">
        {/* Rules Card */}
        <div className="w-1/4 bg-[#232323] p-6 rounded-lg shadow-lg text-[#9ef01a]">
          <h1 className="text-xl font-bold mb-4">Game Rules</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            laoreet, odio ut malesuada gravida, tortor quam facilisis velit, ut
            eleifend eros massa non justo. Nam at gravida mauris. Vestibulum
            tempus sollicitudin libero, volutpat blandit dolor semper ac. Ut
            dolor turpis, finibus mattis mi ac, rhoncus sodales neque.
            Pellentesque dapibus, est ac dapibus faucibus, justo mi maximus est,
            semper eleifend mi dolor sit amet purus. Suspendisse in bibendum
            felis. Donec et vulputate lorem. Nam eu scelerisque nisl. Phasellus
            egestas, tortor eu mattis feugiat, sapien est ultricies ipsum, ac
            rutrum ligula massa sit amet lacus. Donec ultrices lorem eros, id
            finibus arcu auctor eu.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            laoreet, odio ut malesuada gravida, tortor quam facilisis velit, ut
            eleifend eros massa non justo. Nam at gravida mauris. Vestibulum
            tempus sollicitudin libero, volutpat blandit dolor semper ac. Ut
            dolor turpis, finibus mattis mi ac, rhoncus sodales neque.
            Pellentesque dapibus, est ac dapibus faucibus, justo mi maximus est,
            semper eleifend mi dolor sit amet purus. Suspendisse in bibendum
            felis. Donec et vulputate lorem. Nam eu scelerisque nisl. Phasellus
            egestas, tortor eu mattis feugiat, sapien est ultricies ipsum, ac
            rutrum ligula massa sit amet lacus. Donec ultrices lorem eros, id
            finibus arcu auctor eu.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            laoreet, odio ut malesuada gravida, tortor quam facilisis velit, ut
            eleifend eros massa non justo. Nam at gravida mauris. Vestibulum
            tempus sollicitudin libero, volutpat blandit dolor semper ac. Ut
            dolor turpis, finibus mattis mi ac, rhoncus sodales neque.
            Pellentesque dapibus, est ac dapibus faucibus, justo mi maximus est,
            semper eleifend mi dolor sit amet purus. Suspendisse in bibendum
            felis. Donec et vulputate lorem. Nam eu scelerisque nisl. Phasellus
            egestas, tortor eu mattis feugiat, sapien est ultricies ipsum, ac
            rutrum ligula massa sit amet lacus. Donec ultrices lorem eros, id
            finibus arcu auctor eu.
          </p>
        </div>

        {/* Center Card (Vault Code & Topic Selection) */}
        <motion.div className="w-1/3 bg-[#232323] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-[#9ef01a] text-center">
            Join Vault
          </h1>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                Vault Code
              </label>
              <input
                type="text"
                value={vaultHash}
                onChange={(e) => setVaultHash(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a]"
                placeholder="Enter Vault Code"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                Risk Level
              </label>
              <select
                value={riskLevel}
                onChange={handleRiskChange}
                className="w-full bg-[#1a1a1a] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a]"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Topic Selection */}
            {selectedTopics.map((_, index) => (
              <TopicSelection
                key={index}
                selectedTopicId={selectedTopics[index].id}
                options={options}
                onTopicSelect={(topicId, topicName) =>
                  updateTopicSelection(index, topicId, topicName)
                }
                onSubmit={() => {}}
              />
            ))}
          </form>
        </motion.div>

        {/* Dynamic Agent Info Card */}
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
                    <>
                      The Brave ones do not fear Volatility
                    </>
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
                    onClick={handlePredictClick}
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
            onClick={handleSubmit}
            className={`w-full ${currentAgent.buttonStyle} font-medium py-3 mt-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 relative z-10`}
          >
            <Users className="w-5 h-5" /> Join Vault
          </button>
        </motion.div>
        <Loading isLoading={isLoading} />
      </div>
    </PageTransition>
  );
};
