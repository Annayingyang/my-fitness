import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { GoalContext } from '../context/GoalContext';

function AchievementsByMonth() {
  const { month } = useParams();
  const { achievements } = useContext(GoalContext);

  const monthNumber = parseInt(month, 10);

  const filtered = achievements.filter(goal => {
    const goalMonth = new Date(goal.completedAt).getMonth();
    return goalMonth === monthNumber;
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 tabIndex="0">Achievements in {monthNames[monthNumber]}</h1>

      {filtered.length === 0 ? (
        <p>No achievements for this month.</p>
      ) : (
        <ul aria-label={`Achievements for ${monthNames[monthNumber]}`}> 
          {filtered.map(goal => (
            <li key={goal.id} style={{ marginBottom: '1rem' }}>
              {goal.type === 'fitness' ? `🏆 ${goal.text}` : `⚖️ Reached ${goal.target}kg`} 
              <span style={{ color: 'gray', fontSize: '0.9em' }}>
                — {new Date(goal.completedAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <Link to="/goals" aria-label="Back to Goals page">← Back to Goals</Link>
    </div>
  );
}

export default AchievementsByMonth;
