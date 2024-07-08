#!/usr/bin/env node
console.log("Hello World");

/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */

import Meal from "./models/Meal.js";
import MealService from "./services/MealService.js";

let newMeal = new Meal();
let service = new MealService(newMeal);
service.addMeal('appetizers', 'Deviled Eggs');

console.log("Meal: ", newMeal.items["appetizers"][0]);