import { AlloraTopic } from "../../utils/alloraTopics";

export interface JoinFriendsProps {
  options: AlloraTopic[];
  setRiskLevel: (level: string) => void;
}

export interface TopicState {
  id: number | null;
  name: string;
}
