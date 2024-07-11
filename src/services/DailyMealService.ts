import { DailyMeals } from "../models/DailyMeals.js";
import MealService from "./MealService.js";
import { ItemKey } from "../models/Meal.js";
import { MealTypeKey } from "../models/DailyMeals.js"

/**
 * Handles all business logic for DailyMeals object.
 * 
 * @remarks
 * You'll notice no dedicated methods to say adding/removing meals in a specific type (say appetizers).
 * This class and ultimately the meal planner service will let the specific meal planner handle that to ideally promote more modularity, separation of concerns, etc.
 * Also it would lead me to write code such as the example below which is more readable in the author's opinion:
 * let dm = new DailyMealsService(new DailyMeals());
 * dm
 *  .getByType("breakfast")
 *  .add('appetizers', 'nachos')
 */
export default class DailyMealsService {
    private dailyMeals: DailyMeals;

    constructor(dailyMeals: DailyMeals) {
        this.dailyMeals = dailyMeals;
    }

    public getByType(type: MealTypeKey) {
        const mealsByType = this.dailyMeals[type];
        return new MealService(mealsByType);
    }

    public getALL() {
        return this.dailyMeals;
    }

    // /**
    //  * Adds a meal to a specific meal type in the daily meals.
    //  * @param {Object} params - The parameters for adding a meal.
    //  * @param {ItemKey} params.type - The type of meal (e.g., breakfast, lunch, dinner).
    //  * @param {string} params.mealName - The name of the meal.
    //  */
    // public addMeal({ type, mealName }: { type: MealTypeKey; mealName: string }) {
    //     const mealService = new MealService(this.dailyMeals[type]);
    //     return mealService.add(type, mealName);
    // }

    // /**
    //  * Removes a meal from a specific meal type in the daily meals.
    //  * @param {Object} params - The parameters for removing a meal.
    //  * @param {string} params.mealName - The name of the meal.
    //  */
    // public removeMeal({ mealName }: { mealName: string }) {
    //     const mealTypes = Object.keys(this.dailyMeals.dailyMeals) as ItemKey[];
    //     for (const type of mealTypes) {
    //         const mealService = new MealService(this.dailyMeals.dailyMeals[type]);
    //         try {
    //             mealService.remove(mealName);
    //             return true;
    //         } catch (error) {
    //             // Continue searching in other meal types
    //         }
    //     }
    //     throw new Error("MEAL NOT FOUND");
    // }

    // /**
    //  * Updates a meal in the daily meals.
    //  * @param {Object} params - The parameters for updating a meal.
    //  * @param {string} params.oldMeal - The name of the old meal.
    //  * @param {string} params.newMeal - The name of the new meal.
    //  */
    // public updateMeal({ oldMeal, newMeal }: { oldMeal: string; newMeal: string }) {
    //     const mealTypes = Object.keys(this.dailyMeals.dailyMeals) as ItemKey[];
    //     for (const type of mealTypes) {
    //         const mealService = new MealService(this.dailyMeals.dailyMeals[type]);
    //         try {
    //             mealService.update(oldMeal, newMeal);
    //             return newMeal;
    //         } catch (error) {
    //             // Continue searching in other meal types
    //         }
    //     }
    //     throw new Error("MEAL NOT FOUND");
    // }

    // /**
    //  * Retrieves all meals of a specific type.
    //  * @param {Object} params - The parameters for retrieving meals.
    //  * @param {ItemKey} params.type - The type of meals to retrieve.
    //  */
    // public getMealsByType({ type }: { type: ItemKey }) {
    //     return this.dailyMeals.dailyMeals[type].items;
    // }

    // /**
    //  * Retrieves all daily meals.
    //  */
    // public getAllMeals() {
    //     return this.dailyMeals.dailyMeals;
    // }

    // /**
    //  * Removes all meals of a specific type.
    //  * @param {Object} params - The parameters for removing meals.
    //  * @param {ItemKey} params.type - The type of meals to remove.
    //  */
    // public removeMealsByType({ type }: { type: ItemKey }) {
    //     const mealService = new MealService(this.dailyMeals.dailyMeals[type]);
    //     mealService.removeAll();
    //     return true;
    // }

    // /**
    //  * Removes all meals in the daily meals.
    //  */
    // public removeAllMeals() {
    //     const mealTypes = Object.keys(this.dailyMeals.dailyMeals) as ItemKey[];
    //     for (const type of mealTypes) {
    //         const mealService = new MealService(this.dailyMeals.dailyMeals[type]);
    //         mealService.removeAll();
    //     }
    //     return true;
    // }
}