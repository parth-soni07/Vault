import React from 'react';
import { Send } from 'lucide-react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, disabled }) => {
  const baseClasses = "custom-button group px-8 py-4 bg-yellow-300 text-gray-900 rounded-full font-semibold flex items-center gap-3 transition-all duration-300";
  const enabledClasses = "hover:bg-[#a3ff47] hover:scale-105 hover:shadow-[0_0_30px_rgba(163,255,71,0.3)]";
  const disabledClasses = "opacity-50 cursor-not-allowed hover:translate-x-12";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses}`}
    >
      {children}
      <Send 
        size={20} 
        className="transform transition-all duration-300 group-hover:translate-x-1" 
      />
    </button>
  );
};