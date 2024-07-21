import MealPlannerService from "../../services/MealPlanner.js";
import { validateOptionsInput, getMissingOptions } from "../../utils/cliUtils.js";
import { updateFile } from "../../utils/fileUtils.js";

export const addDish = async (arg: string, options: any, planner: MealPlannerService) => {
    options = await validateOptionsInput(options);
    options =  await getMissingOptions(options);

    planner
        .getMealsByDay(options.day)
        .getDishesByTime(options.time)
        .addDish(options['mealType'], arg);

    await updateFile(planner.getAllDays());
    console.log("Meal Added Successfully!");
}