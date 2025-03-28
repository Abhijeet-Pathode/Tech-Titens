import { useState } from "react";

type Meal = {
  id: string;
  name: string;
  time: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
};

type GroceryItem = {
  id: string;
  name: string;
  quantity: string;
  purchased: boolean;
};

const NutritionPlanner = () => {
  const [activeTab, setActiveTab] = useState<"plan" | "tracker" | "groceries">("plan");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({ time: "breakfast" });
  const [newGroceryItem, setNewGroceryItem] = useState<Partial<GroceryItem>>({});

  const addMeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.calories) return;
    setMeals([...meals, { ...newMeal, id: Date.now().toString() } as Meal]);
    setNewMeal({ time: "breakfast" });
  };

  const addGroceryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroceryItem.name) return;
    setGroceryList([...groceryList, { ...newGroceryItem, id: Date.now().toString(), purchased: false } as GroceryItem]);
    setNewGroceryItem({});
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex space-x-4">
        <button onClick={() => setActiveTab("plan")} className="p-2 bg-blue-500 text-white rounded">Meal Plan</button>
        <button onClick={() => setActiveTab("tracker")} className="p-2 bg-blue-500 text-white rounded">Tracker</button>
        <button onClick={() => setActiveTab("groceries")} className="p-2 bg-blue-500 text-white rounded">Groceries</button>
      </div>

      {activeTab === "plan" && (
        <div className="border p-4">
          <h2 className="text-lg font-bold">Today's Meal Plan</h2>
          <form onSubmit={addMeal} className="space-y-4">
            <input
              placeholder="Meal Name"
              value={newMeal.name || ""}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              placeholder="Calories"
              type="number"
              value={newMeal.calories || ""}
              onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
              className="border p-2 w-full"
            />
            <button type="submit" className="p-2 bg-green-500 text-white rounded w-full">Add Meal</button>
          </form>
        </div>
      )}

      {activeTab === "tracker" && (
        <div className="border p-4">
          <h2 className="text-lg font-bold">Nutrition Tracker</h2>
          <ul>
            {meals.map((meal) => (
              <li key={meal.id} className="border-b py-2">
                {meal.name} - {meal.calories} kcal
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "groceries" && (
        <div className="border p-4">
          <h2 className="text-lg font-bold">Grocery List</h2>
          <form onSubmit={addGroceryItem} className="space-y-4">
            <input
              placeholder="Item Name"
              value={newGroceryItem.name || ""}
              onChange={(e) => setNewGroceryItem({ ...newGroceryItem, name: e.target.value })}
              className="border p-2 w-full"
            />
            <input
              placeholder="Quantity"
              value={newGroceryItem.quantity || ""}
              onChange={(e) => setNewGroceryItem({ ...newGroceryItem, quantity: e.target.value })}
              className="border p-2 w-full"
            />
            <button type="submit" className="p-2 bg-green-500 text-white rounded w-full">Add Item</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NutritionPlanner;
