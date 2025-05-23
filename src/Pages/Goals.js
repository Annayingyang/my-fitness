import { useState, useContext } from 'react';
import { GoalContext } from '../context/GoalContext';

function Goals() {
  const [goalType, setGoalType] = useState('fitness');
  const [goalText, setGoalText] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { addGoal } = useContext(GoalContext); // ✅ Use global context

  const handleSubmit = (e) => {
    e.preventDefault();

    if (goalType === 'fitness' && goalText.trim() === '') {
      setError('Please enter a fitness goal.');
      return;
    }

    if (goalType === 'weight' && (!targetWeight || !currentWeight)) {
      setError('Please enter both target and current weight.');
      return;
    }

    const newGoal = {
      type: goalType,
      text: goalText,
      target: targetWeight,
      current: currentWeight,
      completed: false,
    };

    addGoal(newGoal);

    setGoalText('');
    setTargetWeight('');
    setCurrentWeight('');
    setError('');
    setSuccess('Goal added successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div>
      <h1>Set New Goal</h1>

      <form onSubmit={handleSubmit}>
        <label>Goal Type:</label>
        <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
          <option value="fitness">Fitness</option>
          <option value="weight">Weight</option>
        </select>

        {goalType === 'fitness' && (
          <input
            type="text"
            placeholder="e.g., Run 5km"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
          />
        )}

        {goalType === 'weight' && (
          <>
            <input
              type="number"
              placeholder="Target weight (kg)"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Current weight (kg)"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
            />
          </>
        )}

        <button type="submit">Add Goal</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}

export default Goals;
