import React from "react";
import { motion } from "framer-motion";
import { TopicSelection } from "../TopicSelection/TopicSelection";
import { AlloraTopic } from "../../utils/alloraTopics";
import { TopicState } from "../../pages/JoinFriends/types";

interface VaultFormProps {
  vaultHash: string;
  setVaultHash: (hash: string) => void;
  riskLevel: string;
  handleRiskChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedTopics: TopicState[];
  options: AlloraTopic[];
  updateTopicSelection: (
    index: number,
    topicId: number | null,
    topicName: string
  ) => void;
}

export const VaultForm: React.FC<VaultFormProps> = ({
  vaultHash,
  setVaultHash,
  riskLevel,
  handleRiskChange,
  selectedTopics,
  options,
  updateTopicSelection,
}) => {
  return (
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
  );
};
