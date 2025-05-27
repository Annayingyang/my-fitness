import { useState, useContext, useEffect } from 'react';
import { FoodContext } from '../context/FoodContext';

const defaultFoodDB = {
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
  const [mealTime, setMealTime] = useState('breakfast');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [foodDB, setFoodDB] = useState(defaultFoodDB);

  const { meals, addMeal } = useContext(FoodContext);

  // Load foodDB from localStorage
  useEffect(() => {
    const storedDB = localStorage.getItem('foodDB');
    if (storedDB) {
      setFoodDB(JSON.parse(storedDB));
    }
  }, []);

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

    const lowerName = mealName.toLowerCase();
    const updatedFoodDB = { ...foodDB, [lowerName]: parseInt(calories) };
    setFoodDB(updatedFoodDB);
    localStorage.setItem('foodDB', JSON.stringify(updatedFoodDB));

    addMeal({
      name: mealName,
      calories: parseInt(calories),
      mealTime: mealTime,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      id: Date.now()
    });

    setMealName('');
    setCalories('');
    setMealTime('breakfast');
    setError('');
    setShowForm(false);
  };

  const groupedByMealTime = meals.reduce((acc, meal) => {
    const day = meal.date;
    if (!acc[day]) acc[day] = { breakfast: [], lunch: [], dinner: [], snack: [] };
    acc[day][meal.mealTime].push(meal);
    return acc;
  }, {});

  const selectedMeals = groupedByMealTime[selectedDate] || { breakfast: [], lunch: [], dinner: [], snack: [] };

  const totalCalories = Object.values(selectedMeals).flat().reduce((sum, m) => sum + m.calories, 0);
  const totalMeals = Object.values(selectedMeals).flat().length;

  return (
    <div>
      <h1>Food Log</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close' : '+ Add Meal'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="mealTime">Meal Type:</label>
          <select id="mealTime" value={mealTime} onChange={(e) => setMealTime(e.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>

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
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Nutrition Breakdown</h2>
      <p>Total Meals: {totalMeals}</p>
      <p>Total Calories: {totalCalories} kcal</p>

      <h2>Food History</h2>
      <label htmlFor="select-date">Select Date: </label>
      <input
        id="select-date"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {loading ? (
        <p>Loading food history...</p>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          <h3>{selectedDate}</h3>
          {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
            selectedMeals[type].length > 0 && (
              <div key={type}>
                <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                <ul>
                  {selectedMeals[type].map((meal) => (
                    <li key={meal.id}>
                      {meal.name} — {meal.calories} kcal
                      <span style={{ color: 'gray', fontSize: '0.8em' }}> 
                        ({new Date(meal.createdAt).toLocaleTimeString()})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodLog;
