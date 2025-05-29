import { Link } from 'react-router-dom';
import './Workout.css';

function Workout() {
  const workouts = [
    {
      id: 1,
      name: 'Mobility Flow',
      type: 'Challenge',
      image: '/images/mobility.jpg',
      kcal: 345,
      duration: '30 min'
    },
    {
      id: 2,
      name: 'Strength',
      type: 'Challenge',
      image: '/images/strength.jpg',
      kcal: 295,
      duration: '30 min'
    },
    {
      id: 3,
      name: 'Full Body',
      type: 'Workout',
      image: '/images/fullbody.jpg',
      kcal: 289,
      duration: '42 min'
    },
    {
      id: 4,
      name: 'Power Sculpt',
      type: 'Challenge',
      image: '/images/power.jpg',
      kcal: 345,
      duration: '30 min'
    },
    {
      id: 5,
      name: 'HIIT Burn',
      type: 'Workout',
      image: '/images/hiit.jpg',
      kcal: 427,
      duration: '56 min'
    },
    {
      id: 6,
      name: 'HIIT Burn',
      type: 'Workout',
      image: '/images/hiit.jpg',
      kcal: 427,
      duration: '56 min'
    },
  ];

  return (
    <div className="workout-page">
      <h1> Workouts for You</h1>
      <div className="workout-grid">
        {workouts.map(workout => (
          <Link to={`/workout/${workout.id}`} key={workout.id} className="workout-card">
            <div className="card-img" style={{ backgroundImage: `url(${workout.image})` }}>
              <div className="card-type">{workout.type}</div>
              <div className="card-info">
                <h2>{workout.name}</h2>
                <p>{workout.kcal} Kcal • {workout.duration}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Workout;
