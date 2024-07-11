/**
 * Model to represent an individual meal
 * 
 * @remarks
 * The usage of array of strings accounts for a couple scenarios: a meal will be for large family meal (e.g., Thanksgiving) and when planning for multiple people.
 */
export interface IMeal {
    appetizers: string[],
    drinks: string[],
    entrees: string[],
    sides: string[],
    desserts: string[]
}

/**
 * Meta data about an individual meal.
 */
export interface IMealInfo {
    numAppetizers: number,
    numDrinks: number,
    numEntrees: number,
    numSides: number,
    numDesserts: number
}

// Mapped Type
export type DishKey = keyof IMeal;

export default class Meal {
    public dishes: IMeal;
    public info: IMealInfo;

    constructor() {
        this.dishes = {
            appetizers: [],
            drinks: [],
            entrees: [],
            sides: [],
            desserts: []
        };

        this.info = {
            numAppetizers: 0,
            numDrinks: 0,
            numEntrees: 0,
            numSides: 0,
            numDesserts: 0
        };
    }
}
