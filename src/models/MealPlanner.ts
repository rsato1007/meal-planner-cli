import Meal from "./Meal";

/**
 * Model for meals in a day.
 */
interface DailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

/**
 * Model for MealPlanner in a week.
 */
export interface MealPlanner {
    monday: DailyMeals,
    tuesday: DailyMeals,
    wednesday: DailyMeals,
    thursday: DailyMeals,
    friday: DailyMeals,
    saturday: DailyMeals,
    sunday: DailyMeals
}