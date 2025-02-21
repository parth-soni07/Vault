import React from 'react';
import { CheckCircle } from 'lucide-react';

export const Success: React.FC<{ selected: string }> = ({ selected }) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <CheckCircle className="w-20 h-20 text-[#a3ff47] mx-auto mb-6" />
        <h1 className="text-5xl font-bold text-[#a3ff47] mb-6">
          Awesome <span className="text-yellow-300">Choice!</span>
        </h1>
        <p className="text-gray-300 text-xl mb-8">
          You selected: <span className="text-[#a3ff47] font-semibold">{selected}</span>
        </p>
        <p className="text-gray-300 text-lg">
          We'll get started on your creative journey right away.
        </p>
      </div>
    </div>
  );
};