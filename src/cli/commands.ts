/*
    Commander documentation: https://www.npmjs.com/package/commander
*/
import { Command } from 'commander';

import MealPlannerService from '../services/MealPlanner.js';
import { createOrGetDataFile, updateFile } from './script.js';

const program = new Command();

// interface addOptions {
//     day: string | null,
//     time: string | null,
//     "meal-type": string | null
// }
(async () => {
    // Allows me to add default options that consistent and reduce redundancy.
    const defaults = [
        ['-d, --day <value>', 'day to add dish to'],
        ['-t --time <value>', 'Specifying what meal time you want to add the dish to'],
        ['-m --meal-type <value>', 'Specifying what type of dish you are adding (e.g., appetizers, entrees, etc.)']
    ]
    const dataFile = await createOrGetDataFile()
    const planner = new MealPlannerService(dataFile);

    program
    .name('mealplan')
    .description('CLI tool to allow users to plan meals.')
    .version('0.6.0')

    program.command('add')
        .description('Add a dish to your meal planner')
        .argument('<string>', 'name of dish to add')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (str: string, options: any) => {
            // Handle situation where not all flags were selected
            // Use the options object to create add the meal in question.

            console.log(options);
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

