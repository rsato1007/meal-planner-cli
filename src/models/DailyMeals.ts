import Meal from "./Meal.js";
/**
 * Model for meals in a day.
 */
export interface IDailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

export type MealTypeKey = keyof IDailyMeals;

export class DailyMeals implements IDailyMeals {
    public breakfast;
    public lunch;
    public dinner;

    constructor() {
        this.breakfast = new Meal(),
        this.lunch = new Meal(),
        this. dinner = new Meal()
    }
}