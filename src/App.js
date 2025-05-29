import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Workout from './pages/Workout';
import FoodLog from './pages/FoodLog';
import Profile from './pages/Profile';
import WorkoutDetails from './pages/WorkoutDetails';
import AchievementsByMonth from './pages/AchievementsByMonth';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProfileContext } from './context/ProfileContext';

function App() {
  const { user } = useContext(ProfileContext);
  const isLoggedIn = !!user;

  return (
    <div>
      {/* Show navbar only if logged in */}
      {isLoggedIn && (
        <nav aria-label="Main Navigation">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/goals">Goals</Link></li>
            <li><Link to="/workout">Workout</Link></li>
            <li><Link to="/food-log">Food Log</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      )}

      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main App Routes (only accessible after login/guest) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/food-log" element={<FoodLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout/:id" element={<WorkoutDetails />} />
        <Route path="/achievements/:month" element={<AchievementsByMonth />} />
      </Routes>
    </div>
  );
}

export default App;
