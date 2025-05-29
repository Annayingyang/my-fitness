import { createContext, useState } from 'react';

export const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [workoutSessions, setWorkoutSessions] = useState({});

  const incrementSession = (id) => {
    setWorkoutSessions(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <WorkoutContext.Provider value={{ workoutSessions, incrementSession }}>
      {children}
    </WorkoutContext.Provider>
  );
}
