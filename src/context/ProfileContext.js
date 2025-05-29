import { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <ProfileContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </ProfileContext.Provider>
  );
};
