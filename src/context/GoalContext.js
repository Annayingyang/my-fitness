import { createContext, useState, useEffect } from 'react';

export const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // Load saved goals and achievements from Local Storage on mount
  useEffect(() => {
    const storedGoals = localStorage.getItem('goals');
    const storedAchievements = localStorage.getItem('achievements');
    if (storedGoals) setGoals(JSON.parse(storedGoals));
    if (storedAchievements) setAchievements(JSON.parse(storedAchievements));
  }, []);

  // Save to Local Storage whenever goals change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  // Save to Local Storage whenever achievements change
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  const addGoal = (newGoal) => {
    if (newGoal.type === 'weight') {
      const updatedGoals = goals.filter(goal => goal.type !== 'weight');
      setGoals([...updatedGoals, newGoal]);
    } else {
      setGoals([...goals, newGoal]);
    }
  };

  const markGoalComplete = (goalToComplete) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalToComplete.id);
    setGoals(updatedGoals);

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
