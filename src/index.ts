#!/usr/bin/env node
/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */
// import "./cli/commands.js";

import { createOrGetDataFile, updateFile } from "./cli/script.js";
import MealPlannerService from "./services/MealPlanner.js";

const data = new MealPlannerService(createOrGetDataFile());
data
    .getMealsByDay('monday')
    .getDishesByTime('breakfast')
    .addDish('entrees', 'Waffles')
data
    .getMealsByDay('monday')
    .getDishesByTime('lunch')
    .addDish('entrees', 'Buffalo Chicken Salad')
data
    .getMealsByDay('monday')
    .getDishesByTime('dinner')
    .addDish('entrees', 'Teriyaki Chicken')

updateFile(data.getAllDays());