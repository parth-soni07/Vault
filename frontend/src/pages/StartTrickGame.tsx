import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dices, Users, Coins } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { TopicSelection } from "../components/TopicSelection/TopicSelection";
import { AlloraTopic } from "../utils/alloraTopics";

interface StartTrickGameProps {
  options: AlloraTopic[];
}

interface TopicState {
  id: number | null;
  name: string;
}

export const StartTrickGame: React.FC<StartTrickGameProps> = ({ options }) => {
  const [showExtraSelections, setShowExtraSelections] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<TopicState[]>([
    { id: null, name: "" },
    { id: null, name: "" },
    { id: null, name: "" },
    { id: null, name: "" },
  ]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    vaultName: "",
    difficulty: "easy",
    players: "2",
    vaultValue: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected topics:", selectedTopics);
    navigate("/join-friends");
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#121212]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-xl border border-[#9ef01a]/20">
            <h1 className="text-3xl font-bold mb-6 text-[#9ef01a] text-center">
              Start Trick Game
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                  Vault Name
                </label>
                <input
                  type="text"
                  value={formData.vaultName}
                  onChange={(e) =>
                    setFormData({ ...formData, vaultName: e.target.value })
                  }
                  className="w-full bg-[#232323] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a] placeholder-[#9ef01a]/50 focus:outline-none focus:ring-2 focus:ring-[#9ef01a]/50"
                  placeholder="Enter Vault Name"
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

              <div>
                <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                  Number of Players
                </label>
                <select
                  value={formData.players}
                  onChange={(e) =>
                    setFormData({ ...formData, players: e.target.value })
                  }
                  className="w-full bg-[#232323] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a] focus:outline-none focus:ring-2 focus:ring-[#9ef01a]/50"
                >
                  {[2, 3, 4, 5].map((num) => (
                    <option key={num} value={num} className="bg-[#232323]">
                      {num} Players
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                  Vault Value
                </label>
                <input
                  type="number"
                  value={formData.vaultValue}
                  onChange={(e) =>
                    setFormData({ ...formData, vaultValue: e.target.value })
                  }
                  className="w-full bg-[#232323] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a] placeholder-[#9ef01a]/50 focus:outline-none focus:ring-2 focus:ring-[#9ef01a]/50"
                  placeholder="Enter Vault Value"
                  step="0.01"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#9ef01a] hover:bg-[#8bd919] text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 mt-8 transition-colors duration-200"
              >
                <Dices className="w-5 h-5" />
                Start Game
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default StartTrickGame;
