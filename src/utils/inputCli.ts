import readline from 'node:readline';

import { wait } from './misc';
import { capitalizeFirst } from './primitiveDataUtils';
import { MealTypeKey, DayKey, DishKey } from 'types';

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
 * If a day/time/meal-type choice is invalid or missing, this function ensures we receive.
 * @param obj - see getMissingOptions for object structure.
 * @returns - Promise-based string representing choice we want.
 */
export const getValidChoice = async (obj: {query: string, choices: string[]}): Promise<DishKey | MealTypeKey | DayKey> => {
    let validChoice = false;
    let res = "";

    let options = obj.query + "\n";
    obj.choices.forEach((option, idx) => {
        options += `${idx + 1}: ${capitalizeFirst(option)}\n`
    })
    options.trim();

    while (!validChoice) {
        const idx = parseInt(await question(options));
        if (idx > 0 && idx <= obj.choices.length) {
            res = obj.choices[idx - 1];
            validChoice = true;
        } else {
            console.log("INVALID CHOICE");
            await wait(2000);
        }
    }
    console.clear();
    return res as DishKey | MealTypeKey | DayKey;
}

/**
 * 
 * @remarks I also think a validation function for input is a good idea. Essentially ensuring we can't proceed if the input isn't valid.
 */
export const offerOptions = async () => {
    let options = {};
    console.log("Would you like to specify the following? Meal time, type of dish, and day of meal");
    console.log("Type in y for yes or n for no ");
    let optionResponse = await question("");
    // This would be the start of where we get valid input.
    let isResValid = false;
    while(!isResValid) {
        if (optionResponse !== "y" && optionResponse !== "n") {
            optionResponse = await question("Invalid input, type y for yes or n for no: ");
        } else {
            isResValid = true;
        }
    }
    // then we can determine what happens next.
    return options;
}