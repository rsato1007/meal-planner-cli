import Meal, { DishKey, IMealInfo, InfoKey } from "../models/Meal.js";
import { validateCondition } from "../utils/errorHandling.js";

interface IMeta {
    properties: {
        dishes: DishKey[]
        info: InfoKey[]
    }
}

/**
 * Handles all business logic for Meals object.
 * @remarks
 * - Possibly consider building methods for meal.info object.
 * - Look to refactor both update and removal to use meal.info to be more efficient in its operations
 */
export default class MealService {
    private meal: Meal;
    static meta: IMeta = {
        properties: {
            dishes: ["appetizers", "desserts", "drinks", "entrees", "sides"],
            info: ["numAppetizers", "numDesserts", "numDrinks", "numEntrees", "numSides"]
        }
    };

    constructor(meal: Meal) {
        this.meal = meal;
    }

    static getTypeNames() {
        {
            items: []
            info: []
        }
    }

    /**
     * Adds a dish to the meal object.
     * @param dishType The type of the dish
     * @param dishName The name of the dish
     * @returns The name of the added dish
     */
    public addDish(dishType: DishKey, dishName: string): string | void {
        console.log(dishType);
        validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID DISH TYPE");

        try {
            this.meal.dishes[dishType].push(dishName);
            const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
            this.meal.info[metaKey]++;

            return dishName;
        } catch (e: unknown) {
            console.error("Unable to add dish: ", e);
        }
    }

    /**
     * Allows user to add multiple dishes at a time.
     * @param dishType The type of the dishes
     * @param dishArr An array of dish names to add
     * @returns The updated array of dishes of the specified type
     */
    public addManyDishes(dishType: DishKey, dishArr: string[]): string[] | void {
        validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID DISH TYPE");

        try {
            this.meal.dishes[dishType] = [...this.meal.dishes[dishType], ...dishArr];
            const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
            this.meal.info[metaKey] += dishArr.length;

            return this.meal.dishes[dishType];
        } catch (e: unknown) {
            console.error("Unable to add multiple dishes: ", e);
        }
    }

    /**
     * Removes a dish from the meal object.
     * @param dishName The name of the dish to remove
     * @returns boolean indicating success or failure
     */
    public removeDish(dishName: string): boolean {
        try {
            let dishType: string | DishKey = "";
            let idx: number = -1;
            for (const key of Object.keys(this.meal.dishes)) {
                idx = this.meal.dishes[key as DishKey].indexOf(dishName);
                if (idx >= 0) {
                    dishType = key;
                    break;
                }
            }
            if (dishType === "") {
                throw new Error(`Dish "${dishName}" not found in any meal.`);
            }

            this.meal.dishes[dishType as DishKey].splice(idx, 1);

            const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
            this.meal.info[metaKey]--;

            return true;
        } catch (e: unknown) {
            console.error("Unable to remove dish: ", e);
            return false;
        }
    }

    /**
     * Allows user to remove many dishes at a time.
     * @param dishArr An array of dish names to remove
     * @returns boolean indicating success or failure
     */
    public removeManyDishes(dishArr: string[]): boolean {
        try {
            for (const dishName of dishArr) {
                if (!this.removeDish(dishName)) {
                    throw new Error(`Failed to remove dish "${dishName}"`);
                }
            }
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove dishes: ", e);
            return false;
        }
    }

    /**
     * Finds the original dish in the object and updates it with the new dish.
     * @param oldDish The name of the dish to update
     * @param newDish The new name of the dish
     * @returns The new name of the dish
     */
    public updateDish(oldDish: string, newDish: string): string | void {
        try {
            let dishType: string | DishKey = "";
            let idx: number = -1;
            for (const key of Object.keys(this.meal.dishes)) {
                idx = this.meal.dishes[key as DishKey].indexOf(oldDish);
                if (idx >= 0) {
                    dishType = key;
                    break;
                }
            }
            if (dishType === "") {
                throw new Error(`Dish "${oldDish}" not found.`);
            }

            this.meal.dishes[dishType as DishKey][idx] = newDish;

            return newDish;
        } catch (e: unknown) {
            console.error("Unable to update dish: ", e);
        }
    }

    /**
     * Finds all dishes in a type (e.g., all appetizers).
     * @param dishType The type of the dishes
     * @returns An array of dish names
     */
    public getDishesByDishType(dishType: DishKey): string[] {
        validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID TYPE");
        return this.meal.dishes[dishType];
    }

    /**
     * Retrieves all dishes in the meal object.
     * @returns An object containing all dishes
     */
    public getAllDishes(): { [key in DishKey]: string[] } {
        return this.meal.dishes;
    }

    /**
     * Removes all dishes in a type (e.g., all entrees).
     * @param dishType The type of the dishes to remove
     * @returns boolean indicating success or failure
     */
    public removeDishesByDishType(dishType: DishKey): boolean {
        validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID DISH TYPE");
        try {
            const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
            this.meal.info[metaKey] -= this.meal.dishes[dishType].length;
            this.meal.dishes[dishType] = [];
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove dishes by type: ", e);
            return false;
        }
    }

    /**
     * Removes all dishes in the meal object.
     * @returns boolean indicating success or failure
     */
    public removeAllDishes(): boolean {
        try {
            for (const key of Object.keys(this.meal.dishes)) {
                const dishType = key as DishKey;
                const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
                this.meal.info[metaKey] = 0;
                this.meal.dishes[dishType] = [];
            }
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove all dishes: ", e);
            return false;
        }
    }
}