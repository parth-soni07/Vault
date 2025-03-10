import React from "react";

export const RulesCard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-lg max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4 text-center">
        Welcome to Sonic TradeZo – The Ultimate AI-Powered Betting Game!
        <br />
        using <span className="text-pink-900">Zerepy & Allora </span>
      </h1>

      <p className="text-lg mb-6 text-gray-300 text-center">
        Are you ready to test your instincts, choose your AI agent, and dominate
        the market? <br />
        <span className="text-green-400 font-semibold">
          The winner takes it all!
        </span>
      </p>

      <h2 className="text-2xl font-semibold text-blue-400 mb-3">
        How It Works:
      </h2>
      <ul className="list-disc pl-6 space-y-3 text-gray-300">
        <li>
          <span className="text-red-400 font-semibold">Join a Vault</span> –
          Enter a high-energy trading vault where you’ll battle for ultimate
          profits.
        </li>
        <li>
          <span className="text-purple-400 font-semibold">
            Choose Your AI Agent
          </span>{" "}
          – Pick the perfect AI to trade on your behalf:
          <ul className="list-disc pl-6 mt-2">
            <li>
              <span className="text-red-500 font-semibold">Abra Kadabra</span>{" "}
              (Aggressive) – High risk, high reward!
            </li>
            <li>
              <span className="text-yellow-400 font-semibold">The Crutio</span>{" "}
              (Moderate) – A balanced approach to winning.
            </li>
            <li>
              <span className="text-green-400 font-semibold">The Ascendio</span>{" "}
              (Low) – Play it safe and steady.
            </li>
          </ul>
        </li>
        <li>
          <span className="text-orange-400 font-semibold">
            Predict Market Risk
          </span>{" "}
          – Get insights on the risk levels before making your move.
        </li>
        <li>
          <span className="text-pink-400 font-semibold">Place Your Bet</span> –
          Invest your money into the vault and trust your AI to make the best
          trades.
        </li>
        <li>
          <span className="text-cyan-400 font-semibold">
            Call-Off Timer Ends
          </span>{" "}
          – The vault admin opens the trades once the timer expires.
        </li>
        <li>
          <span className="text-yellow-400 font-semibold">
            The Best Trader Wins
          </span>{" "}
          – The AI with the highest profit claims the entire vault!
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-400 mt-6 mb-3">
        Why Play TradeZo?
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        <li>
          <span className="text-blue-400 font-semibold">
            ✅ AI-Driven Market Predictions
          </span>
        </li>
        <li>
          <span className="text-purple-400 font-semibold">
            ✅ High-Risk, High-Reward Gameplay
          </span>
        </li>
        <li>
          <span className="text-yellow-400 font-semibold">
            ✅ One Winner Takes All
          </span>
        </li>
        <li>
          <span className="text-red-400 font-semibold">
            ✅ Thrilling & Unpredictable Trading Battles
          </span>
        </li>
      </ul>

      <p className="text-center text-lg font-bold mt-6 text-pink-400 animate-pulse">
        Are you ready to outsmart the market and win big? <br />
        <span className="text-yellow-500">Join TradeZo NOW!</span>
      </p>
    </div>
  );
};
