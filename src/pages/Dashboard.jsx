import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FoodContext } from '../context/FoodContext';
import { GoalContext } from '../context/GoalContext';
import { WorkoutContext } from '../context/WorkoutContext';
import { ProfileContext } from '../context/ProfileContext';
import { motion } from 'framer-motion';
import PandaLoading from '../components/PandaLoading';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import '../Styling/Dashboard.css';

function Dashboard() {
  const { meals } = useContext(FoodContext);
  const { goals, achievements, weightHistory } = useContext(GoalContext);
  const { workoutSessions } = useContext(WorkoutContext);
  const { user } = useContext(ProfileContext);

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 1500);
  return () => clearTimeout(timer);
}, []);

if (loading) return <PandaLoading />;


  const today = new Date().toLocaleDateString('en-CA');
  const todayMeals = meals.filter((m) => m.date === today);
  const caloriesToday = todayMeals.reduce((sum, m) => sum + m.calories, 0);
  const activeFitnessGoals = goals.filter((g) => g.type === 'fitness');
  const weightGoal = goals.find((g) => g.type === 'weight' && !g.completed);
  const weightProgress = weightGoal
    ? ((weightGoal.start - weightGoal.current) / (weightGoal.start - weightGoal.target)) * 100
    : null;
  const recentAchievement = achievements.length ? achievements[achievements.length - 1] : null;
  const totalSessions = Object.values(workoutSessions).reduce((sum, val) => sum + val, 0);

  // Calories (last 7 days)
  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-CA');
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dailyCalories = meals
      .filter((m) => m.date === dateStr)
      .reduce((sum, m) => sum + m.calories, 0);
    return { name: dayName, calories: dailyCalories };
  }).reverse();

  // Format weight history for chart
  const formattedWeights = weightHistory.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-CA'),
    weight: entry.weight
  }));

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading your dashboard...</p>;

  return (
    <div className="dashboard-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome back, {user?.name || 'Guest'}!
      </motion.h1>

      <div className="dashboard-grid">
        <Link to="/food-log" className="dashboard-card" aria-label="Calories card">
          <h2>🍎 Calories Today</h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{caloriesToday} kcal</motion.p>
        </Link>

        <Link to="/goals" className="dashboard-card" aria-label="Fitness Goals card">
          <h2>🎯 Active Fitness Goals</h2>
          <ul>
            {activeFitnessGoals.length ? (
              activeFitnessGoals.map((goal) => <li key={goal.id}>{goal.text}</li>)
            ) : (
              <li>No active goals</li>
            )}
          </ul>
        </Link>

        <Link to="/goals" className="dashboard-card" aria-label="Weight Goal card">
          <h2>⚖️ Weight Goal</h2>
          {weightGoal ? (
            <>
              <p>{weightGoal.current}kg → {weightGoal.target}kg</p>
              <motion.progress
                value={weightProgress}
                max="100"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'left' }}
              />
              <p>{weightProgress.toFixed(0)}% complete</p>
            </>
          ) : (
            <p>No active weight goal</p>
          )}
        </Link>

        <Link to="/goals" className="dashboard-card" aria-label="Recent Achievement card">
          <h2>🏆 Most Recent Achievement</h2>
          {recentAchievement ? (
            <p>
              {recentAchievement.type === 'fitness'
                ? `🏃‍♀️ ${recentAchievement.text}`
                : `⚖️ Reached ${recentAchievement.target}kg`}
              <br />
              <small>{new Date(recentAchievement.completedAt).toLocaleDateString()}</small>
            </p>
          ) : (
            <p>No achievements yet</p>
          )}
        </Link>

        <Link to="/workout" className="dashboard-card" aria-label="Workout card">
          <h2>💪 Workout Sessions</h2>
          <motion.p initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{totalSessions} sessions completed</motion.p>
        </Link>
      </div>

      {/* Calorie Trend Chart */}
      <div className="dashboard-chart">
        <h2 style={{ textAlign: 'center' }}>Calorie Trend (Past 7 Days)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={last7Days}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#B99A5E" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weight Line Chart */}
      <div className="dashboard-chart">
        <h2 style={{ textAlign: 'center' }}>Weight Progress Over Time</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={formattedWeights}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#3a6b34" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
