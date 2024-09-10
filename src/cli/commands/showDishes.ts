import MealPlannerService from "../../services/MealPlanner";
import { validateOptionsInput, formatMealData } from "../../utils/cliUtils";

export const showDishes = async (options: any, planner: MealPlannerService) => {
    try {
        let data;
        
        if (options.hasOwnProperty("day") && options.hasOwnProperty("time") && options.hasOwnProperty("mealType")) {
            options = await validateOptionsInput(options);
            data = planner
                    .getMealsByDay(options.day)
                    .getDishesByTime(options.time)
                    .getDishesByDishType(options.mealType);
        } else if (options.hasOwnProperty("day") && options.hasOwnProperty("time")) {
            options.mealType = "entrees";
            options = await validateOptionsInput(options);
            data = planner
                    .getMealsByDay(options.day)
                    .getDishesByTime(options.time);
        } else if (options.hasOwnProperty("day")) {
            options.mealType = "entrees";
            options.time = "breakfast";
            options = await validateOptionsInput(options);
            data = planner
                    .getMealsByDay(options.day);
        } else {
            data = planner;
        }

        formatMealData(data);

    } catch (error) {
        console.error("An error occurred during the operation:", error);
    }
}