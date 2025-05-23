import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Workout from './pages/Workout';
import FoodLog from './pages/FoodLog';
import Profile from './pages/Profile';
import WorkoutDetails from './pages/WorkoutDetails';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/goals">Goals</Link> |{' '}
        <Link to="/workout">Workout</Link> |{' '}
        <Link to="/food-log">Food Log</Link> |{' '}
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/food-log" element={<FoodLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout/:id" element={<WorkoutDetails />} />
      </Routes>
    </div>
  );
}

export default App;
