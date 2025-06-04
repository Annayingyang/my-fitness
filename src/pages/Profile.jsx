import { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import { GoalContext } from '../context/GoalContext';
import { useNavigate } from 'react-router-dom';
import '../Styling/Profile.css';

function Profile() {
  const { user, setUser, removeUser } = useContext(ProfileContext);
  const { updateCurrentWeight } = useContext(GoalContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    email: '',
    profilePicture: '',
  });

  useEffect(() => {
    if (user && !user.isGuest) {
      setForm(prev => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePicture' && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = { ...user, ...form };
    setUser(updatedUser);

    // Update registered users in localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedUsers = users.map(u =>
      u.username === user.username ? updatedUser : u
    );
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // ✅ Sync weight to Goals
    if (form.weight) {
      updateCurrentWeight(form.weight);
    }
  };

  const handleLogout = () => {
    removeUser();
    navigate('/');
  };

  const handleProfileImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, profilePicture: reader.result };
      setUser(updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    };
    reader.readAsDataURL(file);
  }
};


  if (user?.isGuest) {
    return (
      <div className="profile-container">
        <h1>Guest Access</h1>
        <p>You must register to view and edit your profile.</p>
        <button onClick={() => navigate('/register')}>Go to Register</button>
      </div>
    );
  }

  return (
  <div
    className="profile-container"
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/images/bambo-bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
      <label htmlFor="profile-upload">
    <img
  src={user.profilePicture || `${process.env.PUBLIC_URL}/images/default-profile.png`}
  alt="Profile"
  className="profile-picture"
/>

  </label>
  <input
    type="file"
    id="profile-upload"
    accept="image/*"
    onChange={handleProfileImageUpload}
    style={{ display: 'none' }}
  />

      <form onSubmit={handleSubmit} className="profile-form">
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} />
        <input type="text" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
        <button type="submit">Save Profile</button>
      </form>

      <button onClick={handleLogout}>
        Log out / Reset Profile
      </button>
    </div>
  );
}

export default Profile;
