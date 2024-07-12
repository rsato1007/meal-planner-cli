import readline from 'node:readline';

import MealService from '../services/MealService.js';
import MealPlannerService from '../services/MealPlanner.js';
import DailyMealsService from '../services/DailyMealService.js';
import { wait } from './misc.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query: string): Promise<string> => new Promise((resolve) => {
    rl.question(query, (answer) => {
        resolve(answer);
    });
});

interface addOptions {
    day?: string;
    time?: string;
    "mealType"?: string;
}

const CHOICES = {
    "day": {
        query: "What day did you want to add the dish to? ",
        choices: MealPlannerService.meta.properties.days
    },
    "time": {
        query: "What meal time should I add this dish to? ",
        choices: DailyMealsService.meta.properties['meal-times']
    },
    "mealType": {
        query: "What type of meal am I adding? ",
        choices: MealService.meta.properties["dishes"]
    }
}

type choiceKey = keyof typeof CHOICES;

/**
 * Reviews input to ensure it's not invalid.
 * @param obj - selected choice for each option (day, time, and meal type)
 * @returns - updated object for options selected with invalid input
 */
export const validateOptionsInput = async (obj: addOptions): Promise<addOptions> => {
    let cleanedObj: addOptions = {};

    for (const key of Object.keys(obj) as choiceKey[]) {
        const value = obj[key];
        if (value && CHOICES[key].choices.includes(value)) {
            cleanedObj[key] = value;
        } else {
            console.log("INVALID INPUT FOR: ", key);
            await wait(2000);
            cleanedObj[key] = await getValidChoice(CHOICES[key]);
        }
    }

    return cleanedObj;
}

/**
 * If a day/time/meal-type choice is invalid or missing, this function ensures we receive.
 * @param obj - see getMissingOptions for object structure.
 * @returns - Promise-based string representing choice we want.
 */
const getValidChoice = async (obj: any): Promise<string> => {
    let validChoice = false;
    let res = "";
    while (!validChoice) {
        res = await question(obj.query);
        if (obj.choices.includes(res)) {
            validChoice = true;
        } else {
            console.log("INVALID CHOICE");
        }
    }

    return res;
}

/**
 * Recieves an options object for flags selected and adds others not added.
 * This ensures no issues when adding a meal to the meal planner.
 * 
 * @remarks
 * - We need to ensure user input is legitimate and maybe work on making the UI a little bit better.
 * - This is where we'll add our code that reads a settings/config file for preselected choices.
 */
export const getMissingOptions = async (options: addOptions) => {

    let completedOptions = Object.assign({}, options);
    if (!completedOptions.hasOwnProperty("day")) {
        completedOptions.day = await getValidChoice(CHOICES["day"]);
    }
    if (!completedOptions.hasOwnProperty("time")) {
        completedOptions.time = await getValidChoice(CHOICES["time"]);
    }
    if (!completedOptions.hasOwnProperty("mealType")) {
        completedOptions['mealType'] = await getValidChoice(CHOICES["mealType"]);
    }

    rl.close();

    return completedOptions;
}