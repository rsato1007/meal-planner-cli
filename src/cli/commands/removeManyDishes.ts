import MealPlannerService from "src/services/MealPlanner";
import { IMealOptions } from "types";

export const removeManyDishes = async (options: IMealOptions, planner: MealPlannerService) => {
    // Insert Code
    /*
        We would need to consider many scenarios to be honest:
        - All three
        - day only, time only, and entree only
        - day and time
        - day and entree
        - time and entree
        For a total of 7 scenarios!
    */

    // Start by getting the appropriate days:
    if (options) {
        console.log("Here is options: ", options);
    }
}