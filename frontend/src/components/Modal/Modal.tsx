import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  output: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, output }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-[#a3ff47]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#a3ff47]">
            Analysis Result
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="text-gray-300 mb-6">{output}</div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Investment logic will go here
              console.log("Investment button clicked");
            }}
            className="px-4 py-2 rounded-md bg-[#a3ff47] text-gray-900 font-semibold hover:bg-[#8ce33a] transition-colors"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
};
