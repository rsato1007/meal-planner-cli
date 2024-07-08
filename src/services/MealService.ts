import Meal, {ItemKey, IMealInfo} from "../models/Meal.js";

/**
 * Handles all business logic for Meals object
 */
export default class MealService {
    private meal: Meal;

    constructor(meal: Meal) {
        this.meal = meal;
    }

    public addMeal(dishType: ItemKey, mealName: string) {
        this.meal.items[dishType].push(mealName);
        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]++;
    }

    public removeMeal(dishType: ItemKey, mealName: string) {
        const idx = this.meal.items[dishType].indexOf(mealName);
        if (idx === -1) {
            return false; // Meal not found
        }

        this.meal.items[dishType].splice(idx, 1);

        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]--;

        return true;
    }
}