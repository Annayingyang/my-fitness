import { Link } from 'react-router-dom';

function Workout() {
  const workouts = [
    { id: 1, name: 'Push Day' },
    { id: 2, name: 'Leg Day' },
    { id: 3, name: 'Cardio HIIT' }
  ];

  return (
    <div>
      <h1>Workout Page</h1>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>
            <Link to={`/workout/${workout.id}`}>{workout.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workout;
