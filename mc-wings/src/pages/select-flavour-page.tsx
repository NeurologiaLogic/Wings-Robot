import { useFoodStore } from "../../store/food-store.ts";
import FoodCard from "../component/food-card.tsx";

export default function SelectFlavourPage() {
  const foods = useFoodStore((state) => state.food);
  const decrementFoodCount = useFoodStore((state) => state.decrementCount);
  const incrementFoodCount = useFoodStore((state) => state.incrementCount);

  return (
    //fix this mx-24 not responsive
      <div className="inline-block min-h-screen px-24 border-3 max-w-screen-md">
        <div className="mx-auto">
          <div className="text-left my-5">
            <h3 className="font-semibold text-2xl">Select Your</h3>
            <h1 className="font-bold text-4xl">Favorite Flavour</h1>
          </div>
          <div className="inline-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {foods &&
              foods.map((food, index) => {
                return (
                  <FoodCard
                    key={index}
                    item={food}
                    decrement={() => decrementFoodCount(food.id)}
                    increment={() => incrementFoodCount(food.id)}
                  />
                );
              })}
          </div>
          <div className="mb-36"></div>

        </div>
    </div>
  );
}
