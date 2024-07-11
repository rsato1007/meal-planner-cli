import Meal, {ItemKey, IMealInfo} from "../models/Meal.js";

/**
 * Handles all business logic for Meals object.
 */
export default class MealService {
    private meal: Meal;

    constructor(meal: Meal) {
        this.meal = meal;
    }

    /**
     * Adds a meal to the meal object.
     * @param dishType 
     * @param mealName 
     * @returns 
     */
    public add(dishType: ItemKey, mealName: string) {
        this.meal.items[dishType].push(mealName);
        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]++;

        return mealName;
    }

    /**
     * Removes a meal from the meal object.
     * @param mealName 
     * @returns 
     */
    public remove(mealName: string) {
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

    /**
     * Finds the original meal in the object and updates it with the new meal.
     * @param oldMeal 
     * @param newMeal 
     * @returns 
     */
    public update(oldMeal: string, newMeal: string) {
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

    /**
     * Finds all meals in a type (e.g., all appetizers)
     * @param type 
     * @returns 
     */
    public getByType(type: ItemKey) {
        return this.meal.items[type];
    }

    /**
     * Retrieves all meals in the meal object.
     * @returns 
     */
    public getAll() {
        return this.meal.items;
    }
    
    /**
     * Removes all meals in a type (e.g., all entrees).
     * @param type 
     * @returns 
     */
    public removeByType(type: ItemKey) {
        this.meal.items[type] = [];
        return true;
    }
    
    /**
     * Removes all meals in the meal object.
     * @returns 
     */
    public removeAll() {
        Object.keys(this.meal).forEach((key) => {
            this.meal.items[key as ItemKey] = [];
        });
        return true;
    }
}