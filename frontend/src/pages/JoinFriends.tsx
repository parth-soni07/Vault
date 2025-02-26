import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users} from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { AlloraTopic } from "../utils/alloraTopics";
import { TopicSelection } from "../components/TopicSelection/TopicSelection";
import { TopicMap } from "../components/TopicMap/TopicMap";
import { getContract } from "../contract";

interface JoinFriendsProps {
  options: AlloraTopic[];
}
interface TopicState {
  id: number | null;
  name: string;
}
export const JoinFriends: React.FC<JoinFriendsProps> = ({ options }) => {
  const [showExtraSelections, setShowExtraSelections] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<TopicState[]>([
    { id: null, name: "" },
    { id: null, name: "" },
    { id: null, name: "" },
    { id: null, name: "" },
  ]);
  const [vaultHash, setVaultHash] = useState("");
  const handleTopicSelection = async () => {};
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
    try {
      const contract = await getContract();
      if (!contract) return;
      const tx = await contract.joinVault(vaultHash);
      const receipt = await tx.wait();
      console.log("Transaction Receipt: ", receipt);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Transaction failed!");
    }
    setShowExtraSelections(false);
    setSelectedTopics([
      { id: null, name: "" },
      { id: null, name: "" },
      { id: null, name: "" },
      { id: null, name: "" },
    ]);
    setVaultHash("");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-vault-dark/90 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, x: -100 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="card p-8">
            <h1 className="text-3xl font-bold mb-6 text-[#9ef01a] text-center">
              Join Vault
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                  Vault Code
                </label>
                <input
                  type="text"
                  value={vaultHash}
                  onChange={(e) => setVaultHash(e.target.value)}
                  className="w-full bg-[#232323] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a] placeholder-[#9ef01a]/50 focus:outline-none focus:ring-2 focus:ring-[#9ef01a]/50"
                  placeholder="Enter Vault Code"
                  required
                />
              </div>
              <div className="space-y-4">
                <TopicSelection
                  selectedTopicId={selectedTopics[0].id}
                  options={options}
                  onTopicSelect={(topicId, topicName) => {
                    updateTopicSelection(0, topicId, topicName);
                  }}
                  onSubmit={handleTopicSelection}
                />

                <div className="flex items-center justify-between py-2">
                  <label className="text-sm font-medium text-[#9ef01a]">
                    More topics
                  </label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={showExtraSelections}
                    onClick={() => setShowExtraSelections(!showExtraSelections)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] ${
                      showExtraSelections ? "bg-[#9ef01a]" : "bg-red-500"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showExtraSelections ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                    <span className="sr-only">
                      {showExtraSelections ? "Yes" : "No"}
                    </span>
                  </button>
                </div>

                {showExtraSelections && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {[1, 2, 3].map((index) => (
                      <TopicSelection
                        key={index}
                        selectedTopicId={selectedTopics[index].id}
                        options={options}
                        onTopicSelect={(topicId, topicName) => {
                          updateTopicSelection(index, topicId, topicName);
                        }}
                        onSubmit={handleTopicSelection}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#9ef01a] hover:bg-[#8bd919] text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 mt-8 transition-colors duration-200"
              >
                <Users className="w-5 h-5" />
                Join Game
              </button>
            </form>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-1/2 fixed right-0 top-0 bottom-0"
        >
          <TopicMap topics={selectedTopics} />
        </motion.div>
      </div>
    </PageTransition>
  );
};
