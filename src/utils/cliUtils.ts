import readline from 'node:readline';

import Meal from '../models/Meal.js';

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

/**
 * Recieves an options object for flags selected and adds others not added.
 * This ensures no issues when adding a meal to the meal planner.
 * 
 * @remarks
 * - We need to ensure user input is legitimate and maybe work on making the UI a little bit better.
 */
export const getMissingOptions = async (options: addOptions) => {
    // Iterate through object and create both options and validation as a result
    console.log("Let's review the prototype thingy: ", Object.getOwnPropertyNames(Meal.prototype));
    const choices = {
        "day": {
            query: "What day did you want to add the dish to? ",
            choices: ""
        },
        "time": {
            
        },
        "meal-type": {

        }
    }

    let completedOptions = Object.assign({}, options);
    if (!completedOptions.hasOwnProperty("day")) {
        completedOptions.day = await question("For what day do you want to add the dish to? ");
    }
    if (!completedOptions.hasOwnProperty("time")) {
        completedOptions.time = await question("For what meal time did you want to add the dish to? ");
    }
    if (!completedOptions.hasOwnProperty("meal-type")) {
        completedOptions["meal-type"] = await question("What type of dish are you adding? ");
    }

    rl.close();

    return completedOptions;
}