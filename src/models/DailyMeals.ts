import Meal from "./Meal.js";

export interface IDailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

export type MealTypeKey = keyof IDailyMeals;

/**
 * Model to represent meals planned for a day.
 */
export default class DailyMeals implements IDailyMeals {
    public breakfast;
    public lunch;
    public dinner;

    constructor() {
        this.breakfast = new Meal(),
        this.lunch = new Meal(),
        this. dinner = new Meal()
    }
}