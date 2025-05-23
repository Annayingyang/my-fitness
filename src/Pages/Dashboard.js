import { useState, useEffect } from 'react';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      setSummary({
        goalsCompleted: 3,
        workoutsThisWeek: 5,
        caloriesTracked: 7200,
      });
      setLoading(false);
    }, 2000); // simulate 2 seconds loading
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading your fitness summary...</p>
      ) : (
        <div>
          <p>Goals Completed: {summary.goalsCompleted}</p>
          <p>Workouts This Week: {summary.workoutsThisWeek}</p>
          <p>Calories Tracked: {summary.caloriesTracked}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
