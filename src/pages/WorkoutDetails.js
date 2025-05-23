import { useParams } from 'react-router-dom';

function WorkoutDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Workout Details</h1>
      <p>Showing details for workout ID: {id}</p>
    </div>
  );
}

export default WorkoutDetails;
