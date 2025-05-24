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
  // Remove the goal from active goals
  const updatedGoals = goals.filter(goal => goal.id !== goalToComplete.id);
  setGoals(updatedGoals);

  // Only add to achievements if not already there
  const alreadyAdded = achievements.find(g => g.id === goalToComplete.id);
  if (!alreadyAdded) {
    setAchievements([...achievements, goalToComplete]);
  }
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
