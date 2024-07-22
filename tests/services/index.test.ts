import Meal from "../../src/models/Meal";
import MealService from "../../src/services/MealService";

describe("Meal Service Tests", () => {
    const m = new MealService(new Meal());
    m.addDish("appetizers", "food");
    m.addDish("drinks", "lemonade"); 
    it("should ensure doesDishExist works", () => {
        expect(m.doesDishExist("lemonade")).toBe(true);
        expect(m.doesDishExist("nachos")).toBe(false);
    })
});