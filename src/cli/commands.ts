/*
    Commander documentation: https://www.npmjs.com/package/commander
*/
import { Command } from 'commander';

import MealPlannerService from '../services/MealPlanner.js';

const program = new Command();

program
    .name('mealplan')
    .description('CLI tool to allow users to plan meals.')
    .version('0.5.0')

program.command('add')
    .argument('<string>', 'name of dish to add')
    .option('-d, --day <value>', 'day to add dish to')
    .option('-t --time <value>', 'Specifying what meal time you want to add the dish to')
    .option('-m --m <value>', 'Specifying what type of dish you are adding (e.g., appetizers, entrees, etc.)')
    .action((str: string, options: { day?: string }) => {
      console.log("Here is the dish name: ", str);
      console.log("Here is the day: ", options);
    });

program.parse(process.argv);