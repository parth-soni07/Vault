import React from "react";
import { Dropdown } from "../Dropdown/Dropdown";
import { AlloraTopic } from "../../utils/alloraTopics";

interface TopicSelectionProps {
  selectedTopicId: number | null;
  options: AlloraTopic[];
  onTopicSelect: (topicId: number, topicName: string) => void;
  onSubmit: () => void;
}

export const TopicSelection: React.FC<TopicSelectionProps> = ({
  selectedTopicId,
  options,
  onTopicSelect,
}) => {

  return (
    <div className="flex flex-col items-center gap-8 mt-6">
      <Dropdown
        options={options}
        selectedTopicId={selectedTopicId}
        setSelectedTopic={onTopicSelect}
      />
    </div>
  );
};
