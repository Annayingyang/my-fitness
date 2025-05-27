import { createContext, useState } from 'react';

export const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [meals, setMeals] = useState([]);

  const addMeal = (meal) => {
    setMeals((prev) => [...prev, { ...meal, id: Date.now() }]);
  };

  return (
    <FoodContext.Provider value={{ meals, addMeal }}>
      {children}
    </FoodContext.Provider>
  );
}
