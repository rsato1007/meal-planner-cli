/*
    Commander documentation: https://www.npmjs.com/package/commander
*/
import { Command } from 'commander';
import MealPlannerService from '../services/MealPlanner.js';
import { createOrGetDataFile, updateFile } from './script.js';
import { validateOptionsInput, getMissingOptions, formatMealData} from '../utils/cliUtils.js';
import { shutdown, wait } from '../utils/misc.js';
import { IMealPlanner } from '../models/MealPlanner.js';
import DailyMealsService from '../services/DailyMealService.js';
import { IDailyMeals } from '../models/DailyMeals.js';

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
    .action(async (str: string, options: any) => {
        options['mealType'] = "entrees"; // Avoids needing to add this in validation process.

        try {
            let mealRemoved = false;

            if (options.hasOwnProperty('day') && options.hasOwnProperty('time')) {
                console.log("Reviewing input for validity.");
                await wait(2000);
                options = await validateOptionsInput(options);
                await wait(2000);
                options = await getMissingOptions(options);
                planner
                    .getMealsByDay(options.day)
                    .getDishesByTime(options.time)
                    .removeDish(str);
                await updateFile(planner.getAllDays());
                console.log("File updated");
                console.log("Meal Removed Successfully!");
            } else if (options.day) {
                // Default time to breakfast if only day is specified
                const time = options.time || "breakfast";
                const mealsByDay = planner.getMealsByDay(options.day);
                const result = mealsByDay.getDishesByTime(time).removeDish(str);
                if (result) {
                    console.log(`Meal removed from ${options.day} at ${time}`);
                    mealRemoved = true;
                }
            } else if (options.time) {
                // Default day to Monday if only time is specified
                options.day = "monday";
                for (const day of Object.keys(planner.getAllDays())) {
                    const mealsByDay = planner.getMealsByDay(day as keyof IMealPlanner);
                    if (mealsByDay.getDishesByTime(options.time).removeDish(str)) {
                        mealRemoved = true;
                        console.log(`Meal removed from ${day} at ${options.time}`);
                        break;
                    }
                }
            } else {
                // If no specific day or time is given, try all combinations
                for (const day of Object.keys(planner.getAllDays())) {
                    const mealsByDay = planner.getMealsByDay(day as keyof IMealPlanner);
                    for (const time of DailyMealsService.meta.properties['meal-times']) {
                        if (mealsByDay.getDishesByTime(time as keyof IDailyMeals).removeDish(str)) {
                            mealRemoved = true;
                            console.log(`Meal removed from ${day} at ${time}`);
                            break;
                        }
                    }
                    if (mealRemoved) break;
                }
            }

            if (mealRemoved) {
                await updateFile(planner.getAllDays());
                console.log("Meal Removed Successfully and file updated!");
            } else {
                console.log("Couldn't find meal, no removal completed");
            }

            shutdown();
        } catch (error) {
            console.error("An error occurred during the remove operation:", error);
        } finally {
            // Till we can figure out what's causing the process to keep running, we are keeping this in.
            console.log("Exiting process");
            process.exit();
        }
    });

    // program.command('update')

    /*
        Some things to consider: 
            (1) How simple and restrictive we can be starting off 
            (2) How to display the information in a good visual style.
            (3) How to avoid showing days, times, and meal types with nothing in there.
    */
    program.command('show')
    .description('Displays recipes based on specified description. Currently unable to show the entire planner')
    .option(defaults[0][0], defaults[0][1])
    .option(defaults[1][0], defaults[1][1])
    .option(defaults[2][0], defaults[2][1])
    .action(async (options: any) => {
        try {
            let data;
            // Review flags to determine what to show
            if (options.hasOwnProperty("day") && options.hasOwnProperty("time") && options.hasOwnProperty("mealType")) {
                // Make sure input is valid
                console.log("Reviewing input for validity.");
                await wait(2000);
                options = await validateOptionsInput(options);
                // get data;
                data = planner
                        .getMealsByDay(options.day)
                        .getDishesByTime(options.time)
                        .getDishesByDishType(options.mealType);
            } else if (options.hasOwnProperty("day") && options.hasOwnProperty("time")) {
                // Make sure input is valid
                console.log("Reviewing input for validity.");
                await wait(2000);
                options.mealType = "entrees";
                options = await validateOptionsInput(options);
                // get data;
                data = planner
                        .getMealsByDay(options.day)
                        .getDishesByTime(options.time);
            } else if (options.hasOwnProperty("day")) {
                // Make sure input is valid
                console.log("Reviewing input for validity.");
                await wait(2000);
                options.mealType = "entrees";
                options.time = "breakfast";
                options = await validateOptionsInput(options);
                // get data;
                data = planner
                        .getMealsByDay(options.day);
            } else {
                console.log("You must do one of the following to get information: specify all three, specify day and time, or just specify day");
                return;
            }
            // Format and log data
            console.log("Data collected, formattting now!");
            await wait(2000);

            formatMealData(data);

            shutdown();

        } catch (error) {
            console.error("An error occurred during the operation:", error);
        } finally {
            // Till we can figure out what's causing the process to keep running, we are keeping this in.
            console.log("Exiting process");
            process.exit();
        }
    });

    /*
        For our default setting situation
    */
    // program.command ('config')

    program.parse(process.argv);
})();