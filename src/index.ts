#!/usr/bin/env node
/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */

import Meal from "./models/Meal.js";
import MealService from "./services/MealService.js";

let newMeal = new Meal();
let service = new MealService(newMeal);
service.addMeal("appetizers", "Deviled Eggs");
service.addMeal("entrees", "BBQ Ribs");

service.removeMeal("Deviled Eggs");

service.updateMeal("BBQ Ribs", "Smoked Brisket");

console.log("Final Meals: ", service.getAllItems());