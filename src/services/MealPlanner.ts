import DailyMeals from "../models/DailyMeals";
import MealPlanner from "../models/MealPlanner";
import DailyMealsService from "./DailyMealService";

import { DayKey, IMealOptions } from "../../types/index";

/**
 * Handles all business logic for Meal Planner
 */
export default class MealPlannerService {
    private planner: MealPlanner;

    public static days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

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

    public removeMeals(options: IMealOptions) {
        if (!options.day && !options.time && !options.mealType) {
            this.planner = new MealPlanner();
            return true;
        } else if (options.day) {
            const t = new DailyMealsService(this.planner[options.day]);
            t.removeMeals(options.time, options.mealType)
            this.planner[options.day] = t.getAllMealsForDay();
            return true;
        } else {
            MealPlannerService.days.forEach((day) => {
                const t = new DailyMealsService(this.planner[day as DayKey]);
                t.removeMeals(options.time, options.mealType)
                this.planner[day as DayKey] = t.getAllMealsForDay();
            })
            return true;
        }
    }
}