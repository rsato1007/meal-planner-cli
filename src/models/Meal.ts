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
export interface IMealInfo {
    numAppetizers: number,
    numEntrees: number,
    numSides: number,
    numDesserts: number
}

// Mapped Type
export type ItemKey = keyof IMeal;

export default class Meal {
    public items: IMeal;
    public info: IMealInfo;

    constructor() {
        this.items = {
            appetizers: [],
            entrees: [],
            sides: [],
            desserts: []
        };

        this.info = {
            numAppetizers: 0,
            numEntrees: 0,
            numSides: 0,
            numDesserts: 0
        };
    }
}
