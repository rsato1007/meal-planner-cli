#!/usr/bin/env node
/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */
import DailyMealsService from "./services/DailyMealService.js";
import { DailyMeals } from "./models/DailyMeals.js";

let mon = new DailyMealsService(new DailyMeals());

mon
    .getDishesByTime('breakfast')
    .addDish("appetizers", "Bloody Marys")