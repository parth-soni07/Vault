import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { AlloraTopic} from '../utils/alloraTopics';
export const Home: React.FC<{
  selected: string;
  setSelected: (value: string) => void;
  options: AlloraTopic[];
}> = ({ options }) => {
  return (
    <Hero 
      options={options}
    />
  );
};