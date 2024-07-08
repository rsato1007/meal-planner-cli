import Meal, {ItemKey, IMealInfo} from "../models/Meal.js";

/**
 * Handles all business logic for Meals object
 * 
 * @remarks
 * - Part of me think I can remove the dishType to allow for a cleaner interface.
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

        return mealName;
    }

    public removeMeal(mealName: string) {
        // Find what dish type the meal is in:
        let dishType: string | ItemKey = "";
        let idx: number = -1;
        for (const key of Object.keys(this.meal.items)) {
            idx = this.meal.items[key as ItemKey].indexOf(mealName);
            if (idx >= 0) {
                dishType = key;
                break;
            }
        }
        if (dishType === "") {
            throw new Error("MEAL NOT FOUND");
        }

        this.meal.items[dishType as ItemKey].splice(idx, 1);

        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]--;

        return true;
    }

    public updateMeal(oldMeal: string, newMeal: string) {
        // Find what dish type the meal is in:
        let dishType: string | ItemKey = "";
        let idx: number = -1;
        for (const key of Object.keys(this.meal.items)) {
            idx = this.meal.items[key as ItemKey].indexOf(oldMeal);
            if (idx >= 0) {
                dishType = key;
                break;
            }
        }
        if (dishType === "") {
            throw new Error("MEAL NOT FOUND");
        }

        this.meal.items[dishType as ItemKey][idx] = newMeal;

        return newMeal;
    }

    public getAllItems() {
        return this.meal.items;
    }
}