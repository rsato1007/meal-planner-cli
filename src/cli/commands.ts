/*
    Commander documentation: https://www.npmjs.com/package/commander
*/
import { Command } from 'commander';

import MealPlannerService from '../services/MealPlanner.js';
import { createOrGetDataFile, updateFile } from './script.js';
import { validateOptionsInput, getMissingOptions } from '../utils/cliUtils.js';
import { wait } from '../utils/misc.js';

const program = new Command();

(async () => {
    // Allows me to add default options that consistent and reduce redundancy.
    const defaults = [
        ['-d, --day <value>', 'day to add dish to'],
        ['-t --time <value>', 'Specifying what meal time you want to add the dish to'],
        ['-m --meal-type <value>', 'Specifying what type of dish you are adding (e.g., appetizers, entrees, etc.)']
    ]
    console.log("Seeing if data file exists");
    await wait(1500);
    const dataFile = await createOrGetDataFile();
    console.log("Data loaded successfully");
    await wait(1500);
    const planner = new MealPlannerService(dataFile);

    program
    .name('mealplan')
    .description('CLI tool to allow users to plan meals.')
    .version('0.9.0')

    /**
     * Look towards refactoring types on this command. It might take some extensive refactoring and thinking as a heads up.
     */
    program.command('add')
        .description('Add a dish to your meal planner')
        .argument('<string>', 'name of dish to add')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (str: string, options: any) => {
            console.log("Reviewing input for validity.");
            await wait(2000);
            options = await validateOptionsInput(options);
            console.log("Let's see what information we still need to add the meal.");
            await wait(2000);
            options =  await getMissingOptions(options);
            planner
                .getMealsByDay(options.day)
                .getDishesByTime(options.time)
                .addDish(options['mealType'], str)
            await updateFile(planner.getAllDays());
            console.log("Meal Added Successfully!");
        });

    // program.command('remove')

    // program.command('update')

    /*
        Be mindful how you show the data!
    */
    // program.command('show')

    /*
        For our default setting situation
    */
    // program.command ('config')

    program.parse(process.argv);
})();

