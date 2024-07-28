import Meal from "./Meal";

import { IDailyMeals } from "../../types/index";

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