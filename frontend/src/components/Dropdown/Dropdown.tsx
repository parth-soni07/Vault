import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AlloraTopic } from "../../utils/alloraTopics";

interface DropdownProps {
  options: AlloraTopic[];
  selectedTopicId: number | null;
  setSelectedTopic: (topicId: number, topicName: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedTopicId,
  setSelectedTopic,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedTopic = options.find(
    (topic) => topic.topic_id === selectedTopicId
  );

  return (
    <div className="relative w-72">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-gray-800/30 border-2 border-[#a3ff47] 
                 text-[#a3ff47] rounded-2xl flex items-center justify-between
                 hover:bg-gray-800/50 transition-all duration-300 focus:outline-none
                 shadow-[0_0_15px_rgba(163,255,71,0.1)] hover:shadow-[0_0_25px_rgba(163,255,71,0.2)]"
      >
        {selectedTopic ? selectedTopic.topic_name : "Select a Topic"}
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && options.length > 0 ? (
        <div
          className="dropdown-content absolute left-1/2 -translate-x-1/2 w-full mt-2 border-2 
                   border-[#a3ff47] rounded-2xl overflow-hidden z-10 bg-gray-800/60
                   max-h-[40vh] overflow-y-auto custom-scrollbar"
          style={{
            maxHeight: "min(40vh, 300px)",
            marginBottom: "20px",
          }}
        >
          <div className="py-1">
            {options.map((topic) => (
              <div
                key={topic.topic_id}
                onClick={() => {
                  setSelectedTopic(topic.topic_id, topic.topic_name);
                  setIsOpen(false);
                }}
                className="px-6 py-3 cursor-pointer text-[#a3ff47] hover:bg-[#a3ff47]/10
                       transition-all duration-200 first:rounded-t-xl last:rounded-b-xl"
              >
                {topic.topic_name}
              </div>
            ))}
          </div>
        </div>
      ) : (
        isOpen && <div className="text-gray-400 p-4">No topics available</div>
      )}
    </div>
  );
};
