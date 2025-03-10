import React from "react";
import { Skull, Bird } from "lucide-react";

export interface AgentInfo {
  name: string;
  icon: React.ReactNode;
  description: string[];
  cardStyle: string;
  buttonStyle: string;
  nameStyle: string;
  backgroundImage: string;
}

export const getAgentInfo = (riskLevel: string): Record<string, AgentInfo> => {
  return {
    High: {
      name: "Abra Kadabra",
      icon: <Skull className="w-8 h-8 text-red-600" />,
      description: [
        "Specializes in high-risk operations",
        "Known for aggressive tactics",
        "Leaves no trace behind",
        "Success rate: 92%",
      ],
      cardStyle:
        "bg-gradient-to-br from-[#3a0000] to-[#1a0000] border-2 border-red-900",
      buttonStyle: "bg-red-700 hover:bg-red-800 text-white",
      nameStyle: "font-serif text-red-500",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
    },
    Moderate: {
      name: "The Crutio",
      icon: (
        <svg
          className="w-8 h-8 text-green-700"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.9 5C19.3 4.4 18.4 4.5 17.8 5.1L16 7.3L14.2 5.1C13.6 4.5 12.7 4.4 12.1 5C11.5 5.6 11.4 6.5 12 7.1L13.8 9.3L7.3 16.8C6.7 17.4 6.7 18.4 7.3 19C7.9 19.6 8.9 19.6 9.5 19L16 12.2L17.8 14.4C18.4 15 19.3 15.1 19.9 14.5C20.5 13.9 20.6 13 20 12.4L18.2 10.2L20 8C20.6 7.4 20.5 6.5 19.9 5Z"
            fill="currentColor"
          />
          <path
            d="M7.3 5C6.7 5.6 6.7 6.6 7.3 7.2L9.5 9.4L8.3 10.6L6.1 8.4C5.5 7.8 4.6 7.7 4 8.3C3.4 8.9 3.3 9.8 3.9 10.4L6.1 12.6L4.9 13.8L2.7 11.6C2.1 11 1.2 10.9 0.6 11.5C0 12.1 -0.1 13 0.5 13.6L4.5 17.6C5.1 18.2 6.1 18.2 6.7 17.6C7.3 17 7.3 16 6.7 15.4L5.5 14.2L6.7 13L7.9 14.2C8.5 14.8 9.5 14.8 10.1 14.2C10.7 13.6 10.7 12.6 10.1 12L8.9 10.8L10.1 9.6L11.3 10.8C11.9 11.4 12.9 11.4 13.5 10.8C14.1 10.2 14.1 9.2 13.5 8.6L12.3 7.4L13.5 6.2L14.7 7.4C15.3 8 16.3 8 16.9 7.4C17.5 6.8 17.5 5.8 16.9 5.2L12.9 1.2C12.3 0.6 11.3 0.6 10.7 1.2C10.1 1.8 10.1 2.8 10.7 3.4L12.9 5.6L11.7 6.8L9.5 4.6C8.9 4 7.9 4.4 7.3 5Z"
            fill="currentColor"
          />
        </svg>
      ),
      description: [
        "Balanced approach to risk management",
        "Tactical and methodical",
        "Adapts to changing situations",
        "Success rate: 87%",
      ],
      cardStyle:
        "bg-gradient-to-br from-[#1a2a1a] to-[#0a1a0a] border-2 border-green-900",
      buttonStyle: "bg-green-800 hover:bg-green-900 text-white",
      nameStyle: "font-mono text-green-500",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1581852017103-68ac65514cf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
    },
    Low: {
      name: "The Ascendio",
      icon: <Bird className="w-8 h-8 text-blue-100" />,
      description: [
        "Specializes in safe, low-risk operations",
        "Cautious and thorough",
        "Prioritizes safety above all",
        "Success rate: 99%",
      ],
      cardStyle:
        "bg-gradient-to-br from-[#1a2a3a] to-[#0a1a2a] border-2 border-blue-900",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      nameStyle: "font-sans text-blue-300",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1548266652-99cf27701ced?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
    },
  };
};
