import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GoalProvider } from './context/GoalContext'; 
import { FoodProvider } from './context/FoodContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoalProvider>
      <FoodProvider>
        <App />
      </FoodProvider>
    </GoalProvider>
  </BrowserRouter>
);
