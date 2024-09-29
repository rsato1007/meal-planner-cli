import MealService from "src/services/MealService";
import MealPlannerService from "../../services/MealPlanner";
import { updateFile } from "../../utils/fileUtils";
import {
    findDishByAll,
    findDishByDay,
    findDishByTime,
    translateInput,
    validateOptionsInput 
} from "../../utils/cliUtils";
import { wait } from "../../utils/misc";

import { IMealOptions } from "types";

/**
 * @remarks I noticed this function can't handle case sensitive (i.e., tacos vs Tacos)
 */
export const removeDish = async (arg: string, options: any, planner: MealPlannerService) => {

    try {
        let cleanedObj: IMealOptions = options;
        cleanedObj = translateInput(cleanedObj);
        cleanedObj = await validateOptionsInput(cleanedObj);
        let serviceObj: MealService | undefined;
        
        // This allows the user to specify whichever flags they know the dish leaves in.
        if (cleanedObj.hasOwnProperty("day") && cleanedObj.hasOwnProperty("time")) {
            if (cleanedObj.day && cleanedObj.time) {
                serviceObj = planner.getMealsByDay(cleanedObj.day).getDishesByTime(cleanedObj.time);
            }
        } else if (cleanedObj.hasOwnProperty("day") && !cleanedObj.hasOwnProperty("time")) {
            if (cleanedObj.day) {
                serviceObj = findDishByDay(arg, planner.getMealsByDay(cleanedObj.day));
            }
        } else if (!cleanedObj.hasOwnProperty("day") && cleanedObj.hasOwnProperty("time")) {
            if (cleanedObj.time) {
                serviceObj = findDishByTime({dish: arg, time: cleanedObj.time}, planner)
            }
        } else {
            serviceObj = findDishByAll(arg, planner);
        }

        if (!serviceObj) {
            console.log("Dish not found");
            return;
        } else {
            if (options.mealType) {
                serviceObj.removeDishByMealType(arg, options.mealType);
            } else {
                serviceObj.removeDish(arg);
            }
            await updateFile(planner.getAllDays());
            console.log("Successfully removed dish!");
            await wait(1000);
        }
    } catch(e) {
        console.error("Unable to remove dish: ", e);
    }
}