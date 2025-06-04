import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoalProvider } from './context/GoalContext';
import { FoodProvider } from './context/FoodContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { ProfileProvider } from './context/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProfileProvider>
    <WorkoutProvider>
      <GoalProvider>
        <FoodProvider>
          <App />
        </FoodProvider>
      </GoalProvider>
    </WorkoutProvider>
  </ProfileProvider>
);
