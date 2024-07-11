import Meal, {DishKey, IMealInfo} from "../models/Meal.js";

/**
 * Handles all business logic for Meals object.
 * @remarks
 * - Possibly consider building methods for meal.info object.
 */
export default class MealService {
    private meal: Meal;

    constructor(meal: Meal) {
        this.meal = meal;
    }

    /**
     * Adds a dish to the meal object.
     * @param dishType 
     * @param dishName 
     * @returns 
     */
    public addDish(dishType: DishKey, dishName: string) {
        this.meal.dishes[dishType].push(dishName);
        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]++;

        return dishName;
    }

    /**
     * Allows user to add multiple dishes at a time.
     * @param dishType 
     * @param dishArr 
     */
    public addManyDishes(dishType: DishKey, dishArr: string[]) {
        this.meal.dishes[dishType] = [...this.meal.dishes[dishType], ...dishArr];
    }

    /**
     * Removes a dish from the meal object.
     * @param dishName 
     * @returns 
     */
    public removeDish(dishName: string) {
        // Find what dish type the dish is in:
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
            throw new Error("MEAL NOT FOUND");
        }

        this.meal.dishes[dishType as DishKey].splice(idx, 1);

        const metaKey = `num${dishType.charAt(0).toUpperCase() + dishType.slice(1)}` as keyof IMealInfo;
        this.meal.info[metaKey]--;

        return true;
    }
    
    /**
     * Allows user to remove many dishes at a time.
     * @param dishArr 
     * @returns 
     */
    public removeManyDishes(dishArr: string[]) {
        dishArr.forEach((meal: string) => {
            this.removeDish(meal);
        })

        return true;
    }

    /**
     * Finds the original dish in the object and updates it with the new dish.
     * @param oldDish 
     * @param newDish 
     * @returns 
     */
    public updateDish(oldDish: string, newDish: string) {
        // Find what dish type the dish is in:
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
            throw new Error("DISH NOT FOUND");
        }

        this.meal.dishes[dishType as DishKey][idx] = newDish;

        return newDish;
    }

    /**
     * Finds all dishes in a type (e.g., all appetizers)
     * @param type 
     * @returns 
     */
    public getDishesByDishType(type: DishKey) {
        return this.meal.dishes[type];
    }

    /**
     * Retrieves all dishes in the meal object.
     * @returns 
     */
    public getAllDishes() {
        return this.meal.dishes;
    }
    
    /**
     * Removes all dishes in a type (e.g., all entrees).
     * @param type 
     * @returns 
     */
    public removeDishesByDishType(type: DishKey) {
        this.meal.dishes[type] = [];
        return true;
    }
    
    /**
     * Removes all dishes in the meal object.
     * @returns 
     */
    public removeAllDishes() {
        Object.keys(this.meal).forEach((key) => {
            this.meal.dishes[key as DishKey] = [];
        });
        return true;
    }
}