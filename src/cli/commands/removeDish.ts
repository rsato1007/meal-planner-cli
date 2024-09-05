import MealPlannerService from "../../services/MealPlanner";
import { validateOptionsInput, getMissingOptions } from "../../utils/cliUtils";
import { updateFile } from "../../utils/fileUtils";
import DailyMealsService from "../../services/DailyMealService";

import { IDailyMeals } from "../../../types/index";
import { IMealPlanner } from "../../../types/index";

/**
 * @remarks Evaulate this function and look towards refactoring.
 */
export const removeDish = async (arg: string, options: any, planner: MealPlannerService) => {
    options['mealType'] = "entrees"; // Avoids needing to add this in validation process.

    try {
        let mealRemoved = false;

        if (options.hasOwnProperty('day') && options.hasOwnProperty('time')) {
            options = await validateOptionsInput(options);
            options = await getMissingOptions(options);
            planner
                .getMealsByDay(options.day)
                .getDishesByTime(options.time)
                .removeDish(arg);
            await updateFile(planner.getAllDays());
            console.log("Meal Removed Successfully!");
        } else if (options.day) {
            // Default time to breakfast if only day is specified
            const time = options.time || "breakfast";
            const mealsByDay = planner.getMealsByDay(options.day);
            const result = mealsByDay.getDishesByTime(time).removeDish(arg);
            if (result) {
                console.log(`Meal removed from ${options.day} at ${time}`);
                mealRemoved = true;
            }
        } else if (options.time) {
            // Default day to Monday if only time is specified
            options.day = "monday";
            for (const day of Object.keys(planner.getAllDays())) {
                const mealsByDay = planner.getMealsByDay(day as keyof IMealPlanner);
                if (mealsByDay.getDishesByTime(options.time).removeDish(arg)) {
                    mealRemoved = true;
                    console.log(`Meal removed from ${day} at ${options.time}`);
                    break;
                }
            }
        } else {
            // If no specific day or time is given, try all combinations
            for (const day of Object.keys(planner.getAllDays())) {
                const mealsByDay = planner.getMealsByDay(day as keyof IMealPlanner);
                for (const time of DailyMealsService.mealTimes) {
                    if (mealsByDay.getDishesByTime(time as keyof IDailyMeals).removeDish(arg)) {
                        mealRemoved = true;
                        console.log(`Meal removed from ${day} at ${time}`);
                        break;
                    }
                }
                if (mealRemoved) break;
            }
        }

        if (mealRemoved) {
            await updateFile(planner.getAllDays());
            console.log("Meal Removed Successfully and file updated!");
        } else {
            console.log("Couldn't find meal, no removal completed");
        }
    } catch (error) {
        console.error("An error occurred during the remove operation:", error);
    }
}