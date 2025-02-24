import React from "react";
import { motion } from "framer-motion";

interface TopicState {
  id: number | null;
  name: string;
}

interface TopicMapProps {
  topics: TopicState[];
}

const lineColors = ["#4A90E2", "#50E3C2", "#F5A623"];

const positions = [
  { x: 20, y: 30 },
  { x: 70, y: 20 },
  { x: 60, y: 50 },
  { x: 30, y: 70 },
];

export const TopicMap: React.FC<TopicMapProps> = ({ topics }) => {
  const activeTopics = topics.filter((topic) => topic.name !== "");

  const calculatePath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    gap: number = 10
  ) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const ratio = (distance - gap * 2) / distance;
    const adjustedStartX = startX + dx * ((1 - ratio) / 2);
    const adjustedStartY = startY + dy * ((1 - ratio) / 2);
    const adjustedEndX = endX - dx * ((1 - ratio) / 2);
    const adjustedEndY = endY - dy * ((1 - ratio) / 2);

    const midX = (adjustedStartX + adjustedEndX) / 2;
    const midY = (adjustedStartY + adjustedEndY) / 2;
    const waveHeight = 20;
    const waveWidth = (adjustedEndX - adjustedStartX) / 3;

    return `
      M ${adjustedStartX},${adjustedStartY}
      C ${adjustedStartX + waveWidth},${adjustedStartY - waveHeight} ${
      midX - waveWidth
    },${midY + waveHeight} ${midX},${midY}
      S ${adjustedEndX - waveWidth},${
      adjustedEndY - waveHeight
    } ${adjustedEndX},${adjustedEndY}
    `;
  };

  return (
    <div className="h-full relative overflow-hidden bg-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d0d0d0 1px, transparent 1px),
            linear-gradient(to bottom, #d0d0d0 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          backgroundPosition: "center center",
        }}
      />

      <div className="relative h-full w-full">
        <svg className="absolute inset-0 w-full h-full">
          {activeTopics.map((_, index) => {
            if (index < activeTopics.length - 1) {
              const start = positions[index];
              const end = positions[index + 1];
              const path = calculatePath(
                start.x * 10,
                start.y * 8,
                end.x * 10,
                end.y * 8
              );

              return (
                <g key={`connection-${index}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke={lineColors[index]}
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                </g>
              );
            }
            return null;
          })}
        </svg>

        {activeTopics.map((topic, index) => {
          let adjustedY = positions[index].y;
          if (index === activeTopics.length - 1) adjustedY -= 6;
          if (index === activeTopics.length - 2) adjustedY -= 4;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${positions[index].x}%`,
                top: `${adjustedY}%`,
                color: lineColors[index],
              }}
            >
              <span className="text-lg font-medium whitespace-nowrap">
                {topic.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
