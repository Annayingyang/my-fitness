import { createContext, useState } from 'react';

export const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const addGoal = (goalObj) => {
    setGoals([...goals, goalObj]);
  };

  const markGoalComplete = (index) => {
    const updated = [...goals];
    updated[index].completed = true;

    const achieved = updated[index];
    setAchievements([...achievements, achieved]);
    updated.splice(index, 1);

    setGoals(updated);
  };

  return (
    <GoalContext.Provider
      value={{ goals, addGoal, achievements, markGoalComplete }}
    >
      {children}
    </GoalContext.Provider>
  );
}
