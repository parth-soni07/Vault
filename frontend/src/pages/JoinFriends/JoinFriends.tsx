import React, { useState } from "react";
import { PageTransition } from "../../components/PageTransition";
import { RulesCard } from "../../components/RulesCard/RulesCard";
import { VaultForm } from "../../components/VaultForm/VaultForm";
import { AgentCard } from "../../components/AgentCard/AgentCard";
import { Loading } from "../../components/Loading/Loading";
import { getContract } from "../../contract";
import { getAgentInfo } from "../../components/AgentCard/AgentInfo";
import { JoinFriendsProps, TopicState } from "./types";
import { generateMarketData } from "./utils";

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
  const agentInfo = getAgentInfo(riskLevel);
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
  const handleSubmit = async () => {
    try {
      if (!selectedTopics || selectedTopics.length === 0) {
        alert("Please select at least one topic.");
        return;
      }
      setIsLoading(true);
      let topicIds = selectedTopics
        .map((topic) => topic.id)
        .filter((id) => id !== null && id !== 0) as number[];
      let inferenceResults: string[] = [];
      if (riskLevel === "High") {
        // Ensure we have exactly 3 topic IDs
        if (topicIds.length < 3) {
          alert("High risk level requires exactly 3 topics.");
          setIsLoading(false);
          return;
        }
        console.log("Fetching inference for 3 topics:", topicIds);
        // Fetch inference for each topic separately and store results
        for (const topicId of topicIds) {
          const response = await fetch("http://localhost:5000/run-script", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_id: topicId }),
          });
          const data = await response.json();
          if (!response.ok) {
            return;
          }
          inferenceResults.push(data.inference);
        }
      } else {
        // Use only the first topic ID for Low/Medium risk levels
        if (topicIds.length < 1) {
          alert("Please select at least one topic.");
          setIsLoading(false);
          return;
        }
        console.log("Fetching inference for 1 topic:", topicIds[0]);
        const response = await fetch("http://localhost:5000/run-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic_id: topicIds[0] }),
        });
        const data = await response.json();
        if (!response.ok) {
          setOutput(`Error: ${data.error}`);
          return;
        }
        inferenceResults.push(data.inference);
      }
      console.log("Received Inference Results:", inferenceResults);
      // Ensure exactly 3 values for contract call (pad with 0 if needed)
      while (inferenceResults.length < 3) {
        inferenceResults.push("0");
      }
      const formattedInferences: [number, number, number] = [
        Math.round(parseFloat(inferenceResults[0]) || 0),
        Math.round(parseFloat(inferenceResults[1]) || 0),
        Math.round(parseFloat(inferenceResults[2]) || 0),
      ];

      console.log("Formatted Inferences for Contract:", formattedInferences);

      // Connect to contract
      const contract = await getContract();
      if (!contract) {
        setOutput("Failed to connect to contract.");
        return;
      }

      // Send transaction to smart contract
      const tx = await contract.joinVault(vaultHash, formattedInferences);
      const receipt = await tx.wait();
      console.log("Transaction Receipt:", receipt);

      setOutput(`Inference Results: ${formattedInferences.join(", ")}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setOutput("An error occurred while processing.");
    } finally {
      setIsLoading(false);
    }
  };


  const handlePredictClick = async () => {
    if (riskLevel === "High") {
      setShowPredictButton(false);
      setMarketData(
        "Brave Investors Don't Look at Volatilities of the market."
      );
    } else if (riskLevel === "Moderate") {
      const responseSOL = await fetch("http://localhost:5000/run-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic_id: 40 }),
      });
      const dataSOL = await responseSOL.json();
      if (responseSOL.ok) {
        // Store results in local variables
        const solInference = dataSOL.inference;
        setOutput(solInference);
        setRecommendation(
          "Crutio recommends SOL due to its low volatility predictions"
        );
      } else {
        setOutputETH(`Error: ${dataSOL.error}`);
      }
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
        const dummyData = generateMarketData(riskLevel, output);
        setMarketData(dummyData);
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6 gap-8">
        {/* Rules Card */}
        <RulesCard />

        {/* Center Card (Vault Code & Topic Selection) */}
        <VaultForm
          vaultHash={vaultHash}
          setVaultHash={setVaultHash}
          riskLevel={riskLevel}
          handleRiskChange={handleRiskChange}
          selectedTopics={selectedTopics}
          options={options}
          updateTopicSelection={updateTopicSelection}
        />

        {/* Dynamic Agent Info Card */}
        <AgentCard
          riskLevel={riskLevel}
          currentAgent={currentAgent}
          marketData={marketData}
          showPredictButton={showPredictButton}
          output={output}
          recommendation={recommendation}
          onPredictClick={handlePredictClick}
          onSubmit={handleSubmit}
        />

        <Loading isLoading={isLoading} />
      </div>
    </PageTransition>
  );
};
