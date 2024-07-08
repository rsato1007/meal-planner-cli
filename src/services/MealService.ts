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
    }

    public removeMeal(mealName: string) {
        // Find what dish type the meal is in:
        let dishType: string | ItemKey = "";
        let idx: number = -1;
        Object.keys(this.meal.items).forEach((key) => {
            idx = this.meal.items[key as ItemKey].indexOf(mealName);
            if (idx >= 0) {
                dishType = key;
                return;
            };
        });
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
        Object.keys(this.meal.items).forEach((key) => {
            if (this.meal.items[key as ItemKey].includes(oldMeal)) {
                dishType = key;
            };
        });
        if (dishType === "") {
            throw Error("MEAL NOT FOUND");
        }
    }
}