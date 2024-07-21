import MealPlannerService from "../../services/MealPlanner.js";
import { IMealOptions, IUpdateDishData } from "../../../types/index.js";

const updateDish = async (data: IUpdateDishData, planner: MealPlannerService): Promise<void> => {
    // Actually we need to clean up the data we received.
    let cleanedObj: IMealOptions = data.options;
    // First and foremost, we need to find the dish in question.
        // Find the appropriate mealservice and remove from there.
        // So other thing, we need to be aware of all posibilities: all three passed, only two passed, only one passed.
    // Then we can use the update functionality from there I believe.
        // mealservice's update dish specifically.
}

export default updateDish;