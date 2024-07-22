import MealPlannerService from "../../services/MealPlanner";
import { 
    translateInput, 
    validateOptionsInput,
    findDishByAll,
    findDishByDay,
    findDishByTime
} from "../../utils/cliUtils";
import MealService from "../../services/MealService";

import { IMealOptions, IUpdateDishData } from "../../../types/index";

/**
 * 
 * @param data 
 * @param planner 
 * @returns 
 * @remarks
 * - Consider how to integrate dish type into update and remove (most likely new meal services).
 */
const updateDish = async (data: IUpdateDishData, planner: MealPlannerService): Promise<void> => {
    // Clean up data received.
    let cleanedObj: IMealOptions = data.options;
    cleanedObj = translateInput(cleanedObj);
    cleanedObj = await validateOptionsInput(cleanedObj);
    let serviceObj: MealService | undefined;
    
    // FIND DISH
    /*
        end goal: mealservice we can use.
        What option can we encounter?
        - day only (findDishByDay)
        - day and time (findDishByDayTime)
        - time only (findDishByTime)
        - Neither day nor time. (FindDishByAll) DONE

        So using the above, we get a mealservice then we can write code than handles both knowing the entree and not knowing the entree.
    */
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
        // NOT COMPLETE
        console.log("Object: ", serviceObj.getAllDishes());
        // serviceObj.updateDish;
    }
}

export default updateDish;