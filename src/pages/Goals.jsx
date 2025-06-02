import { useState, useContext, useEffect } from 'react';
import { GoalContext } from '../context/GoalContext';
import { ProfileContext } from '../context/ProfileContext';
import { Link } from 'react-router-dom';
import '../Styling/Goals.css';

function Goals() {
  const [goalType, setGoalType] = useState('fitness');
  const [goalText, setGoalText] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [newCurrentWeight, setNewCurrentWeight] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const {
    goals,
    markGoalComplete,
    addGoal,
    updateCurrentWeight,
    achievements,
  } = useContext(GoalContext);

  const { user, setUser } = useContext(ProfileContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (goalType === 'fitness' && goalText.trim() === '') {
      setError('Please enter a fitness goal.');
      return;
    }

    if (
      goalType === 'weight' &&
      (!startWeight || !currentWeight || !targetWeight)
    ) {
      setError('Please fill in all weight fields.');
      return;
    }

    if (
      goalType === 'weight' &&
      (parseFloat(startWeight) < parseFloat(currentWeight) ||
        parseFloat(startWeight) < parseFloat(targetWeight))
    ) {
      setError(
        'Start weight must be greater than the current and target weight.'
      );
      return;
    }

    const newGoal =
      goalType === 'weight'
        ? {
            type: 'weight',
            start: parseFloat(startWeight),
            current: parseFloat(currentWeight),
            target: parseFloat(targetWeight),
            completed: false,
            createdAt: new Date().toISOString(),
            id: Date.now(),
          }
        : {
            type: 'fitness',
            text: goalText,
            completed: false,
            createdAt: new Date().toISOString(),
            id: Date.now(),
          };

    addGoal(newGoal);
    setGoalText('');
    setStartWeight('');
    setCurrentWeight('');
    setTargetWeight('');
    setError('');
    setSuccess('Goal added successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  useEffect(() => {
    const weightGoal = goals.find(goal => goal.type === 'weight' && !goal.completed);

    if (
      weightGoal &&
      parseFloat(weightGoal.current) <= parseFloat(weightGoal.target)
    ) {
      markGoalComplete({ ...weightGoal, completed: true, completedAt: new Date().toISOString() });
    }
  }, [goals, markGoalComplete]);

  const handleUpdateWeight = () => {
    if (!newCurrentWeight || isNaN(newCurrentWeight)) {
      setError('Please enter a valid weight.');
      return;
    }

    updateCurrentWeight(newCurrentWeight);
    setNewCurrentWeight('');

    // Sync to ProfileContext and localStorage
    const updatedUser = { ...user, weight: newCurrentWeight };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedUsers = users.map(u =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const thisMonth = new Date().getMonth();
  const thisMonthAchievements = achievements.filter(goal => new Date(goal.completedAt).getMonth() === thisMonth);

  return (
    <div>
      <h1>Set New Goal</h1>

      <form onSubmit={handleSubmit} aria-label="Add new goal">
        <label>Goal Type:</label>
        <select
          value={goalType}
          onChange={(e) => setGoalType(e.target.value)}
        >
          <option value="fitness">Fitness</option>
          <option value="weight">Weight</option>
        </select>

        {goalType === 'fitness' && (
          <input
            type="text"
            placeholder="e.g., Run 5km"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            aria-label="Fitness goal description"
          />
        )}

        {goalType === 'weight' && (
          <>
            <input
              type="number"
              placeholder="Start weight (kg)"
              value={startWeight}
              onChange={(e) => setStartWeight(e.target.value)}
              aria-label="Start weight"
            />
            <input
              type="number"
              placeholder="Current weight (kg)"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              aria-label="Current weight"
            />
            <input
              type="number"
              placeholder="Target weight (kg)"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              aria-label="Target weight"
            />
          </>
        )}

        <button type="submit">Add Goal</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="goal-columns">
        <div>
          <h2>Weight Goals</h2>
          {goals.filter((goal) => goal.type === 'weight' && !goal.completed).length === 0 && (
            <p>No weight goals yet.</p>
          )}
          {goals
            .filter((goal) => goal.type === 'weight' && !goal.completed)
            .map((goal) => {
              const progressPercent = Math.min(
                ((goal.start - goal.current) / (goal.start - goal.target)) *
                  100,
                100
              );

              return (
                <div key={goal.id} className="goal-card">
                  <p>Start: {goal.start}kg</p>
                  <p>Current: {goal.current}kg</p>
                  <p>Target: {goal.target}kg</p>
                  <div style={{ marginTop: '10px' }}>
                    <p>Progress: {progressPercent.toFixed(0)}%</p>
                    <progress
                      value={progressPercent}
                      max="100"
                    ></progress>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="number"
                      placeholder="Update current weight"
                      value={newCurrentWeight}
                      onChange={(e) => setNewCurrentWeight(e.target.value)}
                    />
                    <button onClick={handleUpdateWeight}>
                      Update
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        <div>
          <h2>Fitness Goals</h2>
          {goals.filter((goal) => goal.type === 'fitness').length === 0 && (
            <p>No fitness goals yet.</p>
          )}
          {goals
            .filter((goal) => goal.type === 'fitness')
            .map((goal) => (
              <div key={goal.id} className="goal-card">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => markGoalComplete({ ...goal, completed: true, completedAt: new Date().toISOString() })}
                  />{' '}
                  {goal.text}
                </label>
              </div>
            ))}
        </div>
      </div>

      <div className="achievements">
        <h2>Achievements This Month</h2>
        {thisMonthAchievements.length === 0 && <p>No achievements yet.</p>}
        <ul>
          {thisMonthAchievements.map((goal) => (
            <li key={goal.id}>
              {goal.type === 'fitness' ? `🏆 ${goal.text}` : `⚖️ Reached ${goal.target}kg`} 
              {goal.completedAt && (
                <span style={{ color: 'gray', fontSize: '0.9em' }}> — {new Date(goal.completedAt).toLocaleDateString()}</span>
              )}
            </li>
          ))}
        </ul>

        <h3>View Other Months</h3>
        <div className="month-links">
          {[...Array(12)].map((_, idx) => (
            <Link key={idx} to={`/achievements/${idx}`}>
              {new Date(0, idx).toLocaleString('default', { month: 'long' })}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Goals;
