import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer rotating circle */}
        <div className="w-32 h-32 border-8 border-[#a3ff47] rounded-full animate-[spin_3s_linear_infinite] opacity-20"></div>

        {/* Middle pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-8 border-[#a3ff47] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>

        {/* Inner spinning circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-8 border-[#a3ff47] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#a3ff47] rounded-full animate-[pulse_1s_ease-in-out_infinite]"></div>

        {/* Loading text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-[#a3ff47] font-bold text-xl animate-[bounce_1s_ease-in-out_infinite]">
          Loading...
        </div>
      </div>
    </div>
  );
};
