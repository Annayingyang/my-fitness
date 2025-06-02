import { createContext, useState, useEffect } from 'react';

export const GoalContext = createContext();

export function GoalProvider({ children }) {
  const [goals, setGoals] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [weightHistory, setWeightHistory] = useState(() => {
    const stored = localStorage.getItem('weightHistory');
    return stored ? JSON.parse(stored) : [];
  });

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

  // Save weight history to Local Storage
  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
  }, [weightHistory]);

  const addGoal = (newGoal) => {
    if (newGoal.type === 'weight') {
      const updatedGoals = goals.filter(goal => goal.type !== 'weight');
      setGoals([...updatedGoals, newGoal]);

      // Log starting weight
      setWeightHistory(prev => [...prev, {
        weight: newGoal.current,
        date: new Date().toISOString()
      }]);
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
    const timestamp = new Date().toISOString();

    const updatedGoals = goals.map(goal => {
      if (goal.type === 'weight' && !goal.completed) {
        return { ...goal, current: parseFloat(newWeight) };
      }
      return goal;
    });

    setGoals(updatedGoals);
    setWeightHistory(prev => [...prev, { weight: parseFloat(newWeight), date: timestamp }]);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        achievements,
        markGoalComplete,
        updateCurrentWeight,
        weightHistory
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
