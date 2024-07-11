#!/usr/bin/env node
/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */
import DailyMealsService from "./services/DailyMealService.js";
import { DailyMeals } from "./models/DailyMeals.js";

let dm = new DailyMealsService(new DailyMeals());
dm
    .getByType("dinner")
    .add('appetizers', 'nachos')
    
dm
    .getByType("dinner")
    .add("entrees", "Green Enchiladas")

dm
    .getByType("breakfast")
    .add("entrees", "waffles")

console.log(dm
    .getALL()["breakfast"]["items"])