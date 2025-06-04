import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
import './App.css';


function AppContent() {
  const { user, removeUser } = useContext(ProfileContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/' || location.pathname === '/register';

  const handleLogout = () => {
    removeUser();
    navigate('/');
  };

  const isMissingInfo = user && (!user.name || !user.weight || user.weight === '');
const needsProfileUpdate = !isLoginPage && isMissingInfo;

const [showToast, setShowToast] = useState(false);

useEffect(() => {
  if (needsProfileUpdate) {
    setShowToast(true);
    const timer = setTimeout(() => setShowToast(false), 4000); // auto-dismiss
    return () => clearTimeout(timer);
  }
}, [needsProfileUpdate]);


  return (
    <div>
      {showToast && (
      <div className="profile-toast">
        ⚠️ Tap Profile to complete your info!
        
      </div>
    )}
    
      {/*  Show nav um for the user not login */}
      {!isLoginPage && user && (
        <nav className="custom-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/dashboard">
                <img src={`${process.env.PUBLIC_URL}/icons/dashboard.png`} alt="Dashboard" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/food-log">
                <img src={`${process.env.PUBLIC_URL}/icons/foodlog.png`} alt="Food Log" />
                <span>Food Log</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/goals">
                <img src={`${process.env.PUBLIC_URL}/icons/goal.png`} alt="Goals" />
                <span>Goals</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/workout">
                <img src={`${process.env.PUBLIC_URL}/icons/workout.png`} alt="Workout" />
                <span>Workout</span>
              </Link>
            </li>
            <li className={`nav-item ${needsProfileUpdate ? 'profile-alert' : ''}`}>
  <Link to="/profile">
    <img src={`${process.env.PUBLIC_URL}/icons/profile.png`} alt="Profile" />
    <span>Profile</span>
  </Link>
</li>
         <li className="nav-item">
      <button className="logout-button" onClick={handleLogout}>
        <img src={`${process.env.PUBLIC_URL}/icons/Logout.png`} alt="Logout" />
        <span>Logout</span>
      </button>
    </li>
  </ul>
</nav> 
)}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/food-log" element={<FoodLog />} />
        <Route path="/goals" element={<RequireAuth><Goals /></RequireAuth>} />
        <Route path="/workout" element={<RequireAuth><Workout /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/workout/:id" element={<RequireAuth><WorkoutDetails /></RequireAuth>} />
        <Route path="/achievements/:month" element={<RequireAuth><AchievementsByMonth /></RequireAuth>} />
      </Routes>
   {!isLoginPage && (
  <footer className="site-footer">
    <p>© 2025 PandaFit. All rights reserved.</p>
  </footer>
)}
  </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/my-fitness">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
