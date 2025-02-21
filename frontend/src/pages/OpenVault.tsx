import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Key } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

export const OpenVault: React.FC = () => {
  const navigate = useNavigate();
  const [vaultKey, setVaultKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    navigate("/store-vault");
  };

  return (
    <PageTransition>
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80)",
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
              Open Vault
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vault Key
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={vaultKey}
                    onChange={(e) => setVaultKey(e.target.value)}
                    className="input-field pl-12"
                    placeholder="Enter Vault Key"
                    required
                  />
                  <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-8"
              >
                <Key className="w-5 h-5" />
                Open Vault
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
