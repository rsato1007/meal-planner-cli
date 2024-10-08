import DailyMeals from "../models/DailyMeals";
import MealService from "./MealService";

import { MealTypeKey, DishKey } from "../../types/index";

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

    public removeMeals(time: MealTypeKey | undefined, mealType: DishKey | undefined) {
        if (!time && !mealType) {
            this.dailyMeals = new DailyMeals();
        } else {
            const times = time ? [time] : DailyMealsService.mealTimes as MealTypeKey[];
    
            times.forEach((mealTime) => {
                const temp = new MealService(this.dailyMeals[mealTime]);
    
                if (mealType) {
                    temp.removeDishesByDishType(mealType);
                } else {
                    temp.removeAllDishes();
                }
    
                this.dailyMeals[mealTime] = temp.getAllDishes();
            });
        }
    
        return true;
    }
}