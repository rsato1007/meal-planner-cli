import DailyMeals from "./DailyMeals.js";
import { IMealPlanner } from "../../types/index.js";

/**
 * Model to represent meal planner for the week.
 */
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