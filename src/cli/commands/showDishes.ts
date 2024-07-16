import MealPlannerService from "../../services/MealPlanner";
import { validateOptionsInput, formatMealData } from "../../utils/cliUtils";
import { shutdown } from "../../utils/misc";

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

        shutdown();

    } catch (error) {
        console.error("An error occurred during the operation:", error);
    } finally {
        // Till we can figure out what's causing the process to keep running, we are keeping this in.
        console.log("Exiting process");
        process.exit();
    }
}