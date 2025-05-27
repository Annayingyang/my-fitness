import { createContext, useState, useEffect } from 'react';

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [meals, setMeals] = useState([]);

  //  local storage 
  useEffect(() => {
    const storedMeals = localStorage.getItem('meals');
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    }
  }, []);

  // Save meals to local storage 
  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const addMeal = (meal) => {
    setMeals((prev) => [...prev, { ...meal, id: Date.now() }]);
  };

  return (
    <FoodContext.Provider value={{ meals, addMeal }}>
      {children}
    </FoodContext.Provider>
  );
}
