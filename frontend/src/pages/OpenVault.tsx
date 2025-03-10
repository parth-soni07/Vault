import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Key } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { getContract } from "../contract";

export const OpenVault: React.FC = () => {
  const navigate = useNavigate();
  const [vaultKey, setVaultKey] = useState("");
  const [vaultData, setVaultData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contract = await getContract();
      if (!contract) return;

      // Call openVault function from the smart contract
      const tx = await contract.openVault(vaultKey);
      const receipt = await tx.wait();
      console.log("Transaction Receipt:", receipt);

      const vaultName = await contract.getVaultName(vaultKey);
      const vaultAmount = await contract.getVaultAmount(vaultKey);
      const vaultAdmin = await contract.getVaultAdmin(vaultKey);
      const fetchedVaultData = {
        vaultName: vaultName,
        vaultAdmin: vaultAdmin,
        vaultAmount: vaultAmount,
      };

      setTimeout(() => {
        setVaultData(fetchedVaultData);
        setLoading(false);
      }, 1000); // Simulating API delay
    } catch (error) {
      console.error("Error fetching vault data:", error);
      setLoading(false);
    }
  };

  if (vaultData) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-3xl"
          >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full">
              <h1 className="text-3xl font-bold text-center mb-6">
                Vault Details
              </h1>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-4 text-left">Winner Address Address</th>
                    <th className="p-4 text-left">Vault Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-green-500 text-white">
                      {vaultData.vaultAdmin}
                    </td>
                    <td>{vaultData.vaultAmount}</td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={() => navigate("/select-vault")}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
              >
                Back to Vaults
              </button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

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
                disabled={loading}
              >
                {loading ? "Opening Vault..." : "Open Vault"}
                <Key className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
