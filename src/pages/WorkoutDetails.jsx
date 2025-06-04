import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import '../Styling/WorkoutDetails.css';

const workoutVideos = {
  1: 'https://www.youtube.com/embed/Eml2xnoLpYE', // Push Day
  2: 'https://www.youtube.com/embed/Yx0BW-H5W0Y', // Leg Day
  3: 'https://www.youtube.com/embed/4iy4yEKa7W8',
  4: 'https://www.youtube.com/embed/gDIbf555o4k',
  5: 'https://www.youtube.com/embed/M0uO8X3_tEA',
  6: 'https://www.youtube.com/embed/0zhvUV1bAVQ',
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
