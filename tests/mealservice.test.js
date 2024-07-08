import {it} from "node:test";
import assert from 'node:assert/strict';

import Meal from "../dist/models/Meal.js";
import MealService from "../dist/services/MealService.js";

it('should add a meal', () => {
    let meal = new Meal();
    let mealService = new MealService(meal);
    mealService.addMeal("appetizers", "Deviled Eggs");
    assert.strictEqual("Deviled Eggs", meal.items["appetizers"][0]);
    assert.strictEqual(1, meal.info.numAppetizers);
});

it('should remove a meal', () => {
    let meal = new Meal();
    meal.items.entrees.push("Nachos");
    meal.info.numEntrees++;

    let service = new MealService(meal);
    service.removeMeal("entrees", "Nachos");
    assert.strictEqual(0, meal.items["entrees"].length);
    assert.strictEqual(0, meal.info.numEntrees);
})