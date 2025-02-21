import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, Coins } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

export const StoreVault: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    message: "",
    vaultValue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    navigate("/open-store-vault");
  };

  return (
    <PageTransition>
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80)",
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
              Store Vault
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message or Document
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors duration-300">
                  <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">
                    Drag and drop your file here, or click to select
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      // Handle file upload
                    }}
                  />
                </div>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="input-field mt-4"
                  placeholder="Or enter your message here"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vault Value
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.vaultValue}
                    onChange={(e) =>
                      setFormData({ ...formData, vaultValue: e.target.value })
                    }
                    className="input-field pl-12"
                    placeholder="Enter Vault Value"
                    step="0.01"
                    required
                  />
                  <Coins className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-8"
              >
                <Upload className="w-5 h-5" />
                Store in Vault
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
