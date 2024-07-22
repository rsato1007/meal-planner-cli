import Meal from "../../src/models/Meal";
import MealService from "../../src/services/MealService";

describe("Meal Service Tests", () => {
    it("should ensure doesDishExist works", () => {
        const m = new MealService(new Meal());
        m.addDish("appetizers", "food");
        m.addDish("drinks", "lemonade");
        expect(m.doesDishExist("lemonade")).toBe(true);
        expect(m.doesDishExist("nachos")).toBe(false);
    });

    it("should ensure updating meal works", () => {
        const m = new MealService(new Meal());
        m.addDish("entrees", "Ribeye Steaks");
        m.updateDish("Ribeye Steaks", "Turkey Burgers");
        const dish = m.getDishesByDishType("entrees")[0];
        expect(dish).toBe("Turkey Burgers");
        expect(m.updateDish("Invalid", "Not too work")).toBe(undefined);
    });
});

describe("Daily Meals Service Tests", () => {

});

describe("Meal Planner Service Tests", () => {

});