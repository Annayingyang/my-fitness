import { createContext, useState } from 'react';

export const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const addGoal = (newGoal) => {
    if (newGoal.type === 'weight') {
      const updatedGoals = goals.filter(goal => goal.type !== 'weight');
      setGoals([...updatedGoals, newGoal]);
    } else {
      setGoals([...goals, newGoal]);
    }
  };

  const markGoalComplete = (goalToComplete) => {
    const updatedGoals = goals.filter(goal => goal !== goalToComplete);
    setGoals(updatedGoals);
    setAchievements([...achievements, goalToComplete]);
  };

  const updateCurrentWeight = (newWeight) => {
    const updatedGoals = goals.map(goal => {
      if (goal.type === 'weight') {
        return { ...goal, current: parseFloat(newWeight) };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        achievements,
        markGoalComplete,
        updateCurrentWeight, 
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
