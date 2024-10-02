/*
    Commander documentation: https://www.npmjs.com/package/commander
*/
import { Command } from 'commander';

import MealPlannerService from '../services/MealPlanner';
import { createOrGetDataFile } from '../utils/fileUtils';
import { addDish } from './commands/addDish';
import { addManyDishes } from './commands/addManyDishes';
import { removeDish } from './commands/removeDish';
import { showDishes } from './commands/showDishes';
import updateDish from './commands/updateDish';
import { printDishes } from './commands/printDishes';
import { startInteractive } from './commands/startInteractive';

import { IMealOptions } from '../../types/index';
import { removeManyDishes } from './commands/removeManyDishes';

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
    
    program.command('addMany')
        .description('Add multiple dishes to your meal planner')
        .argument('<string>', 'names of dishes seperated by a comma')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (str: string, options: IMealOptions) => {
            try {
                await addManyDishes(str, options, planner);
            } catch (error) {
                console.error('Error adding dishes: ', error);
            }
        });

    program.command('remove')
        .description('Remove a dish from your meal planner')
        .argument('<string>', 'name of dish to remove')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (str: string, options: IMealOptions) => {
            await removeDish(str, options, planner);
        });
    
    program.command('removeMany')
        .description('Allows users to remove multiple recipes at a time, flags are used to specify what group of dishes to remove')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (options: IMealOptions) => {
            try {
                await removeManyDishes(options, planner);
            } catch (e) {
                console.error("Unable to remove dishes: ", e);
            }
        })

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

    program.command('show')
        .description('Displays recipes based on specified description.')
        .option(defaults[0][0], defaults[0][1])
        .option(defaults[1][0], defaults[1][1])
        .option(defaults[2][0], defaults[2][1])
        .action(async (options: IMealOptions) => {
            await showDishes(options, planner);
        });

    program.command('print')
        .description('Prints out the current meal planner as a text file.')
        .action(async () => {
            await printDishes(planner);
        })

    program.command('run')
        .description('Launch the meal planner in interactive mode, allowing you to continuously add, remove, update, or view meals.')
        .action(async () => {
            await startInteractive(planner);
        })

    program.parse(process.argv);
})();