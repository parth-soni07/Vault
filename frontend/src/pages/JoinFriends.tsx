import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Lock } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

export const JoinFriends: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vaultCode: "",
    visibility: "public",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    navigate("/open-vault");
  };

  return (
    <PageTransition>
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80)",
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
              Join Friends
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vault Code
                </label>
                <input
                  type="text"
                  value={formData.vaultCode}
                  onChange={(e) =>
                    setFormData({ ...formData, vaultCode: e.target.value })
                  }
                  className="input-field"
                  placeholder="Enter Vault Code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) =>
                    setFormData({ ...formData, visibility: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-8"
              >
                <Users className="w-5 h-5" />
                Join Game
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
