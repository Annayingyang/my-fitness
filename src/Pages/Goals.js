import { useState } from 'react';

function Goals() {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (goal.trim() === '') {
      setError('Please enter a goal.');
      return;
    }

    setGoals([...goals, goal]);
    setGoal('');
    setError('');
  };

  return (
    <div>
      <h1>Set Your Fitness Goals</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <button type="submit">Add Goal</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Your Goals</h2>
      <ul>
        {goals.map((g, index) => (
          <li key={index}>{g}</li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;
