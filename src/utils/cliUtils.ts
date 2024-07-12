import readline from 'node:readline';
import { resolve } from 'node:path';

import MealService from '../services/MealService.js';
import MealPlannerService from '../services/MealPlanner.js';
import DailyMealsService from '../services/DailyMealService.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promise wrapper for readline.question
const question = (query: string): Promise<string> => new Promise((resolve) => {
    rl.question(query, (answer) => {
        resolve(answer);
    });
});

interface addOptions {
    day?: string;
    time?: string;
    "meal-type"?: string;
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
    "meal-type": {
        query: "What type of meal am I adding? ",
        choices: MealService.meta.properties["dishes"]
    }
}

type choiceKey = keyof typeof CHOICES;

export const validOptionsInput = async (obj: addOptions): Promise<addOptions> => {
    let cleanedObj: addOptions = {};

    (Object.keys(obj) as choiceKey[]).forEach((key: choiceKey) => {
        const value = obj[key];
        if (value && CHOICES[key].choices.includes(value)) {
            cleanedObj[key] = value;
        }
    });
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

    return resolve(res)
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
    if (!completedOptions.hasOwnProperty("meal-type")) {
        completedOptions['meal-type'] = await getValidChoice(CHOICES["meal-type"]);
    }

    rl.close();

    return completedOptions;
}