import { DailyMeals } from "./DailyMeals";

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