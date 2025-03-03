import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { getContract } from "../contract";
import { Loading } from "../components/Loading/Loading";
import { VaultHashModal } from "../components/Modal/VaultHashModal";

export const StartTrickGame: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formOutput, setFormOutput] = useState("");
  const [formDuration, setDuration] = useState({
    durationInSeconds: 0,
    unit: "days", // Default unit
    duration: 2,
  });
  const [formData, setFormData] = useState({
    vaultName: "",
    players: "2",
    vaultValue: "",
    duration: 0,
  });
  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      vaultName: "",
      players: "2",
      vaultValue: "",
      duration: 0,
    });
    setFormOutput("");
  };
  const handleUnitChange = (e: any) => {
    const unit = e.target.value;
    let newDuration = 2;

    if (unit === "minutes") {
      newDuration = 5;
    } else if (unit === "hours") {
      newDuration = 8;
    }

    setDuration({
      unit,
      duration: newDuration,
      durationInSeconds: convertToSeconds(newDuration, unit),
    });
  };
  const handleDurationChange = (e: any) => {
    const duration = Number(e.target.value);
    setDuration({
      ...formDuration,
      duration,
      durationInSeconds: convertToSeconds(duration, formDuration.unit),
    });
  };
  const convertToSeconds = (value: any, unit: any) => {
    switch (unit) {
      case "days":
        setFormData({ ...formData, duration: value * 24 * 60 * 60 });
        return value * 24 * 60 * 60;
      case "hours":
        setFormData({ ...formData, duration: value * 60 * 60 });
        return value * 60 * 60;
      case "minutes":
        setFormData({ ...formData, duration: value * 60 });
        return value * 60;
      default:
        return 0;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const contract = await getContract();
      if (!contract) return;
      const vaultHash = await contract.startGameAdmin.staticCall(
        formData.vaultName,
        parseInt(formData.players),
        formData.duration,
        parseInt(formData.vaultValue)
      );
      console.log("Vault Hash: ", vaultHash);
      setFormOutput(vaultHash);
      const tx = await contract.startGameAdmin(
        formData.vaultName,
        parseInt(formData.players),
        formData.duration,
        parseInt(formData.vaultValue)
      );
      const receipt = await tx.wait();
      setShowModal(true);
      console.log("Transaction Receipt: ", receipt);
    } catch (error) {
      console.error("Error starting game:", error);
      alert("Transaction failed!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-[#121212]">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: 430 }}
          className="w-1/2 flex items-center justify-center p-6"
        >
          <div className="w-full max-w-md">
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
                <div>
                  <label className="block text-sm font-medium text-[#9ef01a] mb-2">
                    Duration
                  </label>
                  <div className="flex space-x-2">
                    {/* Unit Selection */}
                    <select
                      value={formDuration.unit}
                      onChange={handleUnitChange}
                      className="w-full bg-[#232323] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a] focus:outline-none focus:ring-2 focus:ring-[#9ef01a]/50"
                    >
                      <option value="days">Days</option>
                      <option value="hours">Hours</option>
                      <option value="minutes">Minutes</option>
                    </select>
                    {/* Duration Selection */}
                    <select
                      value={formDuration.duration}
                      onChange={handleDurationChange}
                      className="w-full bg-[#232323] border border-[#9ef01a] rounded-lg px-4 py-2 text-[#9ef01a] focus:outline-none focus:ring-2 focus:ring-[#9ef01a]/50"
                    >
                      {formDuration.unit === "days" &&
                        [2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} Days
                          </option>
                        ))}
                      {formDuration.unit === "hours" &&
                        [8, 24].map((num) => (
                          <option key={num} value={num}>
                            {num} Hours
                          </option>
                        ))}
                      {formDuration.unit === "minutes" && (
                        <option value={5}>5 Minutes</option>
                      )}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#9ef01a] hover:bg-[#8bd919] text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 mt-8 transition-colors duration-200"
                >
                  <Dices className="w-5 h-5" />
                  Start Game
                </button>
              </form>
              <Loading isLoading={isLoading} />
              <VaultHashModal
                isOpen={showModal}
                onClose={handleModalClose}
                output={formOutput || ""}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default StartTrickGame;
