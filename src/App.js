import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Workout from './pages/Workout';
import FoodLog from './pages/FoodLog';
import Profile from './pages/Profile';
import WorkoutDetails from './pages/WorkoutDetails';
import AchievementsByMonth from './pages/AchievementsByMonth'; // ✅ Import new page

function App() {
  return (
    <div>
      <nav aria-label="Main Navigation">
        <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/workout">Workout</Link></li>
          <li><Link to="/food-log">Food Log</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/food-log" element={<FoodLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout/:id" element={<WorkoutDetails />} />
        <Route path="/achievements/:month" element={<AchievementsByMonth />} /> {/* ✅ New route */}
      </Routes>
    </div>
  );
}

export default App;
