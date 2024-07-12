#!/usr/bin/env node
/**
 * TESTING MY CODE TO ENSURE IT WORKS
 */
import MealPlannerService from "./services/MealPlanner.js";
import MealPlanner from "./models/MealPlanner.js";
const planner = new MealPlannerService(new MealPlanner());

planner
    .getMealsByDay("monday")
    .getDishesByTime("breakfast")
    .addDish("appetizers", "Mushroom Thingy")

