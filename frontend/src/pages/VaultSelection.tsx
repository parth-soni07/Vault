import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Users, Lock, Store, Key, Unlock } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

export const VaultSelection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen grid grid-cols-1">
        {/* Trick Game Section */}
        <section
          className="relative p-8 flex flex-col items-center justify-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?auto=format&fit=crop&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-vault-dark/80 backdrop-blur-sm" />

          <div className="relative z-10 max-w-md w-full space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Trick Game
                <br />
                (Zerepy & Allora)
              </h1>

              <div className="space-y-4">
                <button
                  onClick={() => navigate("/start-trick-game")}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Gamepad2 className="w-5 h-5" />
                  Start Trick Game
                </button>

                <button
                  onClick={() => navigate("/join-friends")}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Join Friends
                </button>

                <button
                  onClick={() => navigate("/open-vault")}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Open Vault
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
