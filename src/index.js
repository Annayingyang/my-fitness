import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GoalProvider } from './context/GoalContext';
import { FoodProvider } from './context/FoodContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { ProfileProvider } from './context/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ProfileProvider>
      <WorkoutProvider>
        <GoalProvider>
          <FoodProvider>
            <App />
          </FoodProvider>
        </GoalProvider>
      </WorkoutProvider>
    </ProfileProvider>
  </BrowserRouter>
);
