import fs from "fs";

import DailyMealsService from "../../services/DailyMealService";
import MealPlannerService from "../../services/MealPlanner";
import { capitalizeFirst } from "../../utils/primitiveDataUtils";
import settings from "../../settings";

import { DayKey, DishKey, MealTypeKey } from "types";

export const printDishes = async (planner: MealPlannerService) => {
    console.log("Printing dishes");
    let output = ""
    for (let day of MealPlannerService.days) {
        const mealsByDay = planner.getMealsByDay(day as DayKey);
        output += `----------\n${capitalizeFirst(day)}\n----------\n`
        for (let time of DailyMealsService.mealTimes) {
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

    fs.writeFile(settings["print"]["file_path"], output, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('File has been written successfully!');
    });

    return;
}