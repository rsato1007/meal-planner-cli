import { DailyMeals } from "../models/DailyMeals.js";
import MealService from "./MealService.js";
import { MealTypeKey } from "../models/DailyMeals.js"
import Meal from "../models/Meal.js";

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

    public getByTime(type: MealTypeKey) {
        const mealsByType = this.dailyMeals[type];
        return new MealService(mealsByType);
    }

    public getALL() {
        return this.dailyMeals;
    }

    public removeByTime(type: MealTypeKey) {
        this.dailyMeals[type] = new Meal();
        return true;
    }

    public removeAll() {
        this.dailyMeals = new DailyMeals();
        return this.dailyMeals;
    }
}