import Meal from "./Meal.js";

/**
 * Model for meals in a day.
 */
export interface IDailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

/**
 * Model for MealPlanner in a week.
 */
export interface IMealPlanner {
    monday: DailyMeals,
    tuesday: DailyMeals,
    wednesday: DailyMeals,
    thursday: DailyMeals,
    friday: DailyMeals,
    saturday: DailyMeals,
    sunday: DailyMeals
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

export default class MealPlanner {
    public planner: IMealPlanner;

    constructor() {
        this.planner = {
            monday: new DailyMeals(),
            tuesday: new DailyMeals(),
            wednesday: new DailyMeals(),
            thursday: new DailyMeals(),
            friday: new DailyMeals(),
            saturday: new DailyMeals(),
            sunday: new DailyMeals()
        };

        console.log("Meal Planner Created Successfully");
    }
}