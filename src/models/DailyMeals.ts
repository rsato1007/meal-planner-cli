import Meal from "./Meal";
/**
 * Model for meals in a day.
 */
export interface IDailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

export class DailyMeals {
    public dailyMeals: IDailyMeals;

    constructor() {
        this.dailyMeals = {
            breakfast: new Meal(),
            lunch: new Meal(),
            dinner: new Meal()
        };
    }
}