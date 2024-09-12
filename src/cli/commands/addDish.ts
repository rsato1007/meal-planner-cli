import MealPlannerService from "../../services/MealPlanner";
import { validateOptionsInput, getMissingOptions } from "../../utils/cliUtils";
import { updateFile } from "../../utils/fileUtils";

export const addDish = async (arg: string, options: any, planner: MealPlannerService) => {
    options = await validateOptionsInput(options);
    options =  await getMissingOptions(options);

    planner
        .getMealsByDay(options.day)
        .getDishesByTime(options.time)
        .addDish(options['mealType'], arg);

    await updateFile(planner.getAllDays());
    console.log("Meal Added Successfully!");
    return;
}