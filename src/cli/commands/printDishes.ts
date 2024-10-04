import fs from "fs";

import DailyMealsService from "../../services/DailyMealService";
import MealPlannerService from "../../services/MealPlanner";
import { capitalizeFirst } from "../../utils/primitiveDataUtils";
import settings from "../../settings";

import { DayKey, DishKey, MealTypeKey } from "types";

/**
 * Allows users to save planned meals to a written txt file. Eventually we'll allow revamp to allow for custom templates.
 * Specifically, something akin to templating engines.
 */
export const printDishes = async (planner: MealPlannerService) => {
    let output = ""
    for (let day of MealPlannerService.days) {
        const mealsByDay = planner.getMealsByDay(day as DayKey);
        output += `----------\n${capitalizeFirst(day)}\n----------\n`
        for (let time of DailyMealsService.mealTimes) {
            // Think meals for either: breakfast, lunch, or dinner
            const mealsByTime = mealsByDay.getDishesByTime(time as MealTypeKey)["meal"]["dishes"];
            output += `${capitalizeFirst(time)}: `;
            output += "\n";
            for (const key in mealsByTime) {
                if (mealsByTime[key as DishKey].length > 0) {
                    output+=`   ${capitalizeFirst(key)}: ${mealsByTime[key as DishKey].join(", ")}\n`;
                }
            }
        }
        output += "\n";
    }

    fs.writeFile(settings["print_feature"]["printed_file_path"], output, 'utf8', (err) => {
        if (err) {
            console.error('Unable to create file with planned meals, see following error for detail:', err);
            return;
        }
        console.log('Meal file created successfully to following location: ', settings["print_feature"]["printed_file_path"]);
    });

    return;
}