import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import '../Styling/WorkoutDetails.css';

const workoutVideos = {
  1: 'https://www.youtube.com/embed/2tM1LFFxeKg', // Push Day
  2: 'https://www.youtube.com/embed/dKpRSLe1j8g', // Leg Day
  3: 'https://www.youtube.com/embed/ml6cT4AZdqI'  // Cardio HIIT
};

function WorkoutDetails() {
  const { id } = useParams();
  const { workoutSessions, incrementSession } = useContext(WorkoutContext);
  const workoutId = parseInt(id);

  const videoUrl = workoutVideos[workoutId];

  const titles = {
    1: 'Push Day Strength Routine',
    2: 'Leg Day Sculpting Power',
    3: 'Explosive Cardio HIIT'
  };

  return (
    <div className="workout-detail-container">
      <h1 className="workout-title">{titles[workoutId]}</h1>

      <div className="video-wrapper">
        <iframe
          width="100%"
          height="400"
          src={videoUrl}
          title="Workout Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="session-info">
        <p><strong>Sessions Completed:</strong> {workoutSessions[workoutId] || 0}</p>
        <button onClick={() => incrementSession(workoutId)}>Mark as Completed</button>
      </div>
    </div>
  );
}

export default WorkoutDetails;
