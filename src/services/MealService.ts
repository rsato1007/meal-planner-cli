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

    public add(dishType: ItemKey, mealName: string) {
        this.meal.items[dishType].push(mealName);
        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]++;

        return mealName;
    }

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

    public getByType(type: ItemKey) {
        return this.meal.items[type];
    }

    public getAll() {
        return this.meal.items;
    }
    
    public removeByType(type: ItemKey) {
        this.meal.items[type] = [];
        return true;
    }
    
    public removeAll() {
        Object.keys(this.meal).forEach((key) => {
            this.meal.items[key as ItemKey] = [];
        });
        return true;
    }
}