import { useState, useContext, useEffect } from 'react';
import { FoodContext } from '../context/FoodContext';

const foodDB = {
  bread: 100,
  apple: 80,
  rice: 200,
  chicken: 250,
  banana: 90,
  salad: 50,
};

function FoodLog() {
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { meals, addMeal } = useContext(FoodContext);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  
  const handleMealChange = (e) => {
    const name = e.target.value;
    setMealName(name);
    const lower = name.toLowerCase();
    if (foodDB[lower]) {
      setCalories(foodDB[lower]);
    } else {
      setCalories('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mealName.trim() || !calories || isNaN(calories)) {
      setError('Please enter a valid meal and calorie amount.');
      return;
    }

    addMeal({
      name: mealName,
      calories: parseInt(calories),
      createdAt: new Date().toISOString(),
    });

    setMealName('');
    setCalories('');
    setError('');
  };

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div>
      <h1>Food Log</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Meal name (e.g. Bread)"
          value={mealName}
          onChange={handleMealChange}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button type="submit">Add Meal</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Nutrition Breakdown</h2>
      <p>Total Meals: {meals.length}</p>
      <p>Total Calories: {totalCalories} kcal</p>

      <h2>Food History</h2>
      {loading ? (
        <p>Loading food history...</p>
      ) : meals.length === 0 ? (
        <p>No meals logged yet.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id}>
              {meal.name} — {meal.calories} kcal
              <span style={{ color: 'gray', fontSize: '0.8em' }}> 
                ({new Date(meal.createdAt).toLocaleTimeString()})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodLog;
