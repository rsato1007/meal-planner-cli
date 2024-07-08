#!/usr/bin/env node
/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */

import Meal from "./models/Meal.js";
import MealService from "./services/MealService.js";

let newMeal = new Meal();
let service = new MealService(newMeal);
service.add("appetizers", "Deviled Eggs");
service.add("entrees", "BBQ Ribs");
service.add("appetizers", "Cheese and Crakers");
service.update("BBQ Ribs", "Smoked Brisket");

console.log("Appetizers: ", service.getByType("appetizers"));