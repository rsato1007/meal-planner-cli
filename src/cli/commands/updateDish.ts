import MealPlannerService from "../../services/MealPlanner";
import { 
    translateInput, 
    validateOptionsInput,
    findDishByAll,
    findDishByDay,
    findDishByTime
} from "../../utils/cliUtils";
import MealService from "../../services/MealService";
import { updateFile } from "../../utils/fileUtils";

import { IMealOptions, IUpdateDishData } from "../../../types/index";

const updateDish = async (data: IUpdateDishData, planner: MealPlannerService): Promise<void> => {
    try {
        let cleanedObj: IMealOptions = data.options;
        cleanedObj = translateInput(cleanedObj);
        cleanedObj = await validateOptionsInput(cleanedObj);
        let serviceObj: MealService | undefined;
        
        if (cleanedObj.hasOwnProperty("day") && cleanedObj.hasOwnProperty("time")) {
            if (cleanedObj.day && cleanedObj.time) {
                serviceObj = planner.getMealsByDay(cleanedObj.day).getDishesByTime(cleanedObj.time);
            }
        } else if (cleanedObj.hasOwnProperty("day") && !cleanedObj.hasOwnProperty("time")) {
            if (cleanedObj.day) {
                serviceObj = findDishByDay(data.cur, planner.getMealsByDay(cleanedObj.day));
            }
        } else if (!cleanedObj.hasOwnProperty("day") && cleanedObj.hasOwnProperty("time")) {
            if (cleanedObj.time) {
                serviceObj = findDishByTime({dish: data.cur, time: cleanedObj.time}, planner)
            }
        } else {
            serviceObj = findDishByAll(data.cur, planner);
        }

        if (!serviceObj) {
            console.log("Dish not found");
            return;
        } else {
            if (data.options.mealType) {
                serviceObj.updateDishWithType({oldDish: data.cur, newDish: data.new, type: data.options.mealType});
            } else {
                serviceObj.updateDish(data.cur, data.new);
            }
        }

        await updateFile(planner.getAllDays());
        console.log("Dish Updated Successfully!");
    } catch (e) {
        console.error("An error occurred during the operation:", e);
    }
}

export default updateDish;