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

export type DayKey = keyof IMealPlanner;

export default class MealPlanner implements IMealPlanner {
    public monday;
    public tuesday;
    public wednesday;
    public thursday;
    public friday;
    public saturday;
    public sunday;

    constructor() {
        this.monday = new DailyMeals();
        this.tuesday = new DailyMeals();
        this.wednesday = new DailyMeals();
        this.thursday = new DailyMeals()
        this.friday = new DailyMeals()
        this.saturday = new DailyMeals()
        this.sunday = new DailyMeals()

        console.log("Meal Planner Created Successfully");
    }
}