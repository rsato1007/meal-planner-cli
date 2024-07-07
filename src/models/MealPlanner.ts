import Meal from "./Meal";

interface DailyMeals {
    breakfast: Meal,
    lunch: Meal,
    dinner: Meal
}

export interface MealPlanner {
    monday: DailyMeals,
    tuesday: DailyMeals,
    wednesday: DailyMeals,
    thursday: DailyMeals,
    friday: DailyMeals,
    saturday: DailyMeals,
    sunday: DailyMeals
}