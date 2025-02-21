import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold text-[#a3ff47] mb-6">
          About <span className="text-yellow-300">CrayonApp</span>
        </h1>
        <p className="text-gray-300 text-xl leading-relaxed">
          Welcome to CrayonApp, where creativity meets technology. We're passionate about 
          bringing your ideas to life with a touch of playful innovation and professional excellence.
        </p>
      </div>
    </div>
  );
};