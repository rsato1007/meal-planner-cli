import readline from 'node:readline';

import { wait } from './misc';
import { capitalizeFirst } from './primitiveDataUtils';
import MealPlannerService from '../services/MealPlanner';

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
 * @returns - Promise-based string representing choice we want.
 */
export const getValidChoice = async <T>(obj: {query: string, choices: string[]}): Promise<T> => {
    let validChoice = false;
    let res = "";

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

/**
 * 
 * @remarks I also think a validation function for input is a good idea. Essentially ensuring we can't proceed if the input isn't valid.
 */
export const offerOptions = async () => {
    let options = {};
    let res = await getValidChoice({
            query: "Would you like to specify the following? Meal time, type of dish, and day of meal",
            choices:["yes", "no"]
        });
    if (res === "no") {
        return options;
    } else {
        const day = await getValidChoice({
            query: "Did you want to specify a day the dish pertains to?",
            choices: [...MealPlannerService.days, "skip"] 
        });
        // Review input then rinse and repeat.
    }
    return options;
}