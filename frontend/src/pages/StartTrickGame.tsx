import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Dices, Users, Coins } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

export const StartTrickGame: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vaultName: "",
    difficulty: "easy",
    players: "2",
    vaultValue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    navigate("/join-friends");
  };

  return (
    <PageTransition>
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-vault-dark/90 backdrop-blur-sm" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="card p-8">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent text-center">
              Start Trick Game
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vault Name
                </label>
                <input
                  type="text"
                  value={formData.vaultName}
                  onChange={(e) =>
                    setFormData({ ...formData, vaultName: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter Vault Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({ ...formData, difficulty: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Players
                </label>
                <select
                  value={formData.players}
                  onChange={(e) =>
                    setFormData({ ...formData, players: e.target.value })
                  }
                  className="input-field"
                >
                  {[2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} Players
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vault Value
                </label>
                <input
                  type="number"
                  value={formData.vaultValue}
                  onChange={(e) =>
                    setFormData({ ...formData, vaultValue: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter Vault Value"
                  step="0.01"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-8"
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
