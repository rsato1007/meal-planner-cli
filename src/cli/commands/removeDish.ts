import MealPlannerService from "../../services/MealPlanner.js";
import { validateOptionsInput, getMissingOptions } from "../../utils/cliUtils.js";
import { updateFile } from "../../utils/fileUtils.js";
import { shutdown } from "../../utils/misc.js";
import { IMealPlanner } from "../../models/MealPlanner.js";
import DailyMealsService from "../../services/DailyMealService.js";
import { IDailyMeals } from "../../models/DailyMeals.js";

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
                for (const time of DailyMealsService.meta.properties['meal-times']) {
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

        shutdown();
    } catch (error) {
        console.error("An error occurred during the remove operation:", error);
    } finally {
        // Till we can figure out what's causing the process to keep running, we are keeping this in.
        console.log("Exiting process");
        process.exit();
    }
}