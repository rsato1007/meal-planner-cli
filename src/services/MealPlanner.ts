import DailyMeals from "../models/DailyMeals.js";
import MealPlanner, { DayKey } from "../models/MealPlanner.js";
import DailyMealsService from "./DailyMealService.js";

/**
 * Handles all business logic for Meal Planner
 */
export default class MealPlannerService {
    private planner: MealPlanner;
    public static meta = {
        properties: {
            days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
        }
    }

    constructor(planner: MealPlanner) {
        this.planner = planner;
    }

    /**
     * Gets the DailyMealsService for a specific day.
     * @param day The day of the week (e.g., Monday, Tuesday)
     * @returns A DailyMealsService instance for the specified day
     */
    public getMealsByDay(day: DayKey): DailyMealsService {
        return new DailyMealsService(this.planner[day]);
    }

    /**
     * Retrieves the meal planner for all days.
     * @returns The MealPlanner instance
     */
    public getAllDays(): MealPlanner {
        return this.planner;
    }

    /**
     * Removes all meals for a specific day.
     * @param day The day of the week (e.g., Monday, Tuesday)
     * @returns boolean indicating success or failure
     */
    public removeMealsByDay(day: DayKey): boolean {
        try {
            this.planner[day] = new DailyMeals();
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove meals by day: ", e);
            return false;
        }
    }

    /**
     * Resets the meal planner.
     * @returns boolean indicating success or failure
     */
    public resetPlanner(): boolean {
        try {
            this.planner = new MealPlanner();
            return true;
        } catch (e: unknown) {
            console.error("Unable to reset meal planner: ", e);
            return false;
        }
    }
}