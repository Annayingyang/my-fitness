import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import '../Styling/WorkoutDetails.css';

const workoutVideos = {
  1: 'https://www.youtube.com/embed/2tM1LFFxeKg', // Push Day
  2: 'https://www.youtube.com/embed/dKpRSLe1j8g', // Leg Day
  3: 'https://www.youtube.com/embed/ml6cT4AZdqI',
  4: 'https: //www.youtube.com/embed/5rH80qK0Z9A', 
  5: 'https://www.youtube.com/embed/307L83072lY', 
  6: 'https://www.youtube.com/embed/4227Z69yL5g', 
 
};

function WorkoutDetails() {
  const { id } = useParams();
  const { workoutSessions, incrementSession } = useContext(WorkoutContext);
  const workoutId = parseInt(id);

  const videoUrl = workoutVideos[workoutId];

  const titles = {
    1: 'Mobility Flow',
    2: 'Extreme Lower Body',
    3: ' Full Body',
    4: 'Power Sculpt Abs',
    5: 'HIIT BURN',
    6: 'Upper Body'
    
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
