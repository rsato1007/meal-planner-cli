import Meal from "../models/Meal";
import { validateCondition } from "../utils/errorHandling";

import { DishKey, IMeal } from "../../types/index";

/**
 * Think of this as taking the model we had built out for meals and adding methods that interact with the data.
 * @remarks
 */
export default class MealService {
    private meal: IMeal;
    /*
        Should you need to add a dish type, this property needs to be updated to avoid issues.
    */
    static dishTypes = ["appetizers", "desserts", "drinks", "entrees", "sides"];

    constructor(meal: Meal) {
        this.meal = meal;
    }

    static getTypes() {
        return this.dishTypes;
    }

    /**
     * Adds a dish to the meal object.
     * @param dishType The type of the dish
     * @param dishName The name of the dish
     * @returns The name of the added dish or void if unable to add.
     */
    public addDish(dishType: DishKey, dishName: string): string | void {
        try {
            validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID DISH TYPE");
            this.meal.dishes[dishType].push(dishName);

            return dishName;
        } catch (e: unknown) {
            console.error("Unable to add dish: ", e);
        }
    }

    /**
     * Allows user to add multiple dishes at a time.
     * @param dishType The type of the dishes
     * @param dishArr An array of dish names to add
     * @returns The updated array of dishes of the specified type or void if action was unable to completed.
     */
    public addManyDishes(dishType: DishKey, dishArr: string[]): string[] | void {
        try {
            validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID DISH TYPE");
            this.meal.dishes[dishType] = [...this.meal.dishes[dishType], ...dishArr];

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
                const dishesInType = this.meal.dishes[key as DishKey];
                if (dishesInType.length > 0) {
                    idx = dishesInType.indexOf(dishName);
                    if (idx >= 0) {
                        dishType = key;
                        break;
                    }
                }
            }
            if (dishType === "") {
                return false;
            }
    
            this.meal.dishes[dishType as DishKey].splice(idx, 1);
    
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove dish: ", e);
            return false;
        }
    }
    /**
     * 
     */
    public removeDishByMealType(dishName: string, type: string) {
        try {
            if (this.meal.dishes[type as DishKey].length > 0) {
                const idx = this.meal.dishes[type as DishKey].indexOf(dishName);
                if (idx !== -1) {
                    this.meal.dishes[type as DishKey].splice(idx, 1);
                    console.log(this.meal.dishes[type as DishKey]);
                    return true;
                } else {
                    throw new Error(`Dish "${dishName}" not found.`);
                }
            } else {
                throw new Error(`No dishes of type ${type} found.`);
            }
        } catch (e) {
            console.log("Error in removing dish by type: ", e);
            return;
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
                const dishesInType = this.meal.dishes[key as DishKey];
                if (dishesInType.length > 0) {
                    idx = this.meal.dishes[key as DishKey].indexOf(oldDish);
                    if (idx >= 0) {
                        dishType = key;
                        break;
                    }
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
     * If dish type is known, we can use this method instead for updating the dish.
     * @param data - object with oldDish, newDish, and type.
     * @returns 
     */
    public updateDishWithType({oldDish, newDish, type}: {oldDish: string, newDish: string, type: string}): string | void {
        try {
            if (this.meal.dishes[type as DishKey].length > 0) {
                const idx = this.meal.dishes[type as DishKey].indexOf(oldDish);
                if (idx !== -1) {
                    this.meal.dishes[type as DishKey][idx] = newDish;
                    return newDish;
                } else {
                    throw new Error(`Dish "${oldDish}" not found.`);
                }
            } else {
                throw new Error(`No dishes of type ${type} found.`);
            }
        } catch (e) {
            console.log("Error in updating dish by type: ", e);
            return;
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
    public getAllDishes(): IMeal {
        return this.meal;
    }

    /**
     * Removes all dishes in a type (e.g., all entrees).
     * @param dishType The type of the dishes to remove
     * @returns boolean indicating success or failure
     */
    public removeDishesByDishType(dishType: DishKey): boolean {
        validateCondition(this.meal.dishes.hasOwnProperty(dishType), "INVALID DISH TYPE");
        try {
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
                this.meal.dishes[dishType] = [];
            }
            return true;
        } catch (e: unknown) {
            console.error("Unable to remove all dishes: ", e);
            return false;
        }
    }

    /**
     * Sees if the dish exists in the meal.
     * @param dishName 
     * @returns boolean
     */
    public doesDishExist(dishName: string): boolean {
        try {
            let dishType: string | DishKey = "";
            let idx: number = -1;
            for (const key of Object.keys(this.meal.dishes)) {
                const dishesInType = this.meal.dishes[key as DishKey];
                if (dishesInType.length > 0) {
                    idx = this.meal.dishes[key as DishKey].indexOf(dishName);
                    if (idx >= 0) {
                        dishType = key;
                        break;
                    }
                }
            }
            if (dishType === "") {
                return false;
            } else {
                return true;
            }
        } catch (e: unknown) {
            console.error("Unable to update dish: ", e);
            return false;
        }
    }
}