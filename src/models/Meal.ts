/**
 * Model to represent an individual meal
 * 
 * @remarks
 * The usage of array of strings accounts for a couple scenarios: a meal will be for large family meal (e.g., Thanksgiving) and when planning for multiple people.
 */
export interface IMeal {
    appetizers: string[],
    entrees: string[],
    sides: string[],
    desserts: string[]
}

/**
 * Meta data about an individual meal.
 */
export interface MetaMeal {
    numAppetizers: number,
    numEntrees: number,
    numSides: number,
    numDesserts: number
}

export default class Meal {
    public meal: IMeal;
    public meta: MetaMeal;

    constructor() {
        this.meal = {
            appetizers: [],
            entrees: [],
            sides: [],
            desserts: []
        };

        this.meta = {
            numAppetizers: 0,
            numEntrees: 0,
            numSides: 0,
            numDesserts: 0
        };

        console.log("Meal object created successfully");
    }
}
