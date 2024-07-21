import DailyMeals from "../models/DailyMeals.js";
import MealService from "./MealService.js";
import Meal from "../models/Meal.js";

import { MealTypeKey } from "../../types/index.js";

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

    public static mealTimes = ["breakfast", "lunch", "dinner"];

    constructor(dailyMeals: DailyMeals) {
        this.dailyMeals = dailyMeals;
    }

    /**
     * Gets the MealService for a specific time of day.
     * @param time The time of day (e.g., breakfast, lunch, dinner)
     * @returns A MealService instance for the specified time of day
     */
    public getDishesByTime(time: MealTypeKey): MealService {
        return new MealService(this.dailyMeals[time]);
    }

    /**
     * Retrieves all meals for the day.
     * @returns The DailyMeals instance
     */
    public getAllMealsForDay(): DailyMeals {
        return this.dailyMeals;
    }

    /**
     * Removes all dishes for a specific time of day.
     * @param time The time of day (e.g., breakfast, lunch, dinner)
     * @returns boolean indicating success or failure
     */
    public removeDishesByTime(time: MealTypeKey): boolean {
        try {
            this.dailyMeals[time] = new Meal();
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove dishes by time: ", e);
            return false;
        }
    }

    /**
     * Removes all meals for the day.
     * @returns The new DailyMeals instance
     */
    public removeMealsForDay(): DailyMeals {
        try {
            this.dailyMeals = new DailyMeals();
            return this.dailyMeals;
        } catch (e: unknown) {
            console.error("Unable to remove all meals for the day: ", e);
            return this.dailyMeals; // Return the current state even if there's an error
        }
    }
}