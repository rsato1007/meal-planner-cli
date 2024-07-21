import {describe, it} from "node:test";
import assert from 'node:assert/strict';

import Meal from "../dist/models/Meal.js";
import MealService from "../dist/services/MealService.js";

describe('mealservice', () => {
    it('should add a meal', () => {
        let meal = new Meal();
        let mealService = new MealService(meal);
        mealService.addDish("appetizers", "Deviled Eggs");
        assert.strictEqual("Deviled Eggs", meal.dishes["appetizers"][0]);
    });
    
    it('should remove a meal', () => {
        let meal = new Meal();
        meal.dishes.entrees.push("Nachos");
    
        let service = new MealService(meal);
        service.removeDish("Nachos");
        assert.strictEqual(0, meal.dishes["entrees"].length);
    })
})