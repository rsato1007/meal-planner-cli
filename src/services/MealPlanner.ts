import { DailyMeals } from "../models/DailyMeals.js";
import MealPlanner, {DayKey} from "../models/MealPlanner.js";

export default class MealPlannerService  {
    private planner: MealPlanner;

    constructor(planner: MealPlanner) {
        this.planner = planner;
    }

    public getMealsByDay(day: DayKey) {
        return this.planner[day];
    }

    public getALLDays() {
        return this.planner;
    }

    public removeMealsByDay(day: DayKey) {
        this.planner[day] = new DailyMeals();
        return true;
    }

    public resetPlanner() {
        this.planner = new MealPlanner();
        return true;
    }
}