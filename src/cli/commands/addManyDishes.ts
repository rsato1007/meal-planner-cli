import { getMissingOptions, validateOptionsInput } from "../../utils//cliUtils";
import { updateFile } from "../../utils/fileUtils";
import MealPlannerService from "src/services/MealPlanner";
import { wait } from "../../utils/misc";

import { IMealOptions } from "types";

export const addManyDishes = async (dishes: string, options: IMealOptions, planner: MealPlannerService) => {
    try {
        const cleanedObj = await validateOptionsInput(options);
        const dishesArr = dishes.split(',').map(dish => dish.trim());

        // for...of works better with async/await than forEach does.
        for (const dish of dishesArr) {
            console.log(`Let's see if we need anything to add ${dish} to your planner.`);
            await wait(1500);
            const completedOptions = await getMissingOptions(cleanedObj);
            planner
                .getMealsByDay(completedOptions["day"])
                .getDishesByTime(completedOptions["time"])
                .addDish(completedOptions["mealType"], dish);
        }

        await updateFile(planner.getAllDays());
        console.log("Meals Added Successfully!");
        await wait(1000);
        return;
    } catch (e) {
        console.error("Unable to add multiple dishes: ", e);
    }
};