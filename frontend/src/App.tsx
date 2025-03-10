import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// INTERNAL IMPORTS
import { AnimatePresence } from "framer-motion";
import { VaultSelection } from "./pages/VaultSelection";
import { StartTrickGame } from "./pages/StartTrickGame";
import { JoinFriends } from "./pages/JoinFriends/JoinFriends";
import { OpenVault } from "./pages/OpenVault";
import { StoreVault } from "./pages/StoreVault";
import { OpenStoreVault } from "./pages/OpenStoreVault";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Success } from "./pages/Success";
import { results, lowRisk, moderateRisk, highRisk } from "./utils/alloraTopics";
import "./styles/globals.css";
function App() {
  const [selected, setSelected] = useState("Option 1");
  const [riskLevel, setRiskLevel] = useState("Low");

  // Determine which array to use based on risk level
  const getOptions = () => {
    if (riskLevel === "Low") return lowRisk;
    if (riskLevel === "Moderate") return moderateRisk;
    if (riskLevel === "High") return highRisk;
    return results;
  };
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#030927] to-[#020617] immersive-bg">
        <AnimatePresence mode="wait">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  selected={selected}
                  setSelected={setSelected}
                  options={results}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success" element={<Success selected={selected} />} />
            <Route path="/select-vault" element={<VaultSelection />} />
            <Route path="/start-trick-game" element={<StartTrickGame />} />
            <Route
              path="/join-friends"
              element={
                <JoinFriends
                  options={getOptions()}
                  setRiskLevel={setRiskLevel}
                />
              }
            />
            <Route path="/open-vault" element={<OpenVault />} />
            <Route path="/store-vault" element={<StoreVault />} />
            <Route path="/open-store-vault" element={<OpenStoreVault />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
