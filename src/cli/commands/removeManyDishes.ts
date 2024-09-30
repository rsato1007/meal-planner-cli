import MealPlannerService from "src/services/MealPlanner";
import { validateOptionsInput } from "../../utils/cliUtils";
import { getValidChoice } from "../../utils/inputCli";
import { IMealOptions } from "types";
import { wait } from "../../utils/misc";
import { updateFile } from "../../utils/fileUtils";

export const removeManyDishes = async (options: IMealOptions, planner: MealPlannerService) => {
    try {
        const validOptions = await validateOptionsInput(options);

        let messageParts = [];

        if (validOptions.day) messageParts.push(`day: ${validOptions.day}`);
        if (validOptions.time) messageParts.push(`time: ${validOptions.time}`);
        if (validOptions.mealType) messageParts.push(`meal type: ${validOptions.mealType}`);
        
        const customMessage = messageParts.length > 0
            ? `meals for ${messageParts.join(', ')}`
            : "everything on your meal planner";
        
        const query = `Your inputs mean you'll delete ${customMessage}. Are you sure you want to do that?`;
        const res = await getValidChoice({query, choices: ["Yes", "No"]});
    
        if (res !== "Yes") {
            console.log("Cancelling request");
            await wait(1500);
            return;
        }
        
        planner.removeMeals(validOptions);
        await updateFile(planner.getAllDays());
        console.log("Meals were removed successfully");
    } catch (e) {
        console.log("Unable to remove meals: ", e);
        return;
    }
}