import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PandaLoading from '../components/PandaLoading';
import '../Styling/Workout.css';

function Workout() {
  const [loading, setLoading] = useState(true);
   const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PandaLoading />;


  const workouts = [
    {
      id: 1,
      name: 'Mobility Flow',
      type: 'Challenge',
      image: `${process.env.PUBLIC_URL}/images/workout1.png`,

      kcal: 345,
      duration: '25 min'
    },
    {
      id: 2,
      name: 'Extreme Lower Body',
      type: 'Challenge',
      image: `${process.env.PUBLIC_URL}/images/workout2.png`,

      kcal: 295,
      duration: '20 min'
    },
    {
      id: 3,
      name: 'Full Body',
      type: 'Workout',
      image: `${process.env.PUBLIC_URL}/images/workout3.png`,

      kcal: 289,
      duration: '30 min'
    },
    {
      id: 4,
      name: 'Power Sculpt',
      type: 'Challenge',
      image: `${process.env.PUBLIC_URL}/images/workout4.png`,

      kcal: 345,
      duration: '40 min'
    },
    {
      id: 5,
      name: 'HIIT Burn',
      type: 'Workout',
      image: `${process.env.PUBLIC_URL}/images/workout5.png`,

      kcal: 427,
      duration: '30 min'
    },
    {
      id: 6,
      name: 'Upper Body',
      type: 'Workout',
      image: `${process.env.PUBLIC_URL}/images/workout6.png`,

      kcal: 200,
      duration: '15 min'
    },
  ];

  return (
    <div className="workout-page">
      <h1> Workouts for You</h1>


       {/* Filter Dropdown */}
      <div className="filter-wrapper">
  <select
    value={selectedType}
    onChange={(e) => setSelectedType(e.target.value)}
    className="filter-select"
  >
    <option value="All">All</option>
    <option value="Workout">Workout</option>
    <option value="Challenge">Challenge</option>
  </select>
</div>





      <div className="workout-grid">
        {(selectedType === 'All' ? workouts : workouts.filter(w => w.type === selectedType)).map(workout => (

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
