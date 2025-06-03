import { useState, useContext, useEffect } from 'react';
import { FoodContext } from '../context/FoodContext';
import PandaLoading from '../components/PandaLoading'; // 👈 make sure this path is correct
import '../Styling/Foodlog.css';

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
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [foodDB, setFoodDB] = useState(defaultFoodDB);
  const [isPageLoading, setIsPageLoading] = useState(true); // 👈 new loading state

  const { meals, addMeal } = useContext(FoodContext);

  useEffect(() => {
    const storedDB = localStorage.getItem('foodDB');
    if (storedDB) {
      setFoodDB(JSON.parse(storedDB));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 800); // 👈 loading duration
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
      date: new Date().toLocaleDateString('en-CA'),
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

  // Loading screen return
  if (isPageLoading) {
    return <PandaLoading />;
  }

  return (
    <div className="foodlog-container">
      <h1>Food Log</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close' : '+ Add Meal'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-card">
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

      {error && <p className="error">{error}</p>}

      <h2>Nutrition Breakdown</h2>
      <div className="section-card nutrition-summary">
        <p>Total Meals: {totalMeals}</p>
        <p>Total Calories: {totalCalories} kcal</p>
      </div>

      <h2>Food History</h2>
      <div className="section-card date-picker">
        <label htmlFor="select-date">Select Date: </label>
        <input
          id="select-date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="section-card meal-block">
        <h3>{selectedDate}</h3>
        {['breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
          selectedMeals[type].length > 0 && (
            <div key={type}>
              <h4>{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
              <ul>
                {selectedMeals[type].map((meal) => (
                  <li key={meal.id}>
                    {meal.name} — {meal.calories} kcal
                    <span>
                      ({new Date(meal.createdAt).toLocaleTimeString()})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default FoodLog;
