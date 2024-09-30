import MealPlannerService from "src/services/MealPlanner";
import { validateOptionsInput } from "../../utils/cliUtils";
import { getValidChoice } from "../../utils/inputCli";
import { IMealOptions } from "types";
import { wait } from "../../utils/misc";

export const removeManyDishes = async (options: IMealOptions, planner: MealPlannerService) => {
    const validOptions = await validateOptionsInput(options);

    let customMessage = "";
    
    if (validOptions.day && validOptions.time && validOptions.mealType) {
        customMessage = `meals for day: ${validOptions.day}, time: ${validOptions.time}, meal type: ${validOptions.mealType}`;
    } else if (validOptions.day && validOptions.time) {
        customMessage = `meals for day: ${validOptions.day}, time: ${validOptions.time}`;
    } else if (validOptions.day && validOptions.mealType) {
        customMessage = `meals for day: ${validOptions.day}, meal type: ${validOptions.mealType}`;
    } else if (validOptions.day) {
        customMessage = `meals for day: ${validOptions.day}`;
    } else if (validOptions.time && validOptions.mealType) {
        customMessage = `meals for time: ${validOptions.time}, meal type: ${validOptions.mealType}`;
    } else if (validOptions.time) {
        customMessage = `meals for time: ${validOptions.time}`;
    } else if (validOptions.mealType) {
        customMessage = `meals for meal type: ${validOptions.mealType}`;
    } else {
        customMessage = "everything on your meal planner";
    }
    
    const query = `Your inputs mean you'll delete ${customMessage}. Are you sure you want to do that?`;
    const res = await getValidChoice({query, choices: ["Yes", "No"]});

    if (res === "Yes") {
        // invoke class methods we'll be building
    } else {
        console.log("Cancelling request");
        await wait(1500);
        return;
    }
}