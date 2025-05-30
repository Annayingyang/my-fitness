import { useContext } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { useNavigate } from 'react-router-dom';

function RequireAuth({ children }) {
  const { user } = useContext(ProfileContext);
  const navigate = useNavigate();

  if (!user) return null;
  if (user.isGuest) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Restricted Page</h2>
        <p>This feature is only available to registered users.</p>
        <button onClick={() => navigate('/register')}>Register Now</button>
      </div>
    );
  }

  return children;
}

export default RequireAuth;
