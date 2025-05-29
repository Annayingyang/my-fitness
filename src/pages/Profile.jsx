import { useContext, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';
import '../Styling/Profile.css'; 

function Profile() {
  const { user, setUser, removeUser } = useContext(ProfileContext);

  const [form, setForm] = useState(user || {
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    email: '',
    profilePicture: ''
  });

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
    setUser(form);
  };

  return (
    <div className="profile-container">
      <h1>{user ? `Welcome back, ${user.name}!` : 'Create Your Profile'}</h1>

      {!user ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
          <select name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          <input type="text" name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} required />
          <input type="text" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} />
          <button type="submit">Save Profile</button>
        </form>
      ) : (
        <div className="profile-summary">
          {user.profilePicture && <img src={user.profilePicture} alt="Profile" className="profile-pic" />}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Height:</strong> {user.height} cm</p>
          <p><strong>Weight:</strong> {user.weight} kg</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={removeUser}>Log out / Reset Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;
