import readline from 'node:readline';

import { wait } from './misc';
import { capitalizeFirst } from './primitiveDataUtils';
import MealPlannerService from '../services/MealPlanner';
import DailyMealsService from '../services/DailyMealService';
import MealService from '../services/MealService';
import { DayKey, DishKey, IMealOptions, MealTypeKey } from 'types';

export const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(query, (answer) => {
            rl.close(); // Close after receiving input
            resolve(answer);
        });
    });
};

/**
 * Ensures we get the response we want.
 * @param obj - see getMissingOptions for object structure.
 */
export const getValidChoice = async <T>(obj: {query: string, choices: string[]}): Promise<T> => {
    let validChoice = false;
    let res: unknown = "";

    let options = obj.query + "\n";
    obj.choices.forEach((option, idx) => {
        options += `${idx + 1}: ${capitalizeFirst(option)}\n`
    })
    options.trim();

    while (!validChoice) {
        console.log(options);
        const idx = parseInt(await question(`Select an option (1-${obj.choices.length}): `));
        if (idx > 0 && idx <= obj.choices.length) {
            res = obj.choices[idx - 1];
            validChoice = true;
        } else {
            console.log("INVALID CHOICE");
            await wait(2000);
        }
    }
    console.clear();
    return res as T;
}

export const offerOptions = async () => {
    let options: IMealOptions = {};
    let res = await getValidChoice({
            query: "Would you like to specify the following: Meal time, type of dish, and day of meal",
            choices:["yes", "no"]
        });
    if (res === "no") {
        return options;
    } else {
        const day = await getValidChoice<DayKey | 'skip'>({
            query: "Did you want to specify a day the dish pertains to?",
            choices: [...MealPlannerService.days, "skip"] 
        });

        if (day !== "skip") {
            options["day"] = day;
        }

        const time = await getValidChoice<MealTypeKey | "skip">({
            query: "Did you want to specify what meal time the dish pertains to?",
            choices: [...DailyMealsService.mealTimes, "skip"] 
        });

        if (time !== "skip") {
            options["time"] = time;
        }

        const type = await getValidChoice<DishKey | "skip">({
            query: "Did you want to specify what type of meal the dish is?",
            choices: [...MealService.dishTypes, "skip"]
        });

        if (type !== "skip") {
            options["mealType"] = type;
        }
    }
    return options;
}