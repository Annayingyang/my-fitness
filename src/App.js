import React, { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import RequireAuth from './pages/RequireAuth';

function App() {
  const { user, removeUser } = useContext(ProfileContext);
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn && (
        <nav aria-label="Main Navigation">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/food-log">Food Log</Link></li>
            <li><Link to="/goals">Goals</Link></li>
            <li><Link to="/workout">Workout</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food-log" element={<FoodLog />} />

        {/* Restricted routes */}
        <Route path="/goals" element={<RequireAuth><Goals /></RequireAuth>} />
        <Route path="/workout" element={<RequireAuth><Workout /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/workout/:id" element={<RequireAuth><WorkoutDetails /></RequireAuth>} />
        <Route path="/achievements/:month" element={<RequireAuth><AchievementsByMonth /></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
