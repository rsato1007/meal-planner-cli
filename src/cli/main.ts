/*
    Commander documentation: https://www.npmjs.com/package/commander
*/
import { Command } from 'commander';

import MealPlannerService from '../services/MealPlanner';
import { createOrGetDataFile } from '../utils/fileUtils';
import { addDish } from './commands/addDish';
import { removeDish } from './commands/removeDish';
import { showDishes } from './commands/showDishes';
import updateDish from './commands/updateDish';

import { IMealOptions } from '../../types/index';

const program = new Command();

(async () => {
    // Allows me to add default options that consistent and reduce redundancy.
    const defaults = [
        ['-d, --day <value>', 'day to add dish to'],
        ['-t --time <value>', 'Specifying what meal time you want to add the dish to'],
        ['-m --meal-type <value>', 'Specifying what type of dish you are adding (e.g., appetizers, entrees, etc.)']
    ]

    let dataFile;
    let planner: MealPlannerService;
    try {
        dataFile = await createOrGetDataFile();

        planner = new MealPlannerService(dataFile);
    } catch (e: unknown) {
        console.log("UNABLE TO CREATE PLANNER: ", e);
    }


    program
    .name('mealplan')
    .description('CLI tool to allow users to plan meals.')
    .version('0.9.5')

    /**
     * Look towards refactoring types on this command. It might take some extensive refactoring and thinking as a heads up.
     */
    program.command('add')
        .description('Add a dish to your meal planner')
        .argument('<string>', 'name of dish to add')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (str: string, options: IMealOptions) => {
            try {
                await addDish(str, options, planner);
            } catch (error) {
                console.error('Error adding dish: ', error);
            }
        });

    /**
     * I would approach this by allowing users to specify meal type, entree type, day etc. and by allowing these to be blank.
     * Allow the system to find the removed meal if needed. For now, we'll start by requiring everything.
     * 
     * @remarks
     * - There is a small issue where without the finally statement, the process doesn't conclude.
     *   Until I can determine what's causing it, this will be left as is.
     */
    program.command('remove')
    .description('Remove a dish from your meal planner')
    .argument('<string>', 'name of dish to remove')
    .option(defaults[0][0], defaults[0][1])
    .option(defaults[1][0], defaults[1][1])
    .action(async (str: string, options: IMealOptions) => {
        await removeDish(str, options, planner);
    });

    program.command('update')
    .description('Allows user to update a recipe, flags can be used to specify where the recipe lives exactly')
    .argument('<currentDish>', 'name of existing dish')
    .argument('<newDish>', 'What the new dish will be')
    .option(defaults[0][0], defaults[0][1])
    .option(defaults[1][0], defaults[1][1])
    .option(defaults[2][0], defaults[2][1])
    .action(async (currentDish: string, newDish: string, options: IMealOptions) => {
        try {
            const data = {
                cur: currentDish,
                new: newDish,
                options
            }
            await updateDish(data, planner);
        } catch (error) {
            console.error('Error updating dish: ', error);
        }
    });

    /*
        Some things to consider: 
            (1) How simple and restrictive we can be starting off 
            (2) How to display the information in a good visual style.
            (3) How to avoid showing days, times, and meal types with nothing in there.
    */
    program.command('show')
    .description('Displays recipes based on specified description.')
    .option(defaults[0][0], defaults[0][1])
    .option(defaults[1][0], defaults[1][1])
    .option(defaults[2][0], defaults[2][1])
    .action(async (options: IMealOptions) => {
        await showDishes(options, planner);
    });

    /*
        For our default setting situation
    */
    // program.command ('config')

    program.parse(process.argv);
})();